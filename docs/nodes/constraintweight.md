# Set Constraint Weight

Sets the weight (0-1) of one of the connected object's [constraints](../constraints-and-ik.md) while it runs: fade an
IK reach or a look-at in and out. *New in 1.7X.*

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| weight | number | the weight to set: 0 = off, 1 = the full effect |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| constraint | `1` | on the card: which constraint, as its number in **Inspector ▸ Constraints** (1 = the first), or its id |
| weight | 1 | used when nothing is wired |

## How it behaves

Each peer sets the weight **locally**, and no message is sent. Every peer runs the same graph, so every peer gets the
same weight — the approach [Set Color](setcolor.md) takes. When the node stops, the constraint goes back to the weight
set in the Inspector.

If the object has no constraints, or the number does not match one, the node does nothing.

## Practical example

Blend an arm's reach by hand:

1. Give the arm a **Two-bone IK** in Inspector ▸ Constraints, with a cup as its target.
2. In the node editor add a **Slider** (0 to 1), a **Set Constraint Weight** (`constraint` = `1`) and an
   **Object Selector** picking the arm.
3. Wire Slider → Set Constraint Weight's **weight**, and Set Constraint Weight → the Object Selector.
4. Drag the slider. The arm reaches for the cup as the weight goes up, on every peer's screen.

Swap the Slider for a timer or a counter and a [Map Range](maprange.md) to fade the reach in on its own.

## See also

- [Set Constraint Target](constrainttarget.md) — point a constraint at another object
- [Constraints and IK](../constraints-and-ik.md) — the constraint kinds and the Inspector section
