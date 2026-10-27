#!/usr/bin/env node
// Roadmap 83 V1: shoot the docs screenshots and loops from specs/<page>.yml against the DEPLOYED app.
//   APP_URL=https://theprototype.pages.dev/ node shoot.cjs [page[/id] ...] [--raw-only]
// Each still writes raw/<page>/<id>.webp (the un-annotated shot, kept in git) + raw/<page>/<id>.json
// (size, dpr, the measured anchors, the cut sides) and then the annotated docs/img/<page>/<id>.<fmt>
// (annotate.cjs does that part, and re-does it alone without a browser). A loop writes
// docs/img/<page>/<id>.webm + .mp4. Run it in an e2e slot: `e2e-slot -- node shoot.cjs …`.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { launch, openApp } = require('./lib/boot.cjs');
const { runSteps, resolveRect, measureAnchor, waitFrames } = require('./lib/steps.cjs');
const { loadSpecs, RAW } = require('./lib/spec.cjs');
const { annotateShot } = require('./annotate.cjs');
const { recordLoop } = require('./lib/loop.cjs');
const { cutSides, resolveFade } = require('./lib/fade.cjs');

const args = process.argv.slice(2);
const rawOnly = args.includes('--raw-only');
const stillsOnly = args.includes('--stills');
const want = args.filter((a) => !a.startsWith('--'));
const picked = (page, id) => !want.length || want.includes(page) || want.includes(page + '/' + id);

async function still(page, pageName, shot, dpr) {
	// one tile = one capture; variants make several tiles that annotate.cjs composes
	const tiles = shot.variants && shot.compose ? shot.variants : [null];
	const dir = path.join(RAW, pageName);
	fs.mkdirSync(dir, { recursive: true });
	const meta = { id: shot.id, dpr, shotAt: new Date().toISOString(), app: await page.evaluate(() => fetch('/version.json').then((r) => r.json()).catch(() => ({}))) };
	const tileMeta = [];
	for (const [i, v] of tiles.entries()) {
		if (v) await runSteps(page, v.steps || [v]);
		await waitFrames(page, shot.settle ?? 1200);
		const { crop, bounds, is3d } = await resolveRect(page, shot.crop);
		const cut = cutSides(crop, bounds);
		const fade = resolveFade(shot.fade, cut, is3d);
		const anchors = {};
		if (!v) {
			for (const a of shot.annotate || []) {
				const r = await measureAnchor(page, a.at);
				if (!r) throw new Error(`callout ${a.n}: its anchor was not found (${JSON.stringify(a.at)})`);
				anchors[a.n] = { x: (r.x - crop.x) * dpr, y: (r.y - crop.y) * dpr, w: r.w * dpr, h: r.h * dpr };
			}
		}
		const png = await page.screenshot({ clip: { x: crop.x, y: crop.y, width: crop.w, height: crop.h }, animations: 'disabled' });
		const file = v ? `${shot.id}--${v.suffix || i}.webp` : `${shot.id}.webp`;
		await sharp(png).webp({ quality: 90, effort: 6 }).toFile(path.join(dir, file));
		if (v) tileMeta.push({ file, caption: v.caption || '' });
		else Object.assign(meta, { width: crop.w * dpr, height: crop.h * dpr, crop, cut, fade, anchors });
	}
	if (tileMeta.length) Object.assign(meta, { tiles: tileMeta, compose: shot.compose, fade: [] });
	fs.writeFileSync(path.join(dir, shot.id + '.json'), JSON.stringify(meta, null, 1) + '\n');
}

(async () => {
	const browser = await launch();
	let bad = 0;
	for (const { page: pageName, spec } of loadSpecs()) {
		for (const shot of spec.shots) {
			if (!picked(pageName, shot.id)) continue;
			const dpr = shot.dpr ?? 2;
			const t0 = Date.now();
			let ctx;
			try {
				if (shot.video && stillsOnly) continue;
				if (shot.video) {
					const out = await recordLoop(browser, pageName, shot);
					console.log(`ok ${pageName}/${shot.id}: loop ${out.map((o) => `${path.basename(o.file)} ${Math.round(o.bytes / 1024)} KB`).join(', ')}`);
					continue;
				}
				const opened = await openApp(browser, { device: shot.device, dpr, theme: shot.theme, storage: shot.storage });
				ctx = opened.ctx;
				await runSteps(opened.page, [...(shot.scene || []), ...(shot.setup || [])]);
				await still(opened.page, pageName, shot, dpr);
				if (opened.errors.length) console.log(`   page errors: ${opened.errors.slice(0, 3).join(' | ')}`);
				if (!rawOnly) {
					const r = await annotateShot(pageName, shot);
					console.log(`ok ${pageName}/${shot.id}: ${r.W}×${r.H}, ${Math.round(r.bytes / 1024)} KB (${Math.round((Date.now() - t0) / 1000)} s)\n   ${r.snippet}`);
				} else console.log(`ok ${pageName}/${shot.id}: raw only`);
			} catch (e) {
				bad++;
				console.log(`FAIL ${pageName}/${shot.id}: ${e.message.split('\n')[0]}`);
			} finally {
				await ctx?.close().catch(() => {});
			}
		}
	}
	await browser.close();
	console.log(bad ? `${bad} shot(s) failed` : 'all shots taken');
	process.exit(bad ? 1 : 0);
})();
