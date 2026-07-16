# Path patrol

Walks the connected object along a series of waypoints you click into the scene, facing along the path.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| waypoints | none (needs 2+) | **Capture clicks** button on the card, then click points in the viewport; **Clear** resets |
| speed | 1 | slider on the card (0.1–5) |
| mode | loop | `loop` (closes the circuit) or `ping-pong` (walks back and forth) |

The object moves at constant speed along the whole polyline and turns to face its direction of travel. Waypoints are absolute world positions, so the patrol route stays put even if you drag the object.

## Practical example

A guard on rounds:

1. Add a **Path patrol** node and an **Object Selector** targeting the guard object; wire them.
2. Press **Capture clicks** on the card, then click 4–5 spots on the ground around your building; press the button again to stop.
3. Set mode `loop`: the guard now walks the circuit endlessly — on every peer, at the same point of the route.

!!! tip
    While a patrol is active the waypoints own the object's position — pause it by disconnecting the edge (right-click ▸ Disconnect), and the object returns to its resting spot.
