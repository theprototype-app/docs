// The step language of specs/*.yml, the crop rectangle and the anchors — all measured LIVE in the
// app, so a moved panel moves its callout. Store names are the core debug hooks (1.45.1):
// `window.__stores` = sceneStore/appStore/flowStore exports + named rows of src/lib/debugHooks.js.

const get = (st) => { let v; st.subscribe((x) => (v = x))(); return v; };

/** in the page: find objects by name under objectsGroup */
const IN_PAGE = `
window.__docs = window.__docs || {
	get(st) { let v; st.subscribe((x) => (v = x))(); return v; },
	byName(name) {
		const g = this.get(window.__stores.objectsGroup);
		let hit = null;
		g.traverse((o) => { if (!hit && o.name === name) hit = o; });
		return hit;
	},
	// screen rectangle (CSS px, viewport) of an object's world bounding box, or of one point of it
	project(name, point) {
		const S = window.__stores;
		const obj = this.byName(name);
		if (!obj) return null;
		const cam = this.get(S.globalCamera), r = this.get(S.globalRenderer).domElement.getBoundingClientRect();
		obj.updateWorldMatrix(true, true);
		const V = obj.position.constructor;
		const pts = [];
		obj.traverse((o) => {
			const geo = o.geometry;
			if (!geo) return;
			if (!geo.boundingBox) geo.computeBoundingBox();
			const b = geo.boundingBox;
			for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z])
				pts.push(new V(x, y, z).applyMatrix4(o.matrixWorld));
		});
		if (!pts.length) pts.push(new V().setFromMatrixPosition(obj.matrixWorld));
		const toScreen = (p) => { const q = p.clone().project(cam); return [r.left + (q.x + 1) / 2 * r.width, r.top + (1 - q.y) / 2 * r.height]; };
		if (point === 'center' || point === 'top') {
			const c = pts.reduce((a, p) => a.add(p), new V()).multiplyScalar(1 / pts.length);
			if (point === 'top') c.y = Math.max(...pts.map((p) => p.y));
			const [x, y] = toScreen(c);
			return { x: x - 12, y: y - 12, w: 24, h: 24 };
		}
		const s = pts.map(toScreen);
		const x0 = Math.min(...s.map((p) => p[0])), y0 = Math.min(...s.map((p) => p[1]));
		return { x: x0, y: y0, w: Math.max(...s.map((p) => p[0])) - x0, h: Math.max(...s.map((p) => p[1])) - y0 };
	}
};`;

async function ensureHelpers(page) {
	await page.evaluate(IN_PAGE);
}

/** let the scene settle: a pause, then two real frames */
async function waitFrames(page, ms = 600) {
	await page.waitForTimeout(ms);
	await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

async function runSteps(page, steps) {
	await ensureHelpers(page);
	for (const st of steps) {
		if (st.create || st.light) {
			// /create <Kind> [args] or /light <kind>; the new object is selected — name and place it
			const cmd = st.create ? `/create ${st.create}` : `/light ${st.light}`;
			await page.evaluate(async ({ cmd, st }) => {
				const S = window.__stores, D = window.__docs;
				const g = D.get(S.objectsGroup);
				const before = new Set(g.children.map((c) => c.uuid));
				S.commandsHandler.sceneCommand(cmd);
				let made = null;
				for (let i = 0; i < 40 && !made; i++) {
					await new Promise((r) => setTimeout(r, 100));
					made = g.children.find((c) => !before.has(c.uuid));
				}
				if (!made) throw new Error(cmd + ' made nothing');
				if (st.name) made.name = st.name;
				if (st.at) made.position.set(...st.at);
				if (st.rot) made.rotation.set(...st.rot.map((d) => (d * Math.PI) / 180));
				if (st.scale) made.scale.set(...(Array.isArray(st.scale) ? st.scale : [st.scale, st.scale, st.scale]));
				if (st.color && made.material?.color) made.material.color.set(st.color);
				made.updateMatrixWorld(true);
				// replicate the edit the way a gizmo drag would, when the hook is there
				S.objectActions?.commitTransform?.(made);
				if (!st.keepSelected) S.objectActions.applySelectionSet([], false);
			}, { cmd, st });
			await page.waitForTimeout(300);
		} else if (st.select) {
			const names = Array.isArray(st.select) ? st.select : [st.select];
			await page.evaluate((names) => {
				const S = window.__stores, D = window.__docs;
				const uuids = names.map((n) => { const o = D.byName(n); if (!o) throw new Error('no object ' + n); return o.uuid; });
				S.objectActions.applySelectionSet(uuids, false);
			}, names);
			await page.waitForTimeout(400);
		} else if (st.deselect) {
			await page.evaluate(() => window.__stores.objectActions.applySelectionSet([], false));
		} else if (st.mode) {
			await page.evaluate((m) => window.__stores.transformMode.set(m), st.mode);
		} else if (st.pivot) {
			await page.evaluate((m) => window.__stores.multiTransform.pivotMode.set(m), st.pivot);
		} else if (st.store) {
			await page.evaluate((kv) => { for (const [k, v] of Object.entries(kv)) { if (!window.__stores[k]) throw new Error('no store ' + k); window.__stores[k].set(v); } }, st.store);
		} else if (st.env) {
			await page.evaluate((k) => window.__stores.environment.setEnvironment(k), st.env);
			await page.waitForTimeout(st.envWait ?? 2500);
		} else if (st.camera) {
			await page.evaluate(({ pos, target }) => window.__stores.objectActions.flyTo(pos, target, 0), st.camera);
			await waitFrames(page, 300);
		} else if (st.section) {
			await page.evaluate((s) => window.__stores.openSceneSection(s), st.section);
			await page.waitForTimeout(1200);
		} else if (st.closePanels) {
			await page.evaluate(() => window.__stores.inspectorClose.set(true));
		} else if (st.click) {
			await page.locator(st.click).first().click({ timeout: 8000 });
		} else if (st.clickText) {
			await page.getByText(st.clickText, { exact: true }).first().click({ timeout: 8000 });
		} else if (st.key) {
			// keys reach the 3D view only while it has the keyboard
			if (!st.noFocus) await page.evaluate(() => { const c = document.querySelector('canvas'); c?.setAttribute('tabindex', c.getAttribute('tabindex') ?? '0'); c?.focus(); });
			await page.keyboard.press(st.key);
		} else if (st.wait) {
			await page.waitForTimeout(st.wait);
		} else if (st.css) {
			await page.addStyleTag({ content: st.css });
		} else if (st.eval) {
			await page.evaluate(st.eval);
		} else if (st.hover) {
			await page.locator(st.hover).first().hover();
		} else throw new Error('unknown step ' + JSON.stringify(st));
	}
}

/** the element's rect, or the smallest visible element whose text is exactly `text` */
async function elementRect(page, at) {
	return page.evaluate((at) => {
		const visible = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 ? r : null; };
		let el = null;
		const scope = at.within ? document.querySelector(at.within) : document;
		if (!scope) return null;
		if (at.selector) el = [...scope.querySelectorAll(at.selector)].filter(visible)[at.nth ?? 0];
		else if (at.text) {
			const all = [...scope.querySelectorAll('*')].filter((e) => visible(e) && e.textContent.trim() === at.text);
			el = all.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height)[0];
			if (el && at.up) for (let i = 0; i < at.up && el.parentElement; i++) el = el.parentElement;
		}
		if (!el) return null;
		const r = el.getBoundingClientRect();
		return { x: r.left, y: r.top, w: r.width, h: r.height };
	}, at);
}

