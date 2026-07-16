# Orbit

Circles the connected object around its resting position on the horizontal plane.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| radius | number | overrides the card slider when wired |
| speed | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| radius | 1 | 0–5 |
| speed | 1 | −5 to 5 (negative reverses direction) |

The object's base position is the orbit's center — move the object and the whole orbit moves with it.

## Practical example

A planet and its moon:

1. Place a sphere ("planet") and a smaller sphere ("moon") at the same spot.
2. Add an **Orbit** node (radius 2, speed 1) and an **Object Selector** targeting the moon.
3. Wire Orbit → Object Selector: the moon circles the planet.
4. Add a second Orbit (radius 0.5, speed 4) on a third, tiny sphere placed at the moon's spot for a satellite.

!!! tip
    Drive **radius** from a [Loop](loop.md) in `pingpong` mode for a spiral-in / spiral-out effect.
