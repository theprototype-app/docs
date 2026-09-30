# Stored Value

Reads what a [Store Value](storevalue.md) node saved **on this device** — the read side of a best
score. Each player sees their own number.

**Output:** number or text (shown live on the card)

## Parameters

| Parameter | Default | Options |
|---|---|---|
| key | `best` | the same key the Store Value writes |
| output | number | `number`, or `text` for a saved string |

Nothing saved yet reads as the fallback (0).

## Practical example

Show "Best: 12 m" on a menu screen: Stored Value (key `towers-best`) → a **HUD Text** with the
format `Best: {v} m`. The number updates the moment a Store Value writes it.

Modules can read and write the same kind of storage through `api.storage` — see
[Module SDK](../module-sdk.md).
