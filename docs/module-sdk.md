# Module SDK

Modules plug playable content into theprototype.app: instruments, game
prototypes, generators, custom nodes and tools. A module registers itself
through one `register(api)` call and everything it does is visible to every
connected peer.

Two ways to ship one:

| | Core (in-repo) | User (zip / URL) |
|---|---|---|
| Lives in | `src/modules/<id>/` + listed in `src/modules/index.js` | installed via the Modules manager |
| Imports | anything the repo can import (`three`, stores, `.svelte` components) | **none** — the entry must be self-contained; use `api.THREE`, `api.assetUrl` |
| Custom node UIs | own `.svelte` components | generic param-driven nodes only |
| Distribution | git | `.zip` or a URL serving the [package layout](module-package.md) |

Start by downloading a core module from the manager ("Download as example") —
`hello` is the smallest complete one.

Writing a **user module**? The companion repo
[theprototype-app/modules](https://github.com/theprototype-app/modules) carries
the working end of this page:

- **[AUTHORING.md](https://github.com/theprototype-app/modules/blob/main/AUTHORING.md)**
  — one document covering the rules, the packaging contract and the test recipe,
  written to be read straight through or pasted whole into an AI assistant.
- **[modules/_template](https://github.com/theprototype-app/modules/tree/main/modules/_template)**
  — a working scaffold (`npm run new -- my-module`), alongside example modules
  from a keypad-and-door to a first-person walk mode, each with a Playwright
  test-flight that installs the real zip through the real manager.
- **[DEVX-REQUESTS.md](https://github.com/theprototype-app/modules/blob/main/DEVX-REQUESTS.md)**
  — gaps external modules hit that core modules do not, and what has shipped for
  them.

## The one rule that matters

**A module runs on every peer. There is no server.** Whatever your module does
must end up identical on all clients, one of three ways:

1. **Deterministic from shared inputs** — effects driven by node `data`
   (already replicated) and the synced clock (`api.now()`). Prefer this.
2. **Broadcast events** — a discrete thing happened ("button pressed",
   "generate with seed 42"). `api.send({...})` a small message, apply the same
   change locally and in `api.onMessage`. Never re-broadcast from a receiver.
3. **State sync for late joiners** — `registerStateSync` hands your current
   state to peers who connect mid-session, automatically.

Randomness must be seeded (send the seed, not the result). `Math.random()` in
anything replicated is a desync. Don't accumulate in effects
(`rotation.y += ...`) — compute from `base` and `time`.

## register(api) reference

```js
export default {
	id: 'mymodule',        // stable + unique; routes your messages
	name: 'My Module',
	version: '1.0.0',      // peers toast when versions differ
	description: 'One line shown on the manager card.',
	register(api) { /* wire everything here */ }
};
```

### Nodes and effects

```js
api.registerNodeGroup(
	{
		group: 'Modules',
		items: [{
			type: 'wave',                  // globally unique node type
			label: 'Wave',
			defaults: { amplitude: 0.4 },  // seeds node.data, replicated
			params: [                      // auto-generated controls
				{ key: 'amplitude', kind: 'range', min: 0, max: 1.5, step: 0.05 }
				// or { key: 'axis', kind: 'select', options: ['x','y','z'] }
			]
		}]
	},
	{ wave: MyWaveNode } // optional custom Svelte components (core modules only)
);

api.registerEffect('wave', (object, base, data, time) => {
	// base = {pos, rot, scale, visible} — restored before every frame.
	// Runs when an edge connects your node to an Object Selector.
	object.rotation.z = base.rot[2] + Math.sin(time * (data.speed ?? 2)) * (data.amplitude ?? 0.4);
});
```

### Scene content and interaction

```js
api.registerPrimitive('Flag',
	(w, h) => new api.THREE.PlaneGeometry(+w || 2, +h || 1),
	{ label: 'Flag', command: '/create Flag 2 1' });   // spawn button on your manager card

api.registerClickHandler((object) => {      // desktop click + VR trigger, exact mesh hit
	if (object.userData.myButton) { press(object); api.send({ op: 'press', uuid: object.uuid }); return true; }
	return false;                             // false = normal selection continues
});

api.registerInteractiveGroup('mymodule-stage'); // click handlers only see the replicated
// objects root by default — register your scene-root group's NAME to make it clickable

api.registerFrameTask((time) => { /* every frame, synced seconds */ });
api.registerMenu('Open my panel', () => { /* button on your manager card */ });
```

#### registerPostEffect

The [scene look](post-processing.md) stack is a registry too, so a module can add an
effect a user can then add to the scene like any built-in one:

```js
api.registerPostEffect('bloomier', {
	label: 'Bloomier',
	group: 'camera',
	params: [{ name: 'amount', type: 'number', default: 0.5, min: 0, max: 2 }],
	make: (params, ctx) => new SomeEffect({ intensity: params.amount })
});
```

Your kind is **namespaced** to your module, so two modules cannot collide. If your
module is later disabled — or the scene is opened by someone who never installed it —
the authored effect is **kept in the stack and skipped**, not deleted, and it starts
working again the moment the module is back. That is deliberately the same behaviour in
both cases: a peer without your module is in exactly the position of a user who turned
it off.

#### registerPostBackend

For a whole *compiler* rather than a single effect — something that turns a shader
description into an effect:

```js
api.registerPostBackend('fancy', 'Fancy compiler', (spec, ctx) => {
	// spec: { fragment, uniforms, readsDepth, blend }  ->  return an Effect
	return buildEffect(spec);
});
```

This is separate from `registerShaderBackend` on purpose: a **shader** backend returns a
*material* and a **post** backend returns an *effect*. An unknown key falls back to the
built-in compiler rather than failing, and the document keeps the key it asked for.

#### registerUnwrapBackend

The [UV editor](uv-editor.md)'s **Unwrap** menu is a registry, so a module can add
an unwrapping algorithm — or replace a built-in one under the same key — without
the app shipping it:

```js
api.registerUnwrapBackend('xatlas', 'xatlas (automatic)', async (faces, options) => {
	// faces: triangles as plain data (positions, and the face they belong to)
	// return { uvs, islands } — pure data; the app commits, replicates and undoes it
	return { uvs, islands };
});
```

A backend is a **pure function**: it maps triangles to UV coordinates and returns
them. It never touches the scene, which is what lets the app treat your unwrap
exactly like a built-in one — one undo step, shared with peers, saved with the
scene. Backends may be `async`, so a heavy solver can do its work off the main
thread or load WebAssembly first.

!!! tip "WebAssembly works"
    A packaged module can ship a `.wasm` next to its code and load it with
    `WebAssembly.instantiateStreaming(fetch(api.assetUrl('lib/xatlas.wasm')))` —
    `assetUrl` hands you a blob URL, so there is no network request and nothing to
    allow-list.

Your key is namespaced per module, so two modules registering `box` never collide.

Content you add to `api.objectsGroup()` becomes part of the shared scene
(object list, GLTF sync to late joiners, movable/deletable by anyone). Derived
or regenerating content (a generated dungeon, a game board) belongs in your own
group on `api.scene()` — rebuild it from your module state instead, then it can
never drift; pair it with `registerInteractiveGroup` if it must be clickable.

### Messages and state

```js
api.onMessage((data) => {           // {type:'module', moduleId, ...payload}
	if (data.op === 'press') applyPress(data.uuid);
});
api.send({ op: 'press', uuid });    // broadcast to all peers

api.registerStateSync({
	getState: () => ({ pressed: [...pressed] }),  // late joiners receive this
	applyState: (state) => state.pressed.forEach(markPressed)
});
```

### Utilities

```js
api.scene()          // THREE.Scene
api.objectsGroup()   // the replicated objects root
api.peerId()         // our peer id (undefined before the mesh is up)
api.toast('hi')      // corner toast
api.now()            // the runtime clock in SECONDS — stamp replicated
                     // timestamps with this, never Date.now() directly
api.THREE            // the app's three.js (user modules can't import it)
api.assetUrl('assets/pling.mp3') // blob URL of a packaged file (user modules)
```

### Building in the shared scene

```js
// create through the SAME replicated path a user's /create takes, and get
// back what appeared — so you can place it, physics it, or joint it
const [uuid] = await api.create('/create Box 1 1 1');
await api.create('/create Box 0.6 0.6 0.6', { at: [x, y, z] });  // placed too

api.moveObject(uuid, { pos: [0, 1, 0], rot: [0, 0, 0], scale: [1, 1, 1] });
api.physics.set(uuid, { mode: 'dynamic', mass: 30, friction: 0.3 });
api.physics.createJoint('revolute', bodyUuid, wheelUuid, 'x', { vel: 0, maxForce: 120 });
api.physics.running();   // a simulation runs somewhere in the session
api.isPlaying();         // Play mode is active
api.peerIds();           // connected peer ids — free state a departed peer left

api.flyTo([x, y, z], [lx, ly, lz]);   // LOCAL camera move (never replicated)
api.playSound('pluck', [x, y, z]);    // LOCAL spatial chime
api.followCam(uuid); api.stopFollowCam();   // LOCAL chase camera
```

Everything on the first block replicates; everything on the last block is
per-viewer and deliberately local — a peer's module must never yank your camera.

### VR and control

```js
api.isVR()                    // true inside a VR session
api.haptic(0.6, 60)           // buzz the VR controllers — no-op on desktop
api.haptic(0.6, 60, 'right')  // one hand only
api.vrHand('left')            // {position:[x,y,z], quaternion:[x,y,z,w],
                              //  trigger, gripped, connected} — null when
                              //  untracked / not in VR; poll from a frame task
api.fireObjectClick(uuid)     // pulse On Click flow nodes targeting the object
                              // (replicated) — user graphs react to your events
api.possess(uuid, { camera: 'first', eyeHeight: 1.7, mouseLook: true });
api.possessModes              // e.g. ['chase','orbit','none','first'] —
                              // feature-detect 'first' here; unknown camera
                              // values degrade silently on older builds
```

With `camera: 'first'` the eye sits at the object plus `eyeHeight`;
`mouseLook: true` requests pointer lock — horizontal look turns the **object**
(movement follows the view), vertical pitches the camera, and leaving pointer
lock (Esc) releases the possession.

## Lifecycle

- Core modules load at boot unless disabled in the manager; user modules load
  after them. Enabling registers live. **User modules also disable, update and
  dev-reload live** — everything `register(api)` added is genuinely torn down
  and re-registered (see the manager page's *Dev mode*). Core modules still
  need a reload to disable.
- Peers exchange `{id, version}` lists on connect and toast on mismatch. The
  session still works, but that module's behavior may differ between peers —
  treat "same modules everywhere" as part of the session contract.
- `register` runs during page boot (also under SSR prerendering for core
  modules): guard `window`/`document` access, do scene work lazily.

## Testing your module

Open two browser windows to the same dev server, connect them, and check:

- [ ] Everything a user can do through your module looks identical in the
      second window.
- [ ] A window that connects *after* you did something catches up
      (state sync or derivable-from-scene).
- [ ] No `Math.random()` without a broadcast seed; no accumulation in effects.
- [ ] Receiving a message never re-broadcasts it.
- [ ] `id` and node `type`s unique; version bumped on behavior changes.

The repo's e2e suites (`tests/e2e/`, `npm run e2e`) show how to drive all of
this headlessly — `dungeon.test.cjs` and `piano-pong.test.cjs` are module
examples.
