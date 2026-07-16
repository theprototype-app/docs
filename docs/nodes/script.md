# Script

Write a small piece of code that runs every frame on the connected object — the escape hatch when no built-in node fits.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a, b, c | number | optional wired values, readable in code as `data.a`, `data.b`, `data.c` |

## Parameters

| Parameter | Where |
|---|---|
| code | **Edit code** button on the card opens the side-panel editor |

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
