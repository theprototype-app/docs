# Behaviours

Some game logic is easier to write than to wire: a loop over waves, a rule with three
exceptions, a timer that calls itself. A **behaviour** is that logic as **one small JavaScript
file** inside a node — and the app draws it back as nodes, with live values, so you can still
*see* it run.

A behaviour is built on the [game kit](game-kit.md): it listens to kit events (a round starting,
an entity dying, a pickup taken) and acts through the same `kit` calls the **Kit:** nodes make.

## The Behaviour node

Add a **Behaviour** node from the palette's **Logic** group, to the Scene flow or to an object's
own flow (then the behaviour knows that object as `this.object`). It has no sockets unless the
file declares some (1.23, see [For module and game authors](module-sdk.md#for-module-and-game-authors-123)).
Its card shows the behaviour's name and whether it is **running** (and with how many handlers),
still loading, stopped, or in error — an error names the line.

- **Open view** opens the [live node view](#the-live-node-view).
- **Code** — or a double-click on the node — opens the file in the [code workspace](code-workspace.md);
  <kbd>Ctrl</kbd>+<kbd>S</kbd> reloads it, and code that does not parse is not applied.
- **Stop** / **Run** switches the behaviour off and on; its state is kept.
- Its `params` are also in the node editor's **ⓘ Params** tab: changing one there rewrites the number
  in the code, as one undo step.

Every game rebuilt in 1.23 keeps its rules in one of these — see
[Game rules on the Main graph](game-rules.md).

A new Behaviour node starts with a small working example (a countdown that loses the round when
it reaches zero), so the format is there to copy from.

## The file

```js
export default behaviour({
	name: 'Waves spawner',
	params: {
		waves: { value: 5, min: 1, max: 15, step: 1 },
		interval: { value: 3, min: 0, max: 30, step: 0.5, unit: 's' },
		speed: { value: 1.3, min: 0, max: 6, step: 0.1, unit: 'm/s' }
	},
	state: { wave: 0, alive: 0 },
	on: {
		go() {
			this.startWave(1);
		},
		died({ entity }) {
			if (!entity.is('robot')) return;
			this.state.alive = Math.max(0, this.state.alive - 1);
			if (this.state.alive === 0) this.after(this.params.interval, 'startWave', this.state.wave + 1);
		}
	},
	startWave(n) {
		if (n > this.params.waves) return kit.round.win('All waves cleared');
		this.state.wave = n;
		this.state.alive = n + 1;
		kit.spawner.spawn({
			kind: 'robot',
			template: this.find('Robot')?.uuid ?? '',
			at: this.find('Spawn*')?.pos,
			count: this.state.alive,
			mover: { speed: this.params.speed }
		});
		kit.mover.chase('robot', 'nearestPlayer');
	}
});
```

When the round's intro ends, wave 1 brings two robots that chase the nearest player; when the last
one dies, the next wave comes a few seconds later, one robot bigger; after the last wave the round
is won. (Adapted from `static/behaviours/waves-spawner.js` in the core repo; its neighbour
`towers-reach.js` is Towers' reach rule as a behaviour.)

| Part | What it is |
|---|---|
| `params` | Numbers you want to tune: a literal (`waves: 5`) or `{value, min, max, step, unit}`. Read as `this.params.waves`. Each one becomes a knob in the node view. |
| `state` | Plain JSON the game keeps — every peer can read it. |
| `on` | Event handlers: `start` (once per session), `load` (1.23: once on every peer, read-only), every kit event (`go`, `won`, `lost`, `died`, `damaged`, `spawned`, `emptied`, `scored`, `collected`, `stuck`, `grabRefused`…, or the full `'piece.event'` name), and `grabRequest` — the grab veto, see below. |
| `inputs` / `outputs` | (1.23, optional) Sockets on the node: event inputs that run the handler of the same name, and outputs that carry a state field or an event fired by `this.emit(name)`. |
| methods | Any other function in the file (`startWave` above), called as `this.startWave(…)`. |

Inside the file, `this` offers:

- `params`, `state`, `object` and `kit` (also available as plain `kit`);
- `after(seconds, 'method', ...args)` and `cancel(key)` — timers on the session clock;
- `rand()`, `randInt(a, b)`, `pick(list)` — random numbers every peer agrees on;
- `now()`, `find(glob)` / `findAll(glob)` — scene objects by name or tag, as
  `{uuid, name, pos, tags}`;
- `isAuthority()`, `me()`, `log(...)`;
- and the helpers `dist(a, b)`, `clamp` and `lerp`.

An entity in an event's payload answers `is(glob)` and `hasTag(tag)`.

## Who runs it

A behaviour's handlers run on **one** peer — the kit's [authority](game-kit.md#one-peer-decides)
— and after each one the state is sent to everybody. A player who joins later receives it, and
when the authority leaves the next one carries on from it. Timers survive that hand-over too, as
long as they name a method (`this.after(3, 'startWave', 2)`); a timer given a function does not.

The one exception is `grabRequest({ piece, distance, refuse })`: it is asked on the **grabbing**
player's device, before the grab happens, so it only reads and refuses:

```js
on: {
	grabRequest({ piece, distance, refuse }) {
		if (piece.hasTag('ground')) return;
		if (distance > this.params.reach) refuse('Too far - climb closer');
	}
}
```

Editing the code swaps the definition and the game keeps running. Deleting or stopping the node
takes away what it set up — its kit listeners and the entities it spawned.

## The determinism lint

Every peer must reach the same result, so a file that would make them disagree — or reach outside
the game — does not load. The lint names the line, on every peer. It refuses:

- `Math.random` (use `this.rand()` and friends), `Date`, `Date.now`, `performance.now`;
- storage, the page (`window`, `document`, `globalThis`), the network;
- `eval` / `Function`, bare timers (use `this.after`), `import`.

Loops run under the loop guard: a runaway handler throws and the game goes on.

## The live node view

**Open view** draws the behaviour as read-only nodes, derived from the code: ⚡ events → ƒ
handlers and methods → ▣ state, with ⊕ kit calls (named exactly like the **Kit:** nodes),
⏱ timers, ✋ payload actions, and ◆ params.

- **Live values**, ten times a second.
- A **glow** on whatever just fired — on every peer, not only the one running it.
- **Timer countdowns**, and **errors** with their line.
- **Knobs** on the params: dragging one previews the value on your device; releasing it rewrites
  the number in the code — one edit, **one undo step** — and everybody's copy reloads with it.

Anything else is changed in the code (the view's **Code** panel, or the
[code workspace](code-workspace.md)); **← Graph** goes back to the flow.

## Writing behaviours with the AI assistant

The [AI assistant](ai/assistant.md) can write and change behaviours for you (its
`create_behaviour` and `edit_behaviour` tools). What it writes goes through the same lint before
it is applied, so a suggestion that would make peers disagree is refused rather than loaded.

## For developers

A behaviour can be proved without a browser on the core repo's logic sim
(`tests/unit/sim/behaviourSim.js`): load the source, drive the kit, assert the state. See
*Behaviours* in the core repo's `MODULES.md`.
