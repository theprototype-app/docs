# Terrain & Sculpting

Add a ground plane and shape it by hand — raise hills, carve valleys, smooth and flatten — with a brush that drags across the surface. Every stroke replicates to your peers.

## Adding terrain

Right-click the viewport ▸ **Add ▸ Ground ▸ Terrain** (or use the Add menu, <kbd>Shift</kbd>+<kbd>A</kbd>). This drops a flat **24 m × 24 m plane** at the point you click, subdivided into a 48×48 grid of segments and tinted a soft sage green.

The 48-segment resolution is deliberate: it's the densest grid that still fits within the limit for syncing edited geometry, so a fully sculpted terrain always replicates cleanly.

Terrain is a normal scene object — it replicates, selects and transforms like anything else.

## Sculpting

Right-click the terrain ▸ **Sculpt terrain**. This selects the object (which locks it so peers can't edit it at the same time) and opens the **Sculpt toolbar** — a floating tool palette you can drag anywhere.

Drag on the terrain surface to sculpt. A ring cursor follows your pointer, hugging the surface, to show the brush footprint.

### Sculpting any mesh

The same brush works on **any** mesh, not just terrain: right-click an object ▸ **Sculpt mesh**. The difference is which way the brush pushes — on terrain it moves the surface straight up and down, on a mesh it moves along the surface's own normals, so you can bulge and dent a shape from any angle. **Flatten** pulls toward the plane you first touched and **Smooth** relaxes the surface toward its local average, exactly as on terrain.

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

## Sculpting vs. mesh editing

Sculpting is its own mode, separate from the vertex/edge/face **mesh edit** mode (<kbd>Tab</kbd>):

- **Sculpt** is brush-based and reached from the *Sculpt terrain* / *Sculpt mesh* menu entry — for organic shaping, where you don't care which vertex is which.
- **[Mesh edit](mesh-editing.md)** is precise: it selects and moves individual vertices, edges and faces, and it's where extrude, bevel, knife and the loop tools live.

They never overlap — entering one doesn't affect the other. Sculpting never changes the number of vertices, so shape a mesh first and sculpt it after.

!!! warning "Desktop only"
    Terrain sculpting is a desktop feature. It isn't available in VR yet.
