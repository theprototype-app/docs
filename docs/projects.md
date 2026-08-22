# Projects

A **project** is everything in your Explorer: the library items and folders, every
saved scene with its version history, and the project's name. It lives on your
machine (IndexedDB) and replicates to the people you build with — there is no server
copy. One file, the **`.tp`**, carries the whole thing.

## The pieces

- **Scenes** are ordinary `.tpscene` files in your library. Saving a scene
  ("Save scene…" in the Explorer) writes a content-hashed file and points the scene's
  NAME at it. The travel node moves everyone between scenes by name.
- **The manifest** is the one mutable document: for each scene name, the full history
  of its version hashes; the asset list; the project name. It replicates
  latest-wins and survives reloads.
- **The name** is editable in the Explorer's header row (click it, type, Enter).
  It becomes the window title ("Scene\* – Project – theprototype" — the asterisk
  means the open scene differs from its saved version) and the default `.tp`
  filename.

## Version history

Every save cuts a version; travelling away from an edited scene cuts one
automatically (an untouched scene never mints versions). Only the **latest** version
shows in the Explorer — older ones live in hidden storage, browsed through the scene
item's **Version history** panel (the history icon in its properties):

- Each row: date, name (auto, or the custom name from "Save version…"), thumbnail.
- **Restore** first checkpoints your current scene, then moves the pointer back to
  the old version and loads it — nothing is ever destroyed, and your peers see the
  update and can travel to it.
- **Delete** frees the local bytes only. The manifest keeps the hash, so a peer who
  still holds the version can serve it back.
- **Pin** a version to keep it beyond the retention window.
- **Settings ▸ Files ▸ "Keep versions per scene"** (default 10, `0` turns
  auto-versioning off; explicit saves and "Save version…" always work).

## Open vs Import

Two different intents, two different behaviours — the Blender/Unity convention:

|  | `.tp` (project) | `.tpscene` (scene) |
|---|---|---|
| **Open** (sidebar **Load**) | **Replaces** your project — a warning first, then the Explorer, folders, scene history and name are swapped for the file's. Nothing loads into the viewport; travel when ready. | Loads as the **current scene, unsaved** — it is not part of your project until you take the "Save into project" prompt that appears on your first edit. |
| **Import** (drop on the Explorer, or "Import project as folder (.tp)…") | **Adds** the file's contents as one folder named after the project. Your project and manifest are untouched. | Lands as an ordinary scene item in the active folder. |

## The `.tp` file

**Save** with the **TP** format selected (the default) downloads the whole project:
the manifest, every kept scene version, every library item with its folder
placement, and the assets in use — bytes stored once per content hash. Anything
whose bytes are no longer on your machine is counted and reported, never silently
dropped. A project exported by a newer app version asks before importing.
