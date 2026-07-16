# Gate

Boolean logic on two inputs — AND, OR, NOT, XOR.

**Output:** boolean

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | boolean | first condition |
| b | boolean | second condition (ignored by `not`) |

Unwired inputs use the card values.

## Parameters

| Parameter | Default | Options |
|---|---|---|
| op | and | `and`, `or`, `not`, `xor` |

## Practical example

A door that opens only when *both* pressure plates are occupied:

1. Set up two **Proximity** nodes, one per plate (each fed by two Object Selectors).
2. Add a **Gate** (op `and`); wire the Proximities into **a** and **b**.
3. Wire Gate → a **Visibility** node's **on** input, then Visibility → an **Object Selector** targeting the door barrier — the barrier shows only while both plates are active. Flip the Gate to `or` for either-plate behavior.

!!! tip
    `not` is a simple inverter: it looks only at **a** and ignores **b** entirely — handy right before a Visibility to turn "near" into "hide".
