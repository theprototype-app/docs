# Shake

Jitters the connected object around its resting position — rumble, nervousness, impact feedback.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| intensity | number | overrides the card slider when wired |
| speed | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| intensity | 0.2 | 0–1 |
| speed | 10 | 1–30 |

The jitter is layered sine waves, not randomness — deterministic, so every peer sees the exact same wobble.

## Practical example

An engine that rumbles harder as it spools up:

1. Add a **Slider** (Min 0 / Max 1) as the throttle.
2. Add a **Shake** node and an **Object Selector** targeting the engine block.
3. Wire Slider → Shake's **intensity** input, and Shake → Object Selector.
4. Push the slider: the block trembles more violently — smoothly, and in sync for everyone.

!!! tip
    Shake offsets *from the base position* each frame, so dragging the object moves its shake center along with it.
