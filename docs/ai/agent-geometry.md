# Shapes and modelling with an agent

An agent joined to your session ([Build with an AI agent](build-with-an-agent.md)) can do more than place
boxes and spheres. Nine tools let it change an object's shape in place, turn a profile into a vase, sweep a
rail along a path, cut a sign out of an outline, build a mesh from raw data, copy or mirror an object, bring in a
glTF / GLB / OBJ file, write [3D text](../3d-text.md) and model a mesh the way
[Edit Mesh](../mesh-editing.md) does. The in-app [Assistant](assistant.md) has the same tools.

Every call works like the agent's other tools:

- You see the change at once, and so does everyone in the session.
- **One call is one undo step.** Ctrl+Z takes it back, or press Undo on the call's line in the agent's
  activity log.
- Viewers cannot use them. A view-only agent gets a refusal and nothing changes.
- A tool that creates something returns the new object's **uuid**.

## Building a model part by part

*New in 1.59.* An agent can build a model the way you would: a group for the whole thing, and parts made inside it.

- **Inside a group, everything is the group's own space.** With `parentUuid`, a part's `position`, `rotation` and
  `scale` **and its own points** (a lathe profile, an outline, a tube's path, a mesh's vertices) are measured in the
  group, the numbers `list_scene` shows for its children. No `position` puts the part at the group's origin. So a part
  lands where it was asked even in a group that was moved or turned, and it turns with the group afterwards. (Before
  1.59, a part made in a moved or turned group ended up in the wrong place.)
