# Explorer

The Explorer is the session's file library — import files, organize them into folders, preview them, share them with the people you are connected to, and drag them straight into the scene.

Open it from the **Explorer** button in the Controls bar, or with <kbd>Alt</kbd>+<kbd>E</kbd>. It lives as a tab in the bottom dock beside the Node editor, Animation and the other editors (<kbd>T</kbd> shows and hides the dock), and right-clicking its button offers **Open as dock tab** or **Open as floating window**.

!!! note "Local until shared"
    Files you import live in your browser (IndexedDB). They stay on your device until you **share** them — then every peer in the session has them, in the same folders. Using an asset in the scene — placing a model, assigning a sound, dropping a texture — still pushes its bytes to everyone as before.

    **Project scenes are the exception.** The project knows every scene by name, so a scene somebody else saved appears for you as a dimmed card with a blue dot even though you hold none of its bytes — open it and it downloads from whoever has it. See [Projects](projects.md).

## The tree

The left pane, top to bottom:

- **＋ Mount project…** and any mounted projects — see [Mounting a saved project](#mounting-a-saved-project).
- **Library** — your own folders and files.
- **Prefabs** — objects you saved with *Save as…* (see [Prefabs](prefabs.md)). Drop a 3D object or a scene file on the row to make one; it keeps its own format.
- **Packs** — built-in and imported asset packs (see [Packs](packs.md)). Single-click opens the packs grid; double-click expands the pack list in the tree.
- **Scene** — a read-only, derived view of the assets the *shared scene* currently uses (audio, config scripts, textures) — identical on every peer.
- **Deleted** — the recycle bin, shown while it has something in it (or while you drag something over it). See [Deleted](#deleted).

Folder management behaves like a file manager: right-click for **New folder** / **New subfolder** (inline naming — <kbd>Enter</kbd> creates, <kbd>Esc</kbd> cancels; names can't contain `* \ /`), **Rename** inline, and **Delete folder** (it confirms with folder and file counts). Drag folders onto folders (or the Library root) to re-parent — moving a folder into its own subtree is refused. The tree pane has a drag-resize splitter and per-folder expand/collapse carets, all persisted.

## Importing files

Drag files from your computer anywhere onto the Explorer panel:

| Kind | Extensions |
|---|---|
| Images | png, jpg, webp |
| Audio | mp3, wav, ogg |
| Text / config | txt, json |
| 3D objects | glb, gltf, obj, stl, fbx |
| Scenes and projects | tpscene, tp |

Items are capped at **25 MB** each. Images and models get generated thumbnails; audio and text show icon cards.

**Importing something you already have.** A file is identified by its contents, so re-importing the same bytes is not a new file. The app tells you what it already has and lets you skip it, reveal it, or — for a scene — take a real copy. The rule lives in **Settings ▸ Explorer ▸ "When importing files already in your library"** (Ask / Skip them / Import as copies); see [Projects](projects.md#importing-something-you-already-have).

**Animations and materials come along.** A `.glb`/`.gltf` or `.fbx` keeps its animation clips — they play in the scene and are listed per object in the Animation window — and an `.obj` picks up its sibling `.mtl` so it arrives with its materials instead of plain grey. Because no exporter can carry an animation clip, an animated model is stored as its **original file** when you save a scene, so it comes back animated. See [Saving & Sessions](saving.md).

## Sharing with the session

Right-click a file ▸ **Share with peers**, or a folder ▸ **Share folder**, and everyone in the session gets it — in the same place in their tree. A shared folder shares whatever you drop into it later; **Unshare** on one file inside it takes that one back out, and the app remembers that decision over any rule. Unsharing never deletes anybody's copy.

Every card carries a small dot that says whose it is: teal for a file you shared, sky blue for a peer's, a hollow ring for one that is no longer shared but still yours. A dot in the top corner means the file is shared but its bytes are not on your device yet — open it, or right-click ▸ **Download from peers**.

### Ask before sharing

Add a file while you are connected and a strip appears below the Library: *Share "‹name›" with the session?* with **Share** and **Keep local**. Connecting with a library full of local files asks once for all of them (*Share your 12 files with the session?*), and there **Stash mine** is the third choice. Tick **Apply to all my files, now and from now on** to make it a rule — everything you add from now on is shared, or nothing is and you are not asked again. **File settings** opens the same rule in Settings.

### Downloads happen by themselves

When someone shares a file or a folder your copy is fetched straight away. Switch that off for a metered connection or a very large project with **Settings ▸ Explorer ▸ Download shared files automatically** — shared files still appear, greyed, and download when you open them.

The pill beside the view toggle in the Explorer header is the **transfer log**: *Downloading 3 files — 40%*, *Up to date*, or *No peers*. Click it for the files in flight with their own progress, a **Retry** for anything that failed, and **Show full log** for the whole record with per-row **Retry**, **Cancel**, **Show in Explorer** and **Remove from log**.

## Deleted

Deleting is never destruction. **Delete** on a local file, or **Delete for everyone** on a shared one, moves it — every peer's copy of it — into **Deleted**, which keeps the folder structure, so a deleted folder is still a folder there. Drag files or folders onto the Deleted row to delete them too.

- **Restore** on a row puts it back where it came from, on every peer; **Restore folder** brings a folder back whole.
- **Drag** a card out of Deleted onto a Library folder to restore it *there* instead.
- **Delete permanently** on a row frees that one file on this device.
- **Empty Deleted (N)** — under **Disk** in the Deleted view's right-click menu — reclaims the disk on *this* machine and clears the record. Peers keep their own bins. It asks first, always.
- **Clear the log (N)** forgets only the records whose bytes are already gone from this device; anything still restorable stays.

The view has its own **View**, **Group** (*By who deleted it*) and **Sort** options, and **Show cleaned-up files** lists what was already freed.

## Browsing and opening

The header's **Thumbnails / List** toggle switches views. The list has sortable columns — **Name**, **Type**, **Size**, **Added**, **Owner** (in Deleted: **Location**, **Deleted by**, **Deleted at**) — click a header to sort, drag it sideways to reorder, drag its edge to resize, and right-click the header to choose columns or **Reset widths and order**. Columns and sort are remembered per view.

- **Single-click** selects an item and shows its details in the **ⓘ Properties** panel.
- **Double-click** opens it in a **preview window** (below); text files open in a floating code editor (<kbd>Ctrl</kbd>+<kbd>S</kbd> saves back to the item).
- **Right-click** an item for Open, Download, Share, Rename, Delete, Properties (and *Copy contents* for text files).
- The search box filters the whole library by name; the breadcrumb path bar (toggleable) shows where you are.

**Keyboard navigation** in the grid: arrow keys move the selection, <kbd>Enter</kbd> opens, <kbd>Backspace</kbd> goes up a level, <kbd>Esc</kbd> closes the window.

## Duplicate, Copy, Cut and Paste

Right-click a file or a folder for **Duplicate** (**Duplicate folder**), **Copy** and **Cut**; right-click a folder or the grid background for **Paste** — the entry says what it holds (*Paste 2 files + 1 folder*). With the grid focused the keys are <kbd>Ctrl</kbd>+<kbd>D</kbd> / <kbd>C</kbd> / <kbd>X</kbd> / <kbd>V</kbd>, on one card or a whole selection (*Duplicate 3 items*).

- A duplicate lands beside its source as **Tower copy.glb**, then *Tower copy 2.glb*; pasted into another folder it keeps its name unless that collides.
- A **cut** row dims to half until you paste it, and a cut is spent by one paste; a copy can be pasted again.
- A copy is local until you share it — unless it lands in a shared folder, which shares it like anything else you drop there.
- **Prefabs** duplicate too (*Prefab copy*). **Packs** are read-only bundles: Duplicate is greyed out and says so.
- **Duplicate folder** copies everything in it under a new folder beside it.

**A scene** is different: its name lives inside the file, so Duplicate on a scene opens the naming card prefilled with *Arena copy* — type a name, <kbd>Enter</kbd> — and makes a scene of its own, with its own version history. A name that is already taken is refused with a toast. To duplicate a scene, select it on its own; in a bigger selection it is skipped and the toast says so.

!!! note "A copy costs your peers no download"
    A shared file travels as a row with its own identity beside its content hash. When you duplicate a shared file — or a whole shared folder — peers who already hold the bytes make the copy from their own disk: ten copies, zero transfers. Deleting a copy removes only that copy; editing one gives it new bytes, which are sent once. A scene copy is the exception, because its new name makes it a new file: it transfers once.

### The preview window

Images open zoomable (**−** / **＋** / **1:1**, drag to pan), sounds open with a player, and 3D models open on a turntable with an **animation transport** — play, step a frame with <kbd>,</kbd> and <kbd>.</kbd>, scrub, pick a clip — and a mesh-stats line. The **←** / **→** buttons page through the folder without closing the window, and **⌐** goes up a level.

The window's **⚙** holds two things worth knowing: **Opacity** fades the window so you can model against a reference picture, and **Passthrough** lets clicks reach the scene underneath while the header stays live to move it or switch it back. **Allow multiple windows** opens each file in a window of its own instead of re-pointing the one you have.

## Item properties (ⓘ)

The ⓘ panel shows name, kind, size, folder path, added date and the content hash (copyable), plus per-kind details — image dimensions, audio duration and channels, text line count. For 3D objects it can embed a **rotatable inline 3D preview** with mesh stats (triangles / vertices / meshes) — enabled by the *3D model preview* toggle in the ⚙ tab. Double-clicking an object always opens the larger preview regardless of that toggle.

The **⚙ settings** tab holds local preferences: single-click opens folders, show path bar, 3D model preview, stack multiple drops on one spot, confirm before updating a prefab, hide built-in packs, and the *Import pack (.zip)* button.

## Prefabs that are files

Right-click an object in the viewport ▸ **Save as…** and choose the format. **Prefab** is the classic snapshot; **Prefab (.glb)** and **Prefab (.tpscene)** make a prefab that *is* a file — the `.glb` carries geometry, materials and baked animation, the `.tpscene` also carries animation clips, object flow graphs, shader graphs and joints — so it can be dragged into the Library, shared, and exported as the exact bytes it was saved as (**Export ▸ The original file**). The last two entries, **glTF binary (.glb)** and **glTF (.gltf)**, are plain downloads. See [Prefabs](prefabs.md).

## Mounting a saved project

**＋ Mount project…** at the top of the tree lists the projects saved in this browser (and **Import project (.tp)…** for a file). A mounted project appears as its own root beside your Library: browse it, open a scene from it into the viewport, edit its files and folders, then **Save changes** to write them back — or **Refresh** to re-read it and throw your edits away. **Copy to Library** brings one of its files into your own project. **Unmount** just stops showing it; the saved project is not deleted.

## Storage

The chip in the Explorer header reads *used / granted* for everything this app keeps in your browser. Click it — or **Storage used…** under **Disk** in the right-click menu, or **Settings ▸ Explorer ▸ Storage used** — for the **Storage** breakdown: library files, old scene versions, deleted files, saved scenes and projects, autosave, prefabs, installed modules and the rest, each with a size. Tick what you want gone and press **Reclaim**; nothing is removed until you do, and it asks once more.

## Files in and out

A session downloads as a **`.tpscene`**, a whole project as a **`.tp`**, and both import back — from the logo menu's **Load**, from the Sessions manager, or by dropping them on the Explorer. Right-click a scene ▸ **Download (.tpscene)**; the Library root's menu has **Export project (.tp)** and a folder's has **Export folder as .tp**; **Import project as folder (.tp)…** adds a `.tp` file's contents to your library as one folder without opening anything. See [Projects](projects.md#the-tp-file).

## Drag into the scene

Drag any item out of the Explorer and drop it in the viewport:

- **Objects, pack items and prefabs** are placed at the point you drop them (on the surface under the cursor, or the ground plane).
- **Images** dropped onto an object become its **texture**.
- **Audio and text** are used where they plug in — sound nodes, scripts, and any module that claims the drop (a sample onto a pad).

Placement and texturing go through the normal replicated paths, so peers see the result immediately.
