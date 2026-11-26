# Vector shapes and SVG

Logos, signs, icons, floor plans, a star over a door: vector shapes are flat outlines with a fill and a stroke that
stay sharp at any size. You can combine them, edit their points, import and export SVG files, and pull them out into
3D solids. Every change is one undo step and shows for everyone in the session.

## Drawing shapes

**Tools ▸ Draw shapes** (<kbd>Alt</kbd>+<kbd>V</kbd>) opens the shapes toolbar:

| Tool | How to draw |
|---|---|
| **Rectangle**, **Ellipse** | Drag from one corner to the other |
| **Star**, **Polygon** | Drag from the centre outwards |
| **Pen** | Click for a corner, click and drag for a curve. Click the first point to close the path, or press <kbd>Enter</kbd> to finish it open. <kbd>Backspace</kbd> removes the last point |

A shape is drawn on the surface you start on, or on the ground. A shape drawn on another flat shape lands on top of it
(see [Layer order](#layer-order)).

Select a shape and open Properties ▸ **Shape**:

| Row | What it does |
|---|---|
| **Corner radius** | Rounds the corners of rectangles, stars and polygons, live |
| **Points** | How many points a star or polygon has |
| **Fill** | Solid colour, linear or radial gradient, or none |
| **Stroke** | Colour and width of the outline, with **Join**, **Cap** and **Dash** / **Gap** |
| **Extrude** / **Bevel** / **Bevel steps** | Makes the shape a 3D solid (see [Extrude](#extrude)) |

## Combining shapes

Select two or more shapes that lie in the same plane and open **Shape** in the object menu (the commands that need one shape work on one):

| Command | Result |
|---|---|
| **Union** | One shape covering all of them |
| **Subtract** | The first shape with the others cut out of it |
| **Intersect** | Only where they overlap |
| **Exclude** | Everything except where they overlap |
| **Outline stroke** | The stroke becomes a filled shape of its own |
| **Inset 5 cm** / **Outset 5 cm** | The outline moves in or out by 5 cm |

The first shape you selected keeps its look. Shapes tilted out of its plane are left alone.

## Editing points

**Shape ▸ Edit points** (or the button in Properties) shows the shape's points.

- Drag a point or one of its handles. A smooth point keeps its two handles in line; hold <kbd>Alt</kbd> to break them.
- <kbd>Shift</kbd>-click picks several points; drag one to move them all. <kbd>Ctrl</kbd>+<kbd>A</kbd> picks every point.
- The arrow keys nudge the picked points (<kbd>Shift</kbd> = 10 times as far; the grid step when grid snap is on).
- Click the outline to add a point. Double-click a point to switch it between corner and smooth.
- <kbd>Delete</kbd> removes the picked points. <kbd>C</kbd> closes an open path, <kbd>K</kbd> splits a path at the picked point.
- <kbd>Esc</kbd> leaves Edit points.

A rectangle, ellipse, star or polygon becomes a pen path the first time you edit its points. The keys can be changed in
Settings ▸ Shortcuts. On a phone or tablet the toolbar has a button for each of these.

### Snapping and smart guides

Points, the pen and shape drags snap to the grid when the scene's grid snap is on, and to other shapes' points and
edges when **Snap targets ▸ Vertex / Edge** are on. When a point lines up with a point of another shape, a guide line
shows it.

### Align in plane

**Shape ▸ Align in plane** lines shapes up in their own plane: left, centre, right, top, middle, bottom, or
distribute across / up. It works for shapes standing on a wall as well as on the floor.

## Layer order

Flat shapes in the same plane are stacked in layers, so the one on top is always drawn on top.

| Command | Keys |
|---|---|
| **Shape ▸ Order ▸ Bring forward** | <kbd>Ctrl</kbd>+<kbd>]</kbd> |
| **Send backward** | <kbd>Ctrl</kbd>+<kbd>[</kbd> |
| **Bring to front** | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>]</kbd> |
| **Send to back** | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>[</kbd> |

## Extrude

Select a shape or a text and drag the **arrow** on its front corner: it becomes a 3D solid, live for everyone, as one
undo step (<kbd>Esc</kbd> during the drag cancels). **Extrude**, **Bevel** and **Bevel steps** are also in Properties.

The solid is a clean mesh with flat faces and four-sided walls, so [Mesh Editing](mesh-editing.md) works on it. Once
you edit its mesh, its points and depth lock, like any edited shape.

**Shape ▸ Bake to mesh…** (or the button in Properties) turns a shape into an ordinary mesh. One undo brings the
shape back.

In the [2D view](2d-scenes.md), the toolbar's **Extrude** makes the selection 10 cm deep, or flat again.

## SVG files

- **Import**: drop an `.svg` file on the viewport. Scripts, embedded web pages and links to other sites are taken
  out first; files up to 2 MB, 500 shapes and 40 000 points are read. One shape holds up to 4 000 points: a longer
  path is simplified to fit, and a message says from how many points to how many.
- **Export**: **Shape ▸ Export SVG** saves the selected shapes as an `.svg` file. Importing it again gives the same
  shapes.

## Shapes and Paths

A [Path](paths.md) object (for motion, cameras and tubes) and a pen path are different things, but you can turn one
into the other: **Shape ▸ Make Path object** makes a Path from a shape's outline (curves are simplified to at most 200 points; the shape stays), and a Path's **Make vector shape**
draws it as a pen path.

## On a phone or tablet

Tap for a corner, drag for a curve. Two fingers move the camera and never place a point. Edit points works the same
way, with toolbar buttons instead of keys.

## In VR

- **Add ▸ Shapes** places a rectangle, ellipse, star or polygon in front of you.
- **Add ▸ Shapes ▸ Pen** puts a drawing sheet in front of you. The trigger places points (hold and pull for a curve;
  the first point closes the path), the grip carries the sheet, and the radial menu has **Finish path**, **Undo point**
  and **Pen off**.
- **Selected ▸ Extrude** makes the selected shape a solid. Grab it like any object.

## With an agent

An agent can draw shapes too: `create_shape` with `action: 'vector'` makes rectangles, ellipses, stars, polygons and
paths, or reads an SVG. See [Shapes and modelling with an agent](ai/agent-geometry.md).

## Sharing, saving and older versions

Shapes are saved in the scene and replicate like every object. A peer on an older version of the app sees a shape
as a plain mesh in the right place, and a solid as a plain solid; it cannot edit the shape's points.
