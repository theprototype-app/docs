# On Enter

Fires a pulse when something **enters** a trigger volume — the checkpoint, doorway and pressure-plate node.

**Output:** event (wire into a [Particles](particle.md) trigger, a [Counter](counter.md), a [Set Color](setcolor.md), or an [Object Selector](objectselector.md))

## Setting up a trigger volume

A trigger volume is an object whose collider is a **sensor**: things pass straight through it, but overlaps are reported. Two ways to make one:

- Inspector ▸ **Physics ▸ Sensor** on the object, or
- a [Collider](collider.md) node with **sensor** on, wired to the object.

Scale a box over your doorway, make it a sensor, and hide it (Inspector ▸ visibility) if you don't want it seen.

## How it works

While a simulation runs, the peer stepping the physics detects the overlap starting and pulses the node for **everyone** (the same replicated trigger stamp [On Click](onclick.md) uses). Each pair fires once per entry — re-entering fires again.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| pulse | 0.3 | how long the pulse stays high (seconds) |

## Targeting

Like On Click, the node acts on the object it *reaches* in the graph: wire it into an [Object Selector](objectselector.md), or drop it unwired inside an object's own flow to target that object.

## Practical example

A checkpoint that celebrates:

1. Add a box over your track, scale it into a gate, tick **Physics ▸ Sensor**.
2. In its flow: **On Enter → Particles** (`trigger` input, emission *burst*, preset *Confetti*) and **On Enter → Counter** to count laps.
3. Press <kbd>P</kbd> and drive or throw something through the gate.

!!! tip
    Pair with [On Exit](onexit.md) to know when the object leaves again — e.g. a door that opens on enter and closes on exit.
