# Move Input

The player's own movement keys as numbers — the W/A/S/D axes — for driving things by hand.

**Outputs:**

| Handle | Type | Reads |
|---|---|---|
| x | number | <kbd>D</kbd> = 1, <kbd>A</kbd> = −1, neither or both = 0 |
| y | number | <kbd>W</kbd> = 1, <kbd>S</kbd> = −1, neither or both = 0 |

Each player reads **their own** keys: a player pressing nothing reads 0, whatever anyone else is pressing, and nothing
is sent over the network. That is what you want for "my turret turns with my keys", and the wrong tool for a value
every player must agree on.

Move Input reads the keyboard only. For a gamepad stick use a [Gamepad Axis](gamepadaxis.md).

## Inputs

None.

## Parameters

None.

## Practical example

Wire **Move Input**'s **x** into a **Spin** node's speed through an Object Selector: <kbd>A</kbd> and <kbd>D</kbd> spin
the object by hand — a turntable, a crane, a valve.
