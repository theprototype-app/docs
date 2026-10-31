// The annotation layer: one SVG the size of the raw image, composited on top by sharp.
// Owner style (roadmap 83, 2026-10-26): hand-drawn strokes (rough.js, seeded so a re-shoot draws the
// same wobble), CLEAN numbered badges keyed to the list under the image, at most three handwritten
// words per callout, one warm accent with a dark halo so it reads on both docs themes.
// Text is turned into paths with opentype.js, so the result does not depend on the fonts installed.
const fs = require('fs');
const path = require('path');
const rough = require('roughjs/bundled/rough.cjs.js');
const opentype = require('opentype.js');

const ACCENT = '#ff7a45';
const HALO = 'rgba(12,12,18,0.72)';
const FONTS = path.join(__dirname, '..', 'fonts');
const font = (f) => {
	const b = fs.readFileSync(path.join(FONTS, f));
	return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const HAND = font('Caveat-Bold.ttf');
const CLEAN = font('AtkinsonHyperlegible-Bold.ttf');

/** opentype path → SVG path data (its own toPathData emits NaN for some runs in 2.0.0) */
function pathData(p) {
	const n = (v) => +v.toFixed(2);
	return p.commands.map((c) =>
		c.type === 'M' || c.type === 'L' ? `${c.type}${n(c.x)} ${n(c.y)}`
			: c.type === 'Q' ? `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`
				: c.type === 'C' ? `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`
					: 'Z').join('');
}

/** stable 31-bit seed from a string, so every re-annotation draws the same strokes */
function seedOf(str) {
	let h = 2166136261;
	for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
	return (h >>> 0) % 2147483647 || 1;
}

const gen = rough.generator();

/** a rough drawable → SVG paths, halo underneath */
function roughSvg(drawable, s) {
	const paths = gen.toPaths(drawable);
	const d = paths.map((p) => p.d).join(' ');
	return `<path d="${d}" fill="none" stroke="${HALO}" stroke-width="${(5.2 * s).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>` +
		`<path d="${d}" fill="none" stroke="${ACCENT}" stroke-width="${(2.4 * s).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function textPath(f, text, x, y, size) {
	return pathData(f.getPath(text, x, y, size));
}

/** width of a text run in px */
const textWidth = (f, text, size) => f.getAdvanceWidth(text, size);

/** the numbered badge: solid accent disc, dark ring, white digit (centred by its real bounds) */
function badge(n, cx, cy, s) {
	const r = 12.5 * s;
	const size = 16 * s;
	const p = CLEAN.getPath(String(n), 0, 0, size);
	const bb = p.getBoundingBox();
	const dx = cx - (bb.x1 + bb.x2) / 2, dy = cy - (bb.y1 + bb.y2) / 2;
	return {
		svg: `<circle cx="${cx}" cy="${cy}" r="${r + 2 * s}" fill="${HALO}"/>` +
			`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${ACCENT}"/>` +
			`<path d="${pathData(CLEAN.getPath(String(n), dx, dy, size))}" fill="#fff"/>`,
		box: { x: cx - r - 2 * s, y: cy - r - 2 * s, w: 2 * r + 4 * s, h: 2 * r + 4 * s }
	};
}

/** handwritten label, left edge at x, vertically centred on cy */
function label(text, x, cy, s, align = 'left') {
	const size = 25 * s;
	const w = textWidth(HAND, text, size);
	const x0 = align === 'left' ? x : x - w;
	const base = cy + size * 0.3;
	const d = textPath(HAND, text, x0, base, size);
	return {
		svg: `<path d="${d}" fill="${HALO}" stroke="${HALO}" stroke-width="${(5 * s).toFixed(1)}" stroke-linejoin="round"/>` +
			`<path d="${d}" fill="${ACCENT}"/>`,
		box: { x: x0 - 3 * s, y: cy - size * 0.55, w: w + 6 * s, h: size * 1.05 }
	};
}

