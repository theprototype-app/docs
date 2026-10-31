# Module package layout

The format the Modules manager installs (zip upload or URL) and exports
("Download as example"). One folder or zip root per module.

!!! tip "Let a script build it"

    [theprototype-app/modules](https://github.com/theprototype-app/modules) has
    `npm run new -- <id>` (scaffold from a working template) and
    `npm run pack -- <id>` (build the zip with `manifest.json` at the **root**,
    refusing an entry file with a top-level `import`). `Compress-Archive` on the
    folder nests it and the manager rejects the result.

```
mymodule.zip
├── manifest.json        required — see below
├── module.js            required — the entry (default export, self-contained)
├── assets/              optional — sounds/, models/ (.glb), textures/ …
│   ├── sounds/pling.mp3        → api.assetUrl('assets/sounds/pling.mp3')
│   └── models/lever.glb
├── prefabs/*.json       optional — object snapshots your module instantiates
│                          (exported via "Save as prefab" → export)
├── nodes/*.js|.svelte   optional — sources for reference; user-module entries
│                          cannot import them (see limits below)
└── config.json          optional — defaults your module fetches itself via
                           api.assetUrl('config.json')
```

## manifest.json

```json
{
	"id": "mymodule",
	"name": "My Module",
	"version": "1.0.0",
	"description": "One line for the manager card.",
	"entry": "module.js",
	"files": ["module.js", "assets/sounds/pling.mp3", "config.json"]
}
```

- `id` — stable, unique, kebab-case. Routes messages and the enable/disable
  state; changing it is a new module.
- `entry` — the module file, default `module.js`.
- `files` — **URL installs only**: every file to fetch relative to the base
  URL (zips just include the files). The entry is fetched regardless.

## URL installs

Paste a base URL that serves the layout above, e.g.

```
https://raw.githubusercontent.com/user/repo/main/mymodule
```

`github.com/user/repo/tree/main/mymodule` links are converted automatically.
Any static host works if it sends CORS headers (`Access-Control-Allow-Origin`).
"Update" on the card re-fetches from the same base URL.

## Entry constraints (user modules)

The entry loads as a blob ES module, so:

- **No `import` statements** — bare specifiers (`three`, `svelte`) and relative
  files cannot resolve. Everything arrives on the `api` object: `api.THREE`,
  `api.assetUrl(path)`, stores/actions via the documented api surface.
- One file. If you develop with multiple files, bundle before zipping
  (esbuild: `esbuild src/module.js --bundle --format=esm --external:none
  --outfile=module.js` — but keep `three` OUT of the bundle and use
  `api.THREE`, or the module ships a second copy of three).
- Custom Svelte node components only work for in-repo (core) modules; user
  modules get the generic param-driven node UI (`params` in the catalog item).
- Assets: keep zips ≤ ~20 MB; they persist in the browser's IndexedDB.

Core modules in `src/modules/` have none of these limits — they're part of the
build. The downloaded examples therefore may need small edits (replace `import
* as THREE from 'three'` with `const THREE = api.THREE`, inline component-based
nodes as `params`) before they run as user modules; `hello` runs with just the
THREE swap.

## Trust model

Installing a module = running its code in your session, with your peer
connections. There is no sandbox in v1. Install only from sources you trust,
and expect peers to need the same module (same id + version) for shared
behavior to match — the connect handshake warns when lists differ.
