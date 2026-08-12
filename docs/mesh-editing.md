# Mesh Editing

Reshape any mesh by hand: drag its vertices, slide its edges, extrude and bevel its faces, cut it with a knife, mirror one half onto the other. Every edit replicates to your peers and every step is undoable.

## Entering and leaving

Select a mesh, then either press <kbd>Tab</kbd> or right-click it ▸ **Edit mesh**. The **Edit Mesh** toolbox opens — a floating tool palette you can drag anywhere and resize by its right edge.

| Action | How |
|---|---|
| **Enter** | <kbd>Tab</kbd>, or right-click ▸ *Edit mesh* |
| **Done** | <kbd>Esc</kbd>, <kbd>Tab</kbd>, or the ✓ button — keeps your work |
| **Cancel** | the ↺ button — reverts **everything** since the session opened (it asks first) |

While you edit, the object is locked for your peers, and the usual selection outline steps out of the way so it can't hide your work.

!!! note "One undo step for the whole session"
    Individual operations undo one at a time while you work. When you press **Done**, the whole session collapses into a *single* undo entry — so <kbd>Ctrl</kbd>+<kbd>Z</kbd> afterwards puts the mesh back the way it was before you started, not one extrude at a time.

## The three element modes

A mesh can be edited by **vertex**, **edge** or **face**. Switch with the **Mode** buttons or press <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> — inside a session those keys change the element mode instead of the transform gizmo.

Each mode remembers its own selection, so you can hop between them without losing your pick.

### Selecting

- **Click** an element to select it; **Ctrl+click** adds to the selection.
- Selection **commands** appear as words in the *Select* row — they change what is picked, never the geometry:

| Command | Modes | What it picks |
|---|---|---|
| **Loop** (<kbd>L</kbd>) | all | Faces: the quad ring through this face — press again for the perpendicular one. Edges: the edge chain, end to end. |
| **Ring** | edges | The parallel rungs a face loop crosses — the other half of the standard pair. |
| **Grow** / **Shrink** (<kbd>Ctrl</kbd>+<kbd>+</kbd> / <kbd>-</kbd>) | faces | Add the neighbouring ring / drop the border ring. |
| **All** (<kbd>Ctrl</kbd>+<kbd>A</kbd>) | all | Every element of the mesh. |
| **Invert** (<kbd>Ctrl</kbd>+<kbd>I</kbd>) | all | Swap picked and unpicked. |
| **Linked** | faces | The whole connected island this face belongs to. |
| **None** | vertices | Deselect everything. |

Selections are **undoable** too — <kbd>Ctrl</kbd>+<kbd>Z</kbd> steps back through your picks without touching the geometry, and a selection step can never push a real edit off the undo stack.

### Pick granularity (faces)

In face mode, a **granularity** switch decides how much one click picks up:

| Setting | Picks |
|---|---|
| **Quad** (default) | The quad under the cursor — the two triangles that form it (a 3-sided face picks alone). |
| **Face** | The whole coplanar face. |
| **Tri** | The single triangle under the cursor. |
| **Shell** | The connected island under the cursor — on a one-piece mesh that is the whole object. |
| **Object** | Every triangle, including islands not connected to each other. |

!!! tip
    **Quad** is what you want almost always. A model is made of triangles underneath, but you think in quads — and so do the loop tools.

## Face tools

Arm a tool from the *Tools* row, then click a face to apply it (or press **Apply** to run it on the current selection). The **amount** field next to the row sets how far Extrude and Inset go, and **Auto-apply** decides whether a plain click commits the armed tool.

| Tool | Key | What it does |
|---|---|---|
| **Extrude** | <kbd>E</kbd> | Pull the face out along its normal, stitching the walls behind it. |
| **Inset** | <kbd>I</kbd> | Shrink a copy inside a stitched ring — the cap ends up selected, ready for the next step. |
| **Move** | <kbd>G</kbd> | Seat the transform gizmo on the selection (the default). |
| **Subdivide** | <kbd>S</kbd> | Split the selection into a finer grid, 2×2 per quad. |
| **Bridge** | <kbd>B</kbd> | Build a tunnel between two selected pieces. |
| **Loop cut** | <kbd>C</kbd> | Insert edge loops across the ring your selection lies on (the **cuts** field sets how many). |
| **Knife** | <kbd>K</kbd> | Cut across the mesh on screen — see below. |
| **Flip normals** | <kbd>F</kbd> | Reverse the winding, for a face that renders inside-out. |
| **Delete** | <kbd>X</kbd> | Remove the selection. |

!!! note "Move is the default, deliberately"
    With auto-apply on, a plain click commits whatever is armed — so the armed tool starts as **Move**. Clicking a face to look at it should never extrude it.

### Knife

Pick **Knife**, click one end of the cut and then the other. A dashed band follows your cursor between the two clicks so you can see where the blade will land; every face the line crosses is split. <kbd>Esc</kbd> drops a cut in progress without leaving the session.

The cut is a line *on screen*, so it slices straight through the model from your point of view — orbit first to line up the angle you want.

### Bridge

Select **two** separate pieces and press Bridge. Their boundaries have to have the **same number of edges** — the toolbox prints both counts next to the selection so you can check. Bridging two faces of one solid punches a hole through it; bridging two separate shells builds a tube between them, and the walls are wound correctly either way.

## Edge tools

| Tool | What it does |
|---|---|
| **Move** | Seat the gizmo on the selected edges (X runs along the edge, Z out of the surface). The welded neighbours stretch with it. |
| **Loop** | Select the whole edge loop through this edge. |
| **Bevel** | Replace the edge with a chamfer strip (width, segments and profile below). |
| **Dissolve** | Remove the edge and merge the two faces it joined. |
| **Clear** | Deselect all edges. |

