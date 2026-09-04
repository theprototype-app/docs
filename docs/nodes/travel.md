# Travel to scene

Loads another saved scene by name when a pulse arrives - a door to the next level, replicated to everyone.

**Output:** effect

## Inputs

| Input | Type | Meaning |
|---|---|---|
| trigger | event | the pulse that loads the scene |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| level | (none) | the saved scene, picked on the card by name |

## Practical example

An **On Enter** volume at the exit door into **Travel to scene** with the next level: everyone in the room travels together, and a late joiner lands in the new scene.
