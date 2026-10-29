// Roadmap 83 V4: short muted loops instead of GIFs. Frames come from the CDP screencast (real
// timestamps, so the loop plays at the speed it happened), ffmpeg crops them to the shot and encodes
// WebM (VP9) + MP4 (H.264, faststart) under the loop budget. A fake cursor and a click ripple are
// drawn into the page, because a headless browser has no visible pointer.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { openApp } = require('./boot.cjs');
const { runSteps, resolveRect, waitFrames, measureAnchor } = require('./steps.cjs');
const { IMG, ROOT } = require('./spec.cjs');
const { record } = require('./rules.cjs');

const LOOP_BUDGET = 600 * 1024;

const CURSOR = () => {
	const dot = document.createElement('div');
	dot.id = 'docs-cursor';
	dot.style.cssText = 'position:fixed;left:-50px;top:-50px;width:22px;height:22px;margin:-3px 0 0 -3px;z-index:2147483647;pointer-events:none;' +
		"background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Cpath d='M3 2 L3 17 L7 13 L10 20 L13 19 L10 12 L16 12 Z' fill='white' stroke='black' stroke-width='1.4' stroke-linejoin='round'/%3E%3C/svg%3E\") no-repeat";
	const style = document.createElement('style');
	style.textContent = '@keyframes docs-ripple{from{transform:translate(-50%,-50%) scale(.3);opacity:.9}to{transform:translate(-50%,-50%) scale(1.6);opacity:0}}' +
		'.docs-ripple{position:fixed;width:44px;height:44px;border-radius:50%;border:3px solid #ff7a45;z-index:2147483646;pointer-events:none;animation:docs-ripple .5s ease-out forwards}';
	const add = () => { document.body.append(dot); document.head.append(style); };
	if (document.body) add(); else addEventListener('DOMContentLoaded', add);
	addEventListener('pointermove', (e) => { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }, true);
	addEventListener('pointerdown', (e) => {
		const r = document.createElement('div');
		r.className = 'docs-ripple';
		r.style.left = e.clientX + 'px';
		r.style.top = e.clientY + 'px';
		document.body.append(r);
		setTimeout(() => r.remove(), 600);
	}, true);
	addEventListener('wheel', (e) => { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }, true);
};

/** play the loop's actions: drag, wheel, key, move, wait (CSS px, viewport coordinates) */
async function act(page, actions) {
	const m = page.mouse;
	for (const a of actions) {
		if (a.move) await m.move(a.move[0], a.move[1], { steps: a.steps ?? 20 });
		else if (a.drag) {
			const [x0, y0, x1, y1] = a.drag;
			await m.move(x0, y0, { steps: 12 });
			await page.waitForTimeout(150);
			await m.down({ button: a.button || 'left' });
			await m.move(x1, y1, { steps: a.steps ?? 60 });
			await m.up({ button: a.button || 'left' });
		} else if (a.wheel) {
			const n = a.ticks ?? 8;
			for (let i = 0; i < n; i++) { await m.wheel(0, a.wheel / n); await page.waitForTimeout(45); }
		} else if (a.key) await page.keyboard.press(a.key);
		else if (a.click || a.clickObject) {
			// a click on a spot, or on the middle of a named object as it is on screen now
			let [x, y] = a.click || [];
			if (a.clickObject) {
				const r = await measureAnchor(page, { object: a.clickObject, point: 'center' });
				if (!r) throw new Error('no object ' + a.clickObject);
				[x, y] = [r.x + r.w / 2, r.y + r.h / 2];
			}
			await m.move(x, y, { steps: 18 });
			await m.down();
			await page.waitForTimeout(60);
			await m.up();
		} else if (a.step) await runSteps(page, [a.step]);
		if (a.wait ?? 400) await page.waitForTimeout(a.wait ?? 400);
	}
}

/** the loop's figure (raw HTML; pages are folders, so ../img/): the caption is the text of what happens */
function loopFigure(shot, base, [w, h], secs) {
	const dir = `../img/${shot.page || ''}`;
	return [
		'<figure class="shot-figure">',
		`<video class="shot${shot.fade === 'vignette' ? ' vignette' : ''}" autoplay loop muted playsinline preload="metadata" width="${w}" height="${h}" poster="${dir}/${base}.poster.webp" aria-label="${shot.alt.trim().replace(/"/g, '&quot;')}">`,
		`<source src="${dir}/${base}.webm" type="video/webm">`,
		`<source src="${dir}/${base}.mp4" type="video/mp4">`,
		'</video>',
		`<figcaption>Loop, ${Math.round(secs)} s: ${(shot.caption || 'WHAT HAPPENS').trim()}</figcaption>`,
		'</figure>'
	].join('\n');
}

