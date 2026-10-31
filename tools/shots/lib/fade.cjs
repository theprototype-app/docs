// The fade rules, shared by the driver (which picks the classes) and the compositor (which
// refuses a callout the fade would eat). They mirror docs/stylesheets/shots.css exactly:
//   .fade-l/.fade-r/.fade-t/.fade-b  linear mask, transparent at the edge → opaque at FADE (a fraction of that side)
//   .vignette                         radial mask, ellipse through the corners, opaque to VIGNETTE_SOLID
const FADE = 0.06; // 6 % of the width (l/r) or height (t/b) — keep in step with shots.css
const SAFE = 0.09; // a callout must sit this far inside a faded side (1.5 × the fade)
const VIGNETTE_SOLID = 0.8; // keep in step with shots.css
const VIGNETTE_SAFE = 0.76;

/** classes for the image tag, from the resolved fade list */
function fadeClasses(fade) {
	if (fade === 'vignette') return ['vignette'];
	return (fade || []).map((s) => 'fade-' + s);
}

/**
 * Is the rectangle {x,y,w,h} (image px) clear of every faded zone of a W×H image?
 * Returns '' when it is, else why not.
 */
function clearOfFade(r, W, H, fade) {
	if (r.x < 0 || r.y < 0 || r.x + r.w > W || r.y + r.h > H) return 'leaves the image';
	if (fade === 'vignette') {
		// the ellipse through the corners has radii W/√2, H/√2
		const rx = W / Math.SQRT2, ry = H / Math.SQRT2;
		for (const [px, py] of [[r.x, r.y], [r.x + r.w, r.y], [r.x, r.y + r.h], [r.x + r.w, r.y + r.h]]) {
			const d = Math.hypot((px - W / 2) / rx, (py - H / 2) / ry);
			if (d > VIGNETTE_SAFE) return `sits in the vignette (${d.toFixed(2)} > ${VIGNETTE_SAFE})`;
		}
		return '';
	}
	for (const s of fade || []) {
		if (s === 'l' && r.x < SAFE * W) return 'sits in the faded left side';
		if (s === 'r' && r.x + r.w > (1 - SAFE) * W) return 'sits in the faded right side';
		if (s === 't' && r.y < SAFE * H) return 'sits in the faded top';
		if (s === 'b' && r.y + r.h > (1 - SAFE) * H) return 'sits in the faded bottom';
	}
	return '';
}

/** which sides of `crop` cut through `bounds` (the thing continues past that side) */
function cutSides(crop, bounds) {
	const e = 2;
	const out = [];
	if (crop.x > bounds.x + e) out.push('l');
	if (crop.x + crop.w < bounds.x + bounds.w - e) out.push('r');
	if (crop.y > bounds.y + e) out.push('t');
	if (crop.y + crop.h < bounds.y + bounds.h - e) out.push('b');
	return out;
}

/** the spec's `fade` (auto by default) → 'vignette' or the list of sides to fade */
function resolveFade(fade, cut, is3d) {
	if (fade === 'none') return [];
	if (fade === 'vignette') return 'vignette';
	if (Array.isArray(fade)) return fade;
	// auto: a 3D crop cut on every side gets the vignette; otherwise only the cut sides fade
	if (is3d && cut.length === 4) return 'vignette';
	return cut;
}

module.exports = { FADE, SAFE, VIGNETTE_SOLID, VIGNETTE_SAFE, fadeClasses, clearOfFade, cutSides, resolveFade };
