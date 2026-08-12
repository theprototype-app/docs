# UV & Textures

A texture is a flat image wrapped around a 3D model. The **UV editor** shows you that wrapping — the model's surface unfolded into a square — and lets you rearrange it, generate it from scratch, paint straight onto it, and give different parts of one mesh their own materials.

Everything here is shared: a peer sees your unwrap, your brush strokes and your material slots as you make them.

## Opening it

The UV editor is a tab in the bottom dock, next to the node editor. Open it from the dock's **＋** menu ▸ **UV editor**. Select a mesh in the viewport and its UV map appears; **⧉** undocks it into a floating window, **⇩ Dock** puts it back.

The editor follows your **selection**. If you have an Edit Mesh session open it targets that object, and if you select a group it finds the textured mesh inside it.

## Reading the map

The square is UV space: the whole texture, from 0 to 1 on both axes. The mesh's triangles are drawn over it as a wireframe, so you can see which part of the image lands on which part of the model.

- **Scroll** to zoom, **middle-drag** to pan, **Fit** re-centres the square.
- Toggle **wireframe**, and the texture itself, from the view controls.

!!! note "Big models show, but don't drag"
    Two limits, for two different reasons:

    - Above about 20 000 triangles the wireframe and its handles are hidden — drawing 300 000 line segments per frame would grind. The texture still shows and painting still works.
    - Moving UVs rewrites the geometry, which has to fit one sync message, so on very dense meshes dragging is disabled with a note saying so. **Painting is unaffected** — it writes to the image, never the geometry.

## Moving UVs

Pick a selection tool from the toolbar:

| Tool | What it does |
|---|---|
| **Select** | Click a vertex; <kbd>Shift</kbd> (or <kbd>Ctrl</kbd>) adds. Dragging the background pans; clicking it deselects. |
| **Box** | Drag a rectangle; everything inside is selected. |
| **Lasso** | Draw a shape around the vertices you want. |
| **Paint** | See [Painting](#painting) below. |

Drag any selected point to move it. Each drag is one undo step and replicates when you let go.

### Only the faces you picked

A primitive's sides usually **share** the same UV space — a default cube has 24 UV entries but only four distinct coordinates, so dragging one side drags all six. The **Only selected faces** toggle scopes the editor to the faces you have picked in [Edit Mesh](mesh-editing.md), which is how you separate them.

### Island tools

An **island** is a connected patch of the map — a piece of the model that was cut out and laid flat on its own.

| Button | What it does |
|---|---|
| **Linked** | Grow the selection to the whole island it touches. |
| **Rotate** | Turn the selection 90°. |
| **Flip U / Flip V** | Mirror it horizontally / vertically. |
| **Fit** | Scale the selection to fill the 0–1 square, keeping its aspect. |

## Unwrapping

**Unwrap ▾** generates a fresh mapping for the mesh. Four projections ship with the app:

| Backend | Good for |
|---|---|
| **Box projection** | General shapes — projects from all six directions and packs the pieces. |
| **Planar projection** | Flat things: a wall, a sign, a ground plane. |
| **Cylindrical** | Tubes, columns, bottles, tree trunks. |
| **Spherical** | Balls, domes, planets. |

The result is packed into the square with a small margin, and never stretched unevenly — a non-uniform fit would shear the texture.

!!! tip "Unwrap just one part"
    If you have faces selected in Edit Mesh, unwrap rewrites **only those faces** and leaves the rest of the map alone. That is how you re-do one panel of a model without disturbing everything else.

Unwrap is a registry, not a fixed list: a [module](modules.md) can add a heavier automatic unwrapper — or replace a built-in — and it appears in this menu like the rest. See [Module SDK](module-sdk.md#registerunwrapbackend).

## Painting

Pick the **Paint** tool and draw — on the UV map or straight on the model in the viewport. Set the brush **colour** and **size** in the panel.

- Strokes appear live for your peers while you draw.
- Each stroke is **one undo step**.
- The finished image is stored with the material, so it saves and loads like any other texture.

If the slot has no texture yet, painting creates one.

## Material slots

One mesh can carry several materials. The **Materials** list in the sidebar shows the slots; the canvas shows the slot you have selected.

| Action | How |
|---|---|
| **Add a slot** | **Add material slot** — copies the last one, so you start from something sane. |
| **Give it an image** | Drop an image on the slot, or use its image button. |
| **Assign faces to it** | Select faces in [Edit Mesh](mesh-editing.md), then press that slot's **◎** button. |
| **Remove an image** | The slot's ✕ button. |

Slots replicate, save and undo like everything else, and a mesh you made with **Convert to mesh** arrives with one slot per original material already set up.

!!! note
    Switching a multi-slot mesh to a different material *type* is refused rather than silently collapsing it to one material — split it first if that's what you want.

## The texture panel

Under **Texture** the sidebar reports the selected slot's real size and roughly what it costs on the GPU, with one-click resizes:

- **Half** — halve the longest side.
- **512 / 1024 / 2048** — resize the longest side to that.

Resizing keeps the aspect ratio, is shared with peers, and is one undo step. It is the quickest fix for a scene that has become heavy because a few 4K textures came in with imported models.

### UV test grid

**UV test grid** replaces every material in the scene with a checkerboard so you can see stretching and seams at a glance: even squares mean an even mapping.

!!! warning "Local only, on purpose"
    The grid is yours alone — it is never sent to peers and never saved. (It replaces materials scene-wide while it is on, which is why it can't be: baking it into an autosave would overwrite someone's real textures.)

## Imported models

Textures that arrive with a `.glb`/`.gltf` keep their sampler settings — tiling, orientation, filtering — when you paint over them, so a repeating texture goes on repeating and nothing flips. Imported models usually arrive already unwrapped; you'd unwrap one only to redo its mapping deliberately.

## See also

- [Mesh Editing](mesh-editing.md) — selecting the faces the UV tools scope to.
- [Explorer](explorer.md) — where your image assets live.
- [Saving & Sessions](saving.md) — how textures travel inside a `.tpscene`.
