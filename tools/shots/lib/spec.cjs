// specs/<page>.yml → shots. One file per docs page; `defaults` merge into every shot.
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

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

module.exports = { SHOTS, ROOT, SPECS, RAW, IMG, loadSpecs };