!!! warning "Bevel needs a clean corner"
    Each end of a bevelled edge needs exactly three faces around it. More than that needs a mitered corner, which the tool refuses rather than guessing — it would tear the mesh.

## Vertex tools

| Tool | Key | What it does |
|---|---|---|
| **Weld** | <kbd>W</kbd> | Merge the selected vertices into one, at their centroid. |
| **Create face** | | Build a face from 3 or 4 selected vertices. |
| **Bevel** | | Cut the corner off every selected vertex and cap it. Works on any number of vertices. |
| **Proportional** | | Drag one vertex and its neighbourhood follows, weighted by distance — for smooth bulges and dips instead of a crease. The **radius** sets how far the influence reaches. |
| **Slide** | | Constrain the drag to one of this vertex's own edges. Adjusts a profile without pulling the vertex off the surface. |
| **Deselect** | | Clear the selection. |

Vertices are drawn as dots sized in **screen** space, so they stay clickable whether you're zoomed into a cube or out of a whole terrain. The **dot size** slider multiplies that size, and turning the adaptive toggle off gives you a fixed world size instead.

## Bevel options

Bevel works in all three modes and shares one set of options:

| Option | What it does |
|---|---|
| **Width** | How far the chamfer reaches. Clamped per edge, so two bevels can never cross. |
| **Segments** | More segments = a rounder edge. |
| **Profile** | 0 is a flat chamfer, positive domes the cap out, negative dishes it in. |

## Clean-up

The *Cleanup* row acts on the whole object, not on your selection:

| Command | What it does |
|---|---|
| **Recalculate normals** | Rewind every face to point outward — the cure for patches that render dark or inside-out. |
| **Merge by distance** | Collapse vertices closer than the given distance into one and drop the faces that go degenerate. |
| **Smooth / Flat** | Switch the mesh between smooth and faceted shading. |
| **Symmetrize** | Keep one half and replace the other with its mirror image, across an object-local **X / Y / Z** axis through the object's origin. Pick which half to keep. |

!!! tip "Model half of it"
    Symmetrize is a one-shot: shape the left side however you like, then mirror it. Faces that straddle the plane are cut cleanly on it, so the two halves join watertight.

## Display

| Toggle | What it does |
|---|---|
| **Wireframe** | Show the edit wireframe overlay (on by default). It draws the **quad** structure. |
| **Show triangulation** | Draw the raw triangles instead — the diagonals inside a quad are an artifact of triangulation, not edges of your model. |
| **Selection outline** | Bring the object outline back while editing (off by default). |
| **Shortcuts** | Turn the single-key shortcuts off, if they get in the way. |
| **?** | Open the key cheat sheet as its own little window you can park beside the viewport. |

## Your mesh remembers its faces

Older versions worked out what a "face" was every time you clicked, by looking for triangles lying flat against each other. That guess falls apart as soon as you edit: rotate an extruded band a few degrees and its wall quads twist just enough to look like real creases, at which point the loop tools quietly stop working.

The face structure is **stored with the mesh** now. Operations describe the faces they create, so quads survive being rotated, subdivided and bridged, the loop tools keep working after any edit, and a face can have more than four corners — dissolving an edge leaves one real n-gon rather than a fan of triangles.

!!! note
    One exception: an **autosave** snapshot is stored as GLTF, which cannot carry the face structure, so a restored autosave falls back to deriving it. Saved `.tpscene` files and sessions keep it.

## Converting to a mesh

Right-click a group or a multi-selection ▸ **Convert to mesh** merges it into a single editable mesh, materials and all, as one undo step. Use it when you've assembled a shape from primitives and want to treat it as one piece.

The materials survive as **slots** on the merged mesh — see [UV & Textures](uv-editor.md) for assigning faces between them.

## Sculpting

For organic shaping there's a brush instead: right-click a mesh ▸ **Sculpt mesh** (or **Sculpt terrain** on terrain) — raise, lower, smooth and flatten with a round brush. See [Terrain & Sculpting](terrain.md).

## Keyboard reference

The same list lives behind the **?** button in the toolbox.

| Keys | Action |
|---|---|
| <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> | Switch to Vertices / Edges / Faces |
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | Select all |
| <kbd>Ctrl</kbd>+<kbd>I</kbd> | Invert the selection |
| <kbd>Tab</kbd> | Toggle Edit Mesh |
| <kbd>Esc</kbd> | Done — leave the session |
| <kbd>E</kbd> / <kbd>I</kbd> / <kbd>G</kbd> | Faces: arm Extrude / Inset / Move |
| <kbd>S</kbd> / <kbd>C</kbd> | Faces: Subdivide / Loop cut |
| <kbd>B</kbd> / <kbd>F</kbd> / <kbd>X</kbd> | Faces: Bridge / Flip normals / Delete |
| <kbd>K</kbd> | Faces: Knife |
| <kbd>L</kbd> | Loop select (faces: again = perpendicular) |
| <kbd>Ctrl</kbd>+<kbd>+</kbd> / <kbd>-</kbd> | Faces: grow / shrink the selection |
| <kbd>W</kbd> | Vertices: weld the selected vertices |

## In VR

Mesh editing works in VR too: the radial menu's **Edit** entries cover face select, extrude, inset, move and stretch, with the amount adjusted live by moving your controller. See the [VR Guide](vr.md).

## Collaboration

- Editing an object **locks it** — your peers can see it but not edit it at the same time.
- Live gestures stream a preview to peers several times a second; the final shape is committed when you let go.
- A topology change travels as a full geometry snapshot, which is size-capped — very dense imported models can be viewed and painted but not topology-edited.
