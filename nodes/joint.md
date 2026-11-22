# Joint

Attaches two objects to each other when an event fires — a hinge, a rigid weld, a ball joint, a slider, a spring or a rope.

**Inputs:** `trigger` (event) · `a` (object, the anchor) · `b` (object, the attached)
**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md))

## How it works

On the rising edge of `trigger` the two objects are joined, exactly as if you had used the object menu's **Physics** entries (**Weld together**, **Hinge**, **Ball joint**…): the joint becomes part of the scene, replicates to every peer, appears in saves, and can be undone with <kbd>Ctrl</kbd>+<kbd>Z</kbd>.

That is the difference between this and the rest of the physics nodes — [Impulse](https://docs.theprototype.app/nodes/impulse.md) and [Set Velocity](https://docs.theprototype.app/nodes/setvelocity.md) act on a running simulation and leave nothing behind, while Joint *authors scene data*.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| kind | revolute | `revolute` = a hinge that turns about one axis; `weld` = rigidly fixed together; `ball` = swings and twists every way; `slider` = moves along one axis; `spring` = pulls back to the distance it was made at; `rope` = can get no further apart than it was made at (the last four *since 1.74*) |
| axis | y | which axis the hinge turns about or the slider moves along |
| vel | 0 | motor speed (rad/s) — leave at 0 for a free-swinging hinge |
| maxForce | 100 | how hard the motor may push to reach that speed |

Spring stiffness, rope length and slider limits are tuned afterwards in **Properties ▸ Physics ▸ Joints** (see
[Tuning a joint](https://docs.theprototype.app/physics.md#tuning-a-joint)).

## Choosing the objects

`a` is the **anchor** and `b` is the thing **attached** to it. Wire an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) into each. If you leave `a` unwired it falls back to the node's own target (the Object Selector it feeds, or its owner object), so the minimum wiring is one selector into `b`.

!!! warning "Start the objects world-aligned"
    A hinge axis is interpreted in both bodies' frames, so objects that begin with a rotation can make the solver fight itself and throw the assembly apart. Build the joint on unrotated objects and rotate the finished assembly, or use `weld`.

## Practical example

**A door that installs itself.**

1. A thin box for the door with a **Dynamic** body, a wall with a **Static** one.
2. Put the door's [origin](https://docs.theprototype.app/controls.md#each-objects-origin) on its hinge edge — a revolute joint anchors on the origin, which is what makes it swing on the hinge rather than the middle.
3. **On Click** (the wall) → **Joint** `trigger`, `kind` = *revolute*, `axis` = `y`.
4. **Object Selector** (wall) → `a`; **Object Selector** (door) → `b`.
5. Press <kbd>P</kbd> and click the wall. The door is hinged for everyone, and it stays hinged in the saved scene.

**A motorised wheel.** `kind` = *revolute*, `vel` = 6, `maxForce` = 200, with the chassis in `a` and the wheel in `b`. See also the [Motor](https://docs.theprototype.app/nodes/motor.md) node, which drives joints that already exist — and can drive one side of a vehicle at a time.

## See also

- [Motor](https://docs.theprototype.app/nodes/motor.md) — change the speed of existing hinges, per side
- [Physics](https://docs.theprototype.app/physics.md) — joints, bodies and the simulation controls
