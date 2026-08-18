# Set Velocity

Sets a physics body's speed outright — to launch it at an exact velocity, to hold it at a constant one, or to stop it dead.

**Inputs:** `trigger` (event) · `linear` (vector3) · `angular` (vector3) · `target` (object)
**Output:** effect (wire into an [Object Selector](objectselector.md))

## Impulse or Set Velocity?

[Impulse](impulse.md) *adds* — a shove on top of whatever the body was already doing, so a heavy crate moves less than a light one. Set Velocity *replaces* — the body is travelling at exactly what you asked for, whatever its mass and whatever it was doing before.

Use Impulse for anything that should feel physical (a kick, a jump, an explosion). Use Set Velocity when you want a number to be true: a conveyor at 2 m/s, a reset that stops everything, a projectile that always leaves at the same speed.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| mode | once | `once` sets the velocity on the rising edge of the trigger; `continuous` keeps re-applying it every frame the trigger stays high |

Speeds come from the inputs — wire a [Vector3](vector3.md) into `linear` (m/s) and/or `angular` (rad/s). With nothing wired it uses (0, 0, 0), which is a full stop.

!!! note "`continuous` is a hold, not a force"
    While the trigger is high the velocity is re-applied each frame, so friction and collisions still act *between* frames but never win. The body will not accelerate past the number you set, and it stops decaying the moment you let go. It needs a running simulation like everything else here.

## Practical example

**Stop everything (a reset key).**

1. **Key Press** (`code` = `KeyX`) → **Set Velocity** `trigger`, `mode` = *once*, nothing wired into `linear`.
2. **Set Velocity → Object Selector** ▸ your crate.
3. Press <kbd>P</kbd>, throw the crate around, then <kbd>X</kbd> — it drops where it is.

**A conveyor.**

1. **Toggle** (on) → **Set Velocity** `trigger`, `mode` = *continuous*.
2. **Vector3** (2, 0, 0) → `linear`.
3. Point it at a box resting on a belt. While the toggle is on the box travels at a steady 2 m/s; flip it off and friction takes over.

## See also

- [Impulse](impulse.md) — add force instead of replacing velocity
- [Velocity](velocity.md) — read a body's current speed
- [Measure](measure.md) — read its height, top or bottom
