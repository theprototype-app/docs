# Splines

Click out a path and get a solid tube that follows it — a road, a pipe, a cable, a river bed, a handrail. Splines stay **editable forever**: every one carries the points you placed, so you (or any peer, in any later session) can drag them, change the thickness point by point, insert and delete, and the tube rebuilds itself.

## Drawing one

Open the **Draw** toolbar (Tools ▸ Draw mode) and switch the tool from **Freehand** to **Spline**.

Then click. Each click places a **control point** on whatever surface is under the cursor — the ground, a terrain, another object — falling back to the ground plane when you click empty space. You can orbit between clicks; only clicks place points.

Finish with <kbd>Enter</kbd>, the toolbar's **Done**, or a **double-click**. You get one object named **Spline** in the scene.

| While placing | |
|---|---|
| **Click** | Place a control point |
| **Double-click** / <kbd>Enter</kbd> / **Done** | Finish |
| <kbd>Esc</kbd> | Throw the draft away |

The toolbar's **colour** and **size** set the new spline's colour and its starting thickness. A spline needs at least two points.

!!! tip "In VR"
    Pull the trigger to place points, exactly as clicking does on the desktop.

## Editing the points

Right-click the spline ▸ **Edit spline** (or Properties ▸ Spline ▸ **Edit control points**). A small toolbox opens and handles appear on the curve:

| Handle | Drag / click |
|---|---|
| **Blue** point handle | Moves that control point (the gizmo seats on it) |
| **Amber** dot, just above a point | Drag **up/down** to make *that point* thicker or thinner |
| **Grey** marker, mid-span | **Click** to insert a new point there |
| Right-click a blue handle | Deletes that point |

Each gesture is **one undo step** and reaches your peers immediately. While the editor is open the spline is locked, so two people can't fight over the same curve.

The toolbox itself carries the whole-spline controls — **Loop** (join the last point back to the first), **Thickness** (set every point at once) and **Sides** (how many faces go around the tube).

!!! tip "In VR"
    Grip a handle to move a point; the amber dot works the same way. Edit spline is on the object radial menu.

## Properties

Select a spline and open Properties ▸ **Spline**:

| Row | What it does |
|---|---|
| **Color** | The tube's colour |
| **Thickness** | Sets every control point to one radius |
| **Thicker / Thinner** | Appears when points *disagree* — scales the whole taper up or down instead of flattening it |
| **Sides** | Faces around the tube (3–32) |
| **Smoothness** | Segments per span — how finely the curve is followed |
| **Closed loop** | Joins the ends |
| **Edit control points** | Opens the point editor |
| **Flatten** | See below |

## Flatten: fitting a spline and the ground together

A spline and a terrain rarely line up on the first try, and there are two different ways to fix that. Both live under **Flatten**, on the right-click menu and in Properties, and both ask you to **click the other object** in the viewport.

### Terrain to this spline

Cuts a **bed** for the spline: the ground under it is levelled to the curve's height and blended smoothly back into the slope either side. Use it for a road that should feel dug into the landscape.

1. Right-click the spline ▸ **Flatten ▸ Terrain to this spline…**
2. Click the terrain.

The bed is as wide as the tube itself, with a shoulder either side that fades out rather than stepping. It's **one undo step**, and it edits the *terrain* — the spline doesn't move.

### This spline onto a surface

The opposite: the **spline** moves and the surface is left exactly as it is. Every control point drops straight down until it rests on the object below, so the tube's underside sits on the surface. Use it for a path that should follow a hill you've already shaped.

1. Right-click the spline ▸ **Flatten ▸ This spline onto a surface…**
2. Click the object.

It works on any mesh, not just terrain, and a control point that started *underneath* the surface is lifted up onto it rather than left behind.

| While a Flatten is armed | |
|---|---|
| **Click the target** | Runs it |
| **Click the wrong kind of thing** | Stays armed and tells you why |
| **Click empty space** / <kbd>Esc</kbd> | Cancels |

!!! note "Which one moved?"
    The entry names the thing that changes. *Terrain to this spline* edits the ground; *This spline onto a surface* edits the spline. Each is a single undo step, so if you pick the wrong direction, <kbd>Ctrl</kbd>+<kbd>Z</kbd> and try the other.

!!! tip "Carving is repeatable"
    Running the same carve twice is safe. The bed is already level, so a second pass only softens the shoulder a little further.

## Examples

### A road across hills

1. **Add ▸ Ground ▸ Terrain**, then Properties ▸ Geometry: set **Height** to about 6 for some relief (see [Terrain](terrain.md)).
2. Draw ▸ **Spline**, click four or five points across the terrain, <kbd>Enter</kbd>.
3. Properties ▸ Spline ▸ **Thickness** 2 — that also becomes the width of the bed.
4. Right-click the spline ▸ **Flatten ▸ Terrain to this spline…** and click the terrain.

The road now sits in a levelled strip. Move a control point and carve again to reroute it.

### A footpath that follows the ground

Same start, but at step 4 choose **Flatten ▸ This spline onto a surface…** and click the terrain. The path drapes over the hills instead of cutting through them, and the hills keep their shape.

### A pipe with variable thickness

Draw a spline with four points, open **Edit spline**, and drag the amber dot above the middle points upward. The tube swells where you dragged and stays thin at the ends — the taper is stored per point, so **Thicker / Thinner** in Properties scales it without flattening it.

## What replicates

Only the **record** — the list of points with their radii, plus colour, sides, smoothness and the closed flag. Every peer rebuilds the same tube from those numbers, so nothing heavy crosses the network, and a peer who joins later can open the editor on a spline someone else drew. Saved scenes carry the record too, which is why a spline is still editable in a session you load months later.

The two Flatten directions ride channels that already exist: carving a terrain sends a geometry snapshot (the same one mesh editing and sculpting use), and draping a spline sends its record. Both are one undo step on every peer.