- **Up to 50 shapes in one step** with `create_shapes` ([below](#create_shapes-many-shapes-in-one-step)): one call, one
  undo step.
- **Colour as you make it:** `create_mesh` takes a colour per vertex or a material per face, and a flat low-poly look
  ([below](#create_mesh-a-mesh-from-raw-data)).
- **Shadows:** every shape tool takes `castShadow` and `receiveShadow` (both on by default).
- **A group that is not there is an error** (*since 1.61*): a `parentUuid` that names nothing makes nothing, and the
  error says so. Before, the part was made at the middle of the scene with a warning. Any object can hold parts, a
  restored group included; a light or a camera cannot.
- **Tiny parts** (*since 1.61*): every primitive goes down to 1 mm (`0.001`).
- **Copies and mirror images** with `duplicate` ([below](#duplicate-copies-and-mirror-images)), and **model files**
  with `import_shape` ([below](#import_shape-a-gltf-glb-or-obj-file)).

## Reference

### set_geometry: reshape in place

Changes the shape of objects that already exist. They keep their uuid, position, material and flows, so
nothing that points at them breaks. The agent does not delete the object and make it again.

| field | what it does |
|---|---|
| `updates` | up to 100 objects, `[{uuid, …}]`, one undo step for all of them |
| `params` | the shape's own settings, the same ones the Inspector's **Geometry** rows show and `list_scene` reports: `width`/`height`/`depth` for a box, `radiusTop`/`radiusBottom`/`height`/`radialSegments` for a cylinder, `segments`/`phiLength` for a lathe, `depth`/`bevel` for an extrusion. Sizes are capped at 1 km and segment counts to the Inspector's range. |
| `type` | changes the primitive type in place, for example a box into a `Cylinder`. `params` apply on top of the new type's defaults. |
| `path`, `radius`, `radii`, `closed`, `radialSegments` | tubes from `create_tube`: a new path, one radius or one per point, a loop |
| `force` | needed for an object whose vertices were edited by hand (Edit Mesh, sculpting or `edit_mesh`). Rebuilding from params replaces those edits, so without `force: true` the tool refuses and says why. |

### create_lathe: turn a profile

Spins a 2D profile around the Y axis, the way a lathe or a potter's wheel does: vases, bowls, bottles,
columns, lamp shades.

| field | what it does |
|---|---|
| `profile` | `[[radius, height], …]` from bottom to top, 2 to 200 points, in metres. Start and end at radius 0 to close the bottom and the top. |
| `segments` | steps around the axis, 3 to 128 (default 12; 32 or more looks round) |
| `phiStart`, `phiLength` | a partial turn, in radians (default a full turn) |
| `name`, `position`, `rotation`, `scale`, `color`, `physics` | as in `create_objects` (physics defaults to static) |
| `parentUuid` | a group to make it in: the position, rotation, scale and the profile are then in the group's own space |
| `castShadow`, `receiveShadow` | shadows, on by default |

The profile stays editable: the Inspector shows it as a lathe, and `set_geometry` changes `segments` or
`phiLength` later.

### create_tube: sweep along a path

A smooth tube through a list of points: rails, pipes, cables, handrails, tentacles. It is a
[spline tube](../splines.md), so you can also edit its points in the app afterwards.

| field | what it does |
|---|---|
| `path` | `[[x, y, z], …]`, 2 to 200 points, in **scene** space — or in the group's own space with `parentUuid`. The object is placed at the path's centre. |
| `radius` | one radius for every point (default 0.05 m) |
| `radii` | one radius per point, for a tube that tapers |
| `closed` | joins the ends into a loop (3 or more points) |
| `radialSegments` | 3 to 32 (default 8) |
| `name`, `color`, `physics` | as in `create_objects` |
| `parentUuid` | a group to make it in: the path is then in the group's own space |
| `castShadow`, `receiveShadow` | shadows, on by default |

### extrude_shape: a solid from an outline

A flat outline pushed out into a solid: signs, letters, logos, floor plans, gears, cookies.

| field | what it does |
|---|---|
| `points` | the outline, `[[x, y], …]` with x to the right and y up, 3 to 500 points |
| `holes` | up to 20 outlines cut through it: a window, the inside of an O |
| `depth` | thickness along +Z, in metres (default 0.2). The solid is centred on it, so it stands upright facing +Z. To lay it flat, rotate it by `[-1.5708, 0, 0]`. |
| `bevel` | `true`, or `{thickness, size, segments}`, to round the edges |
| `curveSegments` | 1 to 32 |
| `name`, `position`, `rotation`, `scale`, `color`, `physics` | as in `create_objects` |
| `parentUuid` | a group to make it in: the position, rotation, scale and the outline are then in the group's own space |
| `castShadow`, `receiveShadow` | shadows, on by default |

### create_mesh: a mesh from raw data

For shapes that none of the other tools make.

| field | what it does |
|---|---|
| `vertices` | `[[x, y, z], …]`, up to 20,000 |
| `faces` | `[[i, j, k]` or `[i, j, k, l]`, …], up to 20,000. These are indices into `vertices`, counter-clockwise as seen from outside. A face can have up to 32 corners and is fanned from its first one, so keep faces convex. An index that does not exist is refused with the face's number. |
| `uvs` | optional, one `[u, v]` per vertex |
| `smooth` | smooth shading (the normals are always computed) |
| `flatShading` | `true` for hard facets: one flat normal per triangle, the low-poly look |
| `materials` | up to 16 material slots, each `{color, roughness, metalness, opacity, emissive, emissiveIntensity, name}` |
| `faceMaterials` | the slot of each face (0 = the first), one per face in the order of `faces`: parts in different colours |
| `colors` | one colour per vertex, in the order of `vertices`: `[r, g, b]` (0 to 1) or `"#rrggbb"`. A painted gradient. Since 1.61 the numbers are **sRGB**, like a colour picker and material colours, and with `colors` and no `color` the material is **white**, so the vertex colours show as given (before, a random pastel tinted them). |
| `colorSpace` | `"srgb"` (default) or `"linear"`, for `[r, g, b]` numbers that are already linear. Hex is always sRGB. |
| `name`, `position`, `rotation`, `scale`, `color`, `physics` | as in `create_objects` |
| `parentUuid` | a group to make it in: the position, rotation, scale and the vertices are then in the group's own space |
| `castShadow`, `receiveShadow` | shadows, on by default |
| `subdivide` | `1` or `2` smooths the mesh (Catmull-Clark subdivision, since 1.60): corners round off, so a box of six quads becomes a rounded pebble and a few quads become a soft, organic shape. Each level makes about four times the faces, and the result must still fit the limits. Smooth shading comes with it unless `smooth: false`. |

The reply says how many triangles were made. A quad face stays one face in Edit Mesh, so the mesh is ready
for `edit_mesh`. **Material slots last** through later `edit_mesh` calls; **vertex colours last** only while an edit
keeps the number of vertices (an extrude, for example, drops them).

### update_mesh: new data for a mesh (since 1.60)

Changes a mesh `create_mesh` made, keeping its uuid, its place and its materials. The whole call is one undo step.

| field | what it does |
|---|---|
| `uuid` | the mesh |
| `mode` | `replace`: every vertex and face again, with the same fields and limits as `create_mesh` (`uvs`, `colors`, `faceMaterials`, `subdivide`) · `patch`: new positions for some vertices, keeping the faces |
| `offset` | `patch`: the first vertex index to replace; `vertices[0]` lands there |
| `vertices` | the new positions |
| `uvs`, `colors` | `patch`: new values from `offset` on, as for vertices |
| `smooth`, `subdivide` | as in `create_mesh` (a patch keeps the mesh's subdivision) |

A patch needs the vertex list the mesh was made from. That list is kept in the tab that made the mesh, so after a
reload, or for a mesh made somewhere else, use `replace`. Primitives change with `set_geometry`, and any mesh can be
modelled with `edit_mesh`.

### create_shapes: many shapes in one step

Up to **50** shapes of any of the four kinds in one call and **one undo step** — the parts of a chair, a row of
columns, a whole little building.

| field | what it does |
|---|---|
| `shapes` | `[{action, …}, …]`, 1 to 50 entries. `action` is `lathe`, `tube`, `extrude` or `mesh`, and the entry carries that tool's fields under the same name: `{"action": "mesh", "mesh": {…create_mesh's fields…}}`. `parentUuid` works in each entry. |

Every entry is checked **before anything is made**: if one is wrong, nothing is made and the error names it
(`shapes[3]: …`). The uuids come back **in the order given**.

A list that does not fit (`colors`, `vertices`, `uvs`) is refused with **how many entries arrived** and **the index
of the first bad one**, for example `colors[5] (the first bad one of 8 entries): … got [2,0,0]`.

### duplicate: copies and mirror images

*New in 1.61.* Copies an object with everything in it — children, materials, behaviour, physics — the way
Duplicate in the object menu does, so nothing is sent again. One undo step.

| field | what it does |
|---|---|
| `uuid` | the object to copy |
| `count` | 1 to 50 copies (default 1) |
| `offset` | `[x, y, z]` metres between copies, in the parent's space (default: a row to the side) |
| `mirror` | `"x"`, `"y"` or `"z"`: the copy is the mirror image across that plane through the **parent's centre**. In a group, that is the group's centre line, so a left ear becomes the right one; at the top of the scene it is the world's. The triangles are turned round so the copy still faces outward. A box, or a round shape with an even number of segments, is its own mirror image and keeps its editable size. |
| `parentUuid` | a group (or any object) for the copies; they keep their place in the world |
| `name` | the copies' name, numbered when there are several |

For tens or hundreds of copies spread over the ground, use `scatter` with `source` ([Worlds](agent-world.md#scatter-a-forest-rocks-flowers)).

### import_shape: a glTF, GLB or OBJ file

*New in 1.61.* Brings in a model made elsewhere: **glTF 2.0** (a `.glb`, or a `.gltf` with everything embedded) or a
**Wavefront `.obj`**. One undo step; everyone sees it.

| field | what it does |
|---|---|
| `data` | the file as base64 |
| `chunk` | `{id, index, total}` for a big file sent in parts, each a multiple of 4 base64 characters. The model is placed when the last part arrives. |
| `url` | an **https** address instead (25 MB at most). Local and private addresses are refused, and the server must allow cross-origin reads. |
| `name`, `position`, `rotation`, `scale`, `parentUuid` | as in `create_objects` |
| `folder` | the Explorer folder (default `Imported models`) |
| `castShadow`, `receiveShadow` | for every mesh in it |

The file goes **into your library first** (shared with the session), so the scene never needs the address again. Its
**named parts** (glTF nodes, OBJ `o` / `g` groups) become named children, and the reply lists them with their uuids,
so `animate_parts` or `update_objects` can move a lid or a wheel.

The app reads what the file **is** from its bytes, not its name. A model is data: nothing in it runs. A file that points
at other files (an external buffer or texture), or at anything but an embedded PNG / JPEG / WebP image, is refused. An
`.obj`'s `.mtl` material library is not inside it, so its parts get plain materials; colour them with `set_material`.

### create_text: 3D text (since 1.61)

A sign, a title or a label. Over the connector this is `create_shape {action: "text"}`. The record travels and is saved, and every screen builds the letters from it. See [3D Text](../3d-text.md).

| field | what it does |
|---|---|
| `text` | the words; `\n` starts a new line |
| `font` | a bundled font (`sans`, `serif`, `mono`, `rounded`, `display`, or its name), any Google Fonts family name (fetched once and kept in the Library), or `{asset: "<hash>"}` for a Library font |
| `size` | letter height in metres |
| `solid`, `depth`, `bevel` | solid letters; giving `depth` or `bevel` also makes them solid. `bevel` is a width in metres, `false` for none, or `{size, thickness, segments}` |
| `align`, `maxWidth`, `anchor`, `lineHeight`, `letterSpacing` | the layout of the block |
| `color`, `sideColor`, `emissive`, `metalness`, `roughness`, `quality`, `outline` | the look |
| `position`, `rotation`, `name` | where it goes |

To change a text, call `set_geometry` (`edit_shape {action: "params"}`) with the same fields under `params`. `list_fonts` (`assets {action: "fonts"}`) lists the fonts you can use. Solid text holds up to 300 characters, or 80 on a phone or headset. A text is made one per call; `create_shapes` does not take text.

### edit_mesh: model a mesh

Runs [Edit Mesh](../mesh-editing.md) operations on a selection of a mesh's faces or vertices.

| field | what it does |
|---|---|
| `object` | the mesh's uuid |
| `select` | which part, in the object's **own** (local) space. `mode` is `faces` (default) or `vertices`. Then any of: `indices` (numbers from a preview), `normal` (`up`, `down`, `+x`, `-x`, `+z`, `-z` or `[x, y, z]`, within `angle` degrees, default 30), `box` (`{min, max}`), `all: true`. Filters combine: `normal: "up"` with a `box` means the up-facing faces inside the box. |
| `ops` | up to 20 operations, run in order. Each one can have its own `select`. |

Face operations: `extrude {distance}`, `inset {amount 0-1}`, `move {distance}` along the normal,
`bevel {width, segments, profile}`, `subdivide`, `delete`, `flip`.

Vertex operations: `weld` (merge into their centre), `move {offset: [x, y, z]}`,
`smooth {factor, iterations}`, `dissolve`, `bevel {width}`, `delete`, `connect` (2 vertices),
`create_face` (3 or 4 vertices).

An operation without its own `select` goes on with what the step before it left selected, as in Edit Mesh:
after `extrude`, `move` or `flip` that is the same faces, and after `inset` it is the inner face. After
`subdivide`, `bevel`, `delete` or a vertex operation, the top-level `select` is read again on the mesh as it
is at that step, and so is any `select` you give the operation itself. Indices always refer to the mesh as
it is at that step.

**Preview first.** With `ops: []` the tool changes nothing and lists the selected faces or vertices (their
index, normal and centre) plus the totals. Use the preview to check a selection or to pick indices. A
preview leaves no line in the activity log.

After an edit the object counts as hand-edited, so `set_geometry` needs `force: true` for it (see above).
If one operation fails, the ones before it stay applied, and the reply says which step stopped and why.

## Cookbook

### A vase on a lathe

> "Put a terracotta vase on the table."

The agent reads the table's position with `list_scene`, then makes the vase in one call:

```json
create_lathe {
  "name": "Vase",
  "profile": [[0, 0], [0.12, 0.01], [0.16, 0.12], [0.07, 0.3], [0.09, 0.36], [0, 0.36]],
  "segments": 48,
  "position": [0, 0.75, 0],
  "color": "#c06030"
}
```

Each profile point is a radius at a height. This one goes from a closed base out to the belly, in to the
neck, out to a lip, and back to the axis. For a wider belly later, the agent sends a new profile: the
Inspector shows it as a lathe, so you can change `segments` there too.

### A rail along a path

> "Add a handrail up the stairs."

The agent reads the steps, then sweeps one tube through points about 0.9 m above the nosing of each step:

```json
create_tube {
  "name": "Handrail",
  "path": [[1.1, 0.9, 0], [1.1, 1.2, 0.6], [1.1, 1.5, 1.2], [1.1, 1.8, 1.8]],
  "radius": 0.025,
  "color": "#8a6a48"
}
```

`radii` with one value per point makes a tapering cable or tentacle. A later
`set_geometry {"updates": [{"uuid": "…", "path": [...]}]}` moves the rail without making a new object.

### An extruded sign

> "Make a sign with a window in it over the door."

```json
extrude_shape {
  "name": "Sign",
  "points": [[-1, -0.4], [1, -0.4], [1, 0.4], [-1, 0.4]],
  "holes": [[[-0.8, -0.2], [-0.5, -0.2], [-0.5, 0.2], [-0.8, 0.2]]],
  "depth": 0.08,
  "bevel": {"thickness": 0.01, "size": 0.01, "segments": 2},
  "position": [0, 2.6, 0.1]
}
```

The sign stands upright facing +Z. Rotate it by `[-1.5708, 0, 0]` to lay it flat, for example for a floor
plan.

### A tower from a box (edit_mesh)

> "Turn that box into a tower with a smaller top."

```json
edit_mesh {"object": "…", "select": {"normal": "up"}, "ops": []}
edit_mesh {
  "object": "…",
  "select": {"normal": "up"},
  "ops": [
    {"op": "extrude", "distance": 1},
    {"op": "inset", "amount": 0.3},
    {"op": "extrude", "distance": 0.5}
  ]
}
```

The first call is the preview: one face, pointing up. The second call raises the top, insets it and raises
only the inner part again, all in one undo step. Each step carries on with the previous step's selection,
so the last extrude leaves the ring around the inner face where it is. To raise the ring as well, give that
step its own `"select": {"normal": "up"}`.

### A lamp, part by part, inside a group

> "Build a little lamp on the table."

The agent makes an empty group on the table with `create_objects`, then the parts inside it in one step. Every number
is in the group's own space, so the lamp is right however the group is placed or turned:

```json
create_shapes {
  "shapes": [
    {"action": "lathe", "lathe": {"name": "Base", "parentUuid": "…", "profile": [[0, 0], [0.12, 0], [0.1, 0.03], [0, 0.03]], "segments": 32}},
    {"action": "tube", "tube": {"name": "Stem", "parentUuid": "…", "path": [[0, 0.03, 0], [0, 0.3, 0], [0.08, 0.42, 0]], "radius": 0.01}},
    {"action": "lathe", "lathe": {"name": "Shade", "parentUuid": "…", "position": [0.08, 0.38, 0], "profile": [[0.03, 0.08], [0.1, 0], [0.11, 0]], "segments": 32, "castShadow": false}}
  ]
}
```

One undo step takes the whole lamp back. To swing the shade, `create_pivot` with the stem and the shade at a point
`local` to the group (see [Undo, pivots and images](agent-assist.md#several-parts-on-one-joint-create_pivot)).
