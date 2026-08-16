# Animation Marker

Pulses as the playhead crosses a named **marker** inside a [clip](../animation.md) — so a footstep, a puff of dust or a latch click can sit at an exact frame of a movement instead of only at its end.

**Output:** event — 1 for a short window as the marker passes, 0 otherwise.

## Inputs

None.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| name | *(empty)* | which marker to watch. **Empty means any marker on the clip** — one node for "every beat" |
| pulse | 0.3 s | how long the output stays at 1 |

## Adding markers

In the Animation window, park the playhead where you want the moment and add a marker from the marker row; double-click it to rename. Markers are part of the clip, so they save, replicate and undo with it.

## Which object?

Inside an object flow it watches that object's clips; elsewhere, connect an [Object Selector](objectselector.md).

## Loops are handled properly

Crossing a marker is worked out from where the playhead was last frame and where it is now — and when a loop wraps back to the start, the two real pieces of travel are tested separately. A marker just before the loop point fires once per lap, not never; one just after fires once, not twice.

## Practical example

Footsteps on a walk cycle:

1. Scrub to the frame where the left foot lands and add a marker named `step`; do the same for the right.
2. Add an **Animation Marker** with name `step`, and wire it into a [Sound](sound.md) node.

Both footfalls now play at the right frame, for every peer, at any playback speed.

!!! tip
    Leave **name** empty and one node fires on every marker in the clip — handy for driving a [Counter](counter.md) or a particle burst on each beat.
