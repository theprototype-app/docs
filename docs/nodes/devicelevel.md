# Device Level

The live output level of the connected audio device (or a wired one) as a number - a meter you can drive anything with.

**Output:** number

## Inputs

| Input | Type | Meaning |
|---|---|---|
| target | object | the device to meter (the object graph's owner when unwired) |

## Parameters

None.

## Practical example

**Device Level** of a speaker into **Map Range** into a **Pulse** node on a lamp: the lamp throbs with the music. Or into a **HUD Bar** for a level meter.

!!! note
    Every peer evaluates its own copy of the graph from the same shared transport and the same replicated pulses, so nothing about the music is sent per frame. See [Music Playground](../music.md).
