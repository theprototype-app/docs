# Shader Graph

Build a material out of nodes instead of sliders. A shader graph replaces what a
material looks like — its colour, glow, roughness, surface detail, transparency, even
where its vertices sit — and everything you author replicates to your peers and saves
with the scene.

For the node-by-node reference, see [Shader Nodes](shader-nodes.md).

## Opening it

The Shader editor is a tab in the bottom dock, beside the Node editor, Explorer, UV
editor and Animation:

- click **+** in the dock tab strip and choose **Shader editor**, or
- right-click an object and pick **Edit shader**, or
- open the object's properties and press **Open in Shader editor** in the Material
  section.

## Scope: this object, or the whole scene

There is no scope control to get wrong — **the selection is the control**:

| Selection | What you are editing |
|---|---|
| one object | that object's own material |
| nothing selected | the **scene default**, which drives every object with no graph of its own |

The header always says which. An object with its own graph ignores the scene default,
so the order is *own graph → scene default → the object's real material*.

## The Surface node

Every graph ends at one **Surface** node. Each of its inputs replaces one part of the
material, and **anything you leave unconnected keeps the material's own value** — so a
graph that only wires `roughness` changes nothing else.

| Input | What it replaces |
|---|---|
| albedo | the base colour (multiplied into it, like a texture would be) |
| emissive | glow, added after lighting |
| roughness | how rough or polished the surface is |
| metalness | how metallic it is |
| normal | surface detail — the direction the surface *appears* to face |
| opacity | transparency; wiring it switches the material to blending |
| ao | shades the indirect (ambient) light only |
| position | moves the vertices themselves — see below |

### Vertex displacement

`position` is different from the others: it runs while the mesh's vertices are being
placed, not while its pixels are being shaded. Wire a vector into it and every vertex
moves by that amount, so **Noise → position** ripples a surface and **Vector 3 →
position** shifts the whole object.

Because it happens at a different point in the pipeline, three things follow:

- **Normal** gives you the object-space normal there, which is what you displace *along*
  (multiply Noise by Normal to push a surface outwards rather than sideways).
- **View direction**, **Fresnel** and **Normal map** cannot be used — there is no camera
  vector and no screen-space information while vertices are being placed. Wiring one in
  is refused with a message rather than producing a broken shader.
- **UV** gives you the mesh's raw texture coordinates.

Two honest limitations, both shared with three.js's own displacement:

- lighting is **not** recalculated for the new shape, so a heavily displaced surface can
  look flatter than it is;
- the **shadow** is cast by the undisplaced mesh.

## Textures

The **Texture** node samples an image from your [Explorer](explorer.md) library. Assign
one by clicking the swatch on the node and picking a file, or by dragging an Explorer
image card onto it. Hovering the swatch shows a bigger preview with the image's
dimensions and size.

What the graph stores is the image's **content hash**, not the image. That means the
picture travels to your peers **once** and is then reused — it is not re-sent every time
you nudge a slider. A peer who does not have the image yet asks for it and shows the
object untextured (not black) until it arrives.

Textures **tile** by default, which is what makes [Tiling & offset](shader-nodes.md#uv)
and [Panner](shader-nodes.md#uv) work.

## Animated shaders stay in sync

Anything driven by the **Time** node — or by **Panner**, which uses the same shared clock —
reads the time from a clock all peers agree on. Nobody sends "the shader is now at 3.2 seconds": each
peer works it out and arrives at the same answer. That is why a scrolling texture or a
pulsing glow looks identical on every screen with no network traffic at all.

## Editing while it runs

Numbers, colours and vectors on a node are **live uniforms**: dragging one changes the
picture immediately without recompiling anything. Adding or rewiring nodes recompiles,
which takes well under a millisecond.

If a graph is broken mid-edit, the object **keeps the last material that worked** and the
error appears in a strip at the top of the tab, naming the node and the problem.

## Driving a shader from a behaviour graph

The [Set Shader Uniform](nodes/setuniform.md) node in the [Node editor](node-system.md)
writes one of a graph's numbers, so a proximity trigger, a timer or a counter can drive a
shader parameter. Select the node in the Shader editor and its info pane lists the uniform
names to paste in.

## Saving, sharing and undo

- The **graph** is what replicates and what gets saved — never the compiled result — so
  the same graph produces the same pixels everywhere.
- Graphs are stored in `.tpscene` files and sessions, and in the autosave.
- A **glTF export** cannot carry a node material: the object is exported with the
  material it had before the graph, and a toast tells you what was dropped.
- Every change is undoable, and a slider drag is one undo step rather than dozens.

## When an object cannot take a graph

Objects with **more than one material slot** are declined with an explanation rather than
half-supported. Convert or split the mesh first if you need per-slot shaders.

## The Material section while a shader is active

Once a graph drives an object, its properties panel says so and hides the ordinary
colour, material-type and texture rows — they would be editing a result that the next
recompile discards. You get **Open in Shader editor** and **Detach** instead. Cast and
receive shadow stay editable, because those are properties of the object rather than of
the material.

Detach removes the object's own graph. If the look came from the **scene default** there
is no per-object graph to remove, and the panel says so — edit or remove the scene graph
instead.

## Compile backends

Graphs compile locally on every peer. The built-in compiler patches three.js's own
shader, so lighting, shadows and fog keep working and adding a light to the scene affects
shader-driven objects like everything else.

A module can register another compiler (a different lighting model, or a heavier one it
ships itself). A graph remembers which backend it was authored for; a peer without that
module compiles it with the built-in instead of failing, and gets the intended result as
soon as the module is present.
