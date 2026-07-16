# Prefabs

Prefabs are objects (or whole groups) you save once and reuse anywhere — your personal building blocks.

## Saving a prefab

Right-click any object in the viewport or the object list and choose **Save as prefab**. The object is snapshotted with its materials and children, a thumbnail is rendered, and it lands in your library. Very large objects (over 5 MB serialized) are rejected with a toast.

## Where prefabs live

Prefabs are stored **locally in your browser** — they are your library, not part of the shared scene, and they are not synced to peers. You'll find them in two places:

- the **Prefabs** section of the [Explorer](explorer.md), and
- the Library panel's prefab grid.

Rename or delete them from either place.

## Placing a prefab

- **Drag** a prefab from the Explorer into the viewport — it is instantiated at the point you drop it.
- Or click it in the Library panel to add it to the scene.

Every placed instance gets fresh identities, replicates to all connected peers like any created object, and is undoable. Two instances of the same prefab are fully independent afterwards.

## Sharing prefabs

Prefabs can be exported and imported as `.json` files from the Library panel — handy for passing a building block to a teammate. (For moving whole scenes with assets, use a [Scene bundle](saving.md) instead.)

!!! tip
    Save structured groups — a furnished room, a rigged button with its wall — not just single meshes. A prefab keeps the entire hierarchy.
