# Mass

Gives the connected object weight for the physics simulation — objects with a Mass fall and collide.

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| kg | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| kg | 1 | 0.1–100 |

## Practical example

Knock down a tower:

1. Stack a few cubes into a tower and place a sphere above them.
2. Add a **Mass** node (kg 5) and an **Object Selector** picking the sphere; wire Mass → Object Selector.
3. Right-click the viewport ▸ **Tools ▸ ▶ Simulate physics**: the sphere drops into the tower. Objects *without* a Mass act as static obstacles.
4. Stop the simulation — the result stays, as a single undoable step.

!!! tip
    Physics nodes don't run per-frame like animations — they are read **once when the simulation starts**. One peer runs the simulation at a time and everyone watches the same outcome. Pair Mass with [Bounciness](https://docs.theprototype.app/nodes/bounciness.md) and [Friction](https://docs.theprototype.app/nodes/friction.md) to tune how it lands.
