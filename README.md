# theprototype.app docs

User and SDK documentation for [theprototype.app](https://theprototype.app), built with
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and published to
**[docs.theprototype.app](https://docs.theprototype.app)**.

## Branches

| Branch | Role |
|---|---|
| `docs` | **default** — the source. Markdown under `docs/`, config in `mkdocs.yml`, theme overrides in `overrides/`. |
| `gh-pages` | build output, written by `mkdocs gh-deploy`. Never edit by hand. |

The custom domain comes from the `CNAME` file.

## Local development

```bash
python -m venv ./venv
# Windows
.\venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
mkdocs serve            # http://127.0.0.1:8000, live reload
```

<details>
<summary>Python on Windows</summary>

Grab an installer from [python.org/downloads/windows](https://www.python.org/downloads/windows/)
and make sure "Add python.exe to PATH" is ticked. If you used the embeddable build, pip
comes from [get-pip.py](https://bootstrap.pypa.io/get-pip.py).

</details>

## Publishing

```bash
mkdocs gh-deploy --force
```

Builds the site and force-pushes it to `gh-pages`; GitHub Pages serves it within a minute
or so. Commit your Markdown changes to `docs` as well — `gh-deploy` only touches the built
output.

## Writing

- One page per feature; the left-hand nav is defined explicitly in `mkdocs.yml`, so a new
  page needs an entry there to appear.
- Node reference pages live under `docs/nodes/`, one per node type.
- Screenshots live under `docs/img/<page>/<what>.webp`, shot by `tools/shots` from the production app
  (theprototype.pages.dev), dark theme unless the page is about themes — see the next section and
  [`tools/shots/README.md`](tools/shots/README.md) for the rules.
- When the app's SDK surface changes, the matching page changes in the same sitting — the
  authoring guides here are the public contract for
  [`MODULES.md`](https://github.com/theprototype-app/core/blob/main/MODULES.md).

## Related

- [core](https://github.com/theprototype-app/core) — the app itself
- [modules](https://github.com/theprototype-app/modules) — optional and community modules
- [packs](https://github.com/theprototype-app/packs) — content packs

## Screenshots and loops (`tools/shots/`)

Docs images are shot from the **deployed app** by a spec, not by hand, so they can be re-shot after a release.

- `tools/shots/specs/<page>.yml` — one file per docs page: the demo scene, the crop, the callouts, variants.
- `tools/shots/raw/<page>/<id>.webp` + `.json` — the un-annotated shot and what was measured (kept in git).
- `docs/img/<page>/<id>.webp` — the finished image; `.webm` + `.mp4` + `.poster.webp` for a loop.

```bash
cd tools/shots && npm ci
# shoot (needs a browser; on the Deck inside an e2e slot), then paste the printed snippet into the page
APP_URL=https://theprototype.pages.dev/ node shoot.cjs controls/gizmo-modes
node annotate.cjs controls            # re-draw the callouts from the raw shots — no browser
node --test test/*.test.cjs           # the fade guard and callout rules
node tryit-check.cjs                  # every "Try it" link opens and its controls exist (CI runs it)
APP_URL=<preview> bash reshoot.sh     # after a release: which shots went stale (before/after sheet)
```

House style (owner, 2026-10-26): hand-drawn strokes, clean numbered badges keyed to a list under the image,
at most three handwritten words per callout, one warm accent. Fade **only** a side the crop cut, a soft vignette on a
crop of the 3D view; the driver refuses a callout inside a faded zone. Loops are 3–8 s, muted, ≤ 600 KB, and pause
for readers who prefer reduced motion. Each still ≤ 250 KB.

**The rules every image follows** — 1:1 interface (dpr 2, never shrunk: crop instead), centred, and readable without
pixels (alt in words, a figure with a caption, a key line per badge, a text line per loop) — and the checks that
enforce them are in [`tools/shots/README.md`](tools/shots/README.md). `annotate.cjs` prints the figure to paste.

**Release checklist line (V7):** after the preview deploys, `APP_URL=<preview> E2E_PC= e2e-slot -- bash
tools/shots/reshoot.sh` — exit 0 = every docs shot is current; exit 1 lists the stale ones with a before/after
sheet: re-shoot those (`node tools/shots/shoot.cjs <page/id>`) in the release's docs PR.

Fonts baked into the callouts: Caveat and Atkinson Hyperlegible, both under the SIL Open Font License 1.1
(`tools/shots/fonts/OFL-*.txt`).
