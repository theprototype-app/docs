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

// 1.17: which editor modes a handler runs in — 'edit' | 'interact' | 'play'. ABSENT means
// ['interact', 'play']: an Edit click selects your game piece like any object, and Interact
// (the I key) and Play press it. An editor TOOL passes { modes: ['edit'] }.
api.registerClickHandler(pressKey, { modes: ['interact', 'play'] });

// 1.17: a readable row for your scene-root content in the object list's Module content section
api.registerListedGroup('mymodule-stage', { label: 'My stage' });

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

### Audio devices

An instrument, an effect or a speaker is a **device**: an object carrying
`userData.device = {kind, params}` with a WebAudio subgraph the engine builds for it.
Your module supplies the *kind*; core supplies the object, replication, undo, saving,
the cables and the clock (see the [Music Playground](music.md)).

```js
const kind = await api.registerAudioDevice({
	kind: 'piano',                 // namespaced for you: 'mod-<moduleId>-piano'
	label: 'Piano', icon: '🎹', group: 'Keys',   // Add ▸ Devices: Keys
	ports: { in: [], out: [{ id: 'out', label: 'Out', kind: 'audio' }] },
	params: [
		{ key: 'level', label: 'Level', kind: 'range', min: 0, max: 1, step: 0.01, default: 0.8 },
		{ key: 'wave',  label: 'Wave',  kind: 'select', default: 'sine',
		  options: [{ value: 'sine', label: 'Sine' }, { value: 'saw', label: 'Saw' }] }
	],
	build(ctx, node, params) {     // ctx is the SHARED AudioContext — never make your own
		const gain = ctx.createGain(); gain.gain.value = params.level;
		return { input: null, output: gain, dispose: () => gain.disconnect() };
	},
	onParam(handle, key, value, node) { if (key === 'level') handle.output.gain.value = value; },
	onNote(handle, { note, velocity, at }, node) { /* start a voice at `at` */ },
	mesh: (THREE, spec) => new THREE.Mesh(...),          // optional; a box otherwise
	assets: (params) => params.sample ? [{ hash: params.sample }] : []  // what the scene manifest must carry
});
api.audio.addDevice(kind, { position: [0, 1, 0] });
```

The kind appears in the viewport's **Add ▸ Devices** menu (or **Devices: ‹group›**), the
params render in the Inspector's Device section and the Music toolbox, and every write
replicates and undoes. A peer **without** your module holds the same object as an inert
placeholder with its document intact, and the scene's module list names your module as a
requirement, so loading it offers to install you. Keep `build` pure and `onParam` cheap.

`api.audio` is the engine, the shared clock and the patch:

```js
api.audio.context()                    // the shared AudioContext
api.audio.bus('instruments')           // a named bus: music / sfx / voice / instruments
api.audio.voice({ buffer })            // an engine voice {output, start(at), stop(at), dispose()}
api.audio.sample(hash, { timeoutMs })  // a decoded AudioBuffer for an Explorer content hash
api.audio.timeFor(wallMs)              // audio-clock time of a replicated `at` stamp

api.audio.transport()                  // {bpm, beat, bar, step, phase, playing, loopBeats, swing}
api.audio.play(true); api.audio.setBpm(124);          // replicated
api.audio.schedule(beat, ({ beat, at, bpm, bar }) => { /* start voices at `at` */ }, { every: 4 });

api.audio.addDevice(kind, { position, params, name });
api.audio.device(uuid)                 // {kind, params} or null
api.audio.setParams(uuid, params, { before });        // replicated, one undo step
api.audio.previewParams(uuid, params); // live gesture: replicated, NO history
api.audio.note(uuid, { note, velocity, at });
api.audio.cable({ from: { uuid, port }, to: { uuid, port } }); api.audio.uncable(id);

api.audio.captureMic()                 // the RAW mic, separate from voice chat
api.audio.record({ maxSeconds, name, stream }); api.audio.stopRecording();
```

**Live previews.** A knob is a gesture: capture the document when it starts, stream
`previewParams` while it moves (throttle it — core sends every 66 ms), then commit once
with `setParams(..., { before })`. That is the only way a scrub becomes a single undo
step, and it is what the toolbox and the Inspector do themselves.

