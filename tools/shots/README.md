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
- **A whole layout** (dock, focus mode, a sidebar beside the view) does not fit a 1440 px window at 1:1. Shoot it in a
  small window instead: `device: window-688` or `window-688-tall`. The app is real at that size, whole, and nothing is
  cut. A narrow window shows the touch cluster beside the logo and folds the Connect bar, so say "in a small window" in
  the caption.
- **Two parts of one screen** that do not fit side by side in one crop are two tiles (`variants` with their own `crop`,
  `compose: row`), and the caption says they are cut from one screen. On an interface tile the name sits in a strip
  under the tile, never over a control.
- **A state one page cannot make by itself** is made by the **rig** (`lib/rig.cjs`, roadmap 83 V11), so it re-shoots
  on every release like any other still:
  - `peers: [{name, role: edit|view, look: {character}, agent: true, device, storage, setup: [steps]}]` — real guest
    pages in the same browser dial the shot's page and are approved with the role's own button. `agent: true` opens an
    AI agent's page (the `agentApi` switch the agent bridge sets): it shows with the robot, and its
    `window.tpAgent.exec(…)` edits land in Agent activity. Step `{on: <name>, steps: […]}` runs steps in a guest.
  - `xr: {device, head}` — IWER (Meta's emulated Quest 3) owns `navigator.xr` before the app boots; step
    `{xr: enter}` presses Play like a person in a headset. A panel drawn on a texture is shot with step
    `{canvas: "<expression giving the canvas>"}` (a copy at its own pixels, `#docs-canvas`, then `crop: {selector:
    '#docs-canvas'}`); the 3D view in the headset is the page's own canvas.
  - step `{popup: [steps that open a window]}` + `capture: popup` — the shot is taken in the new browser window
    (a popped-out panel or dock). From `device: window-688` the window is 688 wide too.
  - Cross-scene presence (the people in a project's *other* rooms) can show real accounts on production: a shot with
    guests hides `#cross-scene-presence`.
  Only what no browser can draw stays a re-crop (`from:` the file, `dpr:` its own); those are listed in the summary.

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
| `release.sh` | release battery (V12) | re-shoots and regenerates what changed; flags a changed layout, a callout that no longer fits, a failed capture; strict build; Try it |
| `reshoot.sh` | by hand | the same verdicts as a dry run (nothing in git changes), then the strict build |

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

`shoot.cjs --place` swaps the figure in for the block that shows the shot, or the older image named by `replaces:`.
Or paste the printed figure as is:

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

## On a release (V12)

The owner does not approve each shot (2026-11-02): the integrator runs the docs part of the release battery and the
tools decide.

```bash
APP_URL=<the release's preview URL> E2E_PC= e2e-slot --wait 3600 -- bash tools/shots/release.sh 1.55.0 <out dir>
```

`release.cjs` captures every still again against the release (raw only, into `<out>/raw`), compares each with its raw
in git and gives it one verdict:

| verdict | what happened | what the tool does |
|---|---|---|
| same | nothing visible changed (mean difference ≤ 0.4 %) | leaves it |
| drift | a small pixel change (≤ 3 %), same size, every callout's target within 6 CSS px | regenerates it, accepted |
| spec | its spec changed since the raw in git was taken (the raw records a hash of what a capture depends on) | regenerates it |
| new | a spec with no raw in git yet | regenerates it |
| **layout** | a different size, a callout's target moved or vanished, or more than drift | regenerates it, **flags it** |
| **callout** | a callout no longer fits: its target is gone, or it lands in a faded edge or off the image | keeps the old image, **flags it** |
| **broken** | the capture failed (a step or selector no longer matches) | keeps the old image, **flags it** |

A re-crop of an older capture (`from:`) and the loops are not re-shot; the summary counts them. `--apply` (release.sh
passes it) copies the regenerated raws into `raw/`, re-annotates them into `docs/img` and places their figures, so a
new size lands in the page too. Then the strict build and the Try it check run. Everything flagged is listed in
`<out>/summary.md` (paste it into the release STATUS and the docs PR) with its before / after / difference in
`<out>/index.html`: fix the spec (crop, anchor, step) and re-shoot that shot, or accept the new layout as it is.
Thresholds: `SHOTS_NOISE`, `SHOTS_DRIFT`, `SHOTS_MOVED`. Shoot on a remote slot (`E2E_PC=`), like every shot.
