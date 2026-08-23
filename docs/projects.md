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

## Everyone sees the same scenes

The manifest replicates, so **every peer knows which scenes the project has** — even
before they hold a single byte of them. A scene you do not have shows in the Explorer
as a dimmed card with a blue dot; open it and it downloads from whoever has it, and
the card gives way to the real file.

That is why creating a scene is enough for your peers to find it. You do not have to
send anything.

### Who is where

One session can have several scenes open at once. The peer list shows the scene each
person is standing in, and everyone in one scene is a **room** — a session is the
connection, a room is simply who is in which scene.

A peer in another scene is somewhere you are not, so:

- their avatar is **not drawn** in your viewport,
- **Watch is disabled**, with the reason on the button ("In Arena — open that scene
  to watch them"), and watching stops by itself if they travel away while you watch,
- and their movement is not streamed at you until one of you travels.

If nobody has named a scene yet, everyone is in the same **Untitled scene** — the
ordinary state of a fresh session — and none of the above applies.

## Files you brought yourself

A `.tpscene` you dragged in is **yours, not the project's**. Opening one loads it and
says so; your first edit offers **Save into project**, and until you take that offer
the project never records it — leaving the scene will not quietly invent an entry
under a name you did not choose.

When you do save it in, the file you opened becomes **version 1** of that scene
rather than a second card sitting beside it.

### Importing something you already have

A library item is identified by its **contents**, so re-importing the same bytes is
not a new file. Rather than silently doing nothing, the app says what it already has
and lets you choose. **Settings ▸ Files ▸ "When importing files already in your
library"**:

- **Ask** (default) — a list of what is already there, with **Reveal** to find each
  one; skip them, or take copies.
- **Skip them** — keep what you have, and be told how many were left out.
- **Import as copies** — bring them in beside the originals.

A **scene** can be copied for real: the copy gets a fresh identity and its own name
(`Arena (copy)`), so it keeps a history of its own. For every other kind, identical
files *are* one file, and the app says so instead of offering a copy that cannot
exist.

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
