# Counter

Counts trigger pulses and outputs the running total.

**Output:** number (the count, shown live on the card)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| pulse | event | each pulse applies the operation once — wire an [On Click](onclick.md) here |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| op | count up | `count up`, `count down`, `reset to 0` — applied per pulse |
| step | 1 | how much each pulse adds/subtracts |

The count rides the shared trigger log, so all peers hold the same number — including peers who join later.

## Practical example

A three-hit piñata:

1. Wire an **On Click** to an **Object Selector** picking the piñata, and On Click → Counter's **pulse**.
2. Add a **Compare** (op `gte`, b = 3); wire Counter → **a**.
3. Wire Compare → a **Visibility** node's **on**, and Visibility → an **Object Selector** targeting the hidden candy object.
4. Three clicks from *anyone* in the session and the candy appears.

!!! tip
    The operation applies to every pulse the Counter receives — use `count down` with a starting logic chain for countdowns, and `step` to move in bigger increments.
