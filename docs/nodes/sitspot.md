# Sit Spot

Makes the connected object a seat: click it (the Play crosshair, a VR trigger) and you sit on top of it, facing its front. A move key, jump or a push of the stick stands you up again. Each player sits for themselves; the others see your avatar sit. A seat someone is already sitting on says so.

*Since 1.64.*

**Output:** none — a declaration (wire it into an [Object Selector](objectselector.md), or leave it in the object's own flow)

## Parameters

| Parameter | Default | Range |
|---|---|---|
| facing | +z | the seat's front, in its own frame |
| eyeHeight | 0.7 | metres from the seat top to your eyes |
| forward | 0 | shift the spot toward the front (a sofa's cushion edge) |

Desktop: in Play. VR: in Interact. A sofa takes one Sit Spot per cushion (a small invisible box on each).

## Practical example

A sofa for two: put two flat boxes on the cushions (set them invisible), give each a **Sit Spot** facing the room.
