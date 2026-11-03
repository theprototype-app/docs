#!/usr/bin/env node
// Roadmap 83 V12 — re-shoot the docs on a release, automatically (owner 2026-11-02).
//   APP_URL=<the release's preview or production> node release.cjs <version> [page[/id] ...] [--out DIR] [--apply]
//   (in a slot: `E2E_PC= e2e-slot --wait 3600 -- node tools/shots/release.cjs 1.55.0 --apply`; release.sh runs it
//    with the V7/V9/V10 strict build and the V8 Try it check — that is the release-battery entry point)
//
// Every still is captured again against the release (raw only, into <out>/raw; nothing in git is touched yet) and
// compared with its raw in git. Each shot gets one verdict:
//   same      no visible change                                   → left alone
//   drift     small pixel drift, same size, callouts where they were → accepted: regenerated without asking
//   spec      its spec changed since the raw in git (the page changed) → regenerated
//   new       a spec with no raw in git yet                          → regenerated
//   layout    a different size, a callout's target moved, or a big change → regenerated AND flagged
//   callout   a callout no longer fits (its target is gone, or it falls in a faded edge / off the image)
//             → NOT regenerated, flagged (fix the spec)
//   broken    the capture itself failed (a selector or step no longer matches) → flagged
// Re-crops of older captures (`from:` in a spec) have nothing to re-shoot and are only counted.
// Writes <out>/index.html (before / after / difference per image, flagged first), <out>/summary.md (the lines for the
// release STATUS and the docs PR) and <out>/result.json. --apply copies the regenerated raws into tools/shots/raw and
// re-annotates them into docs/img with their figures placed (annotate.cjs --place), ready to commit in the docs PR.
// Exit 0 = nothing flagged, 1 = something flagged (see summary.md), 2 = the run itself failed.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const sharp = require('sharp');
const { loadSpecs, specHash, ROOT } = require('./lib/spec.cjs');
const { APP_URL } = require('./lib/boot.cjs');

const GIT_RAW = path.join(__dirname, 'raw');
// mean grey difference (0-1) of the 320×200 thumbnails: under NOISE = the same picture (two captures of one
// build differ by AA and 3D-view noise only); up to DRIFT = small drift; above = changed
const NOISE = +(process.env.SHOTS_NOISE || 0.004);
const DRIFT = +(process.env.SHOTS_DRIFT || 0.03);
// a callout's target that moved more than this (CSS px) is a changed layout
const MOVED = +(process.env.SHOTS_MOVED || 6);

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
const version = argv[0] && !argv[0].startsWith('--') ? argv[0].replace(/^v/, '') : '';
const OUT = path.resolve(opt('--out') || path.join(process.env.TMPDIR || '/tmp', `docs-release-${version || 'now'}`));
const apply = argv.includes('--apply');
const want = argv.slice(1).filter((a, i, all) => !a.startsWith('--') && all[i - 1] !== '--out');

const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const node = (args, env = {}) => spawnSync(process.execPath, args, { cwd: __dirname, env: { ...process.env, ...env }, encoding: 'utf8', maxBuffer: 64 << 20 });

/** the raw files of one shot (its webp, or its tiles) */
const rawFiles = (dir, id, meta) => (meta?.tiles ? meta.tiles.map((t) => t.file) : [id + '.webp']).map((f) => path.join(dir, f));

async function grey(file) {
	return (await sharp(file).resize(320, 200, { fit: 'fill' }).greyscale().raw().toBuffer());
}

async function meanDiff(a, b) {
	const [ga, gb] = [await grey(a), await grey(b)];
	let sum = 0;
	for (let i = 0; i < ga.length; i++) sum += Math.abs(ga[i] - gb[i]);
	return sum / ga.length / 255;
}

/** a red-on-grey picture of where two raws differ (same size only) */
async function diffImage(a, b, out) {
	const ma = await sharp(a).metadata();
	const [ra, rb] = [await sharp(a).removeAlpha().raw().toBuffer(), await sharp(b).resize(ma.width, ma.height, { fit: 'fill' }).removeAlpha().raw().toBuffer()];
	const px = Buffer.alloc(ra.length);
	for (let i = 0; i < ra.length; i += 3) {
		const d = Math.min(255, (Math.abs(ra[i] - rb[i]) + Math.abs(ra[i + 1] - rb[i + 1]) + Math.abs(ra[i + 2] - rb[i + 2])) * 2);
		const g = (ra[i] * 0.3 + ra[i + 1] * 0.59 + ra[i + 2] * 0.11) * 0.35;
		px[i] = Math.max(g, d); px[i + 1] = g * (1 - d / 255); px[i + 2] = g * (1 - d / 255);
	}
	await sharp(px, { raw: { width: ma.width, height: ma.height, channels: 3 } }).webp({ quality: 70 }).toFile(out);
}

