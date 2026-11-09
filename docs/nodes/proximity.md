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
| to | object | **object** = the object wired into **b**; **player** = *your* player's body (feet to eye) — *since 1.64* |

With **to: player** each peer measures from **a** to its own player, so the output can differ between players: a sign
that lights for whoever stands close. For one shared reaction — a door everyone sees open — use a sensor zone and
[On Enter](onenter.md) instead (the [walk-up door recipe](../recipe-walk-up-door.md)); the
[Guard recipe](../recipe-guard.md) uses **to: player** for a warning each player hears for themselves.

## Practical example

An automatic porch light:

1. Add two **Object Selectors** — one picking your "visitor" cube, one picking the doormat object — and wire them into Proximity's **a** and **b**.
2. Set **radius** to 2.
3. Wire Proximity → a **Visibility** node's **on** input, and Visibility → an **Object Selector** targeting the glowing lamp object.
4. Drag the cube toward the doormat: the lamp appears at 2 units and vanishes when the cube leaves.

!!! tip
    Combine two Proximity nodes with a [Gate](gate.md) for and/or conditions, or invert one with Gate `not`.
