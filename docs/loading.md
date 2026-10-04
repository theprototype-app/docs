# Loading Placeholders

When you open a level built from kit pieces (Castle Courtyard, the Tavern, …) — or a peer sends you one — each piece
first appears as a **placeholder box** where it will stand, and the real model replaces it as its file arrives. Since
1.21 those boxes tell you what is happening, and you can work with them while you wait.

<!-- 36-docs: these two images are crops of the lane's dev-server captures; re-shoot from the 1.21 preview before release -->

## Two looks

**Settings ▸ Scene ▸ Loading ▸ Loading placeholders**:

| Style | Looks like |
|---|---|
| **Colored boxes** (default) | solid grey blocks, as before |
| **Modern** | a translucent blue hologram box with a glowing rim, a slow pulse and a scan line sweeping up. It **fills from the bottom as that object's file downloads** — the fill level is the real download progress. An optional prototype **grid texture**, sized in world metres, shows the piece's scale |

![A Modern placeholder filling from the bottom as its model downloads](img/loading/modern-loading.png)

Both styles turn **amber** when a piece is stuck and **red with a “!”** when it failed.

## Working while it loads

A placeholder is a real object: click it to select it, drag it with the gizmo, type a position, rotation or scale in the
Properties panel, <kbd>Shift</kbd>-click to select several. When the model arrives it lands exactly where the box is
**now** — your edit is kept, and everyone else in the session sees it like any other move.

## When a piece is stuck or fails

- **Amber** — no data for 10 seconds (the *Stuck after* setting), or the app is waiting to retry.
- The app **retries by itself** three times (after 1, 3 and 9 seconds) when that can help: a dropped connection, a server
  error, a download that stopped half-way, or a site that refused the request. A *file not found* (404) goes red at once —
  retrying would not fix it.
- **Red** — it gave up. Hover it to see the file address, the HTTP status and the reason.

![A failed placeholder: red, with its tooltip and the “Retry all” toast](img/loading/modern-failed.png)

To recover:

- **Double-click** a red box to try again, or **right-click** it ▸ **Retry loading**, **Replace model…** or **Delete**.
- Selected, a placeholder shows a **Loading** section in the Properties panel: the progress, the file, and **Retry**,
  **Replace model…** and **Remove** buttons.
- When anything is red, a toast says *“N objects failed to load”* with **Retry all**.
- **Replace model…** opens a picker of pack items and your library models. A **pack item** replaces the piece in place —
  the same object, so its flows, notes and links keep working — on every peer. A **library model** is added as a new
  object at the same position, rotation and scale.

Retrying one box retries its **file**, so every copy of the same piece comes back together.

## Settings

All in **Settings ▸ Scene ▸ Loading**, and all per device:

| Setting | Default | |
|---|---|---|
| Loading placeholders | Colored boxes | or Modern |
| Placeholder grid texture | on | Modern only |
| Grid size (m) | 0.5 | one grid cell, in world metres |
| Grid color | light blue | |
| Grid opacity | 0.45 | |
| Placeholder animation speed | 1 | 0 = still |
| Stuck after (seconds) | 10 | three times this long restarts the download |

## Limits

- Placeholders are for **kit pieces** — models placed from a [pack](packs.md). A model you drag straight from the
  [Explorer](explorer.md) still shows the loading toast while it downloads.
- Scenes saved before 1.19 don't record a piece's size, so their placeholders are 1 m boxes.
- An animated pack item (a door, a chest) can't be chosen in **Replace model…** — it travels as a file, not a reference.
