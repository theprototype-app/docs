# Blink

Flashes the connected object on and off at a steady rate.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| speed | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| speed | 2 | 0.2–10 — blink cycles per second |

## Practical example

A hazard beacon:

1. Add a **Blink** node (speed 4) and an **Object Selector** targeting a small emissive-looking sphere on a pole.
2. Wire Blink → Object Selector: the sphere strobes, perfectly in phase on every peer (the blink runs off the synced clock).
3. Drive **speed** from a [Proximity](proximity.md) chain through [Select](select.md) to blink faster when someone gets close.

!!! tip
    Blink toggles the object's *visibility* — it doesn't dim materials. For a smoother attention-getter, use [Pulse](pulse.md) (size throb) instead, or stack both into the same Object Selector.
