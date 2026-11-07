# Materials and looks with an agent

An agent joined to your session ([Build with an AI agent](build-with-an-agent.md)) can make a scene look
finished: colours and texture maps, node shaders, post effects and UV mapping. The in-app
[Assistant](assistant.md) has the same tools.

Every call works like the agent's other tools:

- You see the change at once, and so does everyone in the session.
- **One call is one undo step.** Ctrl+Z takes it back, or press Undo on the call's line in the agent's
  activity log.
- Viewers cannot use the tools that change things. They can still use the ones that read.
- A tool answers per object, with `updated` and `skipped`, so one bad object does not lose the rest of a
  call.

## When the agent has to ask

Post effects and the scene's default shader change the look of **everything**, so an agent asks first. You
get a prompt with **Allow** and **Deny**, and nothing changes until you answer.

1. The first call returns `needsConfirm`, a `confirmId` and a one-line `summary`. The host and any admins see
   the prompt.
2. The agent calls the same tool again with `{"confirmId": "…", "wait": 30}`. If you pressed Allow, the change
   runs inside that call, so it is still one undo step. If you pressed Deny, the call says so and nothing
   changed.
3. Every answer carries a `status`: `pending` (no answer yet: ask again with the same `confirmId`), `allowed`,
   `denied` or `expired`. *Since 1.61* the repeat works through the Claude connector's families too (it used to
   open a new question each time), and going back to a checkpoint is asked as exactly that.

A question stays open for 10 minutes. With the [Claude connector](claude-connector.md) the prompt appears in
your own tab. The in-app Assistant in your own scene does not ask, because you are the one typing.

This is a courtesy between people who share a scene, not a security feature: an editor could make the same
change by hand.

## Reference

### set_material: colours, numbers and textures

