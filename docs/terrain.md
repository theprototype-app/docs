# Terrain & Sculpting

Add ground and shape it two ways: **procedurally**, by dialling in hills from a handful of numbers, and **by hand**, with a brush that raises, lowers, smooths and flattens. Every edit replicates to your peers.

## Adding terrain

Right-click the viewport ▸ **Add ▸ Ground ▸ Terrain** (or the Add menu, <kbd>Shift</kbd>+<kbd>A</kbd>). This drops a flat **24 m × 24 m plane** at the point you click, subdivided into a 48×48 grid and tinted a soft sage green.

The 48-segment resolution is deliberate: it's the densest grid that still fits the limit for streaming edited geometry, so a fully sculpted terrain always replicates cleanly. For bigger worlds, **tile** several terrains rather than asking for one huge one — see [Bigger worlds](#bigger-worlds) below.

Terrain is a normal scene object: it selects, transforms and replicates like anything else.

## Procedural hills

A fresh terrain starts flat, and its shape is **parametric** — select it and open Properties ▸ **Geometry**:

| Row | What it does |
|---|---|
| **Size** | The tile's extent in metres (1–200) |
| **Segments** | Grid resolution per side (2–48) |
| **Seed** | Which landscape you get. Same seed, same hills, on every peer and in every session |
| **Height** | How tall the hills are. **0 is flat** — the starting state |
| **Detail** | Feature size: low is broad rolling ground, high is tight and noisy |
| **Octaves** | Layers of detail (1–6). More octaves add finer texture *without* changing the height |
| **Ridged** | Turns smooth hills into creased ridges — mountainous rather than rolling |
| **Warp** | Bends the pattern so features stop looking regular |
| **Edges** | **flat** (uniform), **island** (high in the middle, falling to the rim) or **bowl** (low in the middle, rising at the rim) |
| **Tile X / Tile Z** | Which part of the landscape this tile shows — see below |

Set **Height** above zero and hills appear. Every row is live: scrub **Seed** to shop for a landscape, then raise **Octaves** for detail.

!!! note "Why the numbers, not the mesh"
    Only these ~11 numbers travel to your peers, and only they are stored in a saved scene — everyone rebuilds the same hills from the same values. It also means a terrain stays fully re-shapeable: change the seed a month later and the landscape re-rolls.

### Bigger worlds

Use several tiles with the **same Seed** and different **Tile X / Tile Z**, offset by exactly one **Size** each. All tiles then sample one continuous landscape, so their edges meet seamlessly.

Use those two rows — never a *move* — to choose which part of the landscape a tile shows. Dragging a tile with the gizmo slides its mesh but not the landscape it was cut from, so the join stops matching.

Four tiles of a 24 m world:

| Tile | Tile X | Tile Z |
|---|---|---|
| north-west | 0 | 0 |
| north-east | 24 | 0 |
| south-west | 0 | 24 |
| south-east | 24 | 24 |

(Place each tile in the scene as usual — the offsets only decide which slice of the landscape it draws.)

### Edges: making a ring of mountains

**Edges ▸ bowl** raises each tile toward its rim, so a grid of bowl tiles gives a basin ringed by high ground — the classic arena. **island** does the opposite for a single tile meant to sit in water or void.

## Sculpting by hand

Right-click the terrain ▸ **Sculpt terrain**. This selects the object (which locks it so peers can't edit it at the same time) and opens the **Sculpt toolbar** — a floating tool palette you can drag anywhere.

Drag on the terrain surface to sculpt. A ring cursor follows your pointer, hugging the surface, to show the brush footprint.

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

### Sculpting any mesh

The same brush works on **any** mesh, not just terrain: right-click an object ▸ **Sculpt mesh**. The difference is which way the brush pushes — on terrain it moves the surface straight up and down, on a mesh it moves along the surface's own normals, so you can bulge and dent a shape from any angle. **Flatten** pulls toward the plane you first touched and **Smooth** relaxes the surface toward its local average, exactly as on terrain.

!!! note "Under the hood"
    Sculpting only moves the surface up and down, never sideways, so the grid stays watertight and normals are re-smoothed after every edit — no faceted seams. The result travels to peers as a geometry snapshot on the same channel used by mesh editing.

## Hand edits lock the parametric rows

The moment you sculpt a terrain — or carve a road into it, or edit it in mesh mode — the Geometry rows **lock**, and the panel says so.

That's deliberate. Those rows rebuild the terrain from its numbers, which would throw the hand work away, and nudging a seed by accident should not cost you an afternoon of sculpting.

When you *do* want the parametric shape back, press **Regenerate (discards the sculpt)** and confirm. The rows return and the ground goes back to what the numbers say.

!!! warning "Regenerate really does discard it"
    The sculpted shape is still in your undo history, but it takes more than one <kbd>Ctrl</kbd>+<kbd>Z</kbd> to walk back to it. Treat Regenerate as deliberate.

## Roads, paths and rivers

To fit a [spline](splines.md) and a terrain together, use **Flatten** on the spline's right-click menu: *Terrain to this spline* cuts a level bed for it, and *This spline onto a surface* drops the spline onto the ground instead. Both are one undo step, and both ask you to click the other object.

## Sculpting vs. mesh editing

Sculpting is its own mode, separate from the vertex/edge/face **mesh edit** mode (<kbd>Tab</kbd>):

- **Sculpt** is brush-based and reached from the *Sculpt terrain* / *Sculpt mesh* menu entry — for organic shaping, where you don't care which vertex is which.
- **[Mesh edit](mesh-editing.md)** is precise: it selects and moves individual vertices, edges and faces, and it's where extrude, bevel, knife and the loop tools live.

They never overlap — entering one doesn't affect the other. Sculpting never changes the number of vertices, so shape a mesh first and sculpt it after.

!!! warning "Desktop only"
    Terrain sculpting is a desktop feature. It isn't available in VR yet.
