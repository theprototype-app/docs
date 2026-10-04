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
| code | **Edit code** button on the card opens the side-panel editor |
| inputs / outputs | **Typed sockets…** in the same panel |

Your code receives:

- `object` — the connected THREE object,
- `base` — its logical resting transform `{pos, rot, scale, visible}` (restored before every frame — apply offsets *from* it),
- `data` — this node's data, including wired a/b/c,
- `time` — synced seconds.

Errors show on the card.

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

Press **Typed sockets…** in the Script panel to declare your own sockets. **+ input** and
**+ output** add one; give each a name and a type.

| | Types |
|---|---|
| Inputs | number, boolean, vector3, color, object, event |
| Outputs | number, boolean, vector3, color, object |

- Read an input as **`inputs.<name>`**. Every input arrives in one shape for its type: a number,
  `true`/`false`, `[x, y, z]`, a colour string; an **object** input is `{uuid, name, position}`.
  An unwired input reads as its type's zero (`null` for an object).
- Fill the outputs by **returning** them: `return { allow: …, gap: … }`. A node with outputs is
  a **value node** — other nodes read its sockets, and the card shows each output's live value.
  It is a pure function of its inputs and `time`, so it gets no `object` to move.
- A node with inputs but no outputs is still an effect: it drives its object as before, with
  `inputs` beside `data`.
- The helpers `dist(a, b)`, `lerp` and `clamp` are there for you.
- Renaming or removing a socket removes the wires that went into it. **Back to a, b, c** returns
  the node to the plain effect.

```js
// inputs: hand (vector3), piece (object), reach (number) — outputs: allow (boolean), gap (number)
if (!inputs.piece) return { allow: false, gap: 0 };
const gap = dist(inputs.hand, inputs.piece.position);
return { allow: gap <= inputs.reach, gap };
```

Outputs carry values only — a script cannot fire an event.

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

A plain a/b/c script is not held to the lint — it keeps running as it always did — but the panel
shows the same findings as advice.
