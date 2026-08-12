# Velocity

Outputs how fast the connected object is moving right now, in metres per second.

**Output:** number

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| target | object | the object to measure — wire an [Object Selector](objectselector.md), or leave it unwired inside an object's flow to measure that object |

Reads `0` when the object is at rest, and falls back to `0` if it stops receiving movement for about half a second.

## Local, not replicated

Each peer works out its own number. On the peer running the simulation it is exact; on the others it is an approximation from the ~10 movement updates a second that arrive over the network. Close enough to drive a speedometer or a colour ramp, but **don't** use it for anything that must match exactly on every screen — for that, drive the value from something deterministic (a [Time](time.md) or [Counter](counter.md) node) instead.

## Practical example

A speedometer that glows:

1. Get something moving — throw a ball with the gizmo mid-simulation, or drive the car from the [modules](../modules.md) library.
2. In its flow: **Velocity → Map Range** (in 0–12, out 0–1) → **Set Color**, so it shifts from blue to red as it speeds up.
3. Press <kbd>P</kbd>: the faster it moves, the hotter it looks.

!!! tip
    Feed Velocity into a [Compare](compare.md) node (`> 8`) plus a [Gate](gate.md) to trigger something only above a speed threshold — a sparks burst when you're actually going fast.
