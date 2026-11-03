// node --test tools/shots/test/*.test.cjs — V12's verdicts on synthetic raws (no browser)
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');
const { compare } = require('../release.cjs');
const { specHash } = require('../lib/spec.cjs');

const shot = { id: 'x', setup: [{ select: 'Crate' }], crop: { rect: [0, 0, 200, 100] }, annotate: [{ n: 1, at: { selector: '#a' }, label: 'here' }] };

/** a raw: grey, with a white block at bx (so a moved block = a changed picture) */
async function raw(dir, { w = 400, h = 200, bx = 40, anchors = { 1: { x: 80, y: 40, w: 40, h: 40 } }, spec = specHash(shot) } = {}) {
	fs.mkdirSync(dir, { recursive: true });
	const block = await sharp({ create: { width: 60, height: 60, channels: 3, background: '#fff' } }).png().toBuffer();
	await sharp({ create: { width: w, height: h, channels: 3, background: '#555' } }).composite([{ input: block, left: bx, top: 40 }]).webp({ lossless: true }).toFile(path.join(dir, 'x.webp'));
	fs.writeFileSync(path.join(dir, 'x.json'), JSON.stringify({ id: 'x', spec, dpr: 2, anchors }));
}

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'v12-'));

test('the same picture is "same", a slightly moved block is "drift"', async () => {
	const t = tmp();
	await raw(path.join(t, 'git'));
	await raw(path.join(t, 'a'));
	assert.equal((await compare('p', shot, path.join(t, 'a'), path.join(t, 'git'))).verdict, 'same');
	await raw(path.join(t, 'b'), { bx: 44 });
	assert.equal((await compare('p', shot, path.join(t, 'b'), path.join(t, 'git'))).verdict, 'drift');
});

test('a new size, a moved or vanished callout target, or a big change is "layout"', async () => {
	const t = tmp();
	await raw(path.join(t, 'git'));
	await raw(path.join(t, 'a'), { w: 420 });
	assert.equal((await compare('p', shot, path.join(t, 'a'), path.join(t, 'git'))).verdict, 'layout');
	await raw(path.join(t, 'b'), { anchors: { 1: { x: 120, y: 40, w: 40, h: 40 } } });
	const moved = await compare('p', shot, path.join(t, 'b'), path.join(t, 'git'));
	assert.equal(moved.verdict, 'layout');
	assert.match(moved.why, /callout 1 target moved 20 px/);
	await raw(path.join(t, 'c'), { anchors: {} });
	assert.match((await compare('p', shot, path.join(t, 'c'), path.join(t, 'git'))).why, /callout 1 target gone/);
	await raw(path.join(t, 'd'), { bx: 300 });
	assert.equal((await compare('p', shot, path.join(t, 'd'), path.join(t, 'git'))).verdict, 'layout');
});

test('a spec changed since the raw in git is "spec"; no raw in git is "new"; no capture is "broken"', async () => {
	const t = tmp();
	await raw(path.join(t, 'git'), { spec: 'older000000' });
	await raw(path.join(t, 'a'));
	assert.equal((await compare('p', shot, path.join(t, 'a'), path.join(t, 'git'))).verdict, 'spec');
	assert.equal((await compare('p', shot, path.join(t, 'a'), path.join(t, 'none'))).verdict, 'new');
	assert.equal((await compare('p', shot, path.join(t, 'none'), path.join(t, 'git'))).verdict, 'broken');
});

test('words do not change the spec hash; a crop does', () => {
	assert.equal(specHash(shot), specHash({ ...shot, alt: 'other words', caption: 'x', annotate: [{ ...shot.annotate[0], label: 'there', key: 'k' }] }));
	assert.notEqual(specHash(shot), specHash({ ...shot, crop: { rect: [0, 0, 210, 100] } }));
});
