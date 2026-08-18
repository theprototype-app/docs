# Random

A random number in a range — deterministic, so every peer sees the *same* "random" value.

**Output:** number

## Inputs

`seed` (number) · `reroll` (event)

## Parameters

| Parameter | Default | Where |
|---|---|---|
| min / max | 0 / 1 | fields on the card |
| interval | 0 | field on the card — seconds between re-rolls; 0 = one fixed value |
| integer | off | round down to a whole number, so the output can be used as an index |

Each Random node is seeded by its own identity and the shared clock: with `interval` set, it re-rolls every interval on all peers simultaneously; with `interval` 0 it holds one stable value.

### Seeding it yourself

Wire a number into `seed` and the value becomes a pure function of that number — same seed, same result, on every peer and every reload. That is what makes **procedural generation** authorable in a graph: one [Slider](slider.md) or [Number](number.md) node is the seed for a whole layout, and typing 7 instead of 6 gives everybody the same different world.

Pulse `reroll` (from a [Key Press](keypress.md) or [On Click](onclick.md)) to advance to the next value in the sequence without waiting for an interval.

## Seeded example

A "new layout" button that everyone agrees on:

1. **Number** (value 1) → **Random** `seed`, with min 0, max 4 and **integer** on.
2. **Key Press** (`KeyN`) → Random `reroll`.
3. Wire Random into a [Select](select.md) that picks one of several positions, then into an [Object Selector](objectselector.md).
4. Press <kbd>N</kbd>: every peer jumps to the same next arrangement.

## Practical example

Give a hovering drone an erratic wobble:

1. Add a **Random** with min 0.5, max 3, interval 2.
2. Add a **Shake** node and an **Object Selector** targeting the drone.
3. Wire Random → Shake's **speed** input, and Shake → Object Selector.
4. Every 2 seconds the shake speed jumps to a new value — identical on every screen.

!!! tip
    Add several Random nodes for several independent streams — each node rolls its own sequence.
