// The owner's rules for every docs image (review of batch 1, 2026-10-29), in one place:
//   1. 1:1 — a capture that shows interface is displayed at exactly its CSS size (natural / dpr) and never
//      scaled by the page: it must fit the content column, so a crop too wide is cropped, never shrunk.
//      A crop of the 3D view alone may scale.
//   2. centred — docs/stylesheets/shots.css.
//   3. AI-readable — alt text in words, a figure with a figcaption, a numbered list that matches the badges,
//      every handwritten label also in the text, a one-line description of every loop.
// The manifest (tools/shots/manifest.json) records what each finished image is, so the docs build
// (tools/hooks/shots.py) can check the page against it.
const fs = require('fs');
const path = require('path');

// The narrowest content column a desktop reader gets with both sidebars open (Material 9.5: a 61rem grid
// at 20 px minus two 12.1rem sidebars and the 1.2rem gutters), in CSS px. Measured by review/page-check.cjs.
const COLUMN = 688;
const MANIFEST = path.join(__dirname, '..', 'manifest.json');

/** 'ui' when interface shows inside the crop, else 'view' (the 3D view alone); a spec's `kind` wins */
function kindOf(shot, uiHits) {
	if (shot.kind) return shot.kind;
	return uiHits && uiHits.length ? 'ui' : 'view';
}

/** '' when an image of this kind and CSS width may go in the docs, else why not */
function widthProblem(kind, cssWidth) {
	if (kind === 'ui' && cssWidth > COLUMN)
		return `shows interface and is ${cssWidth} CSS px wide, wider than the ${COLUMN} px column: crop it (UI is never shrunk)`;
	return '';
}

/** the words a handwritten label adds ("1 · Move" → "Move") — they must appear in the page text too */
const labelText = (l) => String(l).replace(/^\s*\d+\s*[·.:-]\s*/, '').trim();

function readManifest() {
	try {
		return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
	} catch {
		return { column: COLUMN, images: {} };
	}
}

/** record one finished image (key = its path under docs/, e.g. img/controls/gizmo-modes.webp) */
function record(key, entry) {
	const m = readManifest();
	m.column = COLUMN;
	m.images[key] = entry;
	m.images = Object.fromEntries(Object.entries(m.images).sort(([a], [b]) => a.localeCompare(b)));
	fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 1) + '\n');
}

module.exports = { COLUMN, MANIFEST, kindOf, widthProblem, labelText, readManifest, record };
