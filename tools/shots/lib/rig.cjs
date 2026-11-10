// Roadmap 83 V11: the multi-peer / XR / popup rig — the states one headless page cannot make by itself, so they stop
// being re-crops of older captures and re-shoot on every release like any other still (V12).
//
//   peers:   [{name, role: edit|view, agent: true, device, storage, look: {character, hat, body}, setup: [steps]}]
//            each one is a real guest page in the same browser that dials the shot's page (the host) and is
//            approved there with the role's own button — the cloud build's "Editor access" / "View only" card.
//            `agent: true` opens it as an AI agent's page (the `agentApi` switch BrowserEngine sets), so it shows
//            with the robot and its edits (`tpAgent.exec`) land in Agent activity on every peer.
//   xr:      {device: metaQuest3, head: [x, y, z]} — IWER (Meta's Immersive Web Emulation Runtime) owns
//            navigator.xr before the app boots, so Enter VR runs the app's own WebXR path headless.
//   steps:   {on: <peer name>, steps: [...]} runs steps in that guest's page;
//            {canvas: "<expr returning a canvas>"} shows a copy of an in-world canvas (a VR panel's texture) 1:1
//            in the page as #docs-canvas, so a crop can take it;
//            {popup: <steps that open a window>} waits for the window the steps open; the shot is then taken
//            from that window (`capture: popup`).
const fs = require('fs');

/** the cloud build's approval card: one button per role (a plain build says Approve) */
const ROLE_BUTTON = { edit: /^(Editor access|Approve)$/, view: /^(View only|Approve)$/ };

/** the page's open signaling id (a taken id is re-rolled, so read it once the link is open) */
function peerIdOf(page) {
	return page.waitForFunction(() => {
		let p;
		window.__stores.peers.subscribe((v) => (p = v))();
		return p?.peer?.open && p.peer.id;
	}, null, { timeout: 60000 }).then((h) => h.jsonValue());
}

const openTo = (page, id) => page.evaluate((id) => {
	let p;
	window.__stores.peers.subscribe((v) => (p = v))();
	return !!p?.connections?.[id]?.open;
}, id).catch(() => false);

/** what a guest's localStorage needs before it boots: its name, its look, the agent switch */
function guestStorage(g) {
	const s = { username: g.name, usernameCustom: '1', ...(g.storage || {}) };
	if (g.look) s.avatarConfig = JSON.stringify({ body: '#4f83cc', hat: 'none', face: 'label', ...g.look });
	if (g.agent) s.agentApi = '1';
	return s;
}

/**
 * Open every guest and join it to the host. The host's toasts are hidden for the shot (boot.cjs), so the
 * approval card's button is pressed in the DOM rather than by a pointer.
 * @returns {Promise<{name: string, page: any, ctx: any, id: string, errors: string[]}[]>}
 */
async function joinPeers(browser, host, peers, openApp, dpr) {
	const hostId = await peerIdOf(host);
	const out = [];
	for (const g of peers) {
		const opened = await openApp(browser, { device: g.device || 'desktop', dpr: g.dpr ?? 1, theme: g.theme, storage: guestStorage(g) });
		const page = opened.page;
		const id = await peerIdOf(page);
		const squeezed = page.locator('#connect-squeeze-dot');
		if (await squeezed.isVisible().catch(() => false)) await squeezed.click();
		// 1.65: the idle Connect bar shows Invite and Join…; the dial field opens with Join…
		const join = page.locator('#connect-join');
		if (await join.isVisible().catch(() => false)) await join.click();
		await page.locator('input[placeholder="Enter peer ID to connect"]').fill(hostId);
		await page.getByRole('button', { name: 'Connect', exact: true }).click();
		const label = ROLE_BUTTON[g.role || 'edit'];
		const deadline = Date.now() + 60000;
		let pressed = false;
		while (!pressed && Date.now() < deadline) {
			pressed = await host.evaluate(({ src, flags }) => {
				const re = new RegExp(src, flags);
				const b = [...document.querySelectorAll('.tp-toast--req button, [role="dialog"] button')].find((x) => re.test(x.textContent.trim()));
				if (b) b.click();
				return !!b;
			}, { src: label.source, flags: label.flags });
			if (!pressed) await host.waitForTimeout(300);
		}
		if (!pressed) throw new Error(`peer ${g.name}: no approval card on the host`);
		const until = Date.now() + 60000;
		while (Date.now() < until && !((await openTo(host, id)) && (await openTo(page, hostId)))) await host.waitForTimeout(300);
		if (!(await openTo(host, id))) throw new Error(`peer ${g.name}: the connection never opened`);
		out.push({ name: g.name, page, ctx: opened.ctx, id, errors: opened.errors, spec: g });
	}
	// the roster (names, looks, kinds) lands a beat after the conns open
	await host.waitForTimeout(3000);
	return out;
}

/** IWER as an init script (the core e2e helper's recipe, tests/e2e/iwer.cjs): a Quest 3 standing at 1.6 m */
function xrInit(xr = {}) {
	const device = xr.device || 'metaQuest3';
	const head = xr.head || [0, 1.6, 0];
	const build = fs.readFileSync(require.resolve('iwer/build/iwer.min.js'), 'utf8');
	return `${build}
;(() => {
	if (window.__iwer || !window.IWER) return;
	const I = window.IWER;
	const xrDevice = new I.XRDevice(I[${JSON.stringify(device)}]);
	xrDevice.installRuntime({ forceInstall: true });
	xrDevice.position.set(${head.map(Number).join(', ')});
	window.__iwer = { device: xrDevice };
})();`;
}

/** show a copy of a canvas (an in-world panel's texture) at its own pixels ÷ dpr, top-left, over everything */
async function showCanvas(page, expr) {
	// evaluated by Playwright (CDP), not by an eval in the page: the deployed CSP has no 'unsafe-eval'
	const src = await page.evaluateHandle(expr);
	await page.evaluate((src) => {
		if (!src || !src.width) throw new Error('canvas step: the expression gave no canvas');
		const dpr = window.devicePixelRatio || 1;
		let c = document.getElementById('docs-canvas');
		if (!c) {
			c = document.createElement('canvas');
			c.id = 'docs-canvas';
			document.body.appendChild(c);
		}
		c.width = src.width;
		c.height = src.height;
		Object.assign(c.style, { position: 'fixed', left: '0', top: '0', width: src.width / dpr + 'px', height: src.height / dpr + 'px', zIndex: 2147483647, pointerEvents: 'none' });
		c.getContext('2d').drawImage(src, 0, 0);
	}, src);
	await src.dispose();
}

async function closePeers(guests) {
	for (const g of guests || []) await g.ctx.close().catch(() => {});
}

module.exports = { joinPeers, xrInit, showCanvas, closePeers, guestStorage, peerIdOf };
