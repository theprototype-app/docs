# Flow Input

Declares a **public input socket** for an [object flow](../object-flows.md) — the way the Scene flow feeds a value into an object's own graph.

**Output:** the declared type (number / boolean / vector3 / color)

Only meaningful **inside an object flow**. In the Scene flow it has nothing to feed it and simply outputs its fallback.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| name | value | the socket label shown on the embedded [Object Flow](objectflow.md) node |
| vtype | number | value type — number, boolean, vector3 or color |
| fallback | 0 | what the node outputs while nothing is wired into it from the Scene |

Changing the type resets the fallback to a sensible default for that type.

## How it behaves

Think of the object flow as a function and Flow Input as one of its parameters. Whatever the Scene wires into the matching socket of the embedded [Object Flow](objectflow.md) node arrives here **on the same tick**. Unconnected, you get the fallback — so the object still behaves sensibly on its own.

Renaming or deleting the node updates the embedded card's sockets everywhere and disconnects any stale wire cleanly.

## Practical example

A lamp whose brightness the Scene controls:

1. Select a lamp object and create its flow.
2. Add **Flow Input** (name *brightness*, type number, fallback 1) and wire it into whatever drives the light.
3. In the Scene flow, right-click the lamp ▸ **Add flow to Scene graph**, then wire a [Slider](slider.md) into the card's new *brightness* socket.
4. Drag the slider — the lamp reacts, and so does every peer's.
