# On Sequence Event

Fires a pulse when a running [Timeline](../timeline.md) sequence passes a named **event** item, or reaches its end
(`end`). New in 1.39; find it in the palette under **Animation**.

**Output:** event — 1 for a short window as the event passes, 0 otherwise.

## Inputs

None.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| sequence | *(empty)* | which sequence to listen to. **Empty means any sequence** |
| event | *(empty)* | which event item to watch. **Empty means any event**; `end` pulses when a sequence that does not loop finishes |
| pulse | 0.3 s | how long the output stays at 1 |

## Every player, by themselves

Each player runs the same sequence from the same moment and passes the event item themselves, so the node fires on
every device without a message. A **preview** in the Timeline editor fires no graph events — only a sequence playing in
the game does.

## Practical example

An intro, then the game:

1. In the Timeline, build an intro sequence and turn its **Autoplay** on.
2. Add **On Sequence Event** with event `end` → **Set Game State** *playing*.
3. Enter Play: the intro runs, and the game starts the moment it ends.

!!! tip
    Put an Event item named `doors` halfway through a cutscene and wire **On Sequence Event** `doors` →
    [Play Animation](playanim.md): the doors open exactly on that beat.
