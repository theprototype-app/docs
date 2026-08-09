# Modules

Modules plug playable content into the app — instruments, mini-games, generators, custom nodes and tools — and everything they do replicates to every connected peer.

## The Modules manager

Open it from **Menu ▸ Modules**.

- **Core modules** ship with the app (hello, button, dungeon, piano, pong…). Toggle each on or off: **enabling is live**, disabling takes effect after a **reload**.
- **⬇ Download as example** exports a core module as a zip — the best starting point for writing your own.
- Peers exchange module lists when they connect and show a toast if a module is missing or a different version on the other side. The session still works, but that module's behavior may differ — treat *same modules everywhere* as part of the session contract.

## What modules can add

- **Flow nodes** — new node groups in the palette, driving per-frame effects through the Object Selector like built-in nodes.
- **Primitives** — new `/create` object types, with spawn buttons on the module's manager card.
- **Click handlers** — objects that react to desktop clicks and VR trigger presses (a piano key, a door button).
- **Viewport content** — scene content and generated worlds, plus menu buttons and VR radial-menu entries.

## Installing user modules

The manager's **Install zip** / **Install URL** buttons load third-party modules:

- **Zip** — a package containing `manifest.json` + `module.js` (plus optional `assets/`, `prefabs/`, `config.json`). Keep zips under ~20 MB; they persist in your browser.
- **URL** — a base URL serving the same layout (GitHub `tree` links are converted automatically; the host needs CORS). **Update** on the card re-fetches from the same URL.
- **Browse** — a gallery of community modules from [github.com/theprototype-app/modules](https://github.com/theprototype-app/modules), installed with one click. Installed entries dim; an **Update** button appears when the gallery lists a newer version. The same trust model applies — gallery modules run unsandboxed.

User modules install, update, disable and remove **live** — the manager genuinely unloads a module's menus, nodes, effects and handlers without a page reload. (Core modules still need a reload to disable.)

### Dev mode — live reload while you build

Every user-module card has a **Dev URL** row for module authors: point it at any
server that serves your module folder (`manifest.json` + `module.js` — `npx serve`,
a GitHub raw link, anything with CORS), then:

- **Reload** fetches fresh code, tears the old instance down and re-registers it — no page reload.
- **Auto** polls the URL (~2 s) and reloads whenever the served `module.js` changes.
- A parse or registration error keeps the **previous version running** (you get a toast).
- Connected peers toast a module **version mismatch** while you iterate — expected: your dev copy genuinely differs from theirs.

Scene objects your module created stay (they are replicated user content); the module's own scene-root viewport groups are rebuilt by the fresh code.

User modules must be **self-contained**: a single `module.js` with no `import` statements — three.js and packaged assets arrive through the API (`api.THREE`, `api.assetUrl(path)`). Custom Svelte node UIs are core-module-only; user modules get the generic parameter-driven node cards.

!!! warning "Trust model"
    Installing a module means running its code in your session, with your peer connections. There is no sandbox. Install only from sources you trust.

## SDK — writing a module

A module is one default export with a `register(api)` call:

```js
export default {
	id: 'mymodule',        // stable + unique; routes your messages
	name: 'My Module',
	version: '1.0.0',      // peers toast when versions differ
	description: 'One line shown on the manager card.',
	register(api) { /* wire everything here */ }
};
```

**The one rule that matters:** a module runs on every peer and there is no server, so whatever it does must end up identical on all clients — one of three ways:

1. **Deterministic from shared inputs** — effects computed from node `data` (already replicated) and the synced clock. Prefer this.
2. **Broadcast events** — `api.send({...})` a small message for discrete happenings, apply it locally and in `api.onMessage`; never re-broadcast from a receiver.
3. **State sync** — `api.registerStateSync({getState, applyState})` hands your current state to late joiners automatically.

Seed all randomness (send the seed, not the result) and never accumulate in effects — compute from `base` and `time`.

The `register(api)` surface, in brief:

| Call | Purpose |
|---|---|
| `registerNodeGroup(group, components?)` | Add a palette group of flow nodes (`defaults` seed node data; `params` auto-generate controls) |
| `registerEffect(type, fn)` | Per-frame effect `(object, base, data, time)`, active when the node is wired into an Object Selector |
| `registerNodeDefs(defs)` | Ship **code-editable** nodes: each `{key, name, params, code}` becomes a custom node users can open in the Node Designer and tweak (your edits win over module reloads). Pairs with [object flows](object-flows.md) — dropped into an object's flow, the node drives that object with no Object Selector |
| `pointerRay()` | Where the user is **pointing**, as a world-space `THREE.Raycaster` — desktop mouse over the viewport or the VR pointer hand. Fresh instance per call; null before the first pointer event. The drag recipe: click to pick, follow `pointerRay()` in a frame task, click to drop |
| `registerPrimitive(name, builder, opts)` | A replicated `/create` primitive + manager spawn button |
| `registerClickHandler(fn)` | Intercept desktop clicks / VR triggers on scene meshes |
| `registerInteractiveGroup(name)` | Make your own scene-root group clickable |
| `registerFrameTask(fn)` | Run every frame with synced time |
| `registerMenu(label, fn)` / `registerVRMenuEntry({...})` | Buttons on the manager card / sectors in the VR radial menu |
| `haptic(intensity, ms, hand?)` | Buzz the VR controllers (both, or `'left'`/`'right'`); no-op on desktop |
| `isVR()` / `vrHand(hand)` | In a VR session? / one hand's world pose + `trigger`/`gripped` state (null when untracked) |
| `fireObjectClick(uuid)` | Pulse **On Click** flow nodes targeting an object — lets user graphs react to your module's events (replicated) |
| `possess(uuid, opts)` / `possessModes` | Drive an object (tank controls + follow camera). `possessModes` lists this build's camera modes — feature-detect `'first'` (first-person eye camera with optional pointer-lock mouse look) |
| `send(msg)` / `onMessage(fn)` | Namespaced peer messages |
| `registerStateSync({getState, applyState})` | Late-joiner catch-up |
| `scene()`, `objectsGroup()`, `peerId()`, `toast()`, `now()`, `THREE`, `assetUrl(path)`, `sceneAssets()` | Utilities |

Content added to `objectsGroup()` joins the shared scene (synced, listed, editable by anyone). Derived content (a generated level) belongs in your own scene-root group, rebuilt from module state.

Writing your own? Start with the **[Module SDK](module-sdk.md)** guide (the `register(api)` reference, replication rules, testing checklist) and the **[package layout](module-package.md)** for zip/URL installs. The in-repo `MODULES.md` additionally walks through the hello and button core modules.
