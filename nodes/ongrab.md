# On Grab

Fires a pulse when a player picks up the connected object — a desktop carry in Play or Interact, or
a VR grip in Interact.

**Output:** event

## Parameters

| Parameter | Default | Options |
|---|---|---|
| pulse | 0.3 | seconds the output stays high |

Wire an Object Selector into it, or put it in the object's own flow. Pair it with a
[Game Sound](https://docs.theprototype.app/nodes/gamesound.md) (`pop`) for a crate that sounds like it was lifted, and with
[On Impact](https://docs.theprototype.app/nodes/onimpact.md) (`hit`) for when it lands.
