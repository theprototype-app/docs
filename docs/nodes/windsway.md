# Wind Sway

Bends the connected object in the wind — plants and grass from their roots, a flag from its pole — in gusts. A shader effect: the object's position, physics and picking keep their rest pose. It adds to other shader effects ([Body Wave](bodywave.md), [Jiggle](jiggle.md), Flowing Water) on the same object instead of replacing them.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Parameters

| Parameter | Default | Range |
|---|---|---|
| mode | plant | plant (bends from its anchor, more towards the tip) or flag (waves along its length) |
| anchor | bottom | the face that stays still: bottom for a plant, left for a flag on a pole on its left |
| strength | 0.15 | how far it bends |
| frequency | 0.6 | sways per second |
| gust | 0.5 | 0 = a steady breeze, 1 = strong gusts |
| direction | 0 | the wind's heading in degrees |
| wavelength | 1 | flag: metres per wave |
| flutter | 0.3 | flag: small fast ripples on top |

The gusts come from the shared clock, so every player sees the same gust.

## Practical example

A garden: give the bushes **Wind Sway** (plant, anchor bottom, strength 0.2), and the flag **Wind Sway** (flag, anchor left, frequency 1.2).
