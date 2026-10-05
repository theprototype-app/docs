# Packs

Packs are shareable bundles of 3D assets that appear in the Explorer's **Packs** section — browse them like folders and place their items like any import.

Packs are **local**: loading or importing one never syncs it to your peers. Only an object you *place* from a pack replicates, exactly like a file import. Some packs ship with the app (built-in); others you import yourself.

## Browsing

- **Single-click** the *Packs* row in the Explorer tree to open the packs grid — one card per pack. **Double-click** the row to expand the pack list inside the tree instead.
- Click a pack card to open its items. Thumbnails resolve lazily and are cached, so revisiting a pack is instant.
- **Place an item** by double-clicking it (or selecting it and pressing <kbd>Enter</kbd>, or the *Place in scene* button in its ⓘ Properties), or **drag it into the viewport** to place it exactly where you point.

## Importing a pack (.zip)

Right-click empty space in the Packs view and choose **＋ Import pack (.zip)**, or use the same button in the Explorer's ⚙ settings tab. The zip's assets are stored as regular Explorer items (deduplicated by content hash), so imported packs persist across sessions.

GitHub's *Download ZIP* archives work as-is — a single wrapper folder around the pack is handled automatically.

## Loading from a URL

Right-click in the Packs view and choose **🔗 Load pack from URL**. Accepted:

- a direct **.zip** URL, or
- a **GitHub repository link** (`https://github.com/user/repo`) — the main-branch zip is fetched automatically.

The host must allow cross-origin requests (CORS); if a URL fails, try a direct `.zip` link.

## Hiding, deleting, attribution

- **Built-in packs** can't be deleted (they're bundled), but right-click ▸ **🙈 Hide pack** removes one from view — reversible via *Show N hidden packs* in the ⚙ tab, which also has a *Hide built-in packs* toggle.
- **Imported packs** can be right-click ▸ **🗑 Delete**d (their item files stay in your library).
- Right-click any pack ▸ **ⓘ Attribution / license** shows authors, sources and the license (also available from the pack's Properties panel). Licenses use SPDX ids (`CC-BY-4.0`, `CC0-1.0`, `MIT`, …) and per-item licenses can override the pack license.

## The kits (1.17)

Four built-in packs are made to **build worlds** from, all CC0 (made with Meshy.ai, post-processed
for the app):

| Pack | What is in it |
|---|---|
| **Modular Architecture Kit** | 32 walls, doors, windows, floors, roofs, stairs, a tower — stone, plaster, oak and slate |
| **Nature & Terrain** | 31 trees, plants, rocks, cliff chunks, path tiles and a pond |
| **Props & Interiors** | 33 furnishings and game pieces — tables, crates, a well, a market stall, torches, levers |
| **Sci-fi & Modern** | 28 station walls, floors, doors, stairs, consoles and lights |

Everything **snaps to the 1 m grid**: walls stand on grid lines (2 m long, 3 m to a storey),
floor tiles fill the 2 × 2 m cells, and each pack's `kit.md` lists every piece's pivot and size.

A kit piece in your scene is saved as a **reference to its pack**: a level of 150 pieces is about
25 KB, every copy shares its textures, and a peer who joins refills the pieces from the pack
server. A piece you edit (a mesh change, a new colour) is saved in full, as before. Placing a kit
piece is undoable like any other object.

Walkable example levels built from the kits are in **Templates ▸ General**: *Castle Courtyard*,
*Forest Clearing*, *Tavern Interior*, *Wizard's Tower*, *Market Town Square* and the *Architecture
shell*. Press Play to walk them; their doors open.

## The kits (1.19)

| Pack | What is in it |
|---|---|
| **Interiors: Home, Tavern & Office** | 30 pieces of furniture, kitchen, bar, lights and decor, plus wall trims (skirting, wainscot, cornice) that snap to the architecture kit's walls |
| **Town & Market** | 27 pieces — seamless street tiles (road, curb, corner, crossing, sidewalk), a fountain, market stalls, a well, lamps, a clock tower top and a garden gate that opens |
| **Interactive Kit** | 19 pieces that **move when you use them**: doors with their frames, gates, a portcullis, a trapdoor, shutters, a chest, drawers, a cabinet, a lever, a pressure plate, a wall button, and an ambient torch, banner and ceiling fan |
| **Arcane Study** | seven wizard's-study props — an alchemy table, a potion shelf, a crystal ball, a lectern, a telescope, an armillary sphere, a rune rug |

**Doors, lids and levers.** A piece with a ▶ badge in the Explorer is *functional*. In Edit it
rests (a door stays shut, nothing plays by itself — placing or loading it never starts an
animation). In **Interact** or **Play**, click it (or point the VR laser at it, poke it, or knock
on it) and it opens with a sound; click again and it closes. Everyone in the session sees the same
door, and you can walk through an open one. A sliding door may open as you walk up to it. Only
ambient pieces (a banner, a fan, a torch flame) move on their own, and only in Interact and Play.
The Animation panel can preview a clip in Edit without changing your scene.

**Levels of detail.** Every pack piece comes with lighter versions of itself that are drawn when
it is far away. See [Levels of detail](lod.md) to force a level, edit one or tune the distances.

**Draw calls.** Every copy of the same pack piece is drawn in one go (*Settings ▸ Scene ▸
Draw repeated kit pieces together*, on by default) — a furnished tavern stays inside a headset's
budget.

## Adventurers (1.24)

**Packs ▸ Adventurers** holds the nine rigged, animated characters people appear as in a session — Knight, Mage, Rogue,
Hooded rogue, Barbarian and four skeletons, from Kay Lousberg's CC0 KayKit packs — to place in a scene as animated
models. See [Your Character](avatars.md).

## For pack authors

A pack is a folder or zip with a `manifest.json` at the root:

```
mypack/
  manifest.json       # pack + item metadata
  cover.webp          # pack cover, ~512x512 (.png fallback)
  assets/<item-id>/
    model.glb         # the asset (or a texture / audio file)
    thumb.webp        # ~512x512 preview (.png fallback)
  LICENSE
  CREDITS.md
```

`manifest.json` declares `id`, `name`, `version`, `author`, `homepage`, a SPDX `license`, and an `items` array — each item with `id`, `kind` (`object` | `texture` | `audio` | `material`, inferred from the extension if omitted), `file`, `thumb`, `name`, and optional per-item `license` / `author` / `source`. Ship pre-rendered `thumb.webp` files so the grid fills in before models load; the app renders a thumbnail itself if none is present.

The full format reference is `PACKS.md` in the app repository.
