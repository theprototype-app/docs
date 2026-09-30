# Game Sound

Plays one of the built-in game sounds when a pulse arrives — no audio files needed. Placed at a
wired object (it pans and fades with distance), or everywhere when nothing is wired.

**Output:** none (a sink)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse plays the sound once |
| at | object | optional — where the sound comes from |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| sound | `coin` | `click` `pop` `whoosh` `success` `fail` `hit` `kick` `shoot` `laser` `explosion` `coin` `levelup` `goal` `whistle` `cheer` `step` `ring` `sparkle` `hurt` `portal` |

Sounds play only while someone is playing (Interact or Play), on each player's own device, at the
**Game sounds** volume in Settings ▸ Interface ▸ Sound.
