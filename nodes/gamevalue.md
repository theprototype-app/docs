# Game Value

Reads one game value and writes it as words, ready for a [HUD Text](https://docs.theprototype.app/nodes/hudtext.md): the score, the round clock, the best,
the level, its stars, lives. A HUD needs no code to show them. *Since 1.74.*

**Output:** the value as text · `value` (the raw number) · `max` (the max it was written against)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| value | any | what to show when **read** is *wired* |
| max | number | the max for *fraction*, *percent* and *stars*; wired, it replaces the card's **max** |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| read | score | what to read — see the table below |
| name | (empty) | the variable, key, level or value name, for the reads that take one |
| format | number | `number`, `time`, `fraction`, `percent`, `stars`, `text` |
| decimals | 0 | 0 to 4 |
| max | 0 | the whole for *fraction*, *percent* and *stars* |
| prefix | (empty) | written before the value, such as `Coins ` |
| suffix | (empty) | written after it, such as ` pts` |
| when empty | (empty) | shown instead while the value is 0 or blank, such as `Best —` or `not cleared yet` |

## What it reads

| read | Value |
|---|---|
| **score** | the game's score |
| **my score** | your own score |
| **best score** | the best score |
| **clock** | the round's play time |
| **time left** | the time left in the round |
| **countdown** | the countdown before the round starts |
| **round** | the round number |
| **level** | the level number |
| **level name** | the level's name |
| **stars** | the stars of the current level, or of the level named in **name** |
| **total stars** | the stars of every level together |
| **lives** | your player variable `lives`, or the one named in **name** |
| **variable** | a shared [variable](https://docs.theprototype.app/nodes/getvariable.md) |
| **player variable** | your own [player variable](https://docs.theprototype.app/nodes/peervariable.md) |
| **stored** | a [Store Value](https://docs.theprototype.app/nodes/storevalue.md) key, saved on this device |
| **published** | a value a module publishes (see below) |
| **wired** | whatever you wire into **value** |

Every read is local and needs no network. Shared values are already the same for every player; "my" values are
yours.

## Formats

| format | Shows |
|---|---|
| **number** | `3`, or `3.5` with 1 decimal |
| **time** | a clock: `1:04`, or `1:04.2` with 1 decimal |
| **fraction** | `3 / 10` (needs a **max**) |
| **percent** | the value as a part of **max**, such as `30 %` |
| **stars** | filled and empty stars, such as `★★☆` (3 when no max is set) |
| **text** | the value as it is, such as a level name |

## Wiring it

- Wire the output into a **HUD Text**'s **format** socket. The text shows exactly what Game Value wrote.
- Wire the **value** output into a [HUD Bar](https://docs.theprototype.app/nodes/hudbar.md) to show the same number as a bar.

## Practical example

A best time that says so when there is none yet:

1. Add a **Game Value**: read *best score*, format *time*, decimals 1, prefix `Best `, when empty `Best —`.
2. Wire it into the **format** socket of a **HUD Text** on your Playing screen.
3. Before the first finished round the line reads *Best —*; after it, *Best 1:04.2*.

## For module authors

A module can publish a value for this node to read:

```js
api.values.set('coins', 3, { max: 10 }); // read "published", name "coins"
```

The value is local to each player, is never saved, and is cleared when the module is turned off. `api.values.get(name)`
reads it back and `api.values.clear(name)` removes it.

## See also

- [HUD Editor](https://docs.theprototype.app/hud-editor.md#show-a-game-value) — where the text it fills is placed
- [HUD Text](https://docs.theprototype.app/nodes/hudtext.md) · [HUD Bar](https://docs.theprototype.app/nodes/hudbar.md)
