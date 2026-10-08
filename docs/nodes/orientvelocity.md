# Orient to Velocity

Turns the connected object to face the way it is moving, smoothly, leaning into turns — put it after Wander, Orbit or any mover so it looks where it goes.

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| turnSpeed, bank, maxBank, minSpeed | number | override the card sliders when wired |

## Parameters

| Parameter | Default | Range / options |
|---|---|---|
| turnSpeed | 4 | 0.1 – 30 per second: how quickly it swings round to the new heading |
| bank | 0.5 | 0 – 1: how much it leans into turns |
| maxBank | 30 | 0 – 80° |
| minSpeed | 0.02 | m/s below which it keeps its last heading (a hovering object does not spin) |
| pitch | on | tilt up and down with the motion |
| forward | +z | the model's nose axis |

It reads the object's motion **after** every other effect on it has run (the runtime orders movers first, whatever order the graph lists them in), so it works with any mover — Wander, Orbit, Bounce, a script. Each peer smooths its own copy; they converge on the same heading.

## Practical example

A drone that faces where it drifts: **Wander** (area = the room) + **Orient to Velocity** (turnSpeed 3, bank 0.8) on the drone's flow.
