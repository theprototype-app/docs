# Ambient Animal

Makes the connected object live: it wanders inside a box or an **area** object, stops to rest, turns to look at the nearest player while it rests, and — if you want — shies away from a player who comes close. Animated models play their idle, walk and run clips on their own.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| area | object | stay inside this object (a pen, a tank). Unwired: a box of `rx` × `ry` × `rz` around where it was placed |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| speed | 0.3 | 0 – 3, how fast it wanders |
| rest | 0.35 | 0 – 0.9, the share of time it stands still (0 = never rests) |
| restTime | 3 | seconds per rest |
| lookRadius | 4 | metres: while resting it looks at a player this close (0 = never) |
| fleeRadius | 0 | metres: it shies away from a player this close (0 = tame) |
| fleeDistance | 2 | metres it moves away |
| rx, ry, rz | 3, 0.3, 3 | the box when no area is wired |
| seed | 0 | 0 = from the object, so a herd does not move in step |
| turnSpeed | 4 | how quickly it turns |
| forward | +z | which way the model faces |
| ground | on | walk on the floor (off: fish, birds) |
| clips | on | play its idle / walk / run clips (see [Characters & Motion](https://docs.theprototype.app/characters-and-motion.md)) |

Where it walks and when it rests come from the shared clock, so every player sees the same animal in the same place.

## Practical example

A cat in the living room: give the cat model an **Ambient Animal**, rx 3, rz 2, rest 0.6, restTime 5, lookRadius 3. It strolls, sits, and watches you when you come near.
