#!/usr/bin/env node
// Writing a spec: what is on screen after some steps? Boots the deployed app like shoot.cjs, runs each named
// stage's steps (the spec step language) and writes, per stage, a full screenshot and every visible control
// (tag, id, title / aria-label, text, rect in CSS px) — enough to pick selectors and crops without guessing.
//   APP_URL=… e2e-slot -- node probe.cjs <probe.yml> <out dir>
// probe.yml: {device?, theme?, storage?, scene?: [steps], stages: [{name, steps: [...]}, …]}  (stages run in order)
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const { launch, openApp } = require('./lib/boot.cjs');
const { runSteps, waitFrames } = require('./lib/steps.cjs');

const [specFile, out] = process.argv.slice(2);
const spec = YAML.parse(fs.readFileSync(specFile, 'utf8'));
fs.mkdirSync(out, { recursive: true });

(async () => {
	const browser = await launch();
	const { ctx, page, errors } = await openApp(browser, { device: spec.device, dpr: 1, theme: spec.theme, storage: spec.storage });
	try {
		await runSteps(page, spec.scene || []);
		for (const st of spec.stages || [{ name: 'boot', steps: [] }]) {
			try {
				await runSteps(page, st.steps || []);
			} catch (e) {
				console.log(`${st.name}: step failed: ${e.message.split('\n')[0]}`);
			}
			await waitFrames(page, st.settle ?? 800);
			await page.screenshot({ path: path.join(out, `${st.name}.png`) });
			const els = await page.evaluate(() => {
				const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05 ? r : null; };
				return [...document.querySelectorAll('button,[role=button],[role=tab],[role=menuitem],[role=switch],[role=dialog],input,select,a,[title],[aria-label],h1,h2,h3,summary,.sec-panel,[data-sidebar-tab],[data-window]')]
					.map((e) => ({ e, r: vis(e) })).filter((x) => x.r).map(({ e, r }) => {
						const id = e.id ? '#' + e.id : '';
						const t = e.getAttribute('title') || '';
						const a = e.getAttribute('aria-label') || '';
						const txt = (e.innerText || e.value || '').trim().replace(/\s+/g, ' ').slice(0, 50);
						return `${e.tagName.toLowerCase()}${id}${e.classList[0] ? '.' + e.classList[0] : ''} [${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}×${Math.round(r.height)}]` +
							(a ? ` aria="${a.slice(0, 60)}"` : '') + (t && t !== a ? ` title="${t.slice(0, 60)}"` : '') + (txt ? ` "${txt}"` : '');
					});
			});
			fs.writeFileSync(path.join(out, `${st.name}.txt`), [await page.title(), ...els].join('\n') + '\n');
			console.log(`${st.name}: ${els.length} controls → ${path.join(out, st.name)}.{png,txt}`);
		}
		if (errors.length) console.log('page errors: ' + errors.slice(0, 3).join(' | '));
	} finally {
		await ctx.close();
		await browser.close();
	}
})();
