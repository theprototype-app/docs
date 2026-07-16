# Distance

Measures the live distance between two things in the scene.

**Output:** number (world units; live readout on the card)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | object | first point — wire an [Object Selector](objectselector.md), or a [Vector3](vector3.md) for a fixed world point |
| b | object | second point — same options |

With either input missing, the output is 0.

## Parameters

None on the card beyond the readout.

## Practical example

A proximity fuse with a readable dial:

1. Add two **Object Selectors**, picking a "player" cube and a "mine" sphere; wire their outputs into Distance's **a** and **b**.
2. Add a **Compare** (op `lt`, b = 2); wire Distance → **a**.
3. Wire Compare → a **Visibility** node's **on**, then Visibility → an **Object Selector** targeting an explosion decal: it appears whenever the two objects come within 2 units.
4. Drag the cube around and watch the Distance card tick live.

!!! tip
    If you only need "near / not near", [Proximity](proximity.md) does the compare for you in one node.
