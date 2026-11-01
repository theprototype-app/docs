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
const { kindOf } = require('./lib/rules.cjs');
const { mdFile, placeFigure } = require('./lib/place.cjs');
const { ROOT } = require('./lib/spec.cjs');

// --place: swap each finished figure into its docs page (lib/place.cjs)
function place(pageName, spec, shot, file, snippet) {
	if (!args.includes('--place')) return;
	const rel = path.relative(path.join(ROOT, 'docs'), file);
	const ok = placeFigure(mdFile(pageName, spec), [rel, ...[].concat(shot.replaces || [])], snippet);
	console.log(ok ? '   placed' : `   NOT PLACED: no block shows ${rel} — paste it`);
}

/** interface inside the crop: sample a grid of points, keep what is on top that is not the 3D view */
async function uiInside(page, crop) {
	return page.evaluate((c) => {
		const canvas = window.__docs.get(window.__stores.globalRenderer).domElement;
		const hits = new Set();
		for (let i = 0; i <= 24; i++) for (let j = 0; j <= 16; j++) {
			const el = document.elementFromPoint(c.x + 1 + (c.w - 2) * i / 24, c.y + 1 + (c.h - 2) * j / 16);
			if (!el || el === canvas || el.contains(canvas)) continue;
			// an empty layer over the canvas is not interface; a control, an icon or text is
			const ctl = el.closest('button,input,select,textarea,label,a,[role],[title],svg,img');
			const ui = (ctl && !ctl.contains(canvas)) || (el.innerText || '').trim();
			if (ui) hits.add(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList[0] ? '.' + el.classList[0] : ''));
		}
		return [...hits].slice(0, 12);
	}, crop);
}

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
		// a tile may have its own crop (two parts of one screen, side by side)
		const { crop, bounds, is3d } = await resolveRect(page, v?.crop || shot.crop);
		const cut = cutSides(crop, bounds);
		const fade = resolveFade(shot.fade, cut, is3d);
		const uiHits = await uiInside(page, crop);
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
		meta.uiHits = [...new Set([...(meta.uiHits || []), ...uiHits])];
		if (v) tileMeta.push({ file, caption: v.caption || '' });
		else Object.assign(meta, { width: crop.w * dpr, height: crop.h * dpr, crop, cut, fade, anchors });
	}
	meta.kind = kindOf(shot, meta.uiHits);
	if (tileMeta.length) Object.assign(meta, { tiles: tileMeta, compose: shot.compose, fade: [] });
	fs.writeFileSync(path.join(dir, shot.id + '.json'), JSON.stringify(meta, null, 1) + '\n');
}

/**
 * A shot that cannot be re-made headlessly (two peers, a headset, a game mid-round) is re-cropped from the
 * capture already in the docs: `from: img/<page>/<file>.png`, `crop: {rect: [x, y, w, h]}` in that file's
 * pixels, `dpr:` the file's own (1 for an old desktop capture). It then follows every rule like a fresh shot.
 */
async function recrop(pageName, shot) {
	const dir = path.join(RAW, pageName);
	fs.mkdirSync(dir, { recursive: true });
	const src = path.join(ROOT, 'docs', shot.from);
	const [x, y, w, h] = shot.crop.rect;
	const dpr = shot.dpr ?? 1;
	await sharp(src).extract({ left: x, top: y, width: w, height: h }).webp({ quality: 95, effort: 6 }).toFile(path.join(dir, shot.id + '.webp'));
	const anchors = {};
	for (const a of shot.annotate || []) {
		if (!a.at.rect) throw new Error(`callout ${a.n}: a re-cropped shot needs rect anchors (in the source file's pixels)`);
		anchors[a.n] = { x: a.at.rect[0] - x, y: a.at.rect[1] - y, w: a.at.rect[2], h: a.at.rect[3] };
	}
	const meta = { id: shot.id, dpr, shotAt: fs.statSync(src).mtime.toISOString(), app: { version: shot.app || 'earlier' }, from: shot.from,
		width: w, height: h, crop: { x, y, w, h }, cut: shot.cut || [], fade: resolveFade(shot.fade, shot.cut || [], false), anchors, kind: shot.kind || 'ui' };
	fs.writeFileSync(path.join(dir, shot.id + '.json'), JSON.stringify(meta, null, 1) + '\n');
}

(async () => {
	let browser = null;
	let bad = 0;
	for (const { page: pageName, spec } of loadSpecs()) {
		for (const shot of spec.shots) {
			if (!picked(pageName, shot.id)) continue;
			const dpr = shot.dpr ?? 2;
			const t0 = Date.now();
			let ctx;
			try {
				if (shot.video && stillsOnly) continue;
				if (shot.from) {
					if (stillsOnly && rawOnly) continue; // a re-shoot against a release has nothing to compare
					await recrop(pageName, shot);
					const r = await annotateShot(pageName, shot);
					console.log(`ok ${pageName}/${shot.id}: re-cropped from ${shot.from}, ${r.W}×${r.H}, ${Math.round(r.bytes / 1024)} KB\n   ${r.snippet}`);
					place(pageName, spec, shot, r.file, r.snippet);
					continue;
				}
				browser ||= await launch();
				if (shot.video) {
					const out = await recordLoop(browser, pageName, { ...shot, page: pageName });
					console.log(`ok ${pageName}/${shot.id}: loop ${out.map((o) => `${path.basename(o.file)} ${Math.round(o.bytes / 1024)} KB`).join(', ')}\n${out.snippet}`);
					place(pageName, spec, shot, out[0].file, out.snippet);
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
					place(pageName, spec, shot, r.file, r.snippet);
				} else console.log(`ok ${pageName}/${shot.id}: raw only`);
			} catch (e) {
				bad++;
				console.log(`FAIL ${pageName}/${shot.id}: ${e.message.split('\n')[0]}`);
			} finally {
				await ctx?.close().catch(() => {});
			}
		}
	}
	await browser?.close();
	console.log(bad ? `${bad} shot(s) failed` : 'all shots taken');
	process.exit(bad ? 1 : 0);
})();
