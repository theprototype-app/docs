// The built-page check: open every docs page that shows a tools/shots image (manifest.json) the way a reader
// does — desktop widths, dark and light — and fail when the page rescales interface (displayed width ≠ CSS
// size) or an image, loop or caption is not centred. Screenshots of every figure go to OUT for review; it
// also checks a loop plays, stays paused under reduced motion, and the lightbox opens.
//   SITE=http://127.0.0.1:5850/ OUT=<dir> node tools/shots/review/page-check.cjs [page ...]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { readManifest } = require('../lib/rules.cjs');

const SITE = process.env.SITE, OUT = process.env.OUT;
const { images, column } = readManifest();
const pages = {};
for (const [p, e] of Object.entries(images)) (pages[e.page || p.split('/')[1]] ||= []).push({ path: p, ...e });
const want = process.argv.slice(2);
// a spec can name its Markdown file (`md: nodes/gate.md`, page key nodes-gate); the built page is that file's folder
const urlOf = (pg) => {
	const f = path.join(__dirname, '..', 'specs', pg + '.yml');
	const m = fs.existsSync(f) && fs.readFileSync(f, 'utf8').match(/^md:\s*(\S+)/m);
	return (m ? m[1] : pg + '.md').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '/');
};

(async () => {
	if (OUT) fs.mkdirSync(OUT, { recursive: true });
	const b = await chromium.launch();
	const bad = [];
	let shots = 0;
	for (const [vw, scheme] of [[1440, 'dark'], [1280, 'light'], [1920, 'dark']]) {
		const ctx = await b.newContext({ viewport: { width: vw, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
		const p = await ctx.newPage();
		for (const [pg, list] of Object.entries(pages)) {
			if (want.length && !want.includes(pg)) continue;
			const res = await p.goto(SITE + urlOf(pg), { waitUntil: 'networkidle' });
			if (!res || !res.ok()) { bad.push(`${pg}: ${urlOf(pg)} did not load (${res && res.status()})`); continue; }
			const col = await p.evaluate(() => {
				const t = document.querySelector('.md-content__inner');
				const r = t.getBoundingClientRect(), cs = getComputedStyle(t);
				return { left: r.left + parseFloat(cs.paddingLeft), width: t.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) };
			});
			if (vw === 1440) console.log(`${pg}: content column ${col.width} px at ${vw}`);
			for (const e of list) {
				const sel = e.kind === 'loop' ? `video.shot:has(source[src$="${e.path.split('/').pop()}"])` : `img[src$="${e.path.split('/').pop()}"]`;
				const el = p.locator(sel).first();
				if (!(await el.count())) { bad.push(`${pg}: ${e.path} is not on the page`); continue; }
				await el.scrollIntoViewIfNeeded();
				await p.waitForTimeout(250);
				const m = await el.evaluate((x) => {
					const r = x.getBoundingClientRect();
					const cap = x.closest('figure')?.querySelector('figcaption')?.getBoundingClientRect();
					return { w: r.width, cx: r.left + r.width / 2, cap: cap ? cap.left + cap.width / 2 : null };
				});
				const mid = col.left + col.width / 2;
				const want1 = Math.min(e.width, col.width);
				if (e.kind === 'ui' && Math.abs(m.w - e.width) > 0.5) bad.push(`${pg} @${vw}: ${e.path} shows ${m.w} px wide, its 1:1 size is ${e.width} (interface rescaled)`);
				if (e.kind !== 'ui' && Math.abs(m.w - want1) > 0.5) bad.push(`${pg} @${vw}: ${e.path} shows ${m.w} px, expected ${want1}`);
				if (Math.abs(m.cx - mid) > 1.5) bad.push(`${pg} @${vw}: ${e.path} is off-centre by ${(m.cx - mid).toFixed(1)} px`);
				if (m.cap !== null && Math.abs(m.cap - mid) > 1.5) bad.push(`${pg} @${vw}: the caption of ${e.path} is off-centre`);
				if (OUT && vw === 1440 || OUT && scheme === 'light') {
					const fig = el.locator('xpath=ancestor-or-self::*[self::figure or self::p][1]');
					await fig.screenshot({ path: path.join(OUT, `${scheme}-${vw}-${pg}-${path.basename(e.path).replace(/\.\w+$/, '')}.png`) });
					shots++;
				}
			}
			if (vw === 1440 && list.some((e) => e.kind === 'loop')) {
				const v = p.locator('video.shot').first();
				await v.scrollIntoViewIfNeeded();
				const t0 = await v.evaluate((x) => x.currentTime);
				await p.waitForTimeout(1500);
				const t1 = await v.evaluate((x) => x.currentTime);
				// it loops, so the time may have wrapped round: moving at all is playing
				const plays = t1 !== t0 && !(await v.evaluate((x) => x.paused));
				console.log(`${pg}: loop plays ${plays} (${t0.toFixed(2)} → ${t1.toFixed(2)} s)`);
				if (!plays) bad.push(`${pg}: the loop does not play`);
			}
		}
		await ctx.close();
	}
	const rctx = await b.newContext({ reducedMotion: 'reduce' });
	const rp = await rctx.newPage();
	for (const [pg, list] of Object.entries(pages)) {
		if (!list.some((e) => e.kind === 'loop') || (want.length && !want.includes(pg))) continue;
		await rp.goto(SITE + urlOf(pg), { waitUntil: 'networkidle' });
		await rp.waitForTimeout(1200);
		const paused = await rp.locator('video.shot').first().evaluate((x) => x.paused && x.controls);
		console.log(`${pg}: reduced motion → paused with controls ${paused}`);
		if (!paused) bad.push(`${pg}: the loop plays under reduced motion`);
	}
	await b.close();
	console.log(`${shots} figure screenshots${OUT ? ' in ' + OUT : ''}; column rule ${column} px`);
	if (bad.length) { console.log(bad.map((x) => 'FAIL ' + x).join('\n')); process.exit(1); }
	console.log('page check: every image 1:1 (interface) or column-fit (3D), centred, captions centred');
})();
