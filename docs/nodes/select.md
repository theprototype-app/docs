# Select

Chooses between two values: outputs **a** when the index is low, **b** when it's high.

**Output:** number

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| index | number | < 0.5 picks **a**, ≥ 0.5 picks **b** (booleans work: false = a, true = b) |
| a | number | first value |
| b | number | second value |

Unwired inputs use the card values.

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

!!! tip
    Pairs perfectly with [Switcher](switcher.md) (its index output drives Select) and [Compare](compare.md). Need more than two options? Chain Selects, or reach for a [Script](script.md).
