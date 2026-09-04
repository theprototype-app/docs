# Device Param

Writes a number into one parameter of the connected audio device every frame - an LFO on a cutoff, a fader on a level.

**Output:** effect (reaches the device through an Object Selector, or the object graph's owner)

## Inputs

| Input | Type | Meaning |
|---|---|---|
| value | number | the value to write every frame |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| key | level | which parameter of the device to write (the keys its Inspector section shows) |

## Practical example

A **Time** node (mode `sin`, rate 5) into **Map Range** (-1..1 -> 200..2000) into **Device Param** with key `cutoff` on a filter pedal: an LFO sweeps the filter, identically on every peer, and nothing crosses the wire - the value already travels as the graph. Values are clamped to the parameter's declared range.

!!! note
    Every peer evaluates its own copy of the graph from the same shared transport and the same replicated pulses, so nothing about the music is sent per frame. See [Music Playground](../music.md).
