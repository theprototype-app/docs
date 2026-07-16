# Slider

An interactive slider that outputs a number — the quickest way to hand-tune any numeric input live.

**Output:** number

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| value | 20 | slider on the card |
| Min | 0 | ⓘ Params tab |
| Max | 40 | ⓘ Params tab |

The output is always clamped to the Min–Max range, so retune the range freely — stale values can't escape it.

## Practical example

1. Add a **Slider** and set **Min 0 / Max 5** in the ⓘ tab.
2. Add a **Spin** node and an **Object Selector** targeting your cube.
3. Wire Slider → Spin's **speed** input, and Spin → Object Selector.
4. Drag the slider: the cube's spin speed follows in real time — on every peer's screen.

!!! tip
    In older scenes a Slider wired *directly* into an Object Selector scales the target object (20 = neutral 1×). That legacy behavior still runs for saved graphs, but new graphs should drive a node parameter instead — it's clearer and works with any effect.
