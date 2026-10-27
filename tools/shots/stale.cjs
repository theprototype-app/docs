#!/usr/bin/env node
// Roadmap 83 V7: which docs shots went stale with this release?
//   node stale.cjs <fresh raw dir> [--threshold 0.05]
// The fresh dir comes from `SHOTS_RAW=<dir> node shoot.cjs --raw-only --stills` against the new
// release (tools/shots/reshoot.sh does both). Each fresh raw is compared with the one in git: a size
// change or a mean difference over the threshold flags the shot, and a before/after contact sheet
// of the flagged ones is written next to the fresh dir. Exit 1 when anything is stale.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { contactSheet } = require('./contact.cjs');

const a = process.argv.slice(2);
const ti = a.indexOf('--threshold');
const threshold = ti >= 0 ? +a[ti + 1] : 0.05;
const fresh = a[0];
const gitRaw = path.join(__dirname, 'raw');

async function grey(file) {
	const { data } = await sharp(file).resize(320, 200, { fit: 'fill' }).greyscale().raw().toBuffer({ resolveWithObject: true });
	return data;
}

(async () => {
	if (!fresh || path.resolve(fresh) === path.resolve(gitRaw)) {
		console.error('usage: node stale.cjs <fresh raw dir>  (not tools/shots/raw itself)');
		process.exit(2);
	}
	const flagged = [];
	let n = 0;
	for (const page of fs.readdirSync(gitRaw)) {
		for (const f of fs.readdirSync(path.join(gitRaw, page)).filter((x) => x.endsWith('.webp'))) {
			const old = path.join(gitRaw, page, f), now = path.join(fresh, page, f);
			n++;
			if (!fs.existsSync(now)) { console.log(`MISSING ${page}/${f}: not re-shot (spec removed, or the shot failed)`); flagged.push([old, null, page + '/' + f]); continue; }
			const [mo, mn] = [await sharp(old).metadata(), await sharp(now).metadata()];
			const [go, gn] = [await grey(old), await grey(now)];
			let sum = 0;
			for (let i = 0; i < go.length; i++) sum += Math.abs(go[i] - gn[i]);
			const diff = sum / go.length / 255;
			const sized = mo.width !== mn.width || mo.height !== mn.height;
			const stale = sized || diff > threshold;
			console.log(`${stale ? 'STALE' : 'ok'} ${page}/${f}: diff ${(diff * 100).toFixed(1)} %${sized ? `, size ${mo.width}×${mo.height} → ${mn.width}×${mn.height}` : ''}`);
			if (stale) flagged.push([old, now, page + '/' + f]);
		}
	}
	if (flagged.length) {
		const files = [], labels = [];
		for (const [o, nw, name] of flagged) { files.push(o); labels.push('before · ' + name); if (nw) { files.push(nw); labels.push('after · ' + name); } }
		const sheet = path.join(path.dirname(path.resolve(fresh)), 'stale-contact.webp');
		await contactSheet(sheet, files, { cols: 2, width: 700, labels });
		console.log(`${flagged.length} of ${n} shot(s) stale — before/after: ${sheet}\nRe-shoot them: e2e-slot -- node tools/shots/shoot.cjs <page/id ...>`);
		process.exit(1);
	}
	console.log(`all ${n} shots current`);
})();
