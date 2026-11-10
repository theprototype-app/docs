# On Hover

Fires when a player's pointer goes **over** its object, **leaves** it, or stays high **while** it is over — the mouse
in Interact, the crosshair in Play, a tap on a phone, the laser in VR. The bell that swings when you point at it, the
sign that lights up as you look at it.

*Since 1.64.*

**Output:** event (wire it into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) to say which object it watches, and into
whatever should react — a [Hover Animate](https://docs.theprototype.app/nodes/hoveranimate.md), a [Highlight](https://docs.theprototype.app/nodes/highlight.md) **on**, a
[Game Sound](https://docs.theprototype.app/nodes/gamesound.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| enabled | boolean | wire a boolean to switch it; unwired = on |

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| on | enter | **enter** = the pointer arrives on the object; **leave** = it goes off it; **over** = high the whole time it stays (re-stamped every 0.25 s) |
| who | anyone | **anyone** = any player's pointer, and the pulse is shared with every peer (everyone sees the bell swing); **me** = only your own pointer, and the pulse stays on your device |
| cooldown | 0 | seconds before it can fire again (0 – 10) |
| pulse | 0.3 | how long the pulse stays high (seconds) |

## How it works

It never fires in Edit: hovering is a Play and Interact thing, so building around the object does not set it off. In a
headset the controller laser counts; on a phone a tap on the object is a hover. Wire it into an Object Selector, or
put it in the object's own flow to watch that object.

## Practical example

A bell that swings when anyone points at it:

1. Select the bell. In its own flow add **On Hover** (on *enter*, who *anyone*, cooldown 0.5) and a
   [Hover Animate](https://docs.theprototype.app/nodes/hoveranimate.md) (style *swing*, mode *energy*, sound *start*, *ring*).
2. Wire On Hover into Hover Animate's **trigger**.
3. Press Play and sweep the crosshair over it: it swings and rings, the same for everyone.

The [Bell recipe](https://docs.theprototype.app/recipe-bell.md) builds this (plus a click and a knock) in one step.

!!! tip "It does not fire?"
    The card's live line says why — *blocked: still in its cooldown*, *blocked: "enabled" is off*, *won't fire: in Edit
    mode (use Play)*. See [Why did this not fire?](https://docs.theprototype.app/debugger.md#why-did-this-not-fire).
