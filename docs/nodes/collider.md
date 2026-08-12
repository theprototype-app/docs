# Collider

Overrides the collision **shape** the [physics simulation](../physics.md) uses for the connected object — the flow equivalent of the Inspector's *Physics ▸ Collider* pick, and it wins over it.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Why override the shape

Physics doesn't collide your triangles; it collides a simple stand-in. A box is fast and forgiving, but a ball resting in a box-shaped bowl never rolls. Pick the shape that matches what the object should *feel* like.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| shape | box | `box`, `sphere`, `capsule`, `cylinder`, `cone`, `hull`, `custom`, `object` |
| scale | 1 | multiplies the whole shape (0.25–4) — a slightly smaller collider stops objects looking "held apart" |
| sensor | off | makes the shape a **trigger volume**: nothing bounces off it, but overlaps fire [On Enter](onenter.md) / [On Exit](onexit.md) |

Shapes in short: **hull** shrink-wraps the mesh in a convex skin (exact for ramps and gems, seals concave openings); **custom** uses the compound collider you authored in *Edit collider…*; **object** hulls the geometry of a *different* object — wire that object's [Object Selector](objectselector.md) into the node's `source` input, e.g. give a detailed statue the collider of a simple crate.

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| source | object | only for `shape: object` — the object whose geometry becomes this collider |

## Live edits

Changing a parameter **rebuilds the collider mid-simulation** — no restart, and joints and velocity survive. Tweak a bumper's shape while the ball is still rolling.

## Practical example

A marble run where the ball actually rolls:

1. Build a ramp (Add ▸ *Wedge*) and drop a sphere above it.
2. In the sphere's flow: **Collider** (shape *sphere*) → **Object Selector** picking the sphere.
3. Press <kbd>P</kbd> to simulate — the ball rolls instead of sliding like a crate.
4. Turn on *Show collider* (Inspector ▸ Physics) to see the green wireframe that physics is really using.

!!! tip
    Physics nodes are read when the simulation starts and re-applied live on edits — they don't tick per frame like animation nodes. Pair Collider with [Mass](mass.md), [Bounciness](bounciness.md) and [Friction](friction.md).
