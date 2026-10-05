# Jiggle

Makes the connected object jiggle — it lags behind when moved, wobbles like jelly on impact and sways in the wind; skinned
models swing their bone chains (tails, hair, antennae).

**Output:** effect (put it in the object's own graph, or wire it into an [Object Selector](objectselector.md))

Find it in the palette under **Effects ▸ Jiggle**.

## Parameters

| Parameter | Default | Range | Meaning |
|---|---|---|---|
| stiffness | 120 | 5 – 600 | how hard it springs back to its real pose |
| damping | 0.15 | 0 – 1 | how quickly the wobble dies down |
| gravity | 0.3 | 0 – 2 | how much it sags |
| max offset | 0.35 | 0 – 1 | the furthest it may stray from its real pose |
| wind | 0 | 0 – 20 | how much it sways in the wind |
| wobble | 0.08 | 0 – 0.4 | the size of the squash and stretch when it lands or is hit |
| wobble Hz | 3 | 0.5 – 10 | how fast it wobbles |
| falloff | 1.5 | 0.25 – 4 | how much more the far end moves than the held end |
| pivot | bottom | bottom / center / top | where it is "held" |
| bones (globs) | empty | text | for a rigged model: name patterns such as `hair*, tail*`; empty = the ends of every chain |

## How it behaves

Jiggle is a **look**: it never changes the object's real position, so physics, saving and the other players are
unaffected. The settings are shared; each player sees their own wobble from the motion they see. An object with several
materials on one mesh jiggles only through its bones.

## Practical example

A jelly that wobbles when it lands:

1. Add a cube and give it a **Dynamic** body (Properties ▸ Physics).
2. In its own flow, add **Jiggle**: *pivot* bottom, *wobble* 0.2.
3. Press <kbd>P</kbd> and drop it — it squashes on the floor and wobbles back. Drag it with the gizmo and it lags behind.

!!! tip
    For an antenna or a tail on a static object, raise *gravity* and *wind* and lower *stiffness*: it droops and sways on
    its own. See [Fluid Tank & Jiggle](../simulation.md#jiggle).
