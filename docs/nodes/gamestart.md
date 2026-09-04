# Game Start

Fires once when the game starts (Play, or a round reset) - the place to spawn, reset counters and arm timers.

**Output:** event

## Inputs

| Input | Type | Meaning |
|---|---|---|
| camera | object | a camera to activate as the game starts (optional) |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| state | playing | the game state that counts as "started" |

## Practical example

Wire **Game Start** into a **Spawn** node's trigger and into a **Set Variable** that zeroes the score: every round begins from the same clean slate on every peer.
