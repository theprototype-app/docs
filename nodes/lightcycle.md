# Light Colour Cycle

Walks the colour of the lights in the connected object round the colour wheel, or through a list of colours — a disco light, a warning beacon, a mood lamp.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it in an object's own flow)

## Parameters

| Parameter | Default | Range |
|---|---|---|
| mode | rainbow | rainbow (the whole wheel) or list |
| period | 4 | seconds for one full cycle |
| saturation | 1 | 0 – 1 (rainbow) |
| colors | #ff3b30, #ffcc00, #34c759, #0a84ff | the list, comma separated |
| step | off | jump between the list colours instead of blending |
| glow | on | tint the glowing parts too |

The colour comes from the shared clock: every player sees the same colour at the same moment.

## Practical example

A party light: a Point light with a **Light Colour Cycle** in list mode, colours red, yellow, green, blue, period 2, step on.