```js
const before = api.audio.device(uuid);           // gesture starts
api.audio.previewParams(uuid, { level: v });     // while it moves
api.audio.setParams(uuid, { level: v }, { before });  // release: one entry
```

**Scheduling is deterministic.** Everything on the transport runs on every peer from the
same document, so `schedule`'s callback must be a pure function of its arguments — an
impure one desyncs silently.

#### registerDropHandler

Core has no placement for an audio or text item dropped on an object, so a module can
claim the drop — a sample onto a pad, a script onto a console:

```js
api.registerDropHandler((hit, item, target) => {
	// hit: the exact mesh under the drop · item: {id, name, kind, hash} · target: the resolved object
	if (item.kind !== 'audio' || !hit.userData.pad) return false;
	api.audio.setParams(deviceOf(hit).uuid, { ['pad' + hit.userData.pad]: item.hash });
	return true;                                  // consumed
});
```

The first handler to return `true` owns the drop; when nobody does, the user is told the
item is used where it plugs in. Feed `item.hash` to `api.audio.sample`.

#### Content feeds

The Templates, Modules gallery and Packs feeds each read a base URL that a build can
redirect — `VITE_SCENES_BASE`, `VITE_MODULES_BASE`, `VITE_PACKS_BASE` — so content can be
tested against a fork before it is published. Unset, each is the public jsDelivr feed.

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

### Storage (1.17)

```js
// JSON on THIS device, namespaced to your module (tp:mod:<id>:<key>), 256 KB per module.
// Never sent to other players, never saved into a scene; survives disable and remove.
if (api.storage) {
	const p = api.storage.get('progress', { unlocked: 1 }); // fallback when nothing is saved
	api.storage.set('progress', p);  // true, or false over the quota
	api.storage.keys(); api.storage.bytes(); api.storage.remove('progress');
	api.storage.clear();             // your "Reset progress"
}
```

Feature-detect it. On an older app write the same key yourself
(`localStorage['tp:mod:<id>:<key>'] = JSON.stringify(value)`) and progress carries over.

A board, puzzle or instrument game can ask for the **free cursor** in Play (no pointer lock)
by publishing `userData.play.cursor = 'free'` on its scene-root group. `api.pointerRay()` is
then the cursor's ray; in a pointer-locked game it is the crosshair ray.

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
api.keyOf(event)     // 'G', 'Ctrl'-less key name, layout-independent — the app's own rule:
                     // the printed ASCII letter when there is one, else the physical key
api.letterOf(event)  // the same for a bare letter, or null — use it in your own keydown
                     // handlers so a Cyrillic or Greek layout reaches your shortcuts too
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

### The knock

When [the knock](physics.md#the-knock) is on for the scene, every hit a hand or a
player lands on a physics body is reported to every peer. A module can listen to
that feed, or read the recent ones — which is what the football module's
last-touch rule stands on.

```js
const off = api.onHit((hit) => { /* … */ });   // returns the unsubscribe
off();                                          // …or let the teardown do it

api.hitLog()   // { last: {uuid: hit, …}, recent: [hit, …] }
```

One hit looks like this:

| Field | |
|---|---|
| `uuid` | the object that was hit |
| `by` | the peer whose hand or camera hit it (empty when you are alone) |
| `local` | `true` on the peer it *was* — the one whose probe landed the hit |
| `speed` | how hard, in m/s |
| `point` | `[x, y, z]`, where it was hit |
| `linvel` / `angvel` | the velocity and spin the hit gave it |
| `at` | the session timestamp — the same number on every peer |
| `probe` | which probe it was: `'left'`, `'right'` or `'head'` (the desktop camera) |

`onHit` fires for your own hits and for every peer's, as each `hit` message is
applied, so a rule derived from it agrees everywhere without a message of your own.
It returns an unsubscribe, and is torn down with the module either way.

`hitLog()` hands back a **copy**: `last` is the most recent hit per object still in
the scene, keyed by uuid, and `recent` is the last 32 hits in order. It is runtime
state — a late joiner's log starts empty, so a module that needs history keeps its
own through `registerStateSync`.

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
