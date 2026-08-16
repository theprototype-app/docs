# Snapping

Snapping makes things line up without you nudging them into place. There are two kinds, and they work together: a **grid** that quantises how far a drag moves, and **element snapping** that lands the object on real geometry that is already in the scene.

Everything here is a **local preference** — your snapping setup is yours, and your peers see only the result of your drags.

## Where it lives

Right-click the viewport ▸ **Snapping**. The parent row shows your current setup at a glance (`0.25 · 15° · 0.1 · V F`), so you can read it without opening the menu. Custom step values live in *Configure Scene ▸ Snapping*, one click away at the bottom of the same submenu.

## Grid snapping

| Setting | Snaps |
|---|---|
| **Position** | movement to a step — 0.1, 0.25, 0.5, 1, or your own |
| **Rotation** | turning to 5°, 15°, 45°, 90°, or your own |
| **Scale** | scaling to 0.05, 0.1, 0.25, or your own |

**Enable / Disable snapping** at the top of the submenu is the master switch for these three.

## Snap to surface

**Surface** ▸ *Snap to surface* drops a dragged object onto whatever is underneath it — the quickest way to keep furniture on the floor and props on tables.

## Element snapping

Switch on any of the **Elements** targets and, while you drag with the gizmo, the app looks for a matching feature near the cursor. When one is in range it lights up, and releasing lands your object exactly on it — **overriding the grid step** for that drag, because you asked for that point specifically.

| Target | Lands on |
|---|---|
| **Vertex** | a corner of the mesh under the cursor |
| **Edge** | the nearest point along an edge |
| **Face** | the centre of a face |
| **Surface** | the exact point the cursor is over — a continuous slide across the surface rather than a discrete point |
| **Object** | another object's origin, its bounding-box centre, or the centre of one of its six sides |

You can have several on at once; the closest candidate to the cursor wins. The search radius is in **screen** pixels, so it behaves the same however far you have zoomed.

!!! tip "Vertex + Surface is a good default pair"
    Surface gives you a smooth slide over a shape; Vertex bites onto its corners when you get close to one. Together they feel like the object is magnetic where it matters.

## Align to normal

With **Align to normal** on, snapping to a face or a surface also **turns** the object onto that surface — drop a picture onto a slanted wall and it takes the wall's angle instead of staying upright.

## Pick your snap origin

By default an object snaps by its own origin. Often that is the wrong point: you want *this corner* of the shelf to meet *that corner* of the wall.

With exactly one object selected, choose **Pick snap origin**, then click a point on it. That point becomes the anchor for your drags — snapping now moves *it* onto the target. The anchor is temporary and purely local: it is not part of the object, it is never replicated or saved, and it does not touch the object's real [origin](controls.md#each-objects-origin).

## Inside mesh edit

Element snapping applies to the mesh tools' gizmo drags too, so a vertex can be dropped precisely onto another vertex — which is what you want when closing a seam by hand.

## In VR

VR has its own snap modes for grabbed objects (grid, surface, free) on the Edit ring — see the [VR guide](vr.md). Those are separate controls and switching them never disturbs your desktop element-snapping setup.
