# Wander

Drifts the connected object around a smooth, never-repeating target inside an **area object** (a water volume, a room) or a box around where it was placed — fish, birds, fireflies, idle drones.

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| area | object | stay inside this object's bounds (shrunk by `margin`). Unwired: a box of `rx` × `ry` × `rz` half-extents around the object's resting position |
| speed, seed, margin, rx, ry, rz | number | override the card sliders when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| speed | 0.3 | 0 – 3: how fast the target moves (1 ≈ one wide swing every 6 s) |
| seed | 0 | 0 – 999: 0 = take it from the object, so copies never move in step |
| margin | 0.2 | 0 – 2 m kept clear of the area's sides |
| rx, ry, rz | 1, 0.3, 1 | half-extents of the box when no area is wired |

The target is three octaves of smooth noise per axis at incommensurate rates — it never repeats, never jumps, and always stays inside the box. It is a pure function of the shared clock, so every peer sees the same wanderer in the same place.

## Practical example

Clownfish that potter about the tank:

1. Give the fish a **Wander** node and wire an Object Selector of the **water volume** into `area`; margin 0.4, speed 0.2.
2. Add [Orient to Velocity](orientvelocity.md) so it faces where it is going, and [Body Wave](bodywave.md) so it swims.
3. Duplicate the fish: with `seed` 0 each copy wanders its own way.
