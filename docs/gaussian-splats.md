# Gaussian splats

*New in 1.75.* A **Gaussian splat** is a captured scene: a room, a statue or a street scanned with a phone or a
camera and turned into millions of soft coloured points. Import one (a `.ply`, `.spz` or `.splat` file, for example
from Polycam, Luma, Scaniverse, Postshot or a 3DGS training run) and it becomes an object in the shared scene. Move,
rotate, scale, group, undo, save and share it like any model.

## Import a splat

Drop the file on the viewport or the [Explorer](explorer.md), or use **Import** in the main menu. The scan lands with
its bottom on the spot you drop it.

A scan often comes in tilted or upside down: the capture tool uses its own axes. Rotate it with the gizmo.

A `.ply` that is a mesh, not a splat, is refused with the way to import it (as `.glb` or `.obj`).

## Big files: Make a smaller copy

Files up to **25 MB** are kept as they are. That is the limit for one file in the Library, and for sharing it with
the people in your session.

A bigger file is offered **Make a smaller copy**. The dialog says what it will do: the first of these steps that
brings the file under 25 MB.

1. Convert it to the compact `.spz` format. Every splat and colour is kept.
2. Convert it to `.spz` and drop the colour that changes with the viewing angle. Every splat is kept; shiny spots look
   flatter.
3. As 2, and keep only the most solid splats (the dialog gives the percentage).

The original file on your computer is never changed. A scan that would keep less than 20 % of its splats is refused:
crop or simplify it in a splat editor first (for example SuperSplat), then import it again. Files over 768 MB cannot be
read at all.

## Properties ▸ Splat

Select the scan to see its **Splat** section:

- The facts: how many splats, the colour bands, the file size.
- The status: loading, **Waiting for the file from a peer**, or not drawn here and why.
- **Opacity**.
- **Crop...**: trim the scan to a box, to hide the floaters and the background you do not want. The box is in the
  scan's own axes. Splats outside it are hidden for everyone; the file keeps them, so you can widen the box again.
  **Reset box** puts the box back round the whole scan, and **Remove crop** shows the whole scan again.

Material and Physics do not apply to a splat. [Mesh editing](mesh-editing.md) refuses one too: use **Crop** in the
Splat section instead.

## Selecting a scan

Click a scan from outside to pick it by its box, or pick it in the object list. Inside a scanned room, a click on empty
space still deselects: the box lets clicks through, so objects inside the room stay clickable.

## Sharing and saving

- **People in the session** get the object at once; the file travels like any shared asset. Until it lands, their
  Splat section says **Waiting for the file**.
- **A `.tpscene`** bundles the scan (**Explorer ▸ Scene ▸ splats**). See [Saving & Sessions](saving.md).
- **Older releases** open such a file and keep the object as an invisible box. If they save it again, the scan still
  draws here.

## Where splats are not drawn

| Where | What happens |
| --- | --- |
| [Photo mode](photo-mode.md) | A photo cannot trace splats: they are left out, and the panel's note says so. The normal still shows them. |
| [Cinematic view](cinematic-view.md) | The view cannot draw them: they are hidden while it is on, and the **Not shown** note names Gaussian splats. |
| Headset and phone | **Off on Meta Quest for now** (since 1.75.1): a scan in view slowed a Quest 3 from 72 to 23 frames a second at 30,000 splats and to 6 at 150,000, so a headset draws no splats and says why. The scan stays in the scene and everyone else still sees it. A phone draws up to 2 million splats; past that, whole splat objects are hidden on the phone, with one notice. A PC has no splat budget. See [Performance & Budgets](performance.md#judge-for-will-it-fit-on-a-quest). |
| 3D print and AR export | STL, 3MF and USDZ files leave splats out (a scan is not a mesh). |

A splat is not a mesh, so **Paint**, **Simplify** and decals do not work on it: each one says so.

## Third-party notices

- **Renderer**: [Spark](https://sparkjs.dev/) (`@sparkjsdev/spark`, MIT). It loads only when a scene
  holds a splat.
