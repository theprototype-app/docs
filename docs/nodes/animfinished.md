# Animation Finished

Pulses when a *once* [clip](../animation.md) reaches its end — the other half of [Play Animation](playanim.md), so a movement can hand off to whatever comes next.

**Output:** event — 1 for a short window when the clip finishes, 0 otherwise.

## Inputs

None.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| clip | *(the active clip)* | which clip to watch — leave empty for whichever is playing |
| pulse | 0.3 s | how long the output stays at 1 |

## Which object?

Inside an object flow it watches that object's clips. Elsewhere, connect an [Object Selector](objectselector.md).

A **looping** clip never finishes, so it never fires. Use [Animation Marker](animmarker.md) for a moment *inside* a loop.

## Everyone agrees, with no message

Each peer's runtime reaches the end of the clip at the same moment on the shared clock, so the pulse is raised **locally on every peer** rather than broadcast. Nothing to lose, nothing to wait for.

## Practical example

A two-stage airlock:

1. Inner door: **On Click** → **Play Animation** (`play`).
2. Add an **Animation Finished** watching that clip.
3. Wire it into the outer door's **Play Animation** (`play`).

The outer door starts the instant the inner one has finished, everywhere.

!!! tip
    Wire it into a [Counter](counter.md) to count completed cycles, or into a [Sound](sound.md) node for a latch click at the end of a movement.
