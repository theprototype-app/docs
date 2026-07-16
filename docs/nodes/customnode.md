# Custom Node

Your own reusable node, designed in the app: named controls plus a per-frame script — shared with everyone in the session.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

One number input socket per `range` control in the definition — so other nodes can drive your parameters.

## Parameters

Defined by you in the **Node Designer** (right-click the canvas ▸ **Custom ▸ New custom node…**):

| Field | Meaning |
|---|---|
| Name | how the node appears in the palette's *Custom* group |
| Controls | `range` (min/max/step slider) or `select` (comma-separated options) — each becomes a card control **and** arrives in code as `data.<key>` |
| Code | runs every frame: `object`, `base` (`{pos, rot, scale, visible}`), `data`, `time` |

**Save for everyone** replicates the definition to all peers; existing instances re-render and re-run live. Edit later via **Edit definition** on any instance.

## Practical example

Build a "Wobble" node once, use it everywhere:

1. Right-click ▸ Custom ▸ **New custom node…**; name it `Wobble`, keep the `speed` range control.
2. Code: `object.rotation.z = base.rot[2] + Math.sin(time * data.speed) * 0.3;` — Save for everyone.
3. Add a **Wobble** from the palette, wire it into an **Object Selector** targeting a signpost: it sways; the `speed` slider tunes it live.

!!! warning
    Custom-node code must stay deterministic (no `Math.random()`, no accumulation) — every peer runs it independently and must land on the same result.
