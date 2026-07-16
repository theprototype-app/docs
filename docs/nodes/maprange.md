# Map Range

Remaps a number from one range to another — the glue between free-range sources and bounded parameters.

**Output:** number

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | number | the value to remap |

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| inMin / inMax | 0 / 1 | the expected input range |
| outMin / outMax | 0 / 1 | the produced output range |
| clamp | on | keep the result inside the output range |

`a` at `inMin` produces `outMin`; `a` at `inMax` produces `outMax`; everything between interpolates linearly. With clamp off, values outside the input range extrapolate.

## Practical example

1. Add a **Time** node (mode `sin`) — it outputs −1…1.
2. Add a **Map Range**: in −1…1 → out 0.2…2, clamp on.
3. Wire Time → Map Range's **a**, Map Range → a **Spin** node's **speed** input, and Spin → an **Object Selector** targeting your cube.
4. The cube's spin speed now breathes smoothly between 0.2 and 2.

!!! tip
    Reverse `outMin`/`outMax` (e.g. 1 → 0) to invert a signal without extra nodes.
