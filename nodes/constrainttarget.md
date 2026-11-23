# Set Constraint Target

Points one of the connected object's [constraints](https://docs.theprototype.app/constraints-and-ik.md) at another object while it runs: the hand
reaches for whatever the graph picks. *New in 1.75.*

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| target | object | the object to aim at — usually an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| constraint | `1` | on the card: which constraint, as its number in **Inspector ▸ Constraints** (1 = the first), or its id |

## How it behaves

Each peer sets the target **locally**, and no message is sent. Every peer runs the same graph, so every peer gets the
same target — the approach [Set Color](https://docs.theprototype.app/nodes/setcolor.md) takes. When the node stops, the constraint goes back to the target
set in the Inspector.

If the object has no constraints, or the number does not match one, the node does nothing.

## Practical example

Make a hand reach for a different cup:

1. Give the arm a **Two-bone IK** in Inspector ▸ Constraints, with the first cup as its target.
2. In the node editor add an **Object Selector** picking the second cup, a **Set Constraint Target**
   (`constraint` = `1`) and a second **Object Selector** picking the arm.
3. Wire the cup's Object Selector → Set Constraint Target's **target**, and Set Constraint Target → the arm's Object
   Selector.
4. The hand now reaches for the second cup. Disconnect the node and it goes back to the first.

## See also

- [Set Constraint Weight](https://docs.theprototype.app/nodes/constraintweight.md) — fade a constraint in and out
- [Constraints and IK](https://docs.theprototype.app/constraints-and-ik.md) — the constraint kinds and the Inspector section
