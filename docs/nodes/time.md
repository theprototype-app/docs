# Time

The synced clock as a value — the heartbeat behind almost every animation recipe.

**Output:** number (live readout on the card)

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| mode | sin | dropdown on the card: `t (seconds)`, `sin`, `saw`, `pingpong` |
| rate | 1 | slider on the card (0.1–5) — time multiplier |

Modes: **t** = raw seconds (ever-growing), **sin** = smooth wave −1…1, **saw** = ramp 0…1 that snaps back, **pingpong** = 0…1…0 triangle. All peers read the same shared clock, so the phase matches everywhere.

## Practical example

Make a cube's spin "breathe":

1. Add a **Time** node (mode `sin`).
2. Add a **Map Range** node: in −1…1 → out 0.2…2.
3. Wire Time → Map Range's **a**, Map Range → a **Spin** node's **speed** input, and Spin → an **Object Selector** targeting your cube.
4. The spin speed now swells and eases in a smooth loop.

!!! tip
    `sin` is centered on zero — pass it through [Map Range](maprange.md) whenever a parameter wants a positive range.
