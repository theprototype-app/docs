# Pulse

Throbs the connected object's scale in and out around its resting size.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| amount | number | overrides the card slider when wired |
| speed | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| amount | 0.2 | 0–1 — how far the scale swings (±20% at 0.2) |
| speed | 2 | 0–10 |

## Practical example

A heartbeat that responds to distance:

1. Add a **Distance** node between two Object Selectors (your avatar-marker and a heart object).
2. Add a **Map Range**: in 0…10 → out 3…0.5, clamp on (closer = faster).
3. Wire Distance → Map Range → a **Pulse** node's **speed** input.
4. Wire Pulse → an **Object Selector** targeting the heart: it beats faster as the marker approaches.

!!! tip
    Pulse multiplies the object's *base* scale, so resizing the object with the gizmo keeps the throb proportional.