async function recordLoop(browser, pageName, shot) {
	const v = shot.video;
	// a loop shows motion, so it is shot WITHOUT reduced motion (stills keep it); the docs page
	// pauses it for a reader who prefers reduced motion (docs/javascripts/loops.js)
	const { ctx, page } = await openApp(browser, { device: shot.device, dpr: 1, theme: shot.theme, storage: shot.storage, motion: true });
	try {
		await page.evaluate(`(${CURSOR})()`);
		await runSteps(page, [...(shot.scene || []), ...(shot.setup || [])]);
		await waitFrames(page, 1500);
		const { crop } = await resolveRect(page, shot.crop);
		if (v.start) await page.mouse.move(v.start[0], v.start[1]);
		const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'loop-'));
		const cdp = await ctx.newCDPSession(page);
		const frames = [];
		cdp.on('Page.screencastFrame', async (f) => {
			frames.push({ t: f.metadata.timestamp, data: f.data });
			await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
		});
		await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, everyNthFrame: 1 });
		await page.waitForTimeout(v.lead ?? 500);
		await act(page, v.actions || []);
		await page.waitForTimeout(v.tail ?? 600);
		await cdp.send('Page.stopScreencast');
		if (frames.length < 10) throw new Error(`only ${frames.length} frames captured`);
		// a concat list with each frame's real duration
		const list = [];
		frames.forEach((f, i) => {
			const file = path.join(tmp, `f${String(i).padStart(5, '0')}.jpg`);
			fs.writeFileSync(file, Buffer.from(f.data, 'base64'));
			const dur = i + 1 < frames.length ? frames[i + 1].t - f.t : 1 / 30;
			list.push(`file '${file}'`, `duration ${Math.max(dur, 0.001).toFixed(4)}`);
		});
		list.push(`file '${path.join(tmp, `f${String(frames.length - 1).padStart(5, '0')}.jpg`)}'`);
		fs.writeFileSync(path.join(tmp, 'list.txt'), list.join('\n'));
		const width = Math.min(v.width ?? 960, crop.w) & ~1;
		const vf = `crop=${crop.w & ~1}:${crop.h & ~1}:${crop.x}:${crop.y},scale=${width}:-2:flags=lanczos,fps=${v.fps ?? 30}`;
		const outDir = path.join(IMG, pageName);
		fs.mkdirSync(outDir, { recursive: true });
		const enc = (ext, codec, q) => {
			const out = path.join(outDir, `${shot.id}.${ext}`);
			const common = ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'), '-vf', vf, '-an'];
			const extra = codec === 'vp9'
				? ['-c:v', 'libvpx-vp9', '-crf', String(q), '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p']
				: ['-c:v', 'libx264', '-crf', String(q), '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-profile:v', 'high'];
			execFileSync('ffmpeg', [...common, ...extra, out]);
			return { file: out, bytes: fs.statSync(out).size };
		};
		const outs = [];
		for (const [ext, codec, qs] of [['webm', 'vp9', [36, 40, 44, 48]], ['mp4', 'h264', [28, 31, 34, 37]]]) {
			let r;
			for (const q of qs) { r = enc(ext, codec, q); if (r.bytes <= (v.budgetKB ?? 600) * 1024) break; }
			if (r.bytes > (v.budgetKB ?? 600) * 1024) throw new Error(`${path.basename(r.file)} is ${Math.round(r.bytes / 1024)} KB, over the loop budget`);
			outs.push(r);
		}
		// a poster frame for the reduced-motion reader and the RSS/print view
		const poster = path.join(outDir, `${shot.id}.poster.webp`);
		execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', outs[1].file, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '80', poster]);
		outs.push({ file: poster, bytes: fs.statSync(poster).size });
		fs.rmSync(tmp, { recursive: true, force: true });
		const secs = frames[frames.length - 1].t - frames[0].t;
		if (secs < 3 || secs > 8.5) console.log(`   note: the loop is ${secs.toFixed(1)} s (aim for 3-8 s)`);
		const dims = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', outs[0].file]).toString().trim().split(',').map(Number);
		const app = await page.evaluate(() => fetch('/version.json').then((r) => r.json()).catch(() => ({})));
		const rel = path.relative(path.join(ROOT, 'docs'), outs[0].file);
		record(rel, { page: pageName, kind: 'loop', dpr: 1, width: dims[0], height: dims[1], seconds: +secs.toFixed(1), badges: 0, labels: [], app: app.version || '', shotAt: new Date().toISOString() });
		outs.snippet = loopFigure(shot, path.basename(rel, '.webm'), dims, secs);
		return outs;
	} finally {
		await ctx.close().catch(() => {});
	}
}

module.exports = { recordLoop, loopFigure, LOOP_BUDGET };
