# Light Intensity

Fades the lights in the connected object to a level — a dimmer, a sunrise, lights that dim when the film starts. Level 1 is the light's own brightness.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| level | number | wire a Slider, a Map Range or a variable to drive it |
| fade | number | seconds |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| level | 1 | 0 – 10, times the light's own intensity |
| fade | 0.5 | 0 – 10 seconds each time the level changes |
| glow | on | dim the glowing parts too |

## Practical example

A dimmer: wire a **Slider** (0 – 1) into **level**. Each change fades over half a second.
