#!/usr/bin/env node
// A contact sheet: every image given, scaled to one width, in a grid with its name under it.
//   node contact.cjs <out.webp|png> <image...> [--cols 2] [--width 900]
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { pill } = require('./lib/draw.cjs');

async function contactSheet(out, files, { cols = 2, width = 900, labels } = {}) {
	const gap = 24, lab = 40;
	const tiles = await Promise.all(files.map(async (f, i) => {
		const buf = await sharp(f).resize({ width, withoutEnlargement: false }).png().toBuffer();
		const m = await sharp(buf).metadata();
		return { buf, h: m.height, label: labels?.[i] ?? path.relative(process.cwd(), f) };
	}));
	const rows = Math.ceil(tiles.length / cols);
	const rowH = [...Array(rows)].map((_, r) => Math.max(...tiles.slice(r * cols, r * cols + cols).map((t) => t.h)) + lab);
	const W = cols * width + (cols + 1) * gap, H = rowH.reduce((a, b) => a + b + gap, gap);
	const comps = [];
	let y = gap;
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const t = tiles[r * cols + c];
			if (!t) continue;
			const x = gap + c * (width + gap);
			comps.push({ input: t.buf, left: x, top: y });
			comps.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${lab}">${pill(t.label, 0, lab - 6, 1.3)}</svg>`), left: x, top: y + t.h });
		}
		y += rowH[r] + gap;
	}
	const img = sharp({ create: { width: W, height: H, channels: 3, background: '#1e2029' } }).composite(comps);
	await (out.endsWith('.png') ? img.png() : img.webp({ quality: 80 })).toFile(out);
	return out;
}

if (require.main === module) {
	const a = process.argv.slice(2);
	const opt = (k, d) => { const i = a.indexOf(k); if (i < 0) return d; const v = a[i + 1]; a.splice(i, 2); return +v; };
	const cols = opt('--cols', 2), width = opt('--width', 900);
	const [out, ...files] = a;
	contactSheet(out, files, { cols, width }).then((o) => console.log('wrote ' + o));
}
module.exports = { contactSheet };
