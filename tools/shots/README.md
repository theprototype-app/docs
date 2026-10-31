# Docs images: the rules

Every picture and loop in these docs is shot from the deployed app by a spec (`specs/<page>.yml`), so it can be
re-shot after a release. The owner's rules (batch 1 review, 2026-10-29) hold for every image; the tools enforce them.

## 1. Sharp text, no scaling

- Captures are taken at **deviceScaleFactor 2**. The page shows them at their **CSS size**: `width` and `height` =
  natural size ÷ 2, written by `annotate.cjs` into the snippet it prints.
- A capture that shows **interface** (any button, label or panel in the crop — the driver samples the crop and records
  `kind: ui`) is shown **1:1**: it must fit the content column, **688 CSS px** (the narrowest desktop column, both
  sidebars open). Too wide? **Crop it** — tighter `crop`, the camera further back, a smaller `size` — never shrink it.
  `annotate.cjs` refuses a wider one.
- A crop of the **3D view alone** (`kind: view`) may be wider; CSS fits it to the column, and its callouts are drawn
  larger to match.
- A spec can force the kind (`kind: view`) when what the sampler saw is not interface (a 3D label, say).

## 2. Centred

Every image, figure and loop is centred in the column, its caption centred under it, the numbered key a centred
block below (`docs/stylesheets/shots.css`).

## 3. Readable without pixels

The docs are read by AI agents (llms.txt, the connector, Claude Code) that never see the image. So:

- **alt** says what the image shows, in words (6 or more; never "screenshot"), naming every numbered callout;
- every image is a **figure with a caption** (`/// caption` under it; a loop's `<figcaption>` says what happens in
  it: "Loop, 6 s: drag to orbit, …");
- every **numbered badge** has a line in the **key list** right under the figure, in order, one per badge;
- every **handwritten label** (callout words, tile captions) also appears in the alt, caption or key;
- each spec shot carries `alt`, `caption` and a `key` per callout; `annotate.cjs` refuses a shot without them.

The build writes, for agents: `llms.txt` (every page by section, linked to its Markdown), `llms-full.txt` (all pages
in one file), a cleaned `<page>.md` beside every page (figures as text), and a small JSON-LD block per page
(TechArticle: name, description, dateModified, the app version the images were shot on; an ImageObject or
VideoObject per figure with its caption) — `tools/hooks/readable.py`.

## The checks

| Check | Where | Fails on |
|---|---|---|
| `annotate.cjs` | when you make the image | UI wider than the column, no alt/caption/key, a callout in a faded edge, over budget |
| `tools/hooks/shots.py` | every `mkdocs build --strict` (CI) | width/height ≠ CSS size, file size ≠ manifest, UI wider than the column, alt too thin, no figure/figcaption, key lines ≠ badges, a label missing from the text |
| `review/page-check.cjs` | the built site in a browser | an interface image shown at any width but its 1:1 size, an image or caption off-centre, a loop that does not play or plays under reduced motion |
| `reshoot.sh` | release checklist | stale shots (before/after sheet), then the strict build above |

`manifest.json` is what ties them together: `annotate.cjs` and the loop recorder write one entry per finished image
(page, kind, dpr, CSS width/height, badge count, labels, app version). Images older than tools/shots are only
counted by the build; batch 2 replaces them.

## Making one

```bash
cd tools/shots && npm ci
APP_URL=https://theprototype.pages.dev/ E2E_PC= e2e-slot -- node shoot.cjs camera/view-section   # on the Deck
node annotate.cjs camera            # re-draw from raw/ without a browser; prints the figure to paste
node --test test/*.test.cjs         # the rules, offline
```

Paste the printed figure as is:

```markdown
![Configure Scene ▸ View. 1: the render mode switch … 2: Show light helpers.](img/camera/view-section.webp){ .shot width="311" height="402" loading=lazy }
/// caption
Configure Scene ▸ View: how the scene is drawn on your screen.
///

<div class="shot-key" markdown>
1. The **render mode** switch.
2. **Show light helpers**.
</div>
```

House style (owner, 2026-10-26): hand-drawn strokes, clean numbered badges, at most three handwritten words per
callout, one warm accent; fade only a side the crop cut, a vignette on a 3D crop; loops 3–8 s, muted, ≤ 600 KB,
paused under reduced motion; each still ≤ 250 KB. Shoot on a **remote** e2e slot (`E2E_PC=`): a pc slot draws no
ambient occlusion.