/** how far a callout's target moved between two raws (CSS px), or a reason it cannot be compared */
function anchorMoves(oldM, newM) {
	const moves = {};
	for (const [n, a] of Object.entries(oldM.anchors || {})) {
		const b = newM.anchors?.[n];
		if (!b) { moves[n] = Infinity; continue; }
		const d = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.w - b.w), Math.abs(a.h - b.h)) / (newM.dpr || 2);
		moves[n] = Math.round(d * 10) / 10;
	}
	return moves;
}

async function compare(page, shot, freshDir, gitDir = path.join(GIT_RAW, page)) {
	const id = shot.id;
	const oldM = readJson(path.join(gitDir, id + '.json'));
	const newM = readJson(path.join(freshDir, id + '.json'));
	const r = { page, id, key: `${page}/${id}`, spec: specHash(shot) };
	if (!newM || !rawFiles(freshDir, id, newM).every((f) => fs.existsSync(f))) return { ...r, verdict: 'broken', why: 'the capture failed (see the shoot log in the out dir)' };
	if (!oldM) return { ...r, verdict: 'new', why: 'no raw in git yet' };
	const before = rawFiles(gitDir, id, oldM), after = rawFiles(freshDir, id, newM);
	if (before.length !== after.length) return { ...r, verdict: 'layout', why: `${before.length} tile(s) → ${after.length}` };
	let worst = 0, sized = '';
	for (const [i, b] of before.entries()) {
		const [mb, ma] = [await sharp(b).metadata(), await sharp(after[i]).metadata()];
		if (mb.width !== ma.width || mb.height !== ma.height) sized ||= `size ${mb.width}×${mb.height} → ${ma.width}×${ma.height}`;
		worst = Math.max(worst, await meanDiff(b, after[i]));
	}
	r.diff = Math.round(worst * 1000) / 10;
	const moves = anchorMoves(oldM, newM);
	const moved = Object.entries(moves).filter(([, d]) => d > MOVED);
	const specChanged = oldM.spec && oldM.spec !== r.spec;
	if (sized) return { ...r, verdict: specChanged ? 'spec' : 'layout', why: sized };
	if (moved.length) return { ...r, verdict: specChanged ? 'spec' : 'layout', why: moved.map(([n, d]) => `callout ${n} target ${d === Infinity ? 'gone' : `moved ${d} px`}`).join(', ') };
	if (specChanged) return { ...r, verdict: 'spec', why: 'its spec changed' };
	if (worst <= NOISE) return { ...r, verdict: 'same', why: `diff ${r.diff} %` };
	if (worst <= DRIFT) return { ...r, verdict: 'drift', why: `diff ${r.diff} %` };
	return { ...r, verdict: 'layout', why: `diff ${r.diff} %: more than drift, the interface in it changed` };
}

const FLAG = new Set(['layout', 'callout', 'broken']);
const REGEN = new Set(['drift', 'spec', 'new', 'layout']);

