# Shapes and modelling with an agent

An agent joined to your session ([Build with an AI agent](build-with-an-agent.md)) can do more than place
boxes and spheres. Six tools let it change an object's shape in place, turn a profile into a vase, sweep a
rail along a path, cut a sign out of an outline, build a mesh from raw data and model a mesh the way
[Edit Mesh](../mesh-editing.md) does. The in-app [Assistant](assistant.md) has the same tools.

Every call works like the agent's other tools:

- You see the change at once, and so does everyone in the session.
- **One call is one undo step.** Ctrl+Z takes it back, or press Undo on the call's line in the agent's
  activity log.
- Viewers cannot use them. A view-only agent gets a refusal and nothing changes.
- A tool that creates something returns the new object's **uuid**.

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
| `name`, `position`, `rotation`, `scale`, `color`, `parentUuid`, `physics` | as in `create_objects` (physics defaults to static) |

The profile stays editable: the Inspector shows it as a lathe, and `set_geometry` changes `segments` or
`phiLength` later.

### create_tube: sweep along a path

A smooth tube through a list of points: rails, pipes, cables, handrails, tentacles. It is a
[spline tube](../splines.md), so you can also edit its points in the app afterwards.

| field | what it does |
|---|---|
| `path` | `[[x, y, z], …]`, 2 to 200 points, in **scene** space. The object is placed at the path's centre. |
| `radius` | one radius for every point (default 0.05 m) |
| `radii` | one radius per point, for a tube that tapers |
| `closed` | joins the ends into a loop (3 or more points) |
| `radialSegments` | 3 to 32 (default 8) |
| `name`, `color`, `physics` | as in `create_objects` |

### extrude_shape: a solid from an outline

A flat outline pushed out into a solid: signs, letters, logos, floor plans, gears, cookies.

| field | what it does |
|---|---|
| `points` | the outline, `[[x, y], …]` with x to the right and y up, 3 to 500 points |
| `holes` | up to 20 outlines cut through it: a window, the inside of an O |
| `depth` | thickness along +Z, in metres (default 0.2). The solid is centred on it, so it stands upright facing +Z. To lay it flat, rotate it by `[-1.5708, 0, 0]`. |
| `bevel` | `true`, or `{thickness, size, segments}`, to round the edges |
| `curveSegments` | 1 to 32 |
| `name`, `position`, `rotation`, `scale`, `color`, `parentUuid`, `physics` | as in `create_objects` |

### create_mesh: a mesh from raw data

For shapes that none of the other tools make.

| field | what it does |
|---|---|
| `vertices` | `[[x, y, z], …]`, up to 20,000 |
| `faces` | `[[i, j, k]` or `[i, j, k, l]`, …], up to 20,000. These are indices into `vertices`, counter-clockwise as seen from outside. A face can have up to 32 corners and is fanned from its first one, so keep faces convex. An index that does not exist is refused with the face's number. |
| `uvs` | optional, one `[u, v]` per vertex |
| `smooth` | smooth shading (the normals are always computed) |
| `name`, `position`, `rotation`, `scale`, `color`, `parentUuid`, `physics` | as in `create_objects` |

The reply says how many triangles were made. A quad face stays one face in Edit Mesh, so the mesh is ready
for `edit_mesh`.

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
