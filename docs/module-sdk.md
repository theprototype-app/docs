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

Giving your module a panel or settings? Build it from the app's own parts and design
tokens so it matches every theme: see [UI kit for module authors](ui-kit.md) and the live
[kit page](https://theprototype.app/kit).

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

### The flow graph: `api.flow`

(Node positions, `freeRegion`, `onChange`, `setNodesData` and the undoable `setNodeData` are 1.15 additions.) For modules whose node needs its neighbours — a manager toolbox listing its instances, a count node reading its
siblings, a recipe that builds a wired example. Reads are deterministic because the graph is replicated; treat them like
replicated state.

```js
api.flow.nodes('collectible')   // [{id, type, graphId, x, y, data}] — graphId 'scene' or the owner's uuid;
                                //   omit the type for every node. x/y are read-only
api.flow.edges()                // [{id, source, target, sourceHandle, targetHandle, graphId}]
api.flow.nodeValue(id)          // what the node's output carries this tick (undefined if none)
api.flow.triggerStamp(id)       // {stamp, age} | null — a latch-style read, round-aware
api.flow.freeRegion({ w: 600, h: 300, graphId: 'scene' })
                                // {x, y, w, h}: where a block of new nodes fits without covering any
api.flow.addNodes({ graphId: 'scene',
	nodes: [{ type: 'onclick', x, y }, { type: 'counter', x: x + 220, y }],
	edges: [{ from: 0, to: 1, handle: 'pulse' }] })   // from/to: indices into nodes, or existing ids
                                // → the new ids. Replicated, and ONE undo step for the batch
api.flow.setNodeData(id, { step: 2 })      // replicated merge, one undo step → found?
api.flow.setNodesData([{ id, patch }, …])  // many writes, ONE undo step → how many were written
const off = api.flow.onChange(() => refreshToolbox())
                                // after any graph change or node firing, coalesced to once a frame;
                                // torn down with the module, or call off()
api.flow.seedGraph({ key: 'example', nodes: [/* … */], edges: [] })
                                // 1.23: addNodes, but only ONCE — nothing is added while any node
                                //   carries this seed or is one of your module's node types
```

`api.game.onChange(fn)` and `api.peerVars.onChange(fn)` work the same way for the game state (state, round, variables)
and for any peer's row: coalesced to one call per frame, returning `off`, released with the module.

`api.editorMode()` (1.17) returns `'edit'` or `'interact'` — this screen's click mode; `api.isPlaying()` says whether
Play is on top of it. A module with its own pointer listeners should stand down while it reads `'edit'` and nothing is
playing, so an Edit click selects its content like any object.

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

### The game shell: pause menu, levels, per-game settings (1.18)

Every game gets ONE pause menu from core — **Resume · Restart · Levels · Settings · How to
play · Main menu** — on the desktop (Escape in Play, or the corner Menu button) and in VR
(the left controller's **X**, or Menu on the game board / wrist card). You do not draw it;
you feed it. A scene counts as a game when it has a state-bound HUD screen, a spawn, or a
module publishing `userData.play` — or when your module registers levels. All of it is
feature-detected (`api.game.levels?.(…)`), LOCAL, and torn down with your module.

**Levels** — the picker on the desktop and on the VR board. Re-call it whenever a level
unlocks or earns stars; `onPick` never hears a locked level.

```js
const refresh = () =>
	api.game.levels?.({
		list: LEVELS.map((l, i) => ({ id: l.id, label: 'Level ' + (i + 1), locked: i > unlocked, stars: best[l.id] ?? 0 })),
		current: currentLevel.id,
		onPick: (id) => loadLevel(id)
	});
refresh();
onLevelWon(() => { unlocked++; refresh(); });
```

**Your own settings rows** — shown under the core rows, persisted per game on this device
(`tp:game:<game>:<id>`). `type` is `'toggle'`, `'choice'` (`options`, optional `optionLabels`)
or `'range'` (`min`, `max`, `step`). A core id is refused.

```js
api.game.addSetting?.({
	id: 'board', label: 'Board', type: 'choice',
	options: ['globe', '2d'], optionLabels: ['Globe', '2D board'], default: 'globe',
	onChange: (v) => setBoard(v)
});
setBoard(api.game.setting?.('board') ?? 'globe');            // the stored choice at load
```

A choice row with `onLevels: true` (1.19) is ALSO drawn as tabs above the Levels page in the
headset — Untangle's Globe / 2D board.

```js
api.game.setSetting?.('board', '2d');                        // your in-game button writes the same row
api.game.onSettingsChange?.((values) => console.log(values.board, values.sfx));
```

**The core rows every game has** — `music`, `musicVolume` (0..100), `sfx`, `sfxVolume`,
`haptics`, `showFps`, `turning` (`default` | `snap` | `smooth` | `off`), `turnAngle`
(`default` | `15` | `30` | `45` | `90`), `vignette`, `quality` (`auto` | `low` | `medium` |
`high`). Core obeys them itself: the per-game volumes land on the audio BUSES (so
`api.playSound`, `api.music`, flow sound nodes and the scene's track all follow), haptics,
VR turning, the comfort vignette and the quality governor read them live. A module that
plays audio through its OWN WebAudio graph should read them:

```js
const gain = ctx.createGain();
const apply = () => (gain.gain.value = api.game.setting?.('sfx') === false ? 0 : (api.game.setting?.('sfxVolume') ?? 100) / 100);
apply();
api.game.onSettingsChange?.(apply);
```

**How to play** — your words first, then the device's controls (keyboard or controllers).
Without it the menu shows the game's Games-tab description.

```js
api.game.setHelp?.([
	'Drag the dots until no two lines cross.',
	'Finish a level to unlock the next — stars for fewer moves.'
]);
```

**Restart** — the menu resets the game shell (host / alone; others carry on as it is),
respawns the player and runs your hook:

```js
api.game.onRestart?.(() => { resetBoard(); spawnWave(1); });
```

**Your own Menu button** (a module HUD, a VR board of yours):

```js
api.game.openMenu?.();          // only while playing a game; false otherwise
api.game.closeMenu?.();
if (api.game.menuOpen?.()) pauseMyTimers();
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

## For module authors: pointer, camera, play mode and VR seat

New in 1.26 — the hooks [Race](race.md) uses to drive on a phone and in a headset, open to every module. Each is torn
down with the module; feature-detect each one (`api.vrSeat?.(…)`) to stay compatible with older apps.

```js
// hear a press, its drag and its release — desktop and touch (VR keeps its trigger hooks)
const off = api.registerPointerHandler(
	{
		down(hit, ctx) { return true; },   // true OWNS the gesture
		move(hit, ctx) {},
		up(hit, ctx) {}
	},
	{ modes: ['interact', 'play'] }        // the default
);

api.onClickMiss(() => { /* a viewport click that hit nothing: drop a carried piece, disarm a tool */ });

const cam = api.camera();                  // the camera the player looks through (the XR camera in a headset), read-only

api.onPlayMode((playing) => { /* … */ });
api.inGame();                              // true in Play, or in a headset's game

api.vrSeat(carUuid, { seat: [0, 0.8, 0.3] });   // seat the VR player in an object
api.vrUnseat();
```

| Hook | What it does |
|---|---|
| `registerPointerHandler({down, move, up}, {modes})` | `hit` is `{object, point, uuid, distance}` or `null`; `ctx` is `{mode, ray, clientX, clientY, pointerType}`. When `down` returns `true` the module owns the gesture: the camera stops orbiting, nothing is selected, and Play does not carry or tap |
| `onClickMiss(fn)` | a viewport click that hit nothing. It never consumes the click |
| `camera()` | the camera the player is looking through, read-only |
| `onPlayMode(fn)` / `inGame()` | true in Play, or in a headset's game (VR play is Interact with no pointer lock). `api.isPlaying()` alone reads `false` in a headset |
| `vrSeat(uuid, {seat})` / `vrUnseat()` | seats the VR player in an object; `seat` is the object-local eye point (default `[0, 0.8, 0.3]`). The tracking space is carried with the object, and the sticks stay readable through `api.input()` |
| `input().touch` | the on-screen move stick, `{x, y}` from -1 to 1 (up is -y) |
| `input.actions(list, {preset: 'drive'})` | the vehicle layout for [touch controls](touch-controls.md#for-module-authors-declaring-actions): the stick steers, no look drag, pedals under the right thumb. A stick the module declared stays live under its own `claimInput('keys')` |

## For module authors (1.24)

Since 1.24 the app draws a game's playing HUD in a headset itself — a curved band in front of the player, or the wrist
card, whichever the player chose ([The game HUD in a headset](vr.md#the-game-hud-in-a-headset)). A module that feeds the
core HUD no longer needs a VR readout of its own.

**`api.hud.vrHud()`** tells you what the headset is doing:

```js
const vr = api.hud.vrHud?.();     // feature-detect: undefined on an app older than 1.24
// vr = { placement: 'head' | 'world' | 'wrist', visible: true | false }
if (vr) {
	// the app shows the HUD in the headset: drop your own VR-only readout
}
```

`placement` is the player's **Game HUD** setting (Follow head, Fixed in world, Wrist only); `visible` says whether the
band is up right now.

**`vrText` for your own HUD element.** An element kind you register with `api.registerHudElement(kind, def)` is DOM, and
the headset cannot show DOM. Give its def a `vrText` and the headset shows that line of text in its place:

```js
api.registerHudElement('crossings', {
	// …your mount, fields and defaults, as before…
	vrText(element, runtime) {
		return `${crossings} crossings`;   // one line of text, from your module's own state
	}
});
```

An element kind without `vrText` does not show in the headset. Untangle 2.4.1 does this for its clock and drops its old
floating VR sprite on 1.24.

Also in 1.24: VR game cards draw in one pass (they took two).

## For module and game authors (1.23)

The games rebuilt in 1.23 keep their rules in a [behaviour on the Main graph](game-rules.md) and leave
only the engine in their module. Three things make that work, and every module can use them.

**Behaviour sockets.** A behaviour may declare sockets on its node:

```js
export default behaviour({
	name: 'Mini Golf rules',
	state: { title: '', strokes: 0 },
	inputs: ['teeOff'],                  // event sockets in
	outputs: ['title', 'holeSunk'],      // a state field, and an event
	on: {
		load() { kit.levels.define({ id: 'mini-golf', list: [/* … */] }); },
		teeOff() { this.state.title = 'Hole 1'; },
		'golf.stopped'(e) { /* … */ this.emit('holeSunk'); }
	}
});
```

- `inputs: ['teeOff']` are **event** sockets. A trigger wired into one runs the handler of the same
  name in `on`, on the authority, once per press — even if the press lands while the authority is
  moving to another player.
- `outputs` are sockets out. A name that is a **state** field is a value socket, typed by its initial
  value. Any other name is an **event** socket, fired by `this.emit('holeSunk')`; it leaves after the
  state update, so every player's banner reads the new state.
- `on: { load() {…} }` runs once on **every** peer when the behaviour starts, read-only — for
  per-device setup such as `kit.levels.define(…)` for the pause menu's level picker.

**Engines: `api.kit.provide(spec, impl)`.** A module lends rules what they cannot be (a physics body, a
drag-to-aim arrow, a VR club) as a piece shaped like a [kit](#the-game-kit-apikit) piece:

```js
const golf = api.kit.provide(
	{ piece: 'golf', group: 'Mini golf (engine)', calls: [
		{ name: 'hit', kind: 'action', label: 'Hit the ball' },
		{ name: 'ballSpeed', kind: 'value', label: 'Ball speed' },
		{ name: 'stopped', kind: 'event', label: 'On ball stopped' } ] },
	{ hit(v) { /* … */ }, ballSpeed() { return speed; } }
);
golf.emit('stopped', { pos });   // every behaviour's on: { 'golf.stopped'(e) {…} } hears it
golf.listening('stopped');       // how many rules handle it (0 = none: your own default may decide)
golf.dispose();                  // take the piece away (unloading the module does this too)
```

Rules call `kit.golf.hit(…)` and handle `'golf.stopped'`; the live node view draws them like any kit
call. The handler runs on the authority, so emit on every peer that saw the moment (or on the one that
did). The piece is lifecycle-tracked: unloading the module removes it, and every behaviour that used it
reloads without it.

**A wired example: `api.flow.seedGraph`.** Like `api.flow.addNodes`, but only once: nothing is added
while any node carries the seed's key or is one of your module's node types (see
[`api.flow`](#the-flow-graph-apiflow)).

Also in 1.23: HUD Text draws its `format` socket (wire text into it), Announce takes a wired `sub` line,
and a [Script](nodes/script.md#typed-sockets) may declare an output of type `any` (text).

## New in 1.20

### Unloading: everything you registered goes with you

A module can now be unloaded and loaded again while the app runs — switched off in the Modules
manager (**core modules too**, no reload any more), removed, updated, dev-reloaded, or left
behind by a scene switch. Everything you registered through `api` is recorded per module and
undone at unload, newest first: node groups, effects, handlers, frame tasks, menus, toolboxes,
key bindings, input claims, possess, VR panels, your music, game levels / settings / help /
restart hooks, LOD handles, listeners, backends, post effects, audio device kinds and voices,
HUD rows… Every `off()` the api hands you still works, and a call that *replaces* (`api.game.levels`
on every unlock, `addSetting` with the same id) replaces its entry rather than stacking.

**What stays** is what you put into the *shared* scene — `api.create` objects, objects in
`objectsGroup`, flow nodes you added, audio devices and cables, node data — because that is user
content now. So do shared game variables and what you saved with `api.storage`.

For what only your module knows about, four tools:

```js
// your own teardown — a DOM overlay, a worker, a raw WebAudio graph; returns cancel()
api.onUnload(() => overlay.remove());

// timers that die with the module
const h = api.timers.setInterval(refresh, 500);
api.timers.clearInterval(h);
api.timers.setTimeout(fn, ms); api.timers.requestAnimationFrame(loop);
api.timers.pending();   // {timeouts, intervals, frames}

// a listener removed at unload — window, document, the canvas, anything; returns off()
const off = api.listen(window, 'keydown', onKey, true);

// a scene-root object that is YOURS: removed at unload, its GPU resources freed
api.scene().add(api.own(group));   // never for content inside objectsGroup
```

**Installed (zip / URL) modules get this for free** for the common cases: their bare
`setTimeout` / `setInterval` / `requestAnimationFrame` (and the clears) and the listeners they add
to `window` or `document` are tracked and stopped at unload. Two edges: `window.setTimeout(...)`
or a listener on any other target is not tracked — use `api.timers` / `api.listen`; and a module
that declares one of those timer names itself at top level loads without the tracking.

!!! tip "Keep state inside `register()`"
    The browser never unloads an imported file's top-level scope, so module-level variables,
    caches and DOM survive an unload and the next load starts from them. State declared inside
    `register()` is fresh every time; module-level state you must reset belongs in
    `api.onUnload`.

### Models: `api.loadModel`

Load a `.glb` / `.gltf` through the app's own loader instead of bundling one — the scene's
`THREE`, with Draco, Meshopt and KTX2 decoding (the KTX2 transcoder is fetched only for a file
that needs it), parsed **once per URL** and shared by every module that asks:

```js
const enemy = await api.loadModel('assets/enemy.glb', { castShadow: false }); // packaged file or any URL
group.add(enemy.scene);                                // your own copy
const next = enemy.instance({ ownMaterials: true });   // another copy: own bones when skinned, own materials
group.add(next);
const mixer = new api.THREE.AnimationMixer(next);
mixer.clipAction(enemy.animations.find((c) => c.name === 'walk')).play();
enemy.info;            // {meshes, triangles, materials, textures, skinned}
enemy.release(next);   // forget one copy now
enemy.dispose();       // forget them all — unloading your module does this for you
```

Options, all optional:

| Option | |
|---|---|
| `lod` | absent / `'auto'` = [automatic levels](lod.md) (a pack item that ships `lods` uses those files); `false` = none; `{ratios, distances, minTriangles}` = tuned automatic levels; `[{file, ratio}]` = pre-built level files beside the model |
| `castShadow` / `receiveShadow` | for every mesh (absent = as the file says) |
| `collider` | `'box'` `'sphere'` `'capsule'` `'cylinder'` `'cone'` `'hull'` — the physics shape a copy takes once it is scene content with physics |
| `ownMaterials` | every copy gets its own materials |

Everything a module loaded is released when it is switched off or unloaded (a copy you put in
`objectsGroup` stays — it is the scene's). A copy you drop without `release()` is noticed and
collected. A load still in flight at unload rejects, and so does a missing or unreadable file —
keep a fallback look. Feature-detect it (`typeof api.loadModel === 'function'`): 1.19 and older do
not have it.

### The game kit: `api.kit`

The [game kit](game-kit.md) — rules, round, levels, score, pickups, spawner, health, mover — is
the same for code as for the **Kit:** nodes. Call an action on any peer: the **authority** peer
applies it exactly once. Reads are replicated values; `on<Event>(fn)` fires on every peer and
returns `off`; registrations are torn down with your module.

```js
const { round, levels, score, pickups, rules } = api.kit;
rules.set({ reach: 1.3, jump: 1.0 });
rules.onGrabRequest((req) => { if (req.name === 'Star' && !starFree) req.refuse('Build to the ring first'); });
levels.define({ id: 'mygame', list: [{ id: '1', label: 'Easy', par: { time: 60 } }, { id: '2', label: 'Hard' }] });
round.configure(3, 120, 'lose', 2);                   // 3 s intro, 2 min limit, lose on time, 2 s outro
round.onGo(() => api.announce('Go!'));
pickups.register({ id: gem.uuid, score: 10, respawn: 8, grants: { time: 5 } });
pickups.onCollected(({ by }) => api.playSound('coin'));
round.onWon(() => levels.complete(true, score.total()));
levels.select('1'); round.start();
```

| Piece | Actions | Reads | Events |
|---|---|---|---|
| `rules` | `setReach(m)` `setJump(m)` `setBounds(min, max)` `clearRules()` · `set({reach, jump, bounds})` | `reach()` `jump()` `current()` `inside(p)` `clamp(p)` `checkGrab(req)` | `refused` (local) · `onGrabRequest(fn)` veto |
| `round` | `configure(intro, limit, 'lose'\|'win', outro)` `start()` `restart()` `pause()` `resume()` `win(reason)` `lose(reason)` `extend(s)` `toMenu()` | `phase()` `playing()` `elapsed()` `remaining()` `countdown()` `number()` `outcome()` `state()` `running()` | `started` `go` `paused` `resumed` `won` `lost` `results` `menu` |
| `levels` | `select(id)` `next()` `complete(won, score, time, level?, detail?)` `setMode(m)` · `define({id, list, unlock?, stars?, store?, merge?})` | `current()` `currentLabel()` `index()` `starsOf(id)` `unlocked(id)` `totalStars()` `mode()` `table()` `progress()` `resumeLevel()` | `selected` `completed` `unlockedNext` |
| `score` | `add(n, player?)` `set(n, player?)` `reset()` · `configure({autoReset})` `useGame(id)` | `total()` `mine()` `best()` `leader()` `of(id)` `leaderboard(n)` `results()` | `scored` `newBest` (local) |
| `pickups` | `collect(id, score?, respawn?)` `resetPickups()` · `register({id, score, respawn, radius, grants})` | `available(id)` `taken()` `left()` `takenBy(id)` | `collected` `respawned` `allCollected` |
| `spawner` | `spawn({kind, template, at, count, spread, hp, speed, removeAfter, tags, data, mover})` → ids · `despawn(id)` `clear(kind)` `setTags` `setData` | `count(kind)` `list(filter)` `get(id)` | `spawned` `despawned` `emptied` |
| `health` | `damage(id, n)` `damageArea(at, r, n, kind)` `heal(id, n)` `revive(id)` | `hp(id)` `max(id)` `fraction(id)` `alive(id)` | `damaged` `healed` `died` `revived` |
| `mover` | `chase(kind, target)` `seek(id, target, {speed, reach})` `arrive(…)` `patrol(id, path, loop)` `stop(id)` `halt(kind)` `knock(id, [vx, vy, vz])` `setSpeed(id, s)` | `state(id)` | `stuck` |

- `levels` feeds the pause menu's level picker — do not also call `api.game.levels`. Progress is
  per device; `store: {get, set}` keeps your own save key.
- `score` credits the asking peer unless a player is named — a shared pulse is asked by every
  peer, so name the player when it matters who.
- A `chase` target is an object uuid, `'player'`, `'nearestPlayer'`, `'player:<id>'` or an entity
  id. Health events carry `{entity, amount?, by?, authority}` — change game state only where
  `authority` is true.
- Entities you spawn leave with your module.

### Behaviours

Game logic can also live in the scene as a [behaviour](behaviours.md): one small file in a
Behaviour node, run on the authority with replicated state, calling the same `kit`. Since 1.23 a
behaviour can have sockets and call a module's engine — see
[For module and game authors](#for-module-and-game-authors-123). Each
behaviour is tracked like a module of its own, so deleting its node takes its listeners and
entities with it.

## New in 1.18

- **`api.quality`** — the quality governor's view of this machine: `level`, `max`, `labels` (the steps in force), `vr`,
  and `onChange(fn)` → `off`, called as `fn(level, {max, labels, reason, vr})` on every change. LOCAL: drop your own
  extras on a struggling device, never change shared state from it.
- **`api.vrPanel(group)`** — make a group (your VR menu, level bar, buttons) a VR panel: drawn over the scene so a floor
  or a wall never hides it, and a place the controller beam ends with its dot. Returns the undo (also run when your
  module is disabled). Feature-detect: `api.vrPanel?.(group)`.
- **`api.locomotion`** — `{boundedTeleport: true, worldGrab: true}` on a core that understands the two scene-data fields
  below; an older core has no object.
- **`api.lod(object, opts)`** — automatic levels of detail for meshes you build yourself: `opts` =
  `{ratios, distances, minTriangles}` (ratios default `[0.5, 0.25, 0.1]` of the triangles; distances in world radii of
  the mesh, default `[8, 20, 50]`). Returns `{meshes, ready, remove}`; local, never replicated, released with the module.
  Skinned and morphing meshes are skipped; `mesh.userData.lod = false` keeps one out.

**Scene data a game can publish on its scene group (`userData.play`)**, alongside the existing `interaction`, `grounded`
and `simOnPlay`:

| Field | Meaning |
|---|---|
| `reach` | grab reach in metres from the player's body (absent = no limit) — the *Limit grab reach* row |
| `locomotion.worldGrab` | `true` gives VR grips Edit's world gestures (move, turn, scale the scene) in Interact and Play |
| `locomotion.teleport` + `play.bounds {min, max}` | teleport in Interact/Play lands only on walkable ground inside `play.bounds` (else the content's box), never through a wall |

## New in 1.19

- **`api.inScene()`** — false once a scene switch LEFT your module behind (the person chose *Keep*
  when opening a scene that does not use you). Core already keeps your levels, help, settings rows,
  Restart, music and spawn out of the new game; stand your own drawing and listening down while it
  reads false (a gun in the hand, a HUD of your own).
- **`api.behavior`** — `list()` (the functional pack items in the scene: doors, lids, levers, with
  their type and whether they are open), `state(uuid)` and `trigger(uuid, open?)` (open, close or
  toggle one — replicated like a click).
- **`api.claimInput('sticks')`** — claim BOTH VR thumbsticks (move, turn, teleport stand down) to
  read `input().axes` yourself; returns true on a core that knows the scope, so feature-detect it.
- **`api.lod(object)`** handles gain `force(n)` (pin a level; `null` back to automatic) and
  `levels()`.
- `api.music` is owned by your module: `stop()` stops only your track, and unloading your module
  stops it.

## Lifecycle

- Core modules load at boot unless disabled in the manager; user modules load
  after them. Enabling registers live. **Modules disable, update and dev-reload
  live** — everything `register(api)` added is genuinely torn down and
  re-registered (see the manager page's *Dev mode*). Since 1.20 that includes
  core modules, which no longer need a reload to disable; see
  [Unloading](#unloading-everything-you-registered-goes-with-you).
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
