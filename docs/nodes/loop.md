# Loop

Sweeps a number from one value to another over time, repeating — a ready-made animation ramp.

**Output:** number

## Inputs

None.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| from / to | 0 / 1 | the swept range |
| rate | 1 | sweeps per second |
| mode | wrap | `wrap` (snap back and restart), `pingpong` (bounce back and forth), `once` (run to the end and stay) |

Driven by the synced clock, so the sweep is at the same point for every peer.

## Practical example

A searchlight that pans back and forth:

1. Add a **Loop**: from 0, to 3, rate 0.3, mode `pingpong`.
2. Add an **Orbit** node and an **Object Selector** targeting the light's visible housing.
3. Wire Loop → Orbit's **radius** input, and Orbit → Object Selector.
4. The object now swings out to radius 3 and back in a smooth cycle.

!!! tip
    Loop is like [Time](time.md) with the range built in — reach for it when you'd otherwise chain Time → Map Range.
