# Set Shader Uniform

Writes one number inside an object's [shader graph](../shader-graph.md), so a trigger, a
timer or a counter can drive how the material looks — a panel that heats up when you stand
near it, a glow that pulses when something is picked up, dissolve that runs on a countdown.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| uniform | *(empty)* | the name of the value to write, as shown in the Shader editor |
| value | 0 | the number to write (usually wired, not typed) |

## Finding the uniform name

A shader graph's numbers, colours and vectors each compile to a named value. To find the
name:

1. open the **Shader editor** on the object,
2. click the node whose parameter you want to drive (a **Float** node, say),
3. read the **uniforms** list in the ⓘ info pane on the right — it shows names like
   `u_rgh_value`,
4. paste that into this node's *uniform* field.

Only **numbers** can be driven this way. Colours and vectors are not yet supported, so to
animate a colour, drive a number and turn it into a colour inside the graph — a
[Gradient](../shader-nodes.md#gradient) or a **Mix** between two colours does this well,
and is usually nicer to author anyway.

## How it behaves

Writing a uniform does **not** recompile the shader, so this is cheap enough to run every
frame.

Each peer writes the value **locally**, and no message is sent. It does not need one: the
value arrives through the flow graph, which is already deterministic and replicated, so
every peer computes the same number and writes the same result. This is the same approach
[Set Color](setcolor.md) takes.

If the object has no shader graph, or the name does not match anything in it, the node does
nothing — it will not error or break the material.

## Practical example

A crystal that glows brighter as you approach:

1. Give the crystal a shader graph: **Float** (`0`) → Surface **emissive**, and a
   **Colour** → Surface **albedo**.
2. Select the Float node and copy its uniform name from the ⓘ pane.
3. In the crystal's flow: **Proximity** (radius 4) → **Map Range** (0–1 in, 3–0 out) →
   **Set Shader Uniform** (paste the name) → **Object Selector** picking the crystal.
4. Walk towards it. The glow rises as you close in, on every peer's screen at once.

Swap Proximity for a [Timer](timer.md) or a [Counter](counter.md) and the same wiring
gives you a timed dissolve or a charge-up that steps each time something happens.
