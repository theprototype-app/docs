# Path patrol

Walks the connected object along a [Path](https://docs.theprototype.app/paths.md) object — stopping, speeding up, jumping and firing events where
the Path's points say, looping, ping-ponging, walking once or picking random points. Every player sees the walker in the
same place at the same moment.

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| path | object | a Path object (instead of picking one on the card) |
| trigger | event | starts a walk on a Path whose **Walk** is *Once* |

## On the card

| Control | Meaning |
|---|---|
| path | the Path to walk; **New Path** adds one in the scene and picks it, **Edit path** opens its points |
| offset (s) | starts this walker that many seconds along, so several guards can share one Path |
| face along the path | turns the walker the way it is going |

Every timing — waits, speeds, eases, jumps, events and the walk mode — lives on the **Path**, so one Path can be shared
by several walkers. While the node editor is open, the card shows where the walker is: *walking to 3*, *waiting at 2*.

## Patrols made before 1.64

A Path patrol saved before 1.64 has **clicked waypoints** instead of a Path. It keeps walking them exactly as before
(speed, loop or ping-pong on the card, **Capture clicks** and **Clear** still work). Its card offers
**Convert to a Path**: the waypoints become a Path you can edit — waits, speeds, events — and the walk stays exactly the
same. One undo step.

## Practical example

A guard on rounds:

1. Select the guard. **Add ▸ Path** and draw a loop round the building (see [Paths](https://docs.theprototype.app/paths.md)); set **Walk** to
   *Loop* and tick **Closed**.
2. In the guard's own flow add **Path patrol** and pick the Path on its card.
3. Give the point by the gate a **Wait** of 2 s: the guard stops there on every lap, on every peer.

A second guard with the same Path and **offset** 10 walks the same round ten seconds ahead. The
[Guard recipe](https://docs.theprototype.app/recipe-guard.md) builds a square round and a "Spotted!" warning in one step.

!!! tip
    While a patrol is active the Path owns the object's position — pause it by disconnecting the edge (right-click ▸
    Disconnect), and the object returns to its resting spot. Switch off **Animate in editor** to see every walker rest at
    its authored pose while you build ([Node system](https://docs.theprototype.app/node-system.md#animate-in-editor)).
