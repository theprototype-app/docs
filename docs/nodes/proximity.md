# Proximity

True while two things are within a radius of each other — a distance sensor with the threshold built in.

**Output:** boolean (card shows *near* / *far* live)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | object | first point — an [Object Selector](objectselector.md) or a [Vector3](vector3.md) world point |
| b | object | second point — same options |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| radius | 3 | number field on the card |

## Practical example

An automatic porch light:

1. Add two **Object Selectors** — one picking your "visitor" cube, one picking the doormat object — and wire them into Proximity's **a** and **b**.
2. Set **radius** to 2.
3. Wire Proximity → a **Visibility** node's **on** input, and Visibility → an **Object Selector** targeting the glowing lamp object.
4. Drag the cube toward the doormat: the lamp appears at 2 units and vanishes when the cube leaves.

!!! tip
    Combine two Proximity nodes with a [Gate](gate.md) for and/or conditions, or invert one with Gate `not`.
