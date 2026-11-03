// node --test tools/shots/test/*.test.cjs — the V11 rig (lib/rig.cjs) without a browser: what a guest page is told
// before it boots, the headset script, and that a step aimed at a peer reaches that peer's page only
const test = require('node:test');
const assert = require('node:assert');
const vm = require('node:vm');
const { guestStorage, xrInit } = require('../lib/rig.cjs');
const { runSteps } = require('../lib/steps.cjs');
const { specHash } = require('../lib/spec.cjs');

test('a guest boots with its name, its look and (for an agent) the agent switch', () => {
	const g = guestStorage({ name: 'Mia', look: { character: 'knight' } });
	assert.equal(g.username, 'Mia');
	assert.equal(g.usernameCustom, '1');
	assert.equal(JSON.parse(g.avatarConfig).character, 'knight');
	assert.equal(g.agentApi, undefined);
	const a = guestStorage({ name: 'Claude', agent: true, storage: { 'avatars:knockedAfter': '10' } });
	assert.equal(a.agentApi, '1');
	assert.equal(a['avatars:knockedAfter'], '10');
	assert.equal(a.avatarConfig, undefined);
});

test('the headset script installs IWER over navigator.xr, with the head where the spec says', () => {
	const src = xrInit({ head: [1, 1.7, 2] });
	assert.match(src, /installRuntime\(\{ forceInstall: true \}\)/);
	assert.match(src, /position\.set\(1, 1\.7, 2\)/);
	assert.match(src, /metaQuest3/);
	// it parses as one script (the deployed CSP gets it as {content}, never through an eval)
	assert.doesNotThrow(() => new vm.Script(src));
});

test('a step aimed at a peer runs in that peer page, and an unknown peer is an error', async () => {
	const calls = [];
	const page = (name) => ({ name, evaluate: async (fn) => { calls.push([name, String(fn).includes('window.__docs = window.__docs') ? 'helpers' : fn]); }, waitForTimeout: async () => {} });
	const host = page('host'), mia = page('Mia');
	await runSteps(host, [{ on: 'Mia', steps: [{ eval: 'x' }] }], { peers: [{ name: 'Mia', page: mia }] });
	assert.deepEqual(calls.filter(([, a]) => a !== 'helpers'), [['Mia', 'x']]);
	await assert.rejects(runSteps(host, [{ on: 'Bo', steps: [] }], { peers: [{ name: 'Mia', page: mia }] }), /no peer Bo/);
});

test('who joins is part of what a capture depends on (a new guest re-shoots it)', () => {
	const a = { id: 'x', peers: [{ name: 'Mia' }] };
	assert.notEqual(specHash(a), specHash({ ...a, peers: [{ name: 'Mia' }, { name: 'Bo', role: 'view' }] }));
	assert.equal(specHash(a), specHash({ ...a, alt: 'words only' }));
});

test('on a remote slot theprototype.app is not tunnelled back here (the deployed app calls the real one)', () => {
	const { loopbackOnlyEnv } = require('../lib/remote.cjs');
	assert.equal(loopbackOnlyEnv({}), null);
	assert.equal(loopbackOnlyEnv({ PW_REMOTE_WS: 'ws://pc:39001/' }).PW_REMOTE_EXPOSE, '<loopback>');
	assert.equal(loopbackOnlyEnv({ PW_REMOTE_WS: 'ws://pc:39001/', PW_REMOTE_EXPOSE: '' }), null);
});

test('a clipped callout marks only the part of its element inside the image', () => {
	const { callout } = require('../lib/draw.cjs');
	const tall = { x: 16, y: 563, w: 418, h: 540 };
	const c = callout({ n: 1, shape: 'box', pad: 3, badge: 'r', clip: true }, tall, 1376, 1040, 2, 7);
	for (const b of c.boxes) assert.ok(b.y + b.h <= 1040 && b.y >= 0, JSON.stringify(b));
	const raw = callout({ n: 1, shape: 'box', pad: 3, badge: 'r' }, tall, 1376, 1040, 2, 7);
	assert.ok(raw.boxes.some((b) => b.y + b.h > 1040));
});
