# Prefabs

Prefabs are objects (or whole groups) you save once and reuse anywhere — your personal building blocks.

## Saving a prefab

Right-click any object in the viewport or the object list and choose **Save as…**, then a format:

| Entry | What it makes |
|---|---|
| **Prefab** | the classic reusable copy in your Library — a snapshot of the object with its materials and children |
| **Prefab (.glb)** | a prefab that *is* a `.glb` file: geometry, materials and baked animation. Node shaders and object flow graphs are not part of glTF, so they stay behind |
| **Prefab (.tpscene)** | a prefab that *is* a `.tpscene`: the objects plus their animation clips, object flow graphs, shader graphs and the joints between them. The scene itself — sky, look, gravity, music, HUD — stays behind |
| **glTF binary (.glb)** | just downloads the selection. Nothing is stored in your Library |
| **glTF (.gltf)** | the same as text glTF |

With several objects selected, **Save as…** saves the whole selection as one prefab. A thumbnail is rendered for the
card. Very large objects (over 5 MB serialized) are refused with a toast.

## Where prefabs live

Prefabs live in the **Prefabs** section of the [Explorer](explorer.md). You can also drop a 3D model or a scene file on
that row to make one; it keeps its own format. Right-click a prefab for **Add to scene**, **Duplicate**
(<kbd>Ctrl</kbd>+<kbd>D</kbd>), **Export**, **Update from selection** (replace it with what you have selected), **Properties**,
**Rename** and **Delete** (to the Deleted bin).

Prefabs are stored in your browser. A prefab saved as `.glb` or `.tpscene` can be dragged onto a Library folder to become an
ordinary file, which you can then [share with the session](explorer.md#sharing-with-the-session); a plain **Prefab** cannot.

## Placing a prefab

- **Drag** a prefab from the Explorer into the viewport — it is placed at the point you drop it, on the surface under the
  cursor.
- Or right-click it ▸ **Add to scene**.

Every placed instance gets fresh identities, replicates to all connected peers like any created object, and is undoable.
Two instances of the same prefab are fully independent afterwards.

## Exporting a prefab

Right-click a prefab ▸ **Export**:

- **The original file** — only for a prefab saved as `.glb` or `.tpscene`: the exact bytes it was saved as, nothing
  converted.
- **GLTF** — a `.gltf` model file other tools can open.
- **prefab (.json)** — this prefab as a file; import it back on any machine.
- **scene (.tpscene)** — a scene whose entire content is this prefab, which the app itself can open.

For moving whole scenes with their assets, use a [Scene bundle](saving.md) instead.

!!! tip
    Save structured groups — a furnished room, a rigged button with its wall — not just single meshes. A prefab keeps the
    entire hierarchy, and **Prefab (.tpscene)** keeps its flow graphs and joints too.
