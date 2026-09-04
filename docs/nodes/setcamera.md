# Set Active Camera

Makes a camera object the active view for every player when a pulse arrives.

**Output:** effect (through an Object Selector, or its own camera input)

## Inputs

| Input | Type | Meaning |
|---|---|---|
| trigger | event | the pulse that switches the view |
| camera | object | the camera object to make active (or the node's `camera` parameter) |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| camera | (none) | a camera object's uuid, picked on the card |

## Practical example

Wire an **On Enter** trigger volume at a doorway into **Set Active Camera** with the room's camera: walking through the door cuts to that room's view for every player.
