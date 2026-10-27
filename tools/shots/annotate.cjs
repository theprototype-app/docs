#!/usr/bin/env node
// Re-annotate from the raw shots in git — no browser, no app, no slot:
//   node annotate.cjs [page[/id] ...]        (default: every shot of every spec)
// Reads specs/<page>.yml and raw/<page>/<id>.{webp,json}; writes docs/img/<page>/<id>.<format> and
// prints the Markdown snippet (classes for the fade, loading=lazy). Refuses a callout inside a faded
// edge and an image over its byte budget.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { loadSpecs, ROOT, RAW, IMG } = require('./lib/spec.cjs');
const { callout, pill, seedOf } = require('./lib/draw.cjs');
const { fadeClasses, clearOfFade } = require('./lib/fade.cjs');

const STILL_BUDGET = 250 * 1024;
// the docs content column is about this wide (CSS px) on a desktop: a wider shot is shown smaller,
// so its callouts and captions are drawn larger to read the same on the page
const DISPLAY = 760;
const pageScale = (cssWidth) => Math.max(1, cssWidth / DISPLAY);

async function composeTiles(meta, dir) {
	// tiles side by side (row) or 2 × 2 (grid2x2), a transparent gap between, rounded tile corners,
	// a caption pill in each tile's lower-left corner
	const s = meta.dpr;
	const gap = 12 * s, radius = 10 * s;
	const first = await sharp(path.join(dir, meta.tiles[0].file)).metadata();
	const cols0 = meta.compose === 'grid2x2' ? 2 : meta.tiles.length;
	const k = s * pageScale((cols0 * first.width) / s);
	const tiles = await Promise.all(meta.tiles.map(async (t) => {
		const img = sharp(path.join(dir, t.file));
		const m = await img.metadata();
		const mask = Buffer.from(`<svg width="${m.width}" height="${m.height}"><rect width="${m.width}" height="${m.height}" rx="${radius}" fill="#fff"/></svg>`);
		const cap = t.caption ? Buffer.from(`<svg width="${m.width}" height="${m.height}">${pill(t.caption, 10 * k, m.height - 10 * k, k)}</svg>`) : null;
		const buf = await img.composite([{ input: mask, blend: 'dest-in' }, ...(cap ? [{ input: cap }] : [])]).png().toBuffer();
		return { buf, w: m.width, h: m.height };
	}));
	const cols = meta.compose === 'grid2x2' ? 2 : tiles.length;
	const rows = Math.ceil(tiles.length / cols);
	const tw = Math.max(...tiles.map((t) => t.w)), th = Math.max(...tiles.map((t) => t.h));
	const W = cols * tw + (cols - 1) * gap, H = rows * th + (rows - 1) * gap;
	const buf = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
		.composite(tiles.map((t, i) => ({ input: t.buf, left: (i % cols) * (tw + gap), top: Math.floor(i / cols) * (th + gap) })))
		.png().toBuffer();
	return { buf, W, H };
}

async function encode(img, format, budget) {
	if (format === 'png') {
		for (const colors of [256, 128, 64]) {
			const out = await img.clone().png({ palette: true, quality: 90, colors, effort: 10, compressionLevel: 9 }).toBuffer();
			if (out.length <= budget) return out;
		}
	} else {
		for (const quality of [82, 76, 70, 64, 58]) {
			const out = await img.clone().webp({ quality, alphaQuality: 90, effort: 6, smartSubsample: true }).toBuffer();
			if (out.length <= budget) return out;
		}
	}
	throw new Error(`over the ${Math.round(budget / 1024)} KB budget at every quality`);
}

/** annotate one shot; returns {file, bytes, snippet} or throws */
async function annotateShot(page, shot) {
	const dir = path.join(RAW, page);
	const meta = JSON.parse(fs.readFileSync(path.join(dir, shot.id + '.json'), 'utf8'));
	let base, W, H;
	if (meta.tiles) ({ buf: base, W, H } = await composeTiles(meta, dir));
	else {
		base = fs.readFileSync(path.join(dir, shot.id + '.webp'));
		({ width: W, height: H } = await sharp(base).metadata());
	}
	const s = meta.dpr * pageScale(W / meta.dpr);
	const fade = meta.fade;
	const layers = [];
	const problems = [];
	for (const a of shot.annotate || []) {
		const t = meta.anchors?.[a.n];
		if (!t) { problems.push(`callout ${a.n}: no anchor measured (re-shoot)`); continue; }
		const c = callout(a, t, W, H, s, seedOf(page + '/' + shot.id + '#' + a.n));
		for (const b of c.boxes) {
			const why = clearOfFade(b, W, H, fade);
			if (why) problems.push(`callout ${a.n} (${b.what}) ${why}`);
		}
		layers.push(c.svg);
	}
	if (problems.length) throw new Error(problems.join('; '));
	let img = sharp(base);
	if (layers.length) img = img.composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${layers.join('')}</svg>`) }]);
	img = sharp(await img.png().toBuffer());
	const format = shot.format || 'webp';
	const out = await encode(img, format, (shot.budgetKB ?? 250) * 1024 || STILL_BUDGET);
	const file = path.join(IMG, page, shot.id + '.' + format);
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, out);
	const cls = ['shot', ...(meta.tiles ? [] : fadeClasses(fade))].map((c) => '.' + c).join(' ');
	const rel = path.relative(path.join(ROOT, 'docs'), file);
	const snippet = `![${shot.alt}](${rel}){ ${cls} loading=lazy width="${Math.round(W / s)}" }`;
	return { file, bytes: out.length, W, H, snippet };
}

async function main() {
	const want = process.argv.slice(2);
	let bad = 0;
	for (const { page, spec } of loadSpecs()) {
		for (const shot of spec.shots) {
			if (shot.video) continue;
			if (want.length && !want.includes(page) && !want.includes(page + '/' + shot.id)) continue;
			try {
				const r = await annotateShot(page, shot);
				console.log(`ok ${page}/${shot.id}: ${r.W}×${r.H}, ${Math.round(r.bytes / 1024)} KB → ${path.relative(ROOT, r.file)}\n   ${r.snippet}`);
			} catch (e) {
				bad++;
				console.log(`FAIL ${page}/${shot.id}: ${e.message}`);
			}
		}
	}
	process.exit(bad ? 1 : 0);
}

if (require.main === module) main();
module.exports = { annotateShot, encode };
