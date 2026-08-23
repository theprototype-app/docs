# Explorer

The Explorer is your local asset library — import files, organize them into folders, preview them, and drag them straight into the scene.

Open it from the folder icon in the bottom hud. It docks at the bottom of the screen (sharing a tabbed dock with the Flow editor when both are open — click the **Flow** / **Explorer** tabs to switch) and can be undocked into a floating, resizable window.

!!! note "Local by design"
    The library lives in your browser (IndexedDB) and is **not** synced to peers. An asset only replicates when you *use* it — place a model, assign a sound, drop a texture — at which point the bytes are pushed to everyone automatically.

    **Project scenes are the exception.** The project knows every scene by name, so a scene somebody else saved appears for you as a dimmed card with a blue dot even though you hold none of its bytes — open it and it downloads from whoever has it. See [Projects](projects.md).

## The tree

The left pane shows four sections:

- **Library** — your own folders and files (always open).
- **Prefabs** — objects you saved with *Save as prefab* (see [Prefabs](prefabs.md)).
- **Packs** — built-in and imported asset packs (see [Packs](packs.md)). Single-click opens the packs grid; double-click expands the pack list in the tree.
- **Scene** — a read-only, derived view of the assets the *shared scene* currently uses (audio, config scripts, textures). Double-click to expand its groups.

Folder management behaves like a file manager: right-click for **New folder** / **New subfolder** (inline naming — <kbd>Enter</kbd> creates, <kbd>Esc</kbd> cancels; names can't contain `* \ /`), **Rename** inline, and **Delete folder** (cascade delete confirms with folder/item counts). Drag folders onto folders (or the Library root) to re-parent — moving a folder into its own subtree is refused. The tree pane has a drag-resize splitter and per-folder expand/collapse carets, all persisted.

## Importing files

Drag files from your computer anywhere onto the Explorer panel:

| Kind | Extensions |
|---|---|
| Images | png, jpg, webp |
| Audio | mp3, wav, ogg |
| Text / config | txt, json |
| 3D objects | glb, gltf, obj, stl, fbx |

Items are capped at **25 MB** each. Images and models get generated thumbnails; audio and text show icon cards.

**Importing something you already have.** A file is identified by its contents, so re-importing the same bytes is not a new file. The app tells you what it already has and lets you skip it, reveal it, or — for a scene — take a real copy. The rule lives in **Settings ▸ Files ▸ "When importing files already in your library"** (Ask / Skip them / Import as copies); see [Projects](projects.md#importing-something-you-already-have).

**Animations and materials come along.** A `.glb`/`.gltf` or `.fbx` keeps its animation clips — they play in the scene and are listed per object in the Animation window — and an `.obj` picks up its sibling `.mtl` so it arrives with its materials instead of plain grey. Because no exporter can carry an animation clip, an animated model is stored as its **original file** when you save a scene, so it comes back animated. See [Saving & Sessions](saving.md).

## Browsing and opening

- **Single-click** selects an item and shows its details in the **ⓘ Properties** panel.
- **Double-click** opens it: text files open in a floating code editor (<kbd>Ctrl</kbd>+<kbd>S</kbd> saves back to the item), images open in a zoomable preview window (10%–800%, drag to pan), and 3D objects open a rotatable model-preview popup.
- **Right-click** an item for Properties, Rename, Delete (and *Copy contents* for text files).
- The search box filters the whole library by name; the breadcrumb path bar (toggleable) shows where you are.

**Keyboard navigation** in the grid: arrow keys move the selection, <kbd>Enter</kbd> opens, <kbd>Backspace</kbd> goes up a level, <kbd>Esc</kbd> closes the window.

## Item properties (ⓘ)

The ⓘ panel shows name, kind, size, folder path, added date and the content hash (copyable), plus per-kind details — image dimensions, audio duration and channels, text line count. For 3D objects it can embed a **rotatable inline 3D preview** with mesh stats (triangles / vertices / meshes) — enabled by the *3D model preview* toggle in the ⚙ tab. Double-clicking an object always opens the larger preview popup regardless of that toggle.

The **⚙ settings** tab holds local preferences: single-click opens folders, show path bar, 3D model preview, hide built-in packs, and the *Import pack (.zip)* button.

## Drag into the scene

Drag any item out of the Explorer and drop it in the viewport:

- **Objects, pack items and prefabs** are placed at the point you drop them (on the surface under the cursor, or the ground plane).
- **Images** dropped onto an object become its **texture**.

Placement and texturing go through the normal replicated paths, so peers see the result immediately.
