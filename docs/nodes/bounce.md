# Bounce

Bounces the connected object up and down off its resting height, like a dribbled ball.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| amplitude | number | overrides the card slider when wired |
| speed | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| amplitude | 0.5 | 0–3 (bounce height) |
| speed | 2 | 0–10 (bounces per interval) |

The motion is a rectified sine — the object rises from its base position and lands back on it, never dipping below.

## Practical example

A pickup that begs for attention:

1. Add a **Bounce** node (amplitude 0.3, speed 3) and an **Object Selector** targeting a coin object.
2. Wire Bounce → Object Selector — the coin hops in place on every screen.
3. Stack a **Spin** node into the *same* Object Selector for the full collectible look: effects combine, each adding its own offset.

!!! tip
    Several effects can feed one Object Selector — they all apply from the object's base transform each frame.