| field | what it does |
|---|---|
| `objects` | up to 200 object uuids |
| `color`, `emissive` | a hex colour or a CSS name |
| `roughness`, `metalness`, `opacity` | 0 to 1. `opacity` below 1 also turns `transparent` on, unless the call sets it. |
| `emissiveIntensity` | 0 to 100 |
| `params` | any other material number, such as `clearcoat`, `transmission`, `ior` (those need `MeshPhysicalMaterial`) |
| `type` | swaps the material class first |
| `maps` | texture slots `albedo`, `normal`, `roughness`, `metalness`, `emissive`, `ao`: a library image hash, an https URL, or `null` to clear |
| `preset` | a [preset](../materials.md) by name: **Wood**, **Metal**, **Plastic**, **Glass**, **Stone**, **Rubber**, **Fish scales**, **Neon**, or one the person saved (`list_materials` names them all) |
| `cc0` | fetches a free CC0 material by name, such as `"Wood051"` or `"brown planks"` |
| `pattern` | a texture drawn by name, put in the albedo slot (since 1.60): `wood`, `planks`, `brick`, `tiles`, `marble`, `stone`, `concrete`, `metal`, `grass`, `sand`, `fabric`, `checker`, `stripes`, `noise`, or `{name, colors, scale, seed, size}`. A map slot takes one as `{pattern: …}`. ([Textures by name](agent-world.md#textures-by-name)) |
| `patternScale` | how many times the pattern repeats across the surface |
| `slot` | which material slot of a multi-material object (default 0) |
| `faces` | gives just those faces their own new material slot ([how to pick faces](#picking-faces)) |

**Texture URLs** must be https and CORS-enabled, at most 16 MB, and really be a PNG, JPEG, WebP, GIF or AVIF:
the bytes are checked, not the file name. A local or private address is refused. The image becomes a library
item first, the same as an upload, and the result lists it in `assets`. A plain file name such as
`"wood.png"` is refused, because a guess would give you an empty texture.

An object wearing a shader graph refuses `set_material`. Edit the shader, or take it off first.

The maps are the same ones as the Inspector's [Maps](../materials.md#maps) rows. `update_objects` can set them too,
through `materialParams`: the slots `map`, `normalMap`, `roughnessMap`, `metalnessMap`, `emissiveMap` and `aoMap` (a
library image hash, or `null` to clear) and `texTransform` — `{repeat: [u, v], offset: [u, v], rotation}` (radians)
for the tiling, offset and rotation of all the material's maps.

### list_materials and get_material: read what is there

`list_materials` gives each object's slots (type, colour, numbers, which maps), its shader, and the preset
names: the eight starters and any the person saved. `get_material` gives one object in full: each map's tiling, offset, rotation, size and hash, and its
shader graph as text with the uniforms a flow can drive. Viewers can use both.

### create_shader: a node shader, as text

Written like flow graphs: one line per node, one per wire, ending at a `surface` node. Use
`describe_shader_nodes` for the types, or see the [Shader editor](../shader-graph.md).

```text
c = color {value: "#ff8800"}
out = surface
c -> out.emissive
```

| field | what it does |
|---|---|
| `objects` | up to 50 uuids. Each object gets its own copy. |
| `text` | the graph |
| `replace` | replaces a graph the object already has. Without it, that object is skipped. |
| `scene` | `true` makes the default for every object, which asks first |

Errors come back in the result and nothing is written: an unknown type, a socket that does not exist, a graph
with nothing connected, or the compiler's own message.

*Since 1.61* there are three more UV nodes, `polarCoordinates` (distance and angle around a centre), `twirl` (a
swirl, stronger further out) and `rotateUV` (wire **Time** into its `angle` to spin it). The `glsl` expression node
keeps the type wired into `a`, `b` and `c` (float, vec2, vec3 or vec4) and returns the `type` it declares.

The result lists the graph's **uniforms**. A float one, named `u_<nodeId>_<param>`, can be driven at run time
by a **Set Shader Uniform** flow node on that object, for example `u_power_value` for a node `power`. Colours and
vectors cannot, because flow sockets carry numbers.

### edit_shader and assign_shader

`edit_shader` changes a graph: `params` (`[{node, param, value}]`), `add` (text with new or replaced nodes and
new wires), `removeNodes`, or `text` for the whole graph. A refused edit changes nothing.

`assign_shader` copies a graph onto other objects, or takes a shader off with `"shader": null`.

### set_post, get_post and create_post_graph: the scene's look

`set_post` edits the [post effects](../post-processing.md) with `effects: [{kind, params, enabled, at, remove}]`.
An entry matches what is already there by `id` or `kind`, so repeating a call adjusts the bloom instead of
stacking a second one. `replace: true` drops the rest, and `enabled` switches the whole stack. `camera` edits a
camera's own look instead of the scene's.

`get_post` lists the stack and every effect kind with its params and ranges.

`create_post_graph` adds a custom effect: a `preset` such as `posterise`, or a graph as `text` ending at a
`postOutput` node.

`set_post` and `create_post_graph` always ask first, including for a camera's own look.

*Since 1.61* `set_post` and `get_post` say whether **this screen** draws the effects (`shownHere`). When it does not,
`reason` says why: `quality tier` (a phone switched post effects off to stay smooth — by design), `switched off here`,
`browser`, `wireframe` or `no effects`, and `how` says where to change it. `screenshot` with `postEffects: true` draws
the picture through the same effects and answers `postEffects: "applied"`, or `"unavailable"` with the reason.

### bake_light: baked corner shadows and bounced light

*New in this version.* `bake_light` bakes [Baked Light](../baked-light.md) for everything that does not move:
`{"do": "bake", "quality": "normal"}` (`draft`, `normal`, `high`) runs the bake on this device and waits up to `wait`
seconds (default 60, max 120) for the result; a longer bake answers "still baking" and `{"do": "status"}` reports
it later. `status` also says whether the bake is `stale` (things moved since), how many objects got corner shadows
only (`aoOnly`, overlapping UVs) and the panel's notes, such as which objects were left out and why. `cancel` stops
a running bake (nothing changes), `clear` removes the bake, and `strength` sets `light` (0-3) and `ao` (0-1).
A bake, a clear and a strength change ask the host first like `set_post`, and each is one Undo step. Through the
[Claude connector](claude-connector.md) the same thing is `set_look` with `action: "bake"` and the options under `bake`.

### set_quality: ask for higher quality on the person's own device

*New in 1.61.* When a phone hides the post effects to stay smooth, an agent does **not** change that on its own. It
can ask with `set_quality {"level": "high"}` (also `medium`, `auto`): a card on **that person's own screen** says
"Claude wants High quality on this device so the post effects show" with **Allow** and **Keep**. Only that device
changes, never anybody else's. After Allow, the card's Undo or `set_quality {"level": "restore"}` puts the old preset
back. On the person's own device it is the same switch as **Settings ▸ Scene ▸ Performance ▸ Quality preset**.

### uv_unwrap and set_uv: how textures sit on a surface

`uv_unwrap` makes new texture coordinates: `smart` (the default: flat islands by surface direction), `box`,
`planar`, `cylindrical` or `spherical`. Use it when a texture smears on a model. `faces` limits it to those
faces.

`set_uv` tiles, shifts or rotates a slot's textures: `tiling` (`[u, v]` or one number), `offset`, `rotation` in
radians, and `maps` to limit it to some slots. It turns repeat on, so a tile does not smear its border.

With `faces`, `set_uv` maps only those faces instead: they are projected flat so the image fills them once, with
tiling, offset and rotation on top. Pair it with `set_material` `faces` for an image on just that face.

### Picking faces

`faces` in `set_material`, `uv_unwrap` and `set_uv` takes any of these, and they filter together:

| filter | picks |
|---|---|
| `{"normal": "up"}` | faces pointing that way: `up`, `down`, `+x`, `-x`, `+z`, `-z` or `[x, y, z]`, with an optional `angle` (default 30 degrees) |
| `{"box": {"min": […], "max": […]}}` | faces inside a box, in the object's local space |
| `{"indices": […]}` | face numbers |
| `{"all": true}` | every face |

## Cookbook

### A glassy floor

> "Make the floor look like polished glass, tinted a little blue."

```json
set_material {
  "objects": ["…"],
  "type": "MeshPhysicalMaterial",
  "color": "#dfeaf5",
  "roughness": 0.05,
  "metalness": 0,
  "params": {"transmission": 0.9, "ior": 1.5, "clearcoat": 1}
}
```

Lower `transmission` for a floor you should not see through. A little `roughness` hides reflections that would
otherwise look like a mirror.

### A glowing sign with a shader

> "Make the sign glow orange, and let me dim it from a flow."

```json
create_shader {
  "objects": ["…"],
  "text": "c = color {value: \"#ff8800\"}\npower = float {value: 4}\nglow = multiply\nc -> glow.a\npower -> glow.b\nout = surface\nglow -> out.emissive"
}
```

The result names `u_power_value` as drivable. A flow node then sets it:

```json
create_flow_nodes {
  "graph": "…",
  "nodes": [{"type": "setuniform", "data": {"uniform": "u_power_value", "value": 1}}]
}
```

### A warm film look

> "Give the scene a warm, filmic look."

```json
set_post {
  "effects": [
    {"kind": "huesaturation", "params": {"hue": 0.05, "saturation": -0.1}},
    {"kind": "brightnesscontrast", "params": {"contrast": 0.1}},
    {"kind": "bloom", "params": {"intensity": 0.6}},
    {"kind": "vignette", "params": {"darkness": 0.5}},
    {"kind": "grain", "params": {"opacity": 0.15}}
  ]
}
```

The first call returns `needsConfirm`. After you press **Allow**, the agent repeats it with the `confirmId`.
The order in the list is the order of the effects, so the grain sits on the finished picture.

### A floor texture that repeats

> "Put this wood on the floor and tile it four times."

```json
set_material {"objects": ["…"], "maps": {"albedo": "https://example.com/wood.jpg", "normal": "https://example.com/wood_n.jpg"}}
set_uv {"objects": ["…"], "tiling": 4}
```

### A label on one side of a box

> "Put this logo on the front of the crate only."

```json
set_material {"objects": ["…"], "faces": {"normal": "+z"}, "maps": {"albedo": "https://example.com/logo.png"}}
set_uv {"objects": ["…"], "faces": {"normal": "+z"}}
```

The first call gives the front its own material slot, so the other sides keep theirs. The second makes the image
fill that face once.
