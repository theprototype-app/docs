# Animation State

Reads what a [clip](../animation.md) is doing, as a number — the *readable* half of [Animation Finished](animfinished.md). Use it to drive something continuously instead of only handing off at the end.

**Output:** number — what it means depends on **read**.

## Inputs

None.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| clip | *(the active clip)* | which clip to read |
| read | `progress` | see below |

| `read` | Output |
|---|---|
| `progress` | 0 → 1 through the clip. Measured across the **A/B window** when one is set, so it still reads 0 → 1 for the part you are looping |
| `playing` | 1 while it plays, 0 when it does not |
| `position` | the playhead, in seconds |
| `duration` | the clip's length, in seconds |
| `remaining` | seconds left to the end |

A boolean rides a number socket perfectly well, which is why `playing` is here rather than on a socket of its own.

## Which object?

Inside an object flow it reads that object's clips; elsewhere, connect an [Object Selector](objectselector.md).

## Practical example

A lift whose indicator light rises with it:

1. The lift has a clip on `pos.y`; give the indicator its own object flow.
2. **Animation State** (`progress`) → [Map Range](maprange.md) (0–1 → 0–4).
3. Map Range → a [Set Color](setcolor.md) or a light's intensity.

The light now tracks the lift's real position, for everyone, however the clip is retimed.

!!! tip
    `playing` into a [Gate](gate.md) is the clean way to say "only while this is moving" — a fan that spins only while its door is opening, say.
