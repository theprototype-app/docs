# Look At

Keeps the connected object facing a target — another object or a fixed point — every frame.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| target | object | what to face — an [Object Selector](objectselector.md) (follows the object live) or a [Vector3](vector3.md) point |

## Parameters

None on the card — everything comes from the wired target.

## Practical example

A turret that tracks a moving target:

1. Add an **Object Selector** picking the "target" sphere; wire its output into Look At's **target**.
2. Add a second **Object Selector** picking the turret object.
3. Wire Look At → that Object Selector.
4. Drag the sphere around the scene: the turret rotates to face it continuously, on every peer's screen.

!!! tip
    The orientation is managed from the object's base transform — disconnect the Look At and the object returns to its original rotation.
