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
