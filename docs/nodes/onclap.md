# On Clap

Fires a pulse when a VR player brings **both hands together** and holds them there for a moment — a clap. It carries
**where** the hands met, so a [Spawn](spawn.md) or an [Effect Burst](effectburst.md) can make something right there.

**Outputs:** event, plus `point` *(vector3 — where the hands met)* and `by me` *(boolean)*

## How it works

The clap is detected from your own hands, in VR, while you are in **Interact** or **Play** (never in the editor). With
**who** set to *anyone* the pulse is shared: every player's node fires, all with the same `point`, so a Spawn wired to it
makes one object there for everyone. With *me* it stays on your device — a buzz in your own hands, a private effect.

Nothing is watched for unless some graph has an On Clap node that is switched on.

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| enabled | boolean | unwired = on. Wire a [Game Setting](gamesetting.md) toggle here to let players switch it off |

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| who | anyone | *anyone* — the pulse is shared with every player; *me* — it fires on your device only |
| hands closer than (m) | 0.1 | how close the hands must come (0.03–0.3) |
| held for (s) | 0.25 | how long they must stay together (0–1) |
| at most one per (s) | 1 | a cooldown, so one clap is one pulse (0.2–5) |

## Practical example

Make a star with a clap (this is how the [Stars Room](../games.md#stars-room) does it):

1. **On Clap** → a [Spawn](spawn.md) node's `trigger`, and On Clap's `point` → the Spawn's `place`.
2. Wire the star you want copied into the Spawn's `source`.
3. A [Game Setting](gamesetting.md) toggle *Make stars with a clap* → On Clap's `enabled`, so a player who claps by
   accident can turn it off.