const union = (boxes) => {
	const x = Math.min(...boxes.map((b) => b.x)), y = Math.min(...boxes.map((b) => b.y));
	return { x, y, w: Math.max(...boxes.map((b) => b.x + b.w)) - x, h: Math.max(...boxes.map((b) => b.y + b.h)) - y };
};

/**
 * One callout. `t` = the target box in image px; `a` = the spec entry
 * ({n, shape: circle|box|arrow|bracket|underline|none, label, badge: tl|tr|bl|br|l|r|t|b, from: [dx,dy] css px}).
 * Returns {svg, boxes: [{what, x,y,w,h}]} — every box is checked against the fade by the caller.
 */
function callout(a, t, W, H, s, seed) {
	const opts = { seed, roughness: 0.9, bowing: 1, strokeWidth: 1, preserveVertices: false };
	const pad = (a.pad ?? 7) * s;
	const parts = [];
	const boxes = [];
	const shape = a.shape || 'circle';
	let ring = { x: t.x - pad, y: t.y - pad, w: t.w + 2 * pad, h: t.h + 2 * pad };
	let anchor; // where the badge hangs
	if (shape === 'circle') {
		// an ellipse that clears the box corners: radii × √2 of the padded box, capped so it hugs flat strips
		const rx = Math.max(ring.w / 2 * 1.2, 16 * s), ry = Math.max(ring.h / 2 * 1.25, 14 * s);
		const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
		parts.push(roughSvg(gen.ellipse(cx, cy, rx * 2, ry * 2, opts), s));
		ring = { x: cx - rx, y: cy - ry, w: rx * 2, h: ry * 2 };
		boxes.push({ what: 'circle', ...ring });
	} else if (shape === 'box') {
		parts.push(roughSvg(gen.rectangle(ring.x, ring.y, ring.w, ring.h, opts), s));
		boxes.push({ what: 'box', ...ring });
	} else if (shape === 'bracket') {
		// a square bracket down the left side (or the right with side: r)
		const k = 9 * s;
		const x = a.side === 'r' ? ring.x + ring.w : ring.x;
		const dir = a.side === 'r' ? -1 : 1;
		const d = `M ${x + dir * k} ${ring.y} L ${x} ${ring.y} L ${x} ${ring.y + ring.h} L ${x + dir * k} ${ring.y + ring.h}`;
		parts.push(roughSvg(gen.path(d, opts), s));
		ring = { x: x - (dir > 0 ? 0 : k), y: ring.y, w: k, h: ring.h };
		boxes.push({ what: 'bracket', ...ring });
	} else if (shape === 'underline') {
		parts.push(roughSvg(gen.line(ring.x, t.y + t.h + 4 * s, ring.x + ring.w, t.y + t.h + 4 * s, opts), s));
		ring = { x: ring.x, y: t.y + t.h, w: ring.w, h: 8 * s };
		boxes.push({ what: 'underline', ...ring });
	} else if (shape === 'arrow') {
		// the arrow starts at the badge, placed `from` away from the target's centre (default: towards
		// the image centre), and ends just short of the target's edge
		const cx = t.x + t.w / 2, cy = t.y + t.h / 2;
		let [fx, fy] = a.from ? a.from.map((v) => v * s) : [W / 2 - cx, H / 2 - cy];
		const len = Math.hypot(fx, fy) || 1;
		if (!a.from) { fx = (fx / len) * (Math.max(t.w, t.h) / 2 + 80 * s); fy = (fy / len) * (Math.max(t.w, t.h) / 2 + 80 * s); }
		const bx = cx + fx, by = cy + fy;
		// end point: where the line to the centre crosses the padded box
		const ux = cx - bx, uy = cy - by, ul = Math.hypot(ux, uy);
		const tx = Math.abs(ux) > 1e-6 ? (ring.w / 2) / Math.abs(ux) : Infinity;
		const ty = Math.abs(uy) > 1e-6 ? (ring.h / 2) / Math.abs(uy) : Infinity;
		const k = 1 - Math.min(tx, ty, 1);
		const ex = bx + ux * k, ey = by + uy * k;
		const sx = bx + (ux / ul) * 18 * s, sy = by + (uy / ul) * 18 * s;
		// a gentle bend: the mid point pushed sideways by 12 % of the length
		const mx = (sx + ex) / 2 - (uy / ul) * 0.12 * Math.hypot(ex - sx, ey - sy);
		const my = (sy + ey) / 2 + (ux / ul) * 0.12 * Math.hypot(ex - sx, ey - sy);
		parts.push(roughSvg(gen.curve([[sx, sy], [mx, my], [ex, ey]], opts), s));
		const ang = Math.atan2(ey - my, ex - mx), hl = 13 * s;
		const head = `M ${ex - hl * Math.cos(ang - 0.45)} ${ey - hl * Math.sin(ang - 0.45)} L ${ex} ${ey} L ${ex - hl * Math.cos(ang + 0.45)} ${ey - hl * Math.sin(ang + 0.45)}`;
		parts.push(roughSvg(gen.path(head, { ...opts, roughness: 0.5 }), s));
		boxes.push({ what: 'arrow', ...union([{ x: Math.min(sx, ex, mx), y: Math.min(sy, ey, my), w: Math.abs(ex - sx) + 1, h: Math.abs(ey - sy) + 1 }]) });
		anchor = [bx, by];
	}
	// the badge: on the shape's outline at the chosen corner, or at the arrow's tail
	if (!anchor) {
		const pos = a.badge || 'tl';
		const r = 12.5 * s;
		const ox = { l: ring.x - r - 3 * s, r: ring.x + ring.w + r + 3 * s, c: ring.x + ring.w / 2 };
		const oy = { t: ring.y - r * 0.2, b: ring.y + ring.h + r * 0.2, c: ring.y + ring.h / 2 };
		const map = { tl: [ox.l + r * 0.9, oy.t], tr: [ox.r - r * 0.9, oy.t], bl: [ox.l + r * 0.9, oy.b], br: [ox.r - r * 0.9, oy.b],
			l: [ox.l, oy.c], r: [ox.r, oy.c], t: [ox.c, ring.y - r - 3 * s], b: [ox.c, ring.y + ring.h + r + 3 * s] };
		anchor = map[pos] || map.tl;
		// a circle has no corners: a corner badge sits on the outline itself, at 45°, so it reads as part of it
		if (shape === 'circle' && pos.length === 2) {
			const k = Math.SQRT1_2, rx = ring.w / 2, ry = ring.h / 2;
			anchor = [ring.x + rx + (pos[1] === 'l' ? -k : k) * rx, ring.y + ry + (pos[0] === 't' ? -k : k) * ry];
		}
	}
	const b = badge(a.n, anchor[0], anchor[1], s);
	parts.push(b.svg);
	boxes.push({ what: 'badge', ...b.box });
	if (a.label) {
		if (a.label.trim().split(/\s+/).length > 3) throw new Error(`callout ${a.n}: "${a.label}" is more than three words`);
		// the label goes on the side of the badge away from the target
		const leftSide = a.labelSide ? a.labelSide === 'l' : anchor[0] < t.x + t.w / 2 && anchor[0] - 140 * s > 0;
		const l = leftSide ? label(a.label, anchor[0] - 17 * s, anchor[1], s, 'right') : label(a.label, anchor[0] + 17 * s, anchor[1], s, 'left');
		parts.push(l.svg);
		boxes.push({ what: 'label', ...l.box });
	}
	return { svg: parts.join(''), boxes };
}

/** a caption pill for a composed tile (clean font, dark pill — reads on any tile) */
function pill(text, x, y, s) {
	const size = 14 * s;
	const w = textWidth(CLEAN, text, size) + 16 * s, h = size + 12 * s;
	return `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="${h / 2}" fill="rgba(12,12,18,0.78)"/>` +
		`<path d="${textPath(CLEAN, text, x + 8 * s, y - h / 2 + size * 0.36, size)}" fill="#fff"/>`;
}

module.exports = { ACCENT, seedOf, callout, pill, union };
