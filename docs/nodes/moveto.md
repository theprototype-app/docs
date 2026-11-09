# Move To

Moves the connected object to a point and back — a lift, a sliding door, a drawer, a drawbridge.

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
| x, y, z | 0, 1, 0 | the goal |
| space | offset | offset (from where it rests), world (an absolute point) |
| duration | 1 | seconds for the whole way |
| easing | smooth | smooth, linear, ease in, ease out, back (a little past and back), bounce, elastic |
| repeat | none | none, loop or pingpong (keeps going while triggered) |

A reverse halfway through turns round from where it is, never jumps. Every event is a replicated pulse and the motion
is a pure function of the shared clock, so two players see the same pose at the same moment.

## Practical example

A lift that goes up while a switch is on:

1. Give the platform a **Move To** node: y 3, space offset, duration 2, easing smooth.
2. Wire a **Toggle** (or a [Proximity](proximity.md)) into **open**.
3. Switch it on: the lift rises 3 m; off, it comes back down.
