# Set Color

Paints the connected object's material with a color, re-applied every frame.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| color | color | the color to apply — usually a [Color Picker](colorpicker.md) |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| color | `#ff4000` | swatch on the card (used when nothing is wired) |

## Practical example

A shared team-color control:

1. Add a **Color Picker**, a **Set Color** and an **Object Selector** targeting your flag object.
2. Wire Color Picker → Set Color's **color**, and Set Color → Object Selector.
3. Anyone in the session can now open the picker and restyle the flag — everyone sees the change instantly.

!!! tip
    You can skip the picker and use the swatch on the Set Color card itself; wiring a Color Picker just makes the color reusable across several Set Color chains.
