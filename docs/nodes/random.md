# Random

A random number in a range — deterministic, so every peer sees the *same* "random" value.

**Output:** number

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| min / max | 0 / 1 | fields on the card |
| interval | 0 | field on the card — seconds between re-rolls; 0 = one fixed value |

Each Random node is seeded by its own identity and the shared clock: with `interval` set, it re-rolls every interval on all peers simultaneously; with `interval` 0 it holds one stable value.

## Practical example

Give a hovering drone an erratic wobble:

1. Add a **Random** with min 0.5, max 3, interval 2.
2. Add a **Shake** node and an **Object Selector** targeting the drone.
3. Wire Random → Shake's **speed** input, and Shake → Object Selector.
4. Every 2 seconds the shake speed jumps to a new value — identical on every screen.

!!! tip
    Add several Random nodes for several independent streams — each node rolls its own sequence.
