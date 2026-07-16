# Vector3

An x/y/z triple — used as a direction, an offset, or most often a fixed **point in the world**.

**Output:** vector3

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| x, y, z | 0, 0, 0 | number fields on the card |

## Practical example

Make a signpost that always faces a spot:

1. Add a **Vector3** and set it to `0, 1, 5`.
2. Add a **Look At** node and an **Object Selector** targeting your sign.
3. Wire Vector3 → Look At's **target** input, and Look At → Object Selector.
4. Drag the sign around: it keeps turning to face the point at (0, 1, 5).

!!! tip
    A vector3 can stand in wherever an **object** is expected: wire one into [Distance](distance.md) or [Proximity](proximity.md) to measure against a fixed world point instead of a second object.
