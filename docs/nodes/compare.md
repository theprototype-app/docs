# Compare

Compares two numbers and outputs true or false.

**Output:** boolean

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | number | left side |
| b | number | right side |

Unwired inputs use the card values.

## Parameters

| Parameter | Default | Options |
|---|---|---|
| op | gt | `gt` (>), `lt` (<), `eq` (=), `gte` (≥), `lte` (≤), `neq` (≠) |
| a, b | 0, 0 | fallback fields on the card |

## Practical example

Reveal a prize after five clicks:

1. Wire an **On Click** node into a **Counter** (see those pages for the click setup).
2. Add a **Compare** (op `gte`, b = 5); wire Counter → **a**.
3. Add a **Visibility** node and an **Object Selector** targeting the prize object.
4. Wire Compare → Visibility's **on** input, and Visibility → Object Selector: the prize pops in on the fifth click — for everyone.

!!! tip
    A boolean feeds numeric inputs as 0/1, so a Compare can also gate a speed: wire it into a [Select](select.md) node's **index** to jump between two values.
