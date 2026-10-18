# Play Sequence

Plays, stops, toggles or restarts a [Timeline](../timeline.md) sequence (camera shots, clips, audio, events) for every
player when a pulse arrives. New in 1.39; find it in the palette under **Animation**.

**Output:** none (it acts on the sequence).

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse performs the action — wire [On Click](onclick.md), [On Enter](onenter.md), [Key Press](keypress.md) or [On Sequence Event](onseqevent.md) here |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| sequence | *(none)* | which sequence to play; **Open in Timeline** jumps to it |
| action | `play` | `play`, `stop`, `toggle`, `restart` |

## Every player, one moment

The pulse is shared, so every player starts the sequence from the same moment and runs it on their own device: the
clips start together, each device plays the audio, and each player's **own** view cuts to the camera shots. Nothing
else is sent.

A sequence with **Autoplay** on needs no node at all — it starts when a player enters Play, and when an exported game
opens.

## Practical example

A cutscene when someone presses a button:

1. In the Timeline, build a sequence named `door` with a camera shot on the door and the door's opening clip.
2. Add **On Click** (on the button) → **Play Sequence**, sequence `door`, action `play`.
3. Click the button in Play. Every player's view cuts to the door as it swings open, then comes back.

!!! tip
    Chain an [On Sequence Event](onseqevent.md) with event `end` to do something once the cutscene is over.
