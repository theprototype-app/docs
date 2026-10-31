# Effect Burst

A short burst of particles — sparkles, confetti, smoke or sparks — at a wired object, or in front of
the player when nothing is wired. Made for the moment a coin is collected, a ring is reached or a
goal is scored.

**Output:** none (a sink)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse fires one burst |
| at | object | optional — where the burst happens |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| kind | `sparkle` | `sparkle` `confetti` `smoke` `sparks` |
| count | 48 | particles in the burst (4 – 96) |
| lift | 0 | metres above the object (−2 – 4) |
| color | the kind's own | any colour (`#4f86e6`) |

Bursts are **local** and pooled: every player's graph fires its own from the shared trigger, and
nothing is saved into the scene.

!!! tip
    An additive sparkle can vanish against a bright sky — pair it with a `confetti` burst there.
