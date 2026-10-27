#!/usr/bin/env node
// Roadmap 83 V8: open every "Try it" check of tryit.yml and assert the controls it names exist.
//   node tools/shots/tryit-check.cjs [check-id ...]
// TRYIT_ORIGIN replaces the links' origin (on the Deck theprototype.app is 127.0.0.1 in /etc/hosts:
// TRYIT_ORIGIN=https://theprototype.pages.dev). Exit 1 on any broken link or missing control.
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const { launch, openApp } = require('./lib/boot.cjs');
const { runSteps, measureAnchor } = require('./lib/steps.cjs');

const { checks } = YAML.parse(fs.readFileSync(path.join(__dirname, 'tryit.yml'), 'utf8'));
const want = process.argv.slice(2);
const swap = (u) => (process.env.TRYIT_ORIGIN ? process.env.TRYIT_ORIGIN.replace(/\/$/, '') + new URL(u).pathname + new URL(u).search : u);

(async () => {
	const browser = await launch();
	let bad = 0;
	for (const [id, c] of Object.entries(checks)) {
		if (want.length && !want.includes(id)) continue;
		const url = swap(c.url);
		const problems = [];
		let ctx;
		try {
			const res = await fetch(url, { redirect: 'follow' });
			if (!res.ok) throw new Error(`the link answers HTTP ${res.status}`);
			// dpr 1: a check needs the DOM, not crisp pixels
			const opened = await openApp(browser, { dpr: 1, url });
			ctx = opened.ctx;
			await runSteps(opened.page, c.steps || []);
			for (const e of c.expect || []) {
				const r = await measureAnchor(opened.page, e);
				if (!r || r.w < 1 || r.h < 1) problems.push(`no "${e.name}" (${e.selector || 'text ' + JSON.stringify(e.text)})`);
			}
		} catch (e) {
			problems.push(e.message.split('\n')[0]);
		} finally {
			await ctx?.close().catch(() => {});
		}
		if (problems.length) bad++;
		console.log(`${problems.length ? 'FAIL' : 'ok'} ${id} (${url}, ${(c.expect || []).length} controls)${problems.length ? ': ' + problems.join('; ') : ''}`);
	}
	await browser.close();
	console.log(bad ? `${bad} Try it check(s) failed` : 'every Try it link works');
	process.exit(bad ? 1 : 0);
})();
