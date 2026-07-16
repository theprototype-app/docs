# Toggle

A checkbox that outputs true or false — a hand-operated on/off switch.

**Output:** boolean

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| on | off (false) | checkbox on the card |

## Practical example

A light switch for a lamp object:

1. Add a **Toggle**, a **Visibility** node and an **Object Selector** targeting the lamp.
2. Wire Toggle → Visibility's **on** input, and Visibility → Object Selector.
3. Tick the checkbox: the lamp appears and disappears — for every peer at once.

!!! tip
    Booleans convert to numbers automatically (false = 0, true = 1), so a Toggle can also feed numeric inputs — e.g. into a [Select](select.md) node's **index** to switch between two wired values.
