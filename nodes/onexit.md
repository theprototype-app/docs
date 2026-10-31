# On Exit

Fires a pulse when something **leaves** a trigger volume — the other half of [On Enter](https://docs.theprototype.app/nodes/onenter.md).

**Output:** event (wire into a [Particles](https://docs.theprototype.app/nodes/particle.md) trigger, a [Counter](https://docs.theprototype.app/nodes/counter.md), or an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md))

## How it works

Needs a **sensor** collider, exactly like [On Enter](https://docs.theprototype.app/nodes/onenter.md) (Inspector ▸ *Physics ▸ Sensor*, or a [Collider](https://docs.theprototype.app/nodes/collider.md) node with *sensor* on). While a simulation runs, the peer stepping the physics notices the overlap ending and pulses the node for everyone through the same replicated trigger stamp.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| pulse | 0.3 | how long the pulse stays high (seconds) |

## Targeting

Wire it into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it unwired inside an object's own flow to target that object.

## Only with, and other

Wire an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) into **only with** and the node fires only when the *other* body is that
object (or a spawned copy of it). The **other** output carries the body it touched — wire it into [Look At](https://docs.theprototype.app/nodes/lookat.md),
[Distance](https://docs.theprototype.app/nodes/distance.md) and the like. The other body travels with the trigger, so every peer reads the same object. A
contact with the ground plane reports an empty *other*. Since 1.22 the node sits in the palette's **Physics** group. See
[Contact filters](https://docs.theprototype.app/colliders.md#contact-filters-only-with-and-other).

## Practical example

A door that closes behind you:

1. Make a sensor box in the doorway (Inspector ▸ **Physics ▸ Sensor**).
2. In its flow: **On Enter → Set Color** (green) and **On Exit → Set Color** (red) on the door frame's [Object Selector](https://docs.theprototype.app/nodes/objectselector.md).
3. Press <kbd>P</kbd> and roll a ball through — the frame flips colour as the ball passes and again as it leaves.
