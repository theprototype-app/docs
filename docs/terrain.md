# Terrain & Sculpting

Add a ground plane and shape it by hand — raise hills, carve valleys, smooth and flatten — with a brush that drags across the surface. Every stroke replicates to your peers.

## Adding terrain

Right-click the viewport ▸ **Add ▸ Ground ▸ Terrain** (or use the Add menu, <kbd>Shift</kbd>+<kbd>A</kbd>). This drops a flat **24 m × 24 m plane** at the point you click, subdivided into a 48×48 grid of segments and tinted a soft sage green.

The 48-segment resolution is deliberate: it's the densest grid that still fits within the limit for syncing edited geometry, so a fully sculpted terrain always replicates cleanly.

Terrain is a normal scene object — it replicates, selects and transforms like anything else.

## Sculpting

Right-click the terrain ▸ **Sculpt terrain**. This selects the object (which locks it so peers can't edit it at the same time) and opens the **Sculpt toolbar** — a pill at the top of the screen.

Drag on the terrain surface to sculpt. A ring cursor follows your pointer to show the brush footprint.

### The Sculpt toolbar

| Control | What it does |
|---|---|
| **⛰ Raise** | Pushes the surface up under the brush. |
| **⛏ Lower** | Pushes it down. |
| **〰 Smooth** | Relaxes bumps toward the local average — softens what you've made. |
| **▭ Flatten** | Pulls the surface toward the height where you first touched down. |
| **Radius** | Brush size, 0.5 – 8 m (default 3). |
| **Strength** | How fast the brush moves the surface, 0.05 – 1 (default 0.5). |
| **Done ✕** | Leaves sculpt mode (<kbd>Esc</kbd> also exits). |

Each brush stroke — from pressing down to lifting the pointer — is **one undo step** (<kbd>Ctrl</kbd>+<kbd>Z</kbd>). While you drag, peers see a live preview several times a second; when you release, the final shape is committed and synced.

!!! note "Under the hood"
    Sculpting only moves the surface up and down, never sideways, so the grid stays watertight and normals are re-smoothed after every edit — no faceted seams. The result travels to peers as a geometry snapshot on the same channel used by mesh editing.

## Terrain vs. mesh editing

Sculpting is its own mode, separate from the vertex/face **mesh edit** mode (<kbd>Tab</kbd>):

- **Sculpt** is brush-based, terrain-only, and reached from the *Sculpt terrain* menu entry.
- **[Mesh edit](controls.md)** drags individual vertices and faces on any editable mesh.

They never overlap — entering one doesn't affect the other.

!!! warning "Desktop only"
    Terrain sculpting is a desktop feature. It isn't available in VR yet.
