# On Path Event

Fires a pulse when a walker on a [Path](https://docs.theprototype.app/paths.md) arrives at a point that carries an **event** name (set on the point
in the Path's properties). A guard that stops to look round, a lift that rings at each floor, a boat that hoots at the
pier.

*Since 1.64.*

**Output:** event

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| path | — | the Path to listen to; blank = any Path |
| event | — | the event name; blank = any event |
| pulse | 0.3 | how long the pulse stays high (seconds) |

Every peer walks the same schedule, so each one fires the event itself at the same shared moment — nothing extra is
sent.

## Practical example

On a guard's Path, pick the point by the gate and type *look* into its **Event** field. Add **On Path Event** (event
*look*) into an [Announce](https://docs.theprototype.app/nodes/announce.md) "Who goes there?" — the line shows each time the guard reaches the gate.
