# Levels of Detail (LOD)

A **level of detail** is a simpler version of a model that draws instead of the full one when the
model is small on screen. Far-away objects then cost a fraction of their triangles — which is what
keeps a big scene smooth on a phone or a Quest — and up close you still see every detail.

theprototype.app does this two ways:

- **Automatically** — any dense model you load (3000+ triangles) gets simplified levels in the
  background, built once and shared by every copy. You can switch this off in **Settings ▸ Scene ▸
  Simplify distant models** (this device only).
- **A LOD group on an object**, edited in its properties like in a professional 3D package
  (Unity's *LOD Group*, Unreal's *LOD settings*). Pack items that ship LOD files come with one
  already. A LOD group is part of the scene: it is saved, it undoes, and everyone in the session
  sees the same levels.

## The LOD section

Select an object and open its **Properties**; the **LOD** section shows its group.

- **The level bar** runs from 100% of the screen height on the left to 0% on the right. Each
  coloured segment is one level — **LOD0** is the object itself, then LOD1, LOD2… — and names its
  triangle count. A white tick under the bar shows how big the object is on screen right now, and
  a dot marks the level being drawn.
- **Drag an edge** between two segments to choose when the next level takes over. The labels under
  the bar read the thresholds (`LOD0 < 30%` means "LOD1 draws once the object is under 30% of the
  screen height"). A drag is one undo step.
- **Force LOD** draws one level whatever the distance (*Auto* = by screen size). Use it for a
  background prop that never needs full detail, or to check how a level looks.
- **Cull when smaller than the last level's size** stops drawing the object entirely once it is
  tinier than the last threshold — good for clutter far away.
- **Show LOD level in the viewport** paints every LOD-managed object in its level's colour
  (green LOD0, yellow LOD1, orange LOD2, red LOD3…). Only on your screen.

### Selecting and editing a level

**Click a segment** to select that level. While it is selected the viewport **shows that level**
(on your screen only) so you can see what you are editing; click it again — or select another
object — and the object goes back to *Auto*.

For a selected level you can:

- **Replace with** another object in the scene, or **drop a model from the Explorer** on the bar —
  the level then draws that model instead (e.g. a hand-made low-poly version).
- **Move level** puts the transform gizmo on the level: line a replacement model up with the
  original. The object itself does not move; the level's offset is saved with the group.
- **Own material for this level** gives the level its own colour, roughness and metalness.
  Without it, a level uses the object's own materials — so a colour change on the object shows on
  every level.
- **Triangles %** (generated levels): how much of the original the level keeps; **Rebuild** applies it.
- **Remove level**.

**Generate levels** builds three simplified levels (50%, 25% and 10% of the triangles) with
meshoptimizer, off the main thread. **+ Level** adds one more; **Remove group** goes back to the
automatic behaviour.

## Pack items with LODs

Pack items can ship their own LOD files (made offline by the pack tools). Placing one adds its LOD
group to the object; the level files are only downloaded when the object is first small enough to
need one, and once for every copy in the scene. Pieces placed before their pack had LOD files pick
them up automatically. Pack authors: see the `lods` field in the core repo's `PACKS.md`.

## In VR

The VR **Properties** panel has a **LOD** row: it reads the level being drawn (`Auto · LOD1`, or
`LOD2 forced`), and left/right on the stick (or the − / + buttons) cycles **Force LOD** through
Auto, LOD0, LOD1…

## How it works (for the curious)

The scene itself never changes: a level is swapped in only while a frame is being drawn, so
picking, physics, the mesh tools and every save always see the full object. A level made from a
pack file is matched to the object **by node name** and draws with the object's own material,
which is why an animated door keeps animating at every level. Switching back to a finer level
needs the object to grow a little past the threshold first (hysteresis), so an object sitting on
an edge does not flicker between levels while you move.
