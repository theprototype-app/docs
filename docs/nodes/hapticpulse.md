# Controller Buzz

Vibrates the VR controllers with a named pattern when a pulse arrives.

**Output:** none (a sink)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse plays the pattern once |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| pattern | `success` | `tap` `bump` `hit` `success` `fail` `rumble` `heartbeat` |
| hand | `both` | `both`, `left`, `right` |

Vibration only happens in **Interact** and **Play** — never while editing — and only on the
device of the player whose graph fired it. The app already buzzes for you when a laser touches
something clickable, a press lands, a grab starts or a hand knocks a body.
