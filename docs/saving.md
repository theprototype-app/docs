# Saving & Sessions

How to save and load your work: the recommended `.tpscene` bundle, GLTF interchange, named sessions, and autosave.

The main menu (the logo button) has **Import** (bring 3D files into the scene), **Load** (open a saved file) and **Save**, with a format switch underneath: **GLTF | Scene** — and a **⚙** cog for export settings.

## Starting from a template

**Menu ▸ Templates** opens a picker of ready-made scenes, in three tabs:

- **General** — starting points, including a **Blank** card that clears the scene (it asks first).
- **Examples** — worked showcases to pull apart and learn from.
- **Community** — scenes contributed by other people.

Templates load through the same path as a `.tpscene` file, so with peers connected everyone gets the usual Accept/Decline proposal and your current scene is stashed as a backup first. The Welcome overlay has a shortcut into the same picker.

## Scene (`.tpscene`) — recommended

A `.tpscene` file is a zip bundle containing everything a scene needs:

- **the scene snapshot** — objects, transforms, materials, camera, annotations,
- **assets** — the audio files, textures and config scripts the scene uses (stored by content hash),
- **imported packs** (optional),
- **the flow graph** — nodes and edges (optional).

The **⚙ export settings** dialog (next to the format switch) controls what the bundle includes:

| Checkbox | Default |
|---|---|
| Assets (audio, textures, configs) | on |
| Imported packs | off |
| Flow graph (nodes + edges) | on |

**Animated models** are carried as their **original file bytes** rather than as exported geometry: an animation clip lives beside the scene, not on the object, and no exporter can carry it. That means an imported rig comes back animated instead of as a dead static mesh, and animations you authored in the Animation window are stored too. There's a size cap per model, with a toast if one is skipped.

**Loading** a `.tpscene` restores the bundle in the right order: assets are put back into your Explorer library first (deduplicated by hash, landing in *Shared*), packs are re-registered, then the scene and flow graph load — sound nodes and textures resolve immediately instead of waiting for a peer to push bytes. One file moves a whole project between machines.

## GLTF

Saves the whole scene as standard GLTF — use this to take your work into other 3D tools. Loading accepts `.gltf` back. Animated flow effects are parked at their base pose during export so the file stores clean transforms.

## JSON (legacy)

A legacy scene format, hidden by default. Enable it via **⚙ ▸ Show JSON format** if you need it; otherwise prefer Scene.

## Sessions manager

**Menu ▸ Sessions** manages named in-browser save slots:

- **💾 Save current scene** stores a named snapshot with a thumbnail (also on <kbd>Ctrl</kbd>+<kbd>S</kbd>).
- **Load** restores a slot. With peers connected, loading is a *proposal* — everyone gets an Accept/Decline toast and the load only applies when all peers accept.
- **⤵ Import objects…** cherry-picks individual objects out of a session into the current scene.
- **⬇ .json / ⬇ .zip** downloads a session — the `.zip` variant bundles the scene's assets, like a `.tpscene`.
- **Import session file** accepts `.json` and `.zip`; a zip restores its assets into the Explorer first.
- Rename and delete slots inline.

## Autosave

A snapshot of the scene, node graph and camera is written to your browser automatically — about 30 seconds after any change, plus a periodic interval. If a snapshot exists when you open the app, a **restore** prompt offers to bring it back. Autosave can be turned off in **Settings**.

!!! tip
    Autosave protects against crashes; sessions are for milestones; `.tpscene` files are for backups and sharing outside the browser. Use all three.
