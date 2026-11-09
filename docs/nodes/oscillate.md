# Oscillate / Swing

Swings or bobs the connected object back and forth on one axis — a sign hanging from a hook, a pendulum, a buoy, a struck bell. Without a trigger it runs forever; with one, each pulse starts a swing that dies away.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | start a swing now (On Click into here). Wired: the object rests until the first pulse, and `damping` makes each swing die away |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| property | rotation | rotation (swing), position (bob) or scale (breathe) |
| axis | z | x, y, z (in the object's own frame) or all (scale only) |
| amplitude | 20 | degrees for rotation, metres for position, a fraction for scale |
| period | 2 | seconds per full swing |
| phase | 0 | 0 – 1 of a period, so copies swing out of step |
| damping | 0 | how fast a triggered swing dies away (0 = never); ignored without a trigger |
| wave | sine | sine (smooth), triangle (even speed) or bob (up and back, never below rest) |
| pivot | top | turn about one of the object's faces (top = it hangs from its top edge) or its origin |

The swing is a pure function of the shared clock (and of the trigger's stamp), so every player sees the same swing at
the same moment. A damped swing settles to exactly its resting pose.

## Practical example

A shop sign that sways, and a bell you can ring:

1. Give the sign an **Oscillate** node: axis z, amplitude 15, period 2.5, **pivot top** — it hangs from its top edge.
2. Give the bell an **On Click** wired into a second Oscillate's **trigger**: amplitude 30, period 0.8, damping 3, pivot top.
3. Press Play and click the bell: it swings hard and comes to rest, for everyone.
