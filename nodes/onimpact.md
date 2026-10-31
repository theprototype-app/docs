# On Impact

Fires a pulse when, in a [physics simulation](https://docs.theprototype.app/physics.md), the connected object hits something — from any side, or
only when it lands (the **From** option).

**Output:** event (wire into a [Particles](https://docs.theprototype.app/nodes/particle.md) trigger, a [Counter](https://docs.theprototype.app/nodes/counter.md), or an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md))

## How it works

While a simulation runs, the peer stepping the physics detects each real contact — a falling crate hitting the floor, a thrown ball hitting a wall — and pulses this node for **everyone** (the trigger rides the same replicated stamp as [On Click](https://docs.theprototype.app/nodes/onclick.md)). Gentle settling and rolling are filtered out: the two objects must close fast enough along the contact (or, with **From: landing only**, the object must actually be falling), and each object has a short cooldown so bounces don't spam.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| minStrength | 1 | minimum impact speed (m/s, along the contact; downward with *landing only*) — raise it so only hard hits count |
| direction (**From**) | any side | *any side*: a hit from any direction — a ball thrown at a wall or a target; *landing only*: landings only (before 1.45 every On Impact worked this way) |

*New in 1.45.* **From: any side** is the default for a new node. On Impact nodes in scenes saved before 1.45 keep
*landing only*, so they fire exactly as they did.

## Targeting

Like On Click, the node fires for the object it *reaches* in the graph: wire it into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) (directly or through other nodes), or drop it unwired inside an object's own flow to target that object.

## Only with, and other

Wire an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) into **only with** and the node fires only when the *other* body is that
object (or a spawned copy of it). The **other** output carries the body it touched — wire it into [Look At](https://docs.theprototype.app/nodes/lookat.md),
[Distance](https://docs.theprototype.app/nodes/distance.md) and the like. The other body travels with the trigger, so every peer reads the same object. A
contact with the ground plane reports an empty *other*. Since 1.22 the node sits in the palette's **Physics** group. See
[Contact filters](https://docs.theprototype.app/colliders.md#contact-filters-only-with-and-other).

## On the object that was hit

*New in 1.40.* On Impact also fires on a **static** or **kinematic** (flow-animated) object when a falling body lands on
it — a pressure plate, a target, a moving platform — with **other** = the body that landed. Put On Impact in the
plate's own flow and it fires when a crate drops onto it. Two **dynamic** bodies still fire only for the one that was
falling, so nothing fires twice.

The threshold is a closing speed over 1.2 m/s (raise **minStrength** for harder ones), each body at most every 0.3 s.
With **From: landing only** it counts only downward speed, so a ball thrown sideways into a wall fires nothing.

## Practical example

Sparks + a thud when a crate lands:

1. Give the crate a **Dynamic** body (Inspector ▸ Physics).
2. In its flow: **On Impact → Particles** (`trigger` input, emission *burst*, preset *Sparks*), and **On Impact → Counter** if you want to count landings.
3. Press <kbd>P</kbd>, lift the crate with the gizmo, drop it. Sparks on landing, for every peer.

!!! note
    Simplest version, no flow editor at all: set a particle emitter's **Emission** to *On impact* in the Inspector — see [Particle Effects](https://docs.theprototype.app/particles.md).
