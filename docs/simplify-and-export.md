# Simplify and export for print or AR

*New in 1.7X.* Make a heavy model lighter in the editor, and save your work for a 3D printer or for AR on an iPhone
or iPad.

## Simplify a mesh

A heavy model (a scan, a sculpt or a download) can be made lighter in the editor.

- **Where:** select the object and press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>D</kbd>, or use the command palette
  (<kbd>Ctrl</kbd>+<kbd>K</kbd>, "Simplify mesh"). On an imported model or a group, it is also in the right-click menu
  under **Mesh ▸ Simplify…**.
- **Target:** drag the **Keep** slider (arrow keys step 1 %, <kbd>Page Up</kbd> / <kbd>Page Down</kbd> step 10 %) or
  type a **Triangles** count. The line under them shows the count your choice comes to before anything runs.
- **Preview** (<kbd>P</kbd>): shows the result on the object, only on your screen. Nobody else sees it, nothing is
  recorded, and a save made meanwhile writes the full model.
- **Apply** (<kbd>Enter</kbd>): everyone in the session gets the simplified model. It is **one undo step**
  (<kbd>Ctrl</kbd>+<kbd>Z</kbd> puts the full model back for everyone). <kbd>Esc</kbd> cancels.

**What is kept:** UVs, normals, vertex colours, skin weights (so an animated character still plays its clips), a second
UV set and material slots. Each slot is simplified on its own with its borders locked, so no seam opens between
materials. Tangents are rebuilt by the renderer.

**When it says no, it says why:**

- Instanced [scatter](scatter.md): simplify the source object instead.
- A shape whose Geometry settings still drive it (box, sphere …): the editor offers **Bake and simplify**. Baking locks
  the Geometry settings, just as a [mesh edit](mesh-editing.md) does.
- VRM avatars and meshes with morph targets (shape keys).
- Something another person is editing; a running simulation; an open mesh edit.

Simplify changes the model itself. For lighter versions that take over only when the model is small on screen, see
[Levels of Detail](lod.md) and [Importing Big Models](import-optimize.md).

## Export for 3D printing and AR

- **Where:** right-click ▸ **Save as… ▸ 3D print (.stl)**, **3D print (.3mf)** or **AR (.usdz)**, or
  <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>E</kbd>. The shortcut exports the selection when there is one, otherwise the
  whole scene; you can switch in the dialog.
- **Format:** STL, 3MF or USDZ (keys <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>). **What:** **Selection** or
  **Whole scene**.

### 3D print (STL, 3MF)

- Every position, rotation and scale is applied, and the part sits on the print bed (Z up, bottom at 0, centred).
- **Units are millimetres:** one scene metre is 1000 mm. The dialog shows the size it will print at. Change **Scale**,
  or type the **Longest side** in mm and the scale follows.
- **STL** is one mesh, read by every slicer, with no colour. **3MF** keeps each part as its own object with its
  colour, for multi-colour printers.
- **Watertight check:** the dialog counts open edges (holes). It is a warning, not a block: most slicers repair small
  holes. For a clean print, close them first ([Edit Mesh](mesh-editing.md), or a Boolean union).

### AR (USDZ)

- **Build** makes the file and shows its size; **Download** saves it. Open it on an iPhone or iPad to place it in your
  room with AR Quick Look.
- Materials and textures are kept, with textures capped at 2048 px. Flows and animation are not part of the file.

## For agents

`simplify_mesh {uuid, percent | triangles, bake?}` simplifies one object: `percent` is how much to keep (1-100),
`triangles` a target count, and `bake: true` bakes a primitive first. Over the connector it is
`edit_shape {action: "simplify"}`. See [Shapes and modelling with an agent](ai/agent-geometry.md#simplify_mesh-fewer-triangles).

## See also

- [Saving & Sessions](saving.md): the scene, project and GLTF formats.
- [Publish & Export](publish-export.md): sharing a scene or a game.
