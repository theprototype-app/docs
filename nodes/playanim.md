# Play Animation

Plays a keyframed [clip](https://docs.theprototype.app/animation.md) on an object — the bridge from an event into an authored animation. Wire an [On Click](https://docs.theprototype.app/nodes/onclick.md) to it and a door opens for everybody who sees it clicked.

**Output:** none (it acts on the object).

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse performs the action — wire [On Click](https://docs.theprototype.app/nodes/onclick.md), [Key Press](https://docs.theprototype.app/nodes/keypress.md), [Timer](https://docs.theprototype.app/nodes/timer.md) or [Animation Finished](https://docs.theprototype.app/nodes/animfinished.md) here |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| clip | *(first clip)* | which clip to drive — leave empty for the object's active one |
| action | `toggle` | `toggle`, `play`, `stop`, `restart` |
| speed | 1 | playback rate (0.1–4×); it changes the clip's data not at all |

`toggle` is the one you want for a door: the first pulse plays it forward, the next plays it **backwards** to shut it again.

## Which object?

Inside an **object flow** the node targets that flow's own object, so a door's graph needs no wiring at all. In the scene graph, or to drive something else, connect an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md).

It also drives clips a model was **imported** with, not only ones you keyed yourself.

## Practical example

A door anyone can open:

1. Give the door a clip (a `rot.y` channel from 0 to 90°, with its **origin** on the hinge).
2. In the door's object flow, add **On Click** → **Play Animation**, action `toggle`.
3. Click the door. It swings open on every peer at the same moment; click again and it shuts.

!!! tip
    Chain [Animation Finished](https://docs.theprototype.app/nodes/animfinished.md) out of the same clip to fire a latch sound, start the next door, or count how many times it has been opened.
