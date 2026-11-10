# Rotate To

Turns the connected object to an angle and back — a door on its hinge, a lid, a lever, a drawbridge.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | go to the goal |
| back | event | go back to where it started |
| toggle | event | go if it is at rest, come back if it is at the goal (On Click into here = a door) |
| open | boolean | go while true, come back while false (a Toggle, a Proximity, a Gate) |
| amount | number | 0 – 1, how far along: wire a Slider or a variable to drive it directly |
| to | object | an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) — go to (match) that object instead of the numbers |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| angle | 90 | degrees |
| axis | y | x, y or z, in the object's own frame |
| pivot | origin | turn about the object's origin or one of its faces (left = a door hinged on its left edge) |
| duration | 1 | seconds for the whole way |
| easing | smooth | smooth, linear, ease in, ease out, back (a little past and back), bounce, elastic |
| repeat | none | none, loop or pingpong (keeps going while triggered) |

A reverse halfway through turns round from where it is, never jumps. Every event is a replicated pulse and the motion
is a pure function of the shared clock, so two players see the same pose at the same moment.

## Practical example

A door you open and shut by clicking it:

1. Give the door an **On Click** and a **Rotate To**: angle 90, axis y, **pivot left**, duration 1.
2. Wire On Click into **toggle**.
3. Press Play and click it: the door swings open on its left edge; click again and it shuts — for everyone.
