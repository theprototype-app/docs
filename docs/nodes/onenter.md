# On Enter

Fires a pulse when something **enters** a trigger volume — the checkpoint, doorway and pressure-plate node. The player
counts too: whoever walks in, on any peer, fires it.

**Output:** event (wire into a [Particles](particle.md) trigger, a [Counter](counter.md), a [Set Color](setcolor.md), or an [Object Selector](objectselector.md))

## Setting up a trigger volume

A trigger volume is an object whose collider is a **sensor**: things pass straight through it, but overlaps are reported. Two ways to make one:

- Inspector ▸ **Physics ▸ Sensor** on the object, or
- a [Collider](collider.md) node with **sensor** on, wired to the object.

Scale a box over your doorway, make it a sensor, and hide it (Inspector ▸ visibility) if you don't want it seen.

## How it works

While a simulation runs, the peer stepping the physics detects the overlap starting and pulses the node for **everyone** (the same replicated trigger stamp [On Click](onclick.md) uses). Each pair fires once per entry — re-entering fires again.

*Since 1.64:*

- **The player counts.** A player walking into the volume fires it, on whichever peer they play — joiners too — with
  **other** = `player`. Use **who** to narrow it.
- **A level of walls and floors works in Play.** A scene made only of static objects starts its physics world when Play
  starts, so you do not need to run a simulation for a doorway to notice you.
- Leaving Play while you stand inside does **not** fire [On Exit](onexit.md).

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| who | any | **any** = objects and the player; **player** = only a player walking in; **objects** = only bodies |
| pulse | 0.3 | how long the pulse stays high (seconds) |

## Targeting

Like On Click, the node acts on the object it *reaches* in the graph: wire it into an [Object Selector](objectselector.md), or drop it unwired inside an object's own flow to target that object.

## Only with, and other

Wire an [Object Selector](objectselector.md) into **only with** and the node fires only when the *other* body is that
object (or a spawned copy of it). The **other** output carries the body it touched — wire it into [Look At](lookat.md),
[Distance](distance.md) and the like. The other body travels with the trigger, so every peer reads the same object. A
contact with the ground plane reports an empty *other*. Since 1.22 the node sits in the palette's **Physics** group. See
[Contact filters](../colliders.md#contact-filters-only-with-and-other).

## Practical example

A checkpoint that celebrates:

1. Add a box over your track, scale it into a gate, tick **Physics ▸ Sensor**.
2. In its flow: **On Enter → Particles** (`trigger` input, emission *burst*, preset *Confetti*) and **On Enter → Counter** to count laps.
3. Press <kbd>P</kbd> and drive or throw something through the gate.

!!! tip
    Pair with [On Exit](onexit.md) to know when the object leaves again — e.g. a door that opens on enter and closes on exit.
    The [walk-up door recipe](../recipe-walk-up-door.md) builds exactly that around a door in one step.

!!! tip "It does not fire?"
    The card's live line says why — *blocked: not the player*, *won't fire: physics is not running*… — and the Flow
    debugger says it in full. See [Why did this not fire?](../debugger.md#why-did-this-not-fire).

