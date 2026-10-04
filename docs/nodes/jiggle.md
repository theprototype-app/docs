# Jiggle

Adds **secondary motion** to an object: it lags when it is moved, overshoots when it stops, wobbles like jelly when it
lands or is hit, sags and sways in the wind. On a rigged (skinned) model it swings the bone chains — tails, hair,
antennae.

**Output:** effect (put it in the object's own graph, or wire it into an [Object Selector](objectselector.md))

Find it in the node editor under **Effects ▸ Jiggle**.

## Parameters

| Parameter | Meaning |
|---|---|
| stiffness | how strongly it springs back |
| damping | how quickly the wobble dies down |
| gravity | how much it sags |
| max offset | the furthest it may move from its real pose |
| wind | sway |
| wobble | the size of the squash and stretch |
| wobble Hz | how fast it wobbles |
| falloff | how much more the far end moves than the held end |
| pivot | where it is "held": bottom, center or top |
| bones | name patterns for a rigged model, such as `hair*, tail*`; empty = the ends of every chain |

## How it behaves

Jiggle is a **look**: it never changes the object's real position, so physics, saving and the other players are
unaffected. The settings are shared, and each player sees their own jiggle from the motion they see. An object with
several materials on one mesh jiggles only through its bones.

## Practical example

A jelly that wobbles when it lands: give a cube a Dynamic body, add **Jiggle** to its own graph with *pivot* bottom and a
large *wobble*, then press <kbd>P</kbd> and drop it.
