# Color Picker

Outputs a color chosen with a swatch — the color source for anything that paints.

**Output:** color

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| color | `#ff4000` | color swatch on the card |

## Practical example

1. Add a **Color Picker**, a **Set Color** node and an **Object Selector** targeting your cube.
2. Wire Color Picker → Set Color's **color** input, and Set Color → Object Selector.
3. Pick a color: the cube repaints instantly for everyone in the session.

!!! tip
    The color socket (amber) only fits color inputs — in practice that means [Set Color](setcolor.md). In older scenes you may find a Color Picker wired straight into an Object Selector; that legacy connection still paints the object, but new graphs go through Set Color.
