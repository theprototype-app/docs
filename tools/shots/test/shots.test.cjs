// node --test tools/shots/test — the guards the owner asked for, offline (no browser).
const test = require('node:test');
const assert = require('node:assert');
const { clearOfFade, cutSides, resolveFade, fadeClasses } = require('../lib/fade.cjs');
const { callout, seedOf } = require('../lib/draw.cjs');

test('a callout inside a faded side is refused, the same callout clear of it passes', () => {
	const W = 1000, H = 600;
	assert.match(clearOfFade({ x: 20, y: 200, w: 40, h: 40 }, W, H, ['l']), /faded left/);
	assert.equal(clearOfFade({ x: 120, y: 200, w: 40, h: 40 }, W, H, ['l']), '');
	assert.match(clearOfFade({ x: 500, y: 570, w: 40, h: 20 }, W, H, ['b']), /faded bottom/);
	assert.equal(clearOfFade({ x: 500, y: 570, w: 40, h: 20 }, W, H, ['l', 'r']), '');
});

test('the vignette eats corners, not the middle of a side', () => {
	const W = 1440, H = 900;
	assert.match(clearOfFade({ x: 1340, y: 30, w: 60, h: 60 }, W, H, 'vignette'), /vignette/);
	assert.equal(clearOfFade({ x: 680, y: 40, w: 80, h: 40 }, W, H, 'vignette'), '');
	assert.equal(clearOfFade({ x: 600, y: 350, w: 200, h: 200 }, W, H, 'vignette'), '');
});

test('anything outside the image is refused', () => {
	assert.match(clearOfFade({ x: -4, y: 10, w: 20, h: 20 }, 100, 100, []), /leaves the image/);
});

test('cut sides: only where the crop edge falls inside the thing it crops', () => {
	const panel = { x: 0, y: 0, w: 300, h: 1200 };
	assert.deepEqual(cutSides({ x: 0, y: 100, w: 300, h: 400 }, panel), ['t', 'b']);
	assert.deepEqual(cutSides({ x: -8, y: -8, w: 316, h: 1216 }, panel), []);
	const canvas = { x: 0, y: 0, w: 1440, h: 900 };
	assert.deepEqual(cutSides({ x: 400, y: 200, w: 520, h: 400 }, canvas), ['l', 'r', 't', 'b']);
});

test('auto fade: a 3D crop cut on all four sides gets the vignette, a panel only its cut sides', () => {
	assert.equal(resolveFade(undefined, ['l', 'r', 't', 'b'], true), 'vignette');
	assert.deepEqual(resolveFade(undefined, ['b'], false), ['b']);
	assert.deepEqual(resolveFade('none', ['b'], false), []);
	assert.deepEqual(fadeClasses(['l', 'b']), ['fade-l', 'fade-b']);
	assert.deepEqual(fadeClasses('vignette'), ['vignette']);
});

test('a label of more than three words is refused', () => {
	const t = { x: 300, y: 200, w: 60, h: 40 };
	assert.throws(() => callout({ n: 1, label: 'this is too many words' }, t, 1000, 600, 2, 1), /more than three words/);
	assert.doesNotThrow(() => callout({ n: 1, label: 'view cube' }, t, 1000, 600, 2, 1));
});

test('strokes are seeded: the same callout draws the same SVG every time', () => {
	const t = { x: 300, y: 200, w: 60, h: 40 };
	const a = callout({ n: 2, shape: 'circle' }, t, 1000, 600, 2, seedOf('controls/x#2')).svg;
	const b = callout({ n: 2, shape: 'circle' }, t, 1000, 600, 2, seedOf('controls/x#2')).svg;
	assert.equal(a, b);
	assert.ok(!a.includes('NaN'));
});

// owner rules, 2026-10-29 (lib/rules.cjs, annotate.cjs; the docs build re-checks them in tools/hooks/shots.py)
const { COLUMN, widthProblem, kindOf, labelText } = require('../lib/rules.cjs');
const { figureMarkdown } = require('../annotate.cjs');

test('interface wider than the column is refused (crop it); a 3D crop may be wider and scale', () => {
	assert.match(widthProblem('ui', COLUMN + 1), /crop it/);
	assert.equal(widthProblem('ui', COLUMN), '');
	assert.equal(widthProblem('view', 1440), '');
});

test('a crop with interface in it is ui unless the spec says otherwise', () => {
	assert.equal(kindOf({}, ['p.toolbar']), 'ui');
	assert.equal(kindOf({}, []), 'view');
	assert.equal(kindOf({ kind: 'view' }, ['div.label']), 'view');
});

test('the figure carries its 1:1 size, a caption and one key line per badge', () => {
	const md = figureMarkdown({ alt: 'Configure Scene View with two numbered callouts', caption: 'The View section.', annotate: [{ n: 1, key: 'One.' }, { n: 2, key: 'Two.' }] },
		'img/camera/view-section.webp', '.shot', 311, 402);
	assert.match(md, /\{ \.shot width="311" height="402" loading=lazy \}/);
	assert.match(md, /\/\/\/ caption\nThe View section\.\n\/\/\//);
	assert.match(md, /<div class="shot-key" markdown>\n1\. One\.\n2\. Two\.\n<\/div>/);
	assert.equal(labelText('2 · Rotate'), 'Rotate');
});

test('placing a figure swaps the old image, its caption and its key, and nothing else', () => {
	const fs = require('fs'), path = require('path');
	const { placeFigure } = require('../lib/place.cjs');
	const file = path.join(__dirname, '..', '..', '..', 'docs', '_place_test.md');
	fs.writeFileSync(file, ['# T', '', '![old](img/x/old.png)', '/// caption', 'Old.', '///', '', '<div class="shot-key" markdown>', '1. a', '</div>', '', 'After.'].join('\n'));
	try {
		assert.equal(placeFigure(file, ['img/x/new.webp', 'img/x/old.png'], '![new](img/x/new.webp)\n/// caption\nNew.\n///'), true);
		assert.equal(fs.readFileSync(file, 'utf8'), ['# T', '', '![new](img/x/new.webp)', '/// caption', 'New.', '///', '', 'After.'].join('\n'));
		assert.equal(placeFigure(file, ['img/x/none.webp'], 'x'), false);
	} finally {
		fs.rmSync(file);
	}
});
