# Checkpoints

A **checkpoint** is a copy of the scene as it is right now — objects, node graphs, HUD, sky, physics, the camera — kept
**on this device**, with a name, an optional note, a picture and a time. [Autosave](https://docs.theprototype.app/saving.md#autosave) only remembers
the *last* state; checkpoints let you go back to *any* earlier one.

![The Checkpoints timeline comparing two checkpoints with the swipe slider](https://docs.theprototype.app/img/checkpoints/timeline-compare.png)

## Saving a checkpoint

**Menu** (the logo button) ▸ **Save checkpoint…**, or press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>. Type a name and, if you like,
a note ("before lighting", "try the red version next"), then press **Save checkpoint**.

## The timeline

**Menu ▸ Checkpoints** lists every checkpoint, newest first, grouped by day. In it you can:

| Action | How |
|---|---|
| **Restore** | replaces the open scene with the checkpoint. The scene you leave is kept in the timeline as **"Before restoring …"**, so a restore can itself be undone. With people connected, they are asked to accept first (the same as opening a saved session) |
| **Rename** | double-click the name |
| **Note** | click the note line to edit it (<kbd>Ctrl</kbd>+<kbd>Enter</kbd> saves) |
| **Pin** | a pinned checkpoint is never removed to make room |
| **Delete** | removes the checkpoint |
| **Compare** | press **Compare**, then tick two checkpoints: their pictures sit on top of each other with a swipe slider, plus what changed (object count, size, time apart, "same content"). Tick just one to compare it with the scene as it is now |

Two filters narrow the list: show only **This scene**'s checkpoints, or hide the **Automatic** ones.

## Automatic checkpoints

While you work, autosave also adds an **automatic** checkpoint every few minutes — only when the scene actually changed
since the last one, and never while a scene is loading or a simulation is running.

In the Checkpoints window the **Automatic** switch shows or hides the automatic checkpoints in the timeline.

A checkpoint's picture (and a saved scene's) shows the **scene only** — no gizmo, grid, light or camera helpers or
selection outline, whatever was selected when it was cut.

### Very large scenes

A very large scene — over the [budget meter](https://docs.theprototype.app/performance.md#the-budget-chip-will-it-fit-on-a-quest)'s **Desktop** line for triangles (4 M) or texture memory
(512 MB) — skips automatic checkpoints, because each one copies the whole scene. The first time it happens a notice says
so, with a **Settings** button. Named checkpoints (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>) always work.

![The notice when a large scene skips its automatic checkpoint](https://docs.theprototype.app/img/checkpoints/large-scene-notice.png)

## Settings

**Settings ▸ Scene ▸ Checkpoints**:

| Setting | Default | What it does |
|---|---|---|
| Keep automatic checkpoints | on | autosave adds rows to the timeline |
| Automatic checkpoint every | 10 min | 5 / 10 / 30 / 60 min — the shortest gap between two |
| Checkpoint storage | 250 MB | 100 MB / 250 MB / 500 MB / 1 GB that this device may use |
| Auto checkpoints on large scenes | off | automatic checkpoints for [very large scenes](#very-large-scenes) too (1.42) |

## Limits

- Checkpoints stay on this device (this browser). They are not shared with other people and are not part of a project
  file — use **Save** and scene versions ([Saving & Sessions](https://docs.theprototype.app/saving.md)) for that.
- When a new checkpoint would not fit, the **oldest unpinned** ones are removed — automatic ones before named ones. If
  even that is not enough (everything else is pinned), the save is refused and a message says so. At most 60 checkpoints
  are kept.
- A scene larger than the storage limit cannot be checkpointed.
