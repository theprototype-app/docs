# Stamp Decal

Presses a mark onto a surface while the game runs: a footprint, a scorch, a paint splat. The mark lands where the wired
[On Impact](onimpact.md) touched, or at a point you wire. *New in 1.75.*

**Inputs:** `trigger` (event) · `look` (object — a [Decal](../decals.md) to copy the image, tint and opacity from) · `on` (object — the object to mark) · `at` (vector3 — a world point) · `facing` (vector3 — the surface direction at that point)
**Output:** effect

## How it works

On each new **trigger** the node presses one mark. Where it goes:

- **From an On Impact** wired into `trigger`: at the point where that object touched, facing out of the surface it
  hit, on the object it hit. The built-in ground is not an object, so a landing on it leaves no mark: put a floor
  object down.
- **From `at`**: at that world point, facing `facing` (up when nothing is wired), on the object wired into `on`, or on
  the object whose flow holds the node.

Wire a Decal object into `look` and every mark copies its image, tint and opacity, and its size. With nothing in
`look` the mark uses **size** and **depth**.

Marks are runtime only. They are not saved and not undone, and they all go when the run stops. The peer running the
physics stamps, and everyone in the session sees the same marks.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| size (m) | 0.4 | the mark's width and height when no `look` is wired |
| depth (m) | 0.3 | how far into and out of the surface the mark reaches |
| seconds | 10 | how long a mark lasts (0 = for the whole run); it fades in its last second |
| most at once | 64 | how many marks are kept at once (1 to 64; the scene never holds more than 64); past that the oldest goes |

## Practical example

Scorch marks where a ball lands:

1. Give the ball a **Dynamic** body (Inspector ▸ Physics), and put a floor object (a flat box) under it.
2. Right-click a wall ▸ **Add decal here** and pick the scorch mark from the **Decals Starter** pack. This is the
   look; move it somewhere out of the way.
3. In the ball's flow: **On Impact → Stamp Decal** (`trigger`), and an **Object Selector** naming the scorch decal →
   Stamp Decal `look`.
4. Press <kbd>P</kbd> and drop the ball. A scorch appears where it lands, for every peer.

## Limits

- Not on animated characters (skinned meshes) or on scattered copies.
- A very detailed object (more than 400,000 triangles) cannot take a mark.

## See also

- [Decals](../decals.md) — decals you place by hand
- [On Impact](onimpact.md) — where the contact point comes from
- [Spawn](spawn.md) — copies of an object while the simulation runs
