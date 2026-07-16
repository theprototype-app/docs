# Object Selector

Binds the graph to a scene object — the **sink** every effect must reach, and an object *reference* for sensor nodes.

**Output:** object (a reference to the picked object — feeds [Distance](distance.md), [Proximity](proximity.md), [Look At](lookat.md))

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| (left) | effect | any effect chain: animations, actions, Script, Sound, physics, module and custom nodes |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| object | `-None-` | dropdown of scene objects on the card |

## Practical example

1. Add a **Spin** node and an **Object Selector**.
2. Pick your cube in the Object Selector's dropdown.
3. Wire Spin → Object Selector: the cube starts spinning, in sync on every peer.
4. Add a second **Object Selector** picking the same cube and wire its *output* into a **Distance** node to measure from it — one node type, two roles.

!!! tip
    Effects only touch the scene **through** an Object Selector — a Spin node dangling on the canvas does nothing. If an object refuses to animate, check its right-click menu: *Disable flow effects* mutes a single object.
