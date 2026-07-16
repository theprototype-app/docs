# Bounciness

Sets how much the connected object rebounds in the physics simulation (restitution).

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| value | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| value | 0.3 | 0–1 — 0 lands dead, 1 rebounds with almost all its energy |

## Practical example

A super-ball versus a beanbag:

1. Place two spheres side by side, a few units above the ground.
2. Give each a **Mass** node (kg 1) wired to its own **Object Selector**.
3. Add a **Bounciness** node per sphere: 0.9 into the first selector's chain, 0.05 into the second.
4. Right-click ▸ **Tools ▸ ▶ Simulate physics**: the super-ball keeps bouncing while the beanbag thuds flat.

!!! tip
    Bounciness only matters once the object has a [Mass](mass.md) (or collides with something that does) — physics parameters are read when the simulation starts, not per frame.
