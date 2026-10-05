# Script

Write a small piece of code — the escape hatch when no built-in node fits. A Script node works
two ways:

- **As an effect** (the default): code that runs every frame on the connected object.
- **With typed sockets** (since 1.20): a small function with named, typed inputs and outputs —
  a value other nodes can read, like a Math or Compare node you wrote yourself.

**Output:** effect (wire into an [Object Selector](objectselector.md)), or the outputs you
declare.

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a, b, c | number | optional wired values, readable in code as `data.a`, `data.b`, `data.c` |

A node with [typed sockets](#typed-sockets) has the inputs you declare instead.

## Parameters

| Parameter | Where |
|---|---|
| code | **Edit code** on the card (or a double-click) opens it in the [code workspace](../code-workspace.md) |
| inputs / outputs | **Typed sockets…** above the code in the workspace |
| input values | the **ⓘ Params** tab of the node editor's side panel: the value each typed input uses while nothing is wired into it |

Your code receives:

- `object` — the connected THREE object,
- `base` — its logical resting transform `{pos, rot, scale, visible}` (restored before every frame — apply offsets *from* it),
- `data` — this node's data, including wired a/b/c,
- `time` — synced seconds.

Errors show on the card.

## Edit code opens the code workspace

Since 1.23 **Edit code** — or a double-click on the node — opens the script as a tab in the
[code workspace](../code-workspace.md), the same place behaviours, script files and module code open. Type,
then press <kbd>Ctrl</kbd>+<kbd>S</kbd> (or **Save**): code that does not parse is **not applied**, the
banner names the line, and the node keeps running its last good version. Tick **Live** on the tab to apply
your edits as you type instead, the way the old Script panel did.

From the same tab, **Save as file** keeps the code as a `.js` file in your Explorer that several nodes can
run, and **Use file…** runs one you already have. A Script node that a module ships bound to its own file
opens read-only, with **Make editable copy** — see [Main graph & node properties](../main-graph.md#make-editable-copy).

## Practical example

1. Add a **Script** node and an **Object Selector** targeting your cube; wire Script → Object Selector.
2. Click **Edit code** and enter:
   ```js
   object.position.y = base.pos[1] + Math.sin(time * 2) * 0.5;
   ```
3. The cube bobs — identically on every peer, because the code is a pure function of `base` and `time`.

!!! warning
    Keep scripts deterministic: no `Math.random()`, no accumulating (`rotation.y += …`). Compute everything from `base`, `data` and `time`, or peers will drift apart.

## Runaway and slow scripts

A script cannot freeze the app:

- **A loop that never ends** is stopped after a million iterations in one run, and the card shows a *Script loop limit*
  error.
- **A script that is slow every frame** — more than about 8 ms, for half a second in a row — is paused, with a
  *paused: too slow* badge on the card, so the rest of the scene keeps its frame rate. Editing its code starts it again.

If a scene's scripts hang so badly that the editor never gets a frame, open it in [safe mode](../node-system.md#safe-mode).

## Typed sockets

Press **Typed sockets…** above the code in the code workspace to declare your own sockets. **+ input** and
**+ output** add one; give each a name and a type.

| | Types |
|---|---|
| Inputs | number, boolean, vector3, color, object, event |
| Outputs | number, boolean, vector3, color, object, any |

- Read an input as **`inputs.<name>`**. Every input arrives in one shape for its type: a number,
  `true`/`false`, `[x, y, z]`, a colour string; an **object** input is `{uuid, name, position}`.
  An unwired input reads as its type's zero (`null` for an object).
- Fill the outputs by **returning** them: `return { allow: …, gap: … }`. A node with outputs is
  a **value node** — other nodes read its sockets, and the card shows each output's live value.
  It is a pure function of its inputs and `time`, so it gets no `object` to move.
- A node with inputs but no outputs is still an effect: it drives its object as before, with
  `inputs` beside `data`.
- An **any** output passes what you return through unchanged — text for a HUD Text's `format`
  socket, for example.
- The helpers `dist(a, b)`, `lerp` and `clamp` are there for you, and so is the [`api` object](#the-api-object).
- An unwired input uses the value set for it in the **ⓘ Params** tab.
- Renaming or removing a socket removes the wires that went into it. **Back to a, b, c** returns
  the node to the plain effect.

```js
// inputs: hand (vector3), piece (object), reach (number) — outputs: allow (boolean), gap (number)
if (!inputs.piece) return { allow: false, gap: 0 };
const gap = dist(inputs.hand, inputs.piece.position);
return { allow: gap <= inputs.reach, gap };
```

Outputs carry values only — a script cannot fire an event.

### Sockets follow the code

Start reading `inputs.speed`, or return `{ hit: … }`, and when you save the code the node grows that
socket (as a number; change its type in the socket list). Sockets are never removed for you, because a
wire may hang on one — remove them yourself in the socket list. This works for scripts with typed sockets;
a plain a/b/c script keeps its three inputs.

## The api object

A script with typed sockets also gets `api`:

| Call | Returns | Where |
|---|---|---|
| `api.object(uuidOrName)` | `{uuid, name, position}` or `null` | any script |
| `api.raycast(from, dir, max?)` | the first object hit, `{uuid, name, point, distance}`, or `null` (`max` defaults to 100 m) | any script |
| `api.keys()` | the keys held **on this device**, e.g. `['KeyW', 'Space']` | scripts **without outputs** (effects) |
| `api.spawn('/create sphere')` | `true` when the object is created | scripts **without outputs** (effects) |

- `api.keys()` is local input: each player holds different keys, so it is only for things that one
  player drives (a paddle whose position then reaches everyone). A value script that calls it is refused.
- `api.spawn()` takes a `/create …` command. Every player runs every effect script, so only the room's
  host creates the object, once, for everyone. It is limited to 4 a second and 50 per script (editing
  the code resets the count).

```js
// inputs: from (vector3) — outputs: hit (boolean), gap (number)
const ray = api.raycast(inputs.from, [0, -1, 0], 20);
return { hit: !!ray, gap: ray ? ray.distance : 20 };
```

### The lint

A script with typed sockets runs on every peer and must give every peer the same answer, so code
that cannot is **refused** with its line, before it runs:

| Not allowed | Instead |
|---|---|
| `Math.random`, `crypto` randomness | wire a [Random](random.md) node into an input |
| `Date.now`, `new Date()`, `performance.now` | read `time` (the synced clock) |
| the page: `document`, `window`, `navigator`, `globalThis`, `fetch`, `eval`, `new Function`, `import()`… | reach the scene through your inputs |
| storage: `localStorage`, `sessionStorage`, `indexedDB` | — this device's state is not the game's |
| timers: `setTimeout`, `setInterval`, `requestAnimationFrame`, `queueMicrotask` | compute from `time` |
| a loop with no way out (`while (true)` with no `break`, `return` or `throw`) | give it an exit |

A plain a/b/c script is not held to the lint — it keeps running as it always did — but the code
workspace shows the same findings as advice.