function html(results, appVersion) {
	const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
	const order = ['callout', 'broken', 'layout', 'spec', 'new', 'drift', 'same'];
	const shown = results.filter((r) => r.verdict !== 'same').sort((a, b) => order.indexOf(a.verdict) - order.indexOf(b.verdict));
	const counts = order.map((v) => `${v} ${results.filter((r) => r.verdict === v).length}`).join(' · ');
	const img = (f, alt) => f ? `<a href="${esc(f)}"><img src="${esc(f)}" alt="${esc(alt)}" loading="lazy"></a>` : '<p class="none">—</p>';
	return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Docs shots ${esc(version || appVersion)}</title><style>
:root{color-scheme:light dark;--bg:#fff;--fg:#1d1d22;--mut:#666;--line:#ddd;--flag:#c2410c;--ok:#15803d}
@media (prefers-color-scheme:dark){:root{--bg:#16161a;--fg:#e8e8ec;--mut:#9a9aa5;--line:#33333a;--flag:#fb923c;--ok:#4ade80}}
body{background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,sans-serif;margin:0 auto;max-width:1600px;padding:16px}
h1{font-size:22px;margin:0 0 4px}.mut{color:var(--mut)}section{border-top:1px solid var(--line);padding:14px 0}
h2{font-size:16px;margin:0 0 6px}.v{font:600 12px system-ui;padding:2px 8px;border-radius:99px;border:1px solid currentColor;margin-right:8px}
.flag{color:var(--flag)}.acc{color:var(--ok)}.row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.row figure{margin:0}.row img{max-width:100%;border:1px solid var(--line);border-radius:6px;background:#888}
figcaption{font-size:12px;color:var(--mut)}@media (max-width:700px){.row{grid-template-columns:1fr}}
</style></head><body><h1>Docs shots for ${esc(version || '(no version)')}</h1>
<p class="mut">App ${esc(appVersion)} at ${esc(APP_URL)} · ${esc(new Date().toISOString())} · ${counts}<br>
Flagged (layout, callout, broken) need a look before the docs PR merges; drift is accepted automatically.</p>
${shown.map((r) => `<section id="${esc(r.key)}"><h2><span class="v ${FLAG.has(r.verdict) ? 'flag' : 'acc'}">${r.verdict}</span>${esc(r.key)}</h2>
<p class="mut">${esc(r.why)}${r.annotateError ? ' — annotation: ' + esc(r.annotateError) : ''}</p><div class="row">
<figure>${img(r.before, 'before: ' + r.key)}<figcaption>before (in the docs now)</figcaption></figure>
<figure>${img(r.after, 'after: ' + r.key)}<figcaption>after (this release${r.verdict === 'callout' ? ', raw: the callouts did not fit' : ''})</figcaption></figure>
<figure>${img(r.diffImg, 'difference: ' + r.key)}<figcaption>difference (red = changed pixels)</figcaption></figure></div></section>`).join('\n')}
${shown.length ? '' : '<p>Every shot is current.</p>'}</body></html>\n`;
}

async function main() {
	fs.mkdirSync(OUT, { recursive: true });
	const freshRoot = path.join(OUT, 'raw');
	for (const d of ['raw', 'img', 'diff']) fs.rmSync(path.join(OUT, d), { recursive: true, force: true });
	const log = [];
	let appVersion = '?';
	try { appVersion = (await (await fetch(new URL('version.json', APP_URL))).json()).version; } catch {}
	if (version && appVersion !== version) console.log(`note: ${APP_URL} serves ${appVersion}, not ${version}`);

	// 1. capture every still again, raw only, into <out>/raw (shoot.cjs skips loops and re-crops with these flags)
	const picked = [];
	let recrops = 0, loops = 0;
	for (const { page, spec } of loadSpecs()) for (const shot of spec.shots) {
		if (want.length && !want.includes(page) && !want.includes(`${page}/${shot.id}`)) continue;
		if (shot.from) { recrops++; continue; }
		if (shot.video) { loops++; continue; }
		picked.push({ page, shot });
	}
	console.log(`${picked.length} stills to capture against ${APP_URL} (${appVersion}); ${recrops} re-crops and ${loops} loops not re-shot`);
	const shoot = node(['shoot.cjs', '--raw-only', '--stills', ...picked.map((p) => `${p.page}/${p.shot.id}`)], { SHOTS_RAW: freshRoot });
	fs.writeFileSync(path.join(OUT, 'shoot.log'), (shoot.stdout || '') + (shoot.stderr || ''));
	if (!fs.existsSync(freshRoot)) { console.log('the capture run made nothing — see ' + path.join(OUT, 'shoot.log')); process.exit(2); }

	// 2. compare, then a trial annotation of everything that would be regenerated (into <out>, not docs/img)
	// a capture that failed on a callout's anchor = the callout's target is gone: "callout", not "broken"
	const failed = Object.fromEntries((shoot.stdout || '').split('\n').map((l) => l.match(/^FAIL (\S+): (.*)$/)).filter(Boolean).map((m) => [m[1], m[2]]));
	const results = [];
	for (const { page, shot } of picked) {
		const r = await compare(page, shot, path.join(freshRoot, page));
		const why = failed[r.key];
		if (r.verdict === 'broken' && why) Object.assign(r, /^callout \d+/.test(why) ? { verdict: 'callout', why } : { why });
		results.push(r);
	}
	const trialManifest = path.join(OUT, 'manifest.json');
	fs.copyFileSync(path.join(__dirname, 'manifest.json'), trialManifest);
	const regen = results.filter((r) => REGEN.has(r.verdict));
	if (regen.length) {
		const tr = node(['annotate.cjs', ...regen.map((r) => r.key)], { SHOTS_RAW: freshRoot, SHOTS_IMG: path.join(OUT, 'img'), SHOTS_MANIFEST: trialManifest });
		log.push(tr.stdout);
		for (const line of (tr.stdout || '').split('\n')) {
			const m = line.match(/^FAIL (\S+): (.*)$/);
			const r = m && results.find((x) => x.key === m[1]);
			if (r) Object.assign(r, { verdict: 'callout', annotateError: m[2] });
		}
	}

	// 3. the diff page: before = the image in the docs now, after = the trial image (or the fresh raw), difference = raws
	const assets = path.join(OUT, 'diff');
	for (const r of results.filter((x) => x.verdict !== 'same')) {
		const shot = picked.find((p) => p.page === r.page && p.shot.id === r.id).shot;
		const ext = shot.format || 'webp';
		const dir = path.join(assets, r.page);
		fs.mkdirSync(dir, { recursive: true });
		const cur = path.join(ROOT, 'docs', 'img', r.page, `${r.id}.${ext}`);
		const trial = path.join(OUT, 'img', r.page, `${r.id}.${ext}`);
		const fresh = path.join(freshRoot, r.page, r.id + '.webp');
		const gitRaw = path.join(GIT_RAW, r.page, r.id + '.webp');
		const rel = (f) => path.relative(OUT, f);
		if (fs.existsSync(cur)) { fs.copyFileSync(cur, path.join(dir, `${r.id}.before.${ext}`)); r.before = rel(path.join(dir, `${r.id}.before.${ext}`)); }
		const afterSrc = r.verdict !== 'callout' && fs.existsSync(trial) ? trial : fs.existsSync(fresh) ? fresh : null;
		if (afterSrc) { const f = path.join(dir, `${r.id}.after${path.extname(afterSrc)}`); fs.copyFileSync(afterSrc, f); r.after = rel(f); }
		if (fs.existsSync(gitRaw) && fs.existsSync(fresh)) {
			try { await diffImage(gitRaw, fresh, path.join(dir, `${r.id}.diff.webp`)); r.diffImg = rel(path.join(dir, `${r.id}.diff.webp`)); } catch {}
		}
	}
	fs.writeFileSync(path.join(OUT, 'index.html'), html(results, appVersion));

	// 4. --apply: the regenerated raws into git's raw dir, re-annotated into docs/img, figures placed
	const applied = results.filter((r) => REGEN.has(r.verdict));
	if (apply && applied.length) {
		for (const r of applied) {
			const src = path.join(freshRoot, r.page), dst = path.join(GIT_RAW, r.page);
			fs.mkdirSync(dst, { recursive: true });
			const meta = readJson(path.join(src, r.id + '.json'));
			for (const f of [path.join(src, r.id + '.json'), ...rawFiles(src, r.id, meta)]) fs.copyFileSync(f, path.join(dst, path.basename(f)));
		}
		const an = node(['annotate.cjs', '--place', ...applied.map((r) => r.key)]);
		log.push(an.stdout);
		for (const line of (an.stdout || '').split('\n')) if (/^FAIL|NOT PLACED/.test(line)) console.log('apply: ' + line.trim());
	}
	fs.writeFileSync(path.join(OUT, 'annotate.log'), log.join('\n'));

	// 5. the summary for the release STATUS and the docs PR
	const flagged = results.filter((r) => FLAG.has(r.verdict));
	const n = (v) => results.filter((r) => r.verdict === v).length;
	const md = [`### Docs shots — ${version || appVersion} (V12 re-shoot, app ${appVersion})`, '',
		`${results.length} stills captured: ${n('same')} same, ${n('drift')} drift (accepted), ${n('spec')} spec changed, ${n('new')} new, ` +
		`${n('layout')} changed layout, ${n('callout')} callout no longer fits, ${n('broken')} capture failed; ${recrops} re-crops and ${loops} loops not re-shot.`,
		apply ? `Applied: ${applied.length} image(s) regenerated into docs/img (commit them in the docs PR).` : 'Not applied (dry run): pass --apply to regenerate.',
		`Diff page: ${path.join(OUT, 'index.html')}`, '',
		...(flagged.length ? ['**Flagged — look before the docs PR merges:**', ...flagged.map((r) => `- \`${r.key}\` **${r.verdict}**: ${r.why}${r.annotateError ? ` — ${r.annotateError}` : ''}`)] : ['Nothing flagged.'])];
	fs.writeFileSync(path.join(OUT, 'summary.md'), md.join('\n') + '\n');
	fs.writeFileSync(path.join(OUT, 'result.json'), JSON.stringify({ version, app: appVersion, url: APP_URL, applied: apply, results }, null, 1) + '\n');
	for (const r of results) console.log(`${r.verdict.padEnd(7)} ${r.key}: ${r.why}${r.annotateError ? ' — ' + r.annotateError : ''}`);
	console.log('\n' + md.join('\n'));
	process.exit(flagged.length ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(2); });
module.exports = { compare, anchorMoves, NOISE, DRIFT, MOVED };
