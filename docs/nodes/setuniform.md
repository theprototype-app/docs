# Set Shader Uniform

Writes a number, a colour or a vector inside an object's [shader graph](../shader-graph.md), so a trigger, a
timer or a counter can drive how the material looks — a panel that heats up when you stand
near it, a glow that pulses when something is picked up, dissolve that runs on a countdown.

**Output:** effect (wire into an [Object Selector](objectselector.md))

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| uniform | *(empty)* | the name of the value to write, as shown in the Shader editor |
| value | 0 | the number to write (usually wired, not typed) |
| slot | *(empty)* | *since 1.79*: which [material slot](../materials.md#material-slots)'s shader to write — its number (0 = the first), id or name. Empty = every slot of the object that has this uniform (on a one-material object, its one shader, as before) |

## Inputs

| Handle | Type | Drives |
|---|---|---|
| value | number | a **float** uniform; on a colour or vector uniform it sets every component (a grey, a uniform scale) |
| color | color | a **colour** (vec3) uniform — *since 1.74* |
| vector | vector3 | a **vec2 / vec3 / vec4** uniform: x, y, z in order (a vec2 takes x and y; a vec4 keeps its own fourth value) — *since 1.74* |

On a colour or vector uniform, a wired **vector** wins over a **colour**, and a colour over the number.

## Finding the uniform name

A shader graph's numbers, colours and vectors each compile to a named value. To find the
name:

1. open the **Shader editor** on the object,
2. click the node whose parameter you want to drive (a **Float** node, say),
3. read the **uniforms** list in the ⓘ info pane on the right — it shows names like
   `u_rgh_value`,
4. paste that into this node's *uniform* field.

Numbers, colours and vectors can all be driven. A colour you wire in is converted the same
way the Shader editor converts a colour you type, so a driven colour and an authored one
match. To blend between two colours over time you can still drive one number into a
[Gradient](../shader-nodes.md#gradient) or a **Mix** inside the graph. Peers on an app older
than 1.74 apply only the number.

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
