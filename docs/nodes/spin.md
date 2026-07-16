# Spin

Rotates the connected object continuously around one axis.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| speed | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| axis | y | x / y / z (dropdown) |
| speed | 1 | −5 to 5 (negative spins the other way) |

## Practical example

The classic first graph:

1. Add a **Spin** node and an **Object Selector**; pick your cube in the selector.
2. Wire Spin → Object Selector — the cube starts turning, at the same phase on every peer.
3. For a live speed control, add a **Slider** (Min −5 / Max 5 in the ⓘ tab) and wire it into Spin's **speed** input.

!!! tip
    The rotation is computed from the synced clock, not accumulated — pausing to drag the object and letting go resumes cleanly, and late joiners see the identical angle.
