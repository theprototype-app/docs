# Press Button

Pushes the connected object in along one of its own axes and springs it back each time a pulse arrives — a button, a key, a pressure plate. Every player sees the same press at the same moment.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | press (On Click into here) |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| axis | -y | the way it goes in, in the object's own frame (-y = a button on a table, +z / -z = a button on a wall) |
| depth | 0.04 | metres |
| down | 0.08 | seconds to go in |
| hold | 0.1 | seconds held in |
| up | 0.3 | seconds to spring back (a little past rest, then settles) |

## Practical example

A doorbell that feels pressable in VR:

1. Give the button **Highlight** (unwired) — it lights up under your laser, the Play crosshair, the mouse in Interact or
   a phone tap.
2. Give it an **On Click** wired into **Press Button** (axis -z on a wall) and into a [Sound](sound.md) node's trigger.
3. Point and pull the trigger: it lights, sinks in, springs back and rings for everyone.
