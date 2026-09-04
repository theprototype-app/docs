# Transport

The shared music transport as a number - beat, bar, phase, bpm or playing - identical on every peer.

**Output:** number

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| read | beat | what to read: `beat`, `bar`, `phase` (0..1 through the loop), `bpm`, `playing` (0/1) or `loopBeats` |

## Practical example

**Transport** (read `phase`) into a **Spin** node: an object turns exactly once per loop, in phase with the drum machine on every peer - the same shared transport the devices are scheduled on.

!!! note
    Every peer evaluates its own copy of the graph from the same shared transport and the same replicated pulses, so nothing about the music is sent per frame. See [Music Playground](../music.md).
