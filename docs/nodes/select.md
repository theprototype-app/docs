# Select

Picks one of up to four values by an index: **a**, **b**, **c** or **d**.

**Output:** the picked value (a number, or whatever is wired into the picked socket)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| index | number | rounded to the nearest whole number: 0 picks **a**, 1 **b**, 2 **c**, 3 **d**. Booleans work too: false = a, true = b |
| a | number | first value |
| b | number | second value |
| c | number | third value (optional) |
| d | number | fourth value (optional) |

Unwired inputs use the card values.

The index is **capped at the highest slot the node uses**: with only **a** and **b** in use, anything above 1 still picks
**b**, exactly as a two-way Select always did; wire or set **c** or **d** and they become reachable. Below 0 picks **a**.

## Parameters

| Parameter | Default |
|---|---|
| index, a, b | 0, 0, 0 (fallback fields on the card) |

## Practical example

Sneak mode for a patrolling guard:

1. Add a **Toggle** ("sneak") and wire it into a **Select** node's **index**.
2. Wire two **Number** nodes into **a** (2 — normal) and **b** (0.5 — sneaky).
3. Wire Select → a **Path patrol** node's **speed** input, and Path patrol → an **Object Selector** targeting the guard.
4. Flip the toggle: the guard's walking speed switches instantly.

Four spawn points: a [Random](random.md) node (0–3) into **index**, and four **Vector 3** values into **a**–**d**, feeding
a [Spawn](spawn.md) node's `at`.

!!! tip
    Pairs perfectly with [Switcher](switcher.md) (its index output drives Select) and [Compare](compare.md). Need more
    than four options? Chain Selects, or reach for a [Script](script.md).
