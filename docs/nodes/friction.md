# Friction

Sets how much the connected object grips surfaces in the physics simulation.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| value | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| value | 0.5 | 0–1 — 0 slides like ice, 1 grips hard |

## Practical example

An ice patch:

1. Build a ramp from a rotated cube and place a box at its top.
2. Wire a **Mass** node (kg 2) and a **Friction** node into an **Object Selector** picking the box.
3. Set Friction to 0.05 and right-click ▸ **Tools ▸ ▶ Simulate physics**: the box glides down and far past the ramp. Re-run with friction 0.9 and it barely creeps.

!!! tip
    Like all physics nodes, Friction is read **once at simulation start** — tweak, re-simulate, compare. The run replicates: one peer simulates, everyone sees the same motion.
