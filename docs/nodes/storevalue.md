# Store Value

Saves a value **on this device** when a pulse arrives — a best score, the tallest tower, the
level a player reached — so it survives a reload. It is never sent to other players and never
written into the scene file.

**Output:** none (a sink)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse writes once — wire [On Game State](../nodes.md#game) (`over`), a [HUD Button](hudbutton.md) or a Counter |
| value | number | what to save — wire a [Counter](counter.md), a Get Variable, a Measure |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| key | `best` | the name it is saved under — give each game its own (`towers-best`, not `best`) |
| mode | max | `set` (overwrite), `max` (keep the highest), `min` (keep the lowest — a best time), `add` (a running total) |

## How it is stored

Values live in the browser's local storage under `tp:scene:<scene name>:<key>`. A game loaded
from the Games tab has no scene name yet, so it uses `untitled` — which is why every game should
use a **game-specific key**, or two games' bests would share one slot.

Each player keeps their own copy. A trigger that fires for everyone (a shared Game State) saves
on every device; a per-player trigger saves only for the player who earned it.

## Practical example

"Best height" in Towers:

1. **On Game State** (`over`) → Store Value's **trigger**.
2. The round's tallest height (a Math `max` over the ring latches) → **value**.
3. key `towers-best`, mode `max`.
4. A [Stored Value](storedvalue.md) with the same key feeds the Round-over screen's HUD Text.

!!! tip
    A round-scoped latch reads "not set" the instant the round ends, so a Round-over screen
    should read the STORED value, not the latch. Write a `set 0` at round start and a `max` on
    every hit.

The HUD editor's **Actions → Save best score** builds this chain for a button in one step.
