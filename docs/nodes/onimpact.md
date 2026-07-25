# On Impact

Fires a pulse when a [physics simulation](../physics.md) lands the connected object on the ground or another object.

**Output:** event (wire into a [Particles](particle.md) trigger, a [Counter](counter.md), or an [Object Selector](objectselector.md))

## How it works

While a simulation runs, the peer stepping the physics detects each real contact — a falling crate hitting the floor, a thrown ball hitting a wall — and pulses this node for **everyone** (the trigger rides the same replicated stamp as [On Click](onclick.md)). Gentle settling and rolling are filtered out: the object must actually be falling, and each object has a short cooldown so bounces don't spam.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| minStrength | 1 | minimum impact speed (m/s, downward at contact) — raise it so only hard landings count |

## Targeting

Like On Click, the node fires for the object it *reaches* in the graph: wire it into an [Object Selector](objectselector.md) (directly or through other nodes), or drop it unwired inside an object's own flow to target that object.

## Practical example

Sparks + a thud when a crate lands:

1. Give the crate a **Dynamic** body (Inspector ▸ Physics).
2. In its flow: **On Impact → Particles** (`trigger` input, emission *burst*, preset *Sparks*), and **On Impact → Counter** if you want to count landings.
3. Press <kbd>P</kbd>, lift the crate with the gizmo, drop it. Sparks on landing, for every peer.

!!! note
    Simplest version, no flow editor at all: set a particle emitter's **Emission** to *On impact* in the Inspector — see [Particle Effects](../particles.md).
