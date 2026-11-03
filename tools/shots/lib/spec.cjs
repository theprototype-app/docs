// specs/<page>.yml → shots. One file per docs page; `defaults` merge into every shot.
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const crypto = require('crypto');

const SHOTS = path.join(__dirname, '..');
const ROOT = path.join(SHOTS, '..', '..');
const SPECS = path.join(SHOTS, 'specs');
// SHOTS_RAW: shoot the raw files somewhere else (stale.cjs compares a fresh set with the one in git)
const RAW = process.env.SHOTS_RAW || path.join(SHOTS, 'raw');
// SHOTS_IMG: write the finished images elsewhere (a pc e2e slot copies back only env/arg paths)
const IMG = process.env.SHOTS_IMG || path.join(ROOT, 'docs', 'img');

function loadSpecs() {
	return fs.readdirSync(SPECS).filter((f) => f.endsWith('.yml')).sort().map((f) => {
		const spec = YAML.parse(fs.readFileSync(path.join(SPECS, f), 'utf8'));
		const page = spec.page || f.replace(/\.yml$/, '');
		spec.shots = (spec.shots || []).map((s) => ({ ...(spec.defaults || {}), ...s }));
		return { page, spec };
	});
}

/** what a capture depends on, hashed: a raw whose `spec` differs was taken for an older spec (V12: "the page changed").
 *  The words (alt, caption, key, label) are left out — they only need a re-annotation, which costs nothing. */
const WORDS = new Set(['alt', 'caption', 'key', 'label', 'tryit', 'replaces']);
function specHash(shot) {
	const strip = (v) => Array.isArray(v) ? v.map(strip)
		: v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().filter((k) => !WORDS.has(k)).map((k) => [k, strip(v[k])])) : v;
	return crypto.createHash('sha1').update(JSON.stringify(strip(shot))).digest('hex').slice(0, 12);
}

module.exports = { SHOTS, ROOT, SPECS, RAW, IMG, loadSpecs, specHash };
