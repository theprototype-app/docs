# Sound

Plays an audio file *from* the connected object — positional 3D sound that everyone hears.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| volume | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| file | — | dropdown of the audio files in your [Explorer](../explorer.md) library |
| volume | 0.8 | slider, 0–1 |
| radius | 5 m | slider, 1–30 — how far the sound carries |
| loop | on | checkbox |
| ▶ Play / ■ Stop | stopped | button on the card |

Picking a file **pushes its bytes to your peers** automatically (by content hash), so everyone builds the same audio chain — late joiners fetch it too.

## Practical example

A campfire with crackle:

1. Drag an `mp3`/`ogg`/`wav` into the Explorer.
2. Add a **Sound** node and an **Object Selector** targeting the campfire object; wire them.
3. Pick the file on the card, set radius 8, loop on, press **▶ Play**.
4. Everyone hears the fire — from the fire's position, fading with distance as they move around.

!!! tip
    Looping sounds run off the synced clock, so all peers hear the same phase. Wire **volume** from a [Slider](slider.md) for a shared mixing knob.
