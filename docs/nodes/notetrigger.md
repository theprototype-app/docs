# Note Trigger

Plays a note on the connected audio device when a pulse arrives - a drum pad, a sampler pad, a synth key.

**Output:** effect

## Inputs

| Input | Type | Meaning |
|---|---|---|
| trigger | event | the pulse that plays the note |
| note | number | the note number (60 = middle C; a drum machine's pad n is 36 + n) |
| velocity | number | 0..1 |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| note | 60 | default note |
| velocity | 0.9 | default velocity |

## Practical example

An **On Impact** sensor on a crate into **Note Trigger** (note 36) on a drum machine: every time the crate lands, the kick fires - on every peer, from the same replicated pulse, once per pulse.

!!! note
    Every peer evaluates its own copy of the graph from the same shared transport and the same replicated pulses, so nothing about the music is sent per frame. See [Music Playground](../music.md).
