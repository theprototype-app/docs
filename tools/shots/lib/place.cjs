// Put a finished figure into its docs page: the image (or loop) block that shows this shot — or the older image
// the spec says it `replaces` — is swapped for the new figure, together with the caption block and the numbered
// key under it. `node annotate.cjs --place <page>` does every shot of a page; a shot with no block yet is listed.
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./spec.cjs');

/** the Markdown file a spec page lives in (spec `md:`, else docs/<page>.md) */
const mdFile = (page, spec) => path.join(ROOT, 'docs', (spec && spec.md) || page + '.md');

/** replace the block that shows `targets` (img paths, relative to docs/) with `figure`; returns false when none does */
function placeFigure(file, targets, figure) {
	const lines = fs.readFileSync(file, 'utf8').split('\n');
	const rel = path.relative(path.join(ROOT, 'docs'), path.dirname(file));
	// the page refers to docs/img/x as img/x (or ../img/x from a subfolder; ../img/x again in a loop's raw HTML)
	const refs = targets.flatMap((t) => [path.posix.relative(rel, t), '../' + path.posix.relative(rel, t)]);
	const hit = (l) => refs.some((r) => l.includes('](' + r + ')') || l.includes('"' + r.replace(/\.webp$/, '.webm') + '"') || l.includes('"' + r + '"'));
	let i = lines.findIndex(hit);
	if (i < 0) return false;
	let start = i, end = i;
	if (/<video|<source/.test(lines[i])) {
		while (start > 0 && !/<figure/.test(lines[start])) start--;
		while (end < lines.length - 1 && !/<\/figure>/.test(lines[end])) end++;
	}
	// the caption block right under it, then (after blank lines) the numbered key
	let j = end + 1;
	if (lines[j] === '/// caption') { while (j < lines.length && !(lines[j] === '///' && j > end + 1)) j++; end = j; j++; }
	let k = j;
	while (k < lines.length && lines[k].trim() === '') k++;
	if (/^<div class="shot-key"/.test(lines[k] || '')) { while (k < lines.length && !/^<\/div>/.test(lines[k])) k++; end = k; }
	// the figure's image path is from docs/: a page in a sub-folder reaches it through ../
	const up = rel ? rel.split(path.sep).map(() => '..').join('/') + '/' : '';
	lines.splice(start, end - start + 1, ...figure.replace('](img/', `](${up}img/`).split('\n'));
	fs.writeFileSync(file, lines.join('\n'));
	return true;
}

module.exports = { mdFile, placeFigure };
