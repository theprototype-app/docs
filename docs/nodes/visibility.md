# Visibility

Shows or hides the connected object based on a boolean.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| on | boolean | true = visible, false = hidden (numbers and event pulses convert automatically) |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| on | visible | checkbox on the card (used when nothing is wired) |

## Practical example

1. Add a **Toggle**, a **Visibility** node and an **Object Selector** targeting a wall.
2. Wire Toggle → Visibility's **on**, and Visibility → Object Selector.
3. Untick the toggle: the wall vanishes for every peer; tick it back and it returns.

Swap the Toggle for a [Proximity](proximity.md), [Compare](compare.md) or [On Click](onclick.md) source and the same chain becomes a sensor-driven door, an unlockable, or a click-flash.

!!! tip
    Visibility is base-managed: disconnect the node (or delete the chain) and the object returns to the visibility it had before.
