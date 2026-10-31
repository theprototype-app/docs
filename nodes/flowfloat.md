# Float Along Flow

Carries the connected object along a [Flow path](https://docs.theprototype.app/fluids.md#flow-paths) — a leaf, a toy boat — at the path's speed,
bobbing and turning with the current, looping at the end. Uses the nearest Flow path unless one is wired.

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| path | object | the Flow path to ride — wire an Object Selector picking it |
| speed, bob | number | override the card sliders when wired |

With **path** unwired it rides the Flow path nearest to where the object was placed, if one is within about 4 m;
with none in reach the object stays where it is.

## Parameters

| Parameter | Default | Options |
|---|---|---|
| speed | 1 | 0 to 5 — a multiplier on the path's own **Speed**; 0 holds it in place on the path |
| bob | 0.03 | 0 to 0.3 m — how far it rises and falls on the water |
| align | on | turn the object to face along the current; off keeps its placed facing |

## How it moves

- **Where you place it sets its lane.** The object keeps its height above the path's line and its own turn relative to
  the current; moving it in the editor re-anchors it there. The placed pose is what the scene saves.
- **It always loops.** At the end of the path it starts again at the beginning, whether or not the path itself loops.
- **The same everywhere.** Its spot on the path is worked out from the shared clock, so every player — and anyone who
  joins later — sees it at the same place with nothing sent. Floaters placed at different spots bob out of step with each other.
- It follows the path's line only, so it needs no particle water to move.

## Practical example

A toy boat on a river:

1. **Add ▸ Water ▸ Flow path**, and place a small object (the boat) on it.
2. Add an **Object Selector** picking the Flow path and a **Float Along Flow**; wire Object Selector → Float Along
   Flow's **path**.
3. Add a second **Object Selector** picking the boat; wire Float Along Flow → it. The boat sails down the river and
   comes back round at the end.
4. Raise **speed** to 2 for a faster current, or **bob** for choppier water.

![An Object Selector picking a Flow path feeds Float Along Flow's path input; Float Along Flow drives the boat's Object Selector](https://docs.theprototype.app/img/nodes-flowfloat/flowfloat.webp)
*Figure: An Object Selector picking a Flow path feeds Float Along Flow's path input; Float Along Flow drives the boat's.*
!!! tip
    The nearest-path rule means a leaf dropped on a river needs no **path** wire at all — wire one when two paths run
    close together and you want to choose. For a path drawn as a spline, or ping-pong and run-once travel, see
    [Follow Path](https://docs.theprototype.app/nodes/followpath.md).
