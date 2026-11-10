# Light Switch

Switches the lights in the connected object on and off with a fade — a light object, or a lamp model with a light inside. With **glow** on its glowing parts (emissive materials) dim with it, so a bulb goes dark with its light.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | switch on |
| back | event | switch off |
| toggle | event | flip it (On Click into here = a lamp you click) |
| on | boolean | on while true — wire a Toggle, a Proximity, a variable |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| on | on | the state before any pulse (on at start) |
| fade | 0.3 | 0 – 5 seconds |
| glow | on | dim the glowing parts too |

The switch's pulses replicate, so every player's lamp is on or off together. A save always writes the light's own
intensity — a scene saved with the lamp off still has a lamp — and an Inspector edit while it is switched off becomes
the new brightness.

## Practical example

A desk lamp you click:

1. Give the lamp model (with a Point light inside) an **On Click** wired into a **Light Switch**'s **toggle**.
2. Press Play and click it: it fades out; click again and it comes back.
