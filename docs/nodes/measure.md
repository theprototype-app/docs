# Measure

Reads a number off an object: how tall it is, where its top is, how fast it is going.

**Input:** `target` (object)
**Output:** number

## How it works

Measure reports one number at a time, picked by the `read` parameter. Sizes come from the object's **collider shape** — the same measurement the physics engine builds its body from — so what you read is what the simulation uses, and it costs nothing per frame.

Like [Velocity](velocity.md), it is a local readout: every peer computes it from data everyone already has, so it puts nothing on the wire.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| read | top | `top` — the world Y of the object's highest point<br>`bottom` — the world Y of its lowest<br>`height` — how tall it is<br>`y` — the object's own position Y<br>`speed` — how fast it is moving (m/s) |

## Choosing the object

Wire an [Object Selector](objectselector.md) into `target`, or drop the node unwired inside an object's own flow to read that object.

## Practical example

**"Is the stack tall enough?"**

1. **Object Selector** (the top crate) → **Measure** `target`, `read` = *top*.
2. **Measure → [Compare](compare.md)** `a`, with `b` = 3 and `op` = *greater than*.
3. The Compare output is a boolean you can wire into a [Gate](gate.md), a [Visibility](visibility.md) node for a "win" sign, or a [HUD](../node-system.md) readout.

**A speedometer.** `read` = *speed* → [Map Range](maprange.md) (0…20 → 0…1) → a [Set Color](setcolor.md) that reddens as the object goes faster.

**Where does it rest?** `read` = *bottom* tells you whether a crate is actually sitting on a pad or hovering above it.

!!! note
    `speed` is exact on the peer running the simulation and a close approximation elsewhere, because other peers derive it from the ~10 Hz position stream. Anything that must agree exactly between peers should be decided on the simulating peer.

## See also

- [Velocity](velocity.md) — speed only, same local-readout rule
- [Distance](distance.md) — how far apart two objects are
