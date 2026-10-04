# On Exit

Fires a pulse when something **leaves** a trigger volume — the other half of [On Enter](onenter.md).

**Output:** event (wire into a [Particles](particle.md) trigger, a [Counter](counter.md), or an [Object Selector](objectselector.md))

## How it works

Needs a **sensor** collider, exactly like [On Enter](onenter.md) (Inspector ▸ *Physics ▸ Sensor*, or a [Collider](collider.md) node with *sensor* on). While a simulation runs, the peer stepping the physics notices the overlap ending and pulses the node for everyone through the same replicated trigger stamp.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| pulse | 0.3 | how long the pulse stays high (seconds) |

## Targeting

Wire it into an [Object Selector](objectselector.md), or leave it unwired inside an object's own flow to target that object.

## Only with, and other (1.22)

Wire an [Object Selector](objectselector.md) into **only with** and the node fires only when the *other* body is that
object (or a spawned copy of it). The **other** output carries the body it touched — wire it into [Look At](lookat.md) or
[Distance](distance.md). Every peer reads the same object; a ground contact reports an empty *other*. See
[Colliders](../colliders.md#from-the-flow-graph).

## Practical example

A door that closes behind you:

1. Make a sensor box in the doorway (Inspector ▸ **Physics ▸ Sensor**).
2. In its flow: **On Enter → Set Color** (green) and **On Exit → Set Color** (red) on the door frame's [Object Selector](objectselector.md).
3. Press <kbd>P</kbd> and roll a ball through — the frame flips colour as the ball passes and again as it leaves.
