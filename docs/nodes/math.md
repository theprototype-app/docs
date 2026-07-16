# Math

Combines two numbers with an arithmetic operation.

**Output:** number (live result on the card)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | number | first operand |
| b | number | second operand |

Unwired inputs use the values typed on the card.

## Parameters

| Parameter | Default | Options |
|---|---|---|
| op | add | `add`, `sub`, `mul`, `div`, `min`, `max`, `mod` |
| a, b | 0, 0 | fallback fields on the card |

Division and modulo by zero return 0 instead of exploding; `mod` always returns a positive result.

## Practical example

Scale a slider into degrees of travel:

1. Add a **Slider** (Min 0 / Max 10) and a **Number** set to 0.5.
2. Add a **Math** node (op `mul`); wire Slider → **a**, Number → **b**.
3. Wire Math → an **Orbit** node's **radius** input, and Orbit → an **Object Selector** targeting a moon object: the slider now sweeps the orbit radius from 0 to 5.

!!! tip
    `min`/`max` double as clamps: wire a value into **a** and type the limit into **b**.
