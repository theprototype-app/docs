# Number

A constant numeric value — the simplest source node.

**Output:** number

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| value | 1 | number field on the card |
| Step | 1 | ⓘ Params tab — the increment the field's arrows use |

## Practical example

1. Add two **Number** nodes (say 3 and 4) and a **Math** node set to `mul`.
2. Wire them into Math's **a** and **b** inputs — the card shows the live result (12).
3. Wire Math → a **Bounce** node's **speed** input, and Bounce → an **Object Selector** targeting your cube: the cube bounces at the computed rate.

!!! tip
    Set **Step** to 0.1 (or smaller) when you're feeding parameters that live in a 0–1 range — the field's up/down arrows then move in useful increments.
