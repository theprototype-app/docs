# Math

Combines numbers with an arithmetic operation — two, or up to eight — or shapes one (sine, rounding, clamping…).

**Output:** number (live result on the card)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | number | first operand |
| b | number | second operand |
| c … h | number | extra operands, added with **+ input** (since 1.27) |

Unwired **a** and **b** use the values typed on the card.

### More than two inputs

Since 1.27 Math takes up to eight inputs, named **a** to **h**. Press **+ input** on the card to add a socket, and
**−** on a row to remove that socket.

- With `add`, `sub`, `mul`, `div`, `min` or `max`, Math combines every wired input left to right: 1 + 2 + 3 + 4 = 10,
  and 10 − 1 − 2 = 7. The other operations use only **a** and **b**, and the card greys the extra inputs out.
- The extra inputs **c** to **h** have no typed-in value. An input with no wire is skipped, so an empty socket never
  multiplies your result by zero.
- Removing a socket moves the wires after it down one name: removing **b** turns **c** into **b**, so each wire stays on
  the same value. One <kbd>Ctrl</kbd>+<kbd>Z</kbd> puts it all back, and [groups](../node-editor.md#groups) around the node
  update their sockets too.

## Parameters

| Parameter | Default | Options |
|---|---|---|
| op | add | `add`, `sub`, `mul`, `div`, `min`, `max`, `mod`, `pow`, `sin`, `cos`, `abs`, `round`, `floor`, `clamp`, `neg` |
| a, b | 0, 0 | fallback fields on the card |

Division and modulo by zero return 0 instead of exploding; `mod` always returns a positive result.

### Shaping one value (1.23)

These operations work on **a**; **b** is a setting, or is not used:

| op | Result |
|---|---|
| `pow` | a to the power b (aᵇ) |
| `sin` / `cos` | sin(a) or cos(a), times b — b = 0 counts as 1, so a fresh node gives plain sin(a) |
| `abs` | \|a\| |
| `round` / `floor` | a rounded to the nearest whole number / down |
| `clamp` | a kept between 0 and b (b of 0 or less = between 0 and 1) |
| `neg` | −a |

A [HUD Button](hudbutton.md), **On Game State** or **HUD Timer** can be wired into **a** or **b** since 1.23 —
see [Value wires](../main-graph.md#value-wires).

## Practical example

Scale a slider into degrees of travel:

1. Add a **Slider** (Min 0 / Max 10) and a **Number** set to 0.5.
2. Add a **Math** node (op `mul`); wire Slider → **a**, Number → **b**.
3. Wire Math → an **Orbit** node's **radius** input, and Orbit → an **Object Selector** targeting a moon object: the slider now sweeps the orbit radius from 0 to 5.

!!! tip
    `min`/`max` double as one-sided clamps: wire a value into **a** and type the limit into **b**. For a
    swing back and forth, wire a [Time](time.md) node into **a** of a `sin` node and set **b** to the size of the swing.