async function measureAnchor(page, at) {
	if (at.rect) return { x: at.rect[0], y: at.rect[1], w: at.rect[2], h: at.rect[3] };
	if (at.object) { await ensureHelpers(page); return page.evaluate(({ o, p }) => window.__docs.project(o, p), { o: at.object, p: at.point }); }
	if (at.union) {
		const rs = [];
		for (const a of at.union) { const r = await measureAnchor(page, a); if (!r) return null; rs.push(r); }
		const x = Math.min(...rs.map((r) => r.x)), y = Math.min(...rs.map((r) => r.y));
		return { x, y, w: Math.max(...rs.map((r) => r.x + r.w)) - x, h: Math.max(...rs.map((r) => r.y + r.h)) - y };
	}
	return elementRect(page, at);
}

const clamp = (r, b) => {
	const x = Math.max(r.x, b.x), y = Math.max(r.y, b.y);
	return { x, y, w: Math.min(r.x + r.w, b.x + b.w) - x, h: Math.min(r.y + r.h, b.y + b.h) - y };
};
const round = (r) => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.w), h: Math.round(r.h) });

/** spec `crop` → {crop, bounds, is3d}: the crop in viewport CSS px, and the rect it was cut from */
async function resolveRect(page, c = { canvas: true }) {
	const vp = page.viewportSize();
	const view = { x: 0, y: 0, w: vp.width, h: vp.height };
	const canvas = await page.evaluate(() => {
		const r = window.__docs.get(window.__stores.globalRenderer).domElement.getBoundingClientRect();
		return { x: r.left, y: r.top, w: r.width, h: r.height };
	}).catch(() => view);
	const pad = c.pad ?? 0;
	if (c.canvas) return { crop: round(clamp(canvas, view)), bounds: canvas, is3d: true };
	if (c.rect) return { crop: round({ x: c.rect[0], y: c.rect[1], w: c.rect[2], h: c.rect[3] }), bounds: canvas, is3d: true };
	if (c.around) {
		const t = await measureAnchor(page, c.around);
		if (!t) throw new Error('crop target not found: ' + JSON.stringify(c.around));
		const [w, h] = c.size;
		const [dx, dy] = c.offset || [0, 0];
		const r = { x: t.x + t.w / 2 - w / 2 + dx, y: t.y + t.h / 2 - h / 2 + dy, w, h };
		return { crop: round(clamp(r, canvas)), bounds: canvas, is3d: !c.ui };
	}
	const t = await measureAnchor(page, c);
	if (!t) throw new Error('crop target not found: ' + JSON.stringify(c));
	let r = { x: t.x - pad, y: t.y - pad, w: t.w + 2 * pad, h: t.h + 2 * pad };
	if (c.maxHeight && r.h > c.maxHeight) r.h = c.maxHeight;
	r = clamp(r, view);
	if (c.within) { const w = await elementRect(page, { selector: c.within }); if (w) r = clamp(r, w); }
	return { crop: round(r), bounds: { x: t.x - pad, y: t.y - pad, w: t.w + 2 * pad, h: t.h + 2 * pad }, is3d: false };
}

module.exports = { runSteps, resolveRect, measureAnchor, waitFrames, get };
