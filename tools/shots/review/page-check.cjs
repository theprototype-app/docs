// Review aid: open the BUILT docs pages, screenshot every figure as a reader sees it (frame, fade,
// vignette) in dark and light, and check the loop plays — and stays paused under reduced motion.
//   SITE=http://localhost:5850/ OUT=<dir> node tools/shots/review/page-check.cjs
const path = require('path');
const { chromium } = require('playwright');
const SITE = process.env.SITE, OUT = process.env.OUT;
(async () => {
	const b = await chromium.launch();
	const files = [];
	for (const scheme of ['dark', 'light']) {
		const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
		const p = await ctx.newPage();
		for (const pg of ['controls', 'camera']) {
			await p.goto(SITE + pg + '/', { waitUntil: 'networkidle' });
			// Material follows the system scheme by default (palette "media" toggle)
			const shots = p.locator('.md-typeset img.shot, .md-typeset video.shot');
			const n = await shots.count();
			for (let i = 0; i < n; i++) {
				const el = shots.nth(i);
				await el.scrollIntoViewIfNeeded();
				await p.waitForTimeout(400);
				const fig = el.locator('xpath=ancestor-or-self::*[self::figure or self::p][1]');
				const f = path.join(OUT, `${scheme}-${pg}-${i + 1}.png`);
				await fig.screenshot({ path: f });
				files.push(f);
			}
			if (pg === 'controls' && scheme === 'dark') {
				const v = p.locator('video.shot');
				const t0 = await v.evaluate((x) => x.currentTime);
				await p.waitForTimeout(1500);
				const t1 = await v.evaluate((x) => x.currentTime);
				console.log(`loop plays: ${t1 > t0} (${t0.toFixed(2)} → ${t1.toFixed(2)} s), src ${await v.evaluate((x) => x.currentSrc.split('/').pop())}`);
				await p.locator('img.shot').first().click();
				await p.waitForTimeout(800);
				console.log('lightbox opens:', await p.locator('.glightbox-container, .gslide').first().isVisible().catch(() => false));
				await p.keyboard.press('Escape');
			}
		}
		await ctx.close();
	}
	const rctx = await b.newContext({ reducedMotion: 'reduce' });
	const rp = await rctx.newPage();
	await rp.goto(SITE + 'controls/', { waitUntil: 'networkidle' });
	await rp.waitForTimeout(1500);
	console.log('reduced motion: paused', await rp.locator('video.shot').evaluate((x) => x.paused && x.controls));
	await b.close();
	console.log(files.length + ' figure shots');
})();
