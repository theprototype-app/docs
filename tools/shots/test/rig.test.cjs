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
