# Motor

Drives every **hinge joint** attached to the connected object — the flow way to make wheels turn, turntables spin and doors swing under power.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## How it works

Select the *body*, not the wheel: the node powers every revolute (hinge) joint touching the connected object, so one Motor on a car chassis drives all four wheels. It overrides a motor configured on the joint itself.

## Parameters

| Parameter | Default | Range | Meaning |
|---|---|---|---|
| vel | 3 | −20–20 | target rotation speed (negative reverses) |
| maxForce | 100 | 0–500 | how hard the motor may push to reach that speed — low force means a heavy load slows it down |
| side | all | all, +x, −x, +z, −z | which hinges to drive, by where they sit on the object |

Both re-apply **live mid-simulation**, so you can tune speed while the car is driving.

## Practical example

A powered turntable:

1. Add a cylinder for the base and a plate above it; connect them with a hinge (select both ▸ right-click ▸ **Physics ▸ Hinge**).
2. In the plate's flow: **Motor** (vel 2) → **Object Selector** picking the plate.
3. Press <kbd>P</kbd>. Raise `vel` while it spins to speed it up.

## Driving one side: steering

`side` narrows the motor to the hinges on one side of the object, judged by where each joint is anchored. Two Motor nodes on the same chassis — one `+x`, one `−x` — are a **differential drive**: give them the same speed and the vehicle goes straight, different speeds and it turns, opposite speeds and it spins on the spot.

1. On the chassis flow, add two **Motor** nodes, `side` = `+x` and `−x`.
2. Wire each into an **Object Selector** picking the chassis.
3. Drive them from two [Key Press](keypress.md) → [Select](select.md) chains, or from a [Slider](slider.md) each while you tune it.

With `side` = *all* (the default) one node drives every hinge on the object identically, which is what it always did.

!!! tip
    No hinge, no motion — Motor needs a revolute joint to act on. Create one from the object menu (**Physics ▸ Hinge**) or from the [Joint](joint.md) node. For a free spin with no joint at all, use [Angular Velocity](angularvelocity.md) instead.
