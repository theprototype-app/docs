# Scale To

Grows or shrinks the connected object to a size and back — a pop-up, a growing plant, a button that swells.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | go to the goal |
| back | event | go back to where it started |
| toggle | event | go if it is at rest, come back if it is at the goal (On Click into here = a door) |
| open | boolean | go while true, come back while false (a Toggle, a Proximity, a Gate) |
| amount | number | 0 – 1, how far along: wire a Slider or a variable to drive it directly |
| to | object | an [Object Selector](objectselector.md) — go to (match) that object instead of the numbers |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| factor | 2 | the size at the goal, times the resting size |
| axis | all | all, or one of x, y, z (stretch one way) |
| pivot | origin | grow about the origin or one face (bottom = grows up from the floor) |
| duration | 1 | seconds for the whole way |
| easing | smooth | smooth, linear, ease in, ease out, back (a little past and back), bounce, elastic |
| repeat | none | none, loop or pingpong (keeps going while triggered) |

A reverse halfway through turns round from where it is, never jumps. Every event is a replicated pulse and the motion
is a pure function of the shared clock, so two players see the same pose at the same moment.

## Practical example

A plant that grows when watered:

1. Give the plant a **Scale To**: factor 2, **pivot bottom**, duration 3, easing ease out.
2. Wire the watering can's **On Click** into **trigger**: the plant grows up out of its pot.
