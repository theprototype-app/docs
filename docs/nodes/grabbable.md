# Grabbable

Lets players pick the connected object up and carry it **without a physics simulation** — a mug, a tool, a book. On letting go it stays where it was put, or glides back to where it was taken from.

*Since 1.64.*

**Output:** none — a declaration (wire it into an [Object Selector](objectselector.md), or leave it in the object's own flow)

## Parameters

| Parameter | Default | Range |
|---|---|---|
| release | stay | stay (where you put it down) or return (glides home) |
| returnAfter | 1 | seconds before it glides home |
| returnTime | 0.6 | seconds the glide takes |

In Play, aim the crosshair at it and press; the wheel moves it nearer or further. Everyone sees it carried. A dynamic
physics body in a running simulation is still carried by the physics as before.

## Practical example

A tool on a hook that always goes back: **Grabbable**, release return, returnAfter 2.
