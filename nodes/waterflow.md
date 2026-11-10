# Flowing Water

Makes the connected surface flow like water — the ripples scroll in one direction and the surface swells gently. Pair it with the **Water** material preset. A shader effect: it composes with other shader effects on the same object.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it in an object's own flow)

## Parameters

| Parameter | Default | Range |
|---|---|---|
| speed | 0.1 | tiles per second (negative flows backwards) |
| direction | 0 | the flow's heading in degrees |
| swell | 0.03 | metres the surface rises and falls |
| swellSize | 2 | metres per swell |
| ripples | on | borrow a ripple texture when the material has no normal map of its own |

A save writes the surface's own material; the borrowed ripples are only for the running scene.

## Practical example

A stream: a long flat box with the **Water** preset, **Flowing Water** speed 0.3, direction along the stream.
