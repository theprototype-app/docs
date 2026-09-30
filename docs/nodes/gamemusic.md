# Game Music

Declares the scene's background music: one of seven built-in looping tracks, quiet under the game
sounds, playing only while someone plays.

**Output:** none

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| on | number / event | optional — music plays while this is on (unwired = always) |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| preset | `arcade` | `arcade` `ambient` `dungeon` `stadium` `space` `puzzle` `studio` |
| volume | 0.7 | 0 – 1 (under the player's own **Music** volume) |
| while | `always` | `always` (the whole of Interact/Play) or `round` (only while a round runs) |

It is a **declaration**, not a trigger: the music is there while the node says so and stops when
the player goes back to editing. Each player hears it on their own device, in time with the others.
