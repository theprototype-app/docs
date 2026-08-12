# Angular Velocity

Gives the connected object a constant **spin** under physics — a rolling barrel, a spinning hazard, a rotating platform other objects can stand on.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Parameters

| Parameter | Default | Range | Meaning |
|---|---|---|---|
| axis | y | x / y / z | the object's local axis to spin around |
| speed | 2 | −10–10 | radians per second (negative reverses) |

Edits re-apply **live mid-simulation** — dial the speed while it turns.

## Physics vs animation

This is real rotation *inside the simulation*, so other objects feel it: a box resting on a spinning platform is carried around, and a rolling barrel bowls things over. The [Spin](spin.md) animation node looks similar but only moves the object's transform — things resting on it are not pushed.

Wiring Angular Velocity alone implies a dynamic body of mass 1; add a [Mass](mass.md) node to set a real weight.

## Practical example

A rolling hazard:

1. Add a cylinder, lay it on its side, and place a few cubes in front of it.
2. In its flow: **Angular Velocity** (axis *z*, speed 6) → **Object Selector** picking the cylinder.
3. Press <kbd>P</kbd> — it rolls off and scatters the cubes for every peer.
