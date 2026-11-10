# Start camera

The camera every player looks through when the game state becomes *playing* — a late joiner too. A **setting**, not an
event: it never pulses.

*Renamed in 1.64* — it used to be called **Game Start**, which read like an event. Old scenes load unchanged. To react
when Play begins, use [On Play start](https://docs.theprototype.app/nodes/onplaystart.md) (or [On Game State](https://docs.theprototype.app/nodes/ongamestate.md)).

**Output:** none (a setting)

## Inputs

| Input | Type | Meaning |
|---|---|---|
| camera | object | a camera to activate as the game starts (optional) |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| state | playing | the game state that counts as "started" |

## Practical example

Put **Start camera** in the Scene flow and wire an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) picking your intro camera into
**camera**: whoever presses Play, or joins later, starts looking through it. For "spawn the gems and zero the score when
Play starts", wire [On Play start](https://docs.theprototype.app/nodes/onplaystart.md) into the Spawn and the Set Variable.
