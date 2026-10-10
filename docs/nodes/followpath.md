# Follow Path

Moves the connected object along a smooth path — a drawn **Spline**, a **Flow path** or its own waypoints — at a speed, looping, ping-ponging or once, facing along it and leaning into the turns. An offset spreads several riders out along one path.

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow — it then moves that object)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| path | object | the path to ride: a Spline (Draw ▸ Spline) or a Flow path. Unwired, the node rides its own `points` |
| speed, offset, bank, maxBank | number | override the card sliders when wired |

## Parameters

| Parameter | Default | Range / options |
|---|---|---|
| speed | 0.5 | -5 – 5 m/s (negative rides it backwards) |
| offset | 0 | 0 – 1: where along the path it starts (0.5 = halfway round) |
| mode | loop | `loop` (wraps, a closed path circles) · `pingpong` (there and back) · `once` (stops at the end) |
| align | on | face along the path |
| pitch | on | tilt up and down with the path (off keeps the nose level — a car, a walker) |
| bank | 0.5 | 0 – 1: how much it leans into turns |
| maxBank | 30 | 0 – 80°: the steepest lean |
| forward | +z | the axis the model's nose points along: `+z`, `-z`, `+x`, `-x` |
| points | — | world-space waypoints, used when nothing is wired to `path` (templates and the AI assistant write them) |

The path is a **centripetal Catmull-Rom** curve through the points (the spline tool's own curve), walked at constant speed by arc length. The pose is a pure function of the path and the shared clock, so every peer sees the object at the same point — nothing is sent while it moves. Banking comes from the path's curvature times the speed: a tight bend at speed leans further than a gentle one.

## Practical example

Two fish circling a tank, half a lap apart:

1. Draw a closed **Spline** around the inside of the tank and hide it (eye icon in the object list).
2. Give each fish a **Follow Path** node (in its own flow), wire the spline's **Object Selector** into `path`.
3. Speed 0.4, bank 0.7; the second fish gets `offset` 0.5. Add a [Body Wave](bodywave.md) so they swim, not slide.

!!! tip
    A model whose nose is not along +Z (most rigs face +Z, many imported cars face +X) — set `forward` instead of rotating the model.
