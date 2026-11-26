# 2D Scenes

Make a side-scrolling 2D game, or put flat pixel art into a 3D world: **sprites** (an image or a sprite sheet on a flat
plane), **flipbook animations** from a sheet, **2D layers** that scroll at different speeds (parallax), and a
**2D camera** that follows the player. Everything you make here is an ordinary scene object: it syncs to everyone in the
session, undoes one step at a time, saves in the `.tpscene` and exports with your game.

## Walk-through: the 2D scene template

1. Open **Templates** (or **New scene**) and pick **2D scene**, next to *Blank scene*.
   It replaces the scene for everyone in the session, so with others connected they are asked first.
2. The scene opens in the **flat 2D view**: an orthographic camera looking straight at the scene, with the
   **2D toolbar** on the left. Nothing rotates here — drag to pan, use the wheel to zoom. On a phone or tablet, drag
   with one finger to pan and pinch with two to zoom.
3. Press **Play**. The camera switches to the template's *2D camera*, which follows the walking player past three
   background layers. Watch the far hills move slower than the trees: that is parallax.
4. Press **Esc** to stop playing, then **Back to 3D** at the bottom of the 2D toolbar. The same scene in the
   perspective view shows how it is built: the layers are flat groups standing one behind the other.

What the template holds:

| Object | What it is |
|---|---|
| **Sky** | A 2D layer with parallax 0: it stays with the camera. |
| **Far hills** | A 2D layer with parallax 0.3: it scrolls at a third of the camera's speed. |
| **Trees** | A 2D layer with parallax 0.6. |
| **Gameplay** | The layer the game happens on (parallax 1): the ground and the **Player**. |
| **Player** | A sprite with a 4-frame sheet; its *walk* clip plays by itself. |
| **2D camera** | An orthographic camera object. Its node graph has a **Camera Follow 2D** node aimed at the player. |

## The flat 2D view

Turn it on and off with **View ▸ 2D view** in the viewport menu, or with **Back to 3D** on the 2D toolbar. It changes
only *your* view: your peers keep their own.

- The camera is orthographic and looks straight down the scene's depth (-Z). Things further back are not smaller —
  depth only decides what is drawn in front.
- **Pan**: drag (any mouse button), or one finger on a touch screen. **Zoom**: the wheel, or pinch.
- The move gizmo loses its depth arrow, so dragging an object keeps it in its layer.
- Ambient occlusion is switched off through an orthographic camera (flat layers would get dark halos around every sprite).
- The **Preview** pill at the top right keeps working here.

## The 2D toolbar

While the flat view is on, the 2D toolbar stands in for the 3D tools: the bottom bar's Move, Rotate, Scale and Pivot
buttons step aside and come back when you leave the view.

| Tool | What it does |
|---|---|
| **Select** | Click a sprite or a layer to select it; drag its arrows to move it in the plane. |
| **Pen**, **Shapes** | Draw vector paths and shapes on the layer you picked (see [Vector shapes and SVG](vector-shapes.md)). |
| **Text** | Adds a text object in the middle of the view, on the layer you picked. |
| **Extrude** | Makes the selected shape or text 10 cm deep, or flat again (see [Extrude](vector-shapes.md#extrude)). |
| **Layers** | Opens the Layers panel. |
| **Back to 3D** | Leaves the flat view. |

Tools that your version of the app does not have are not shown at all.

### Layers panel

The panel lists the scene's 2D layers **front to back**.

- Click a layer to pick it: new text and shapes land on the picked layer.
- The arrows bring a layer forward or send it back (they swap the depth of two layers; one undo step).
- **New layer** adds an empty 2D layer in front of the others.
- A layer's parallax is shown in its row and set in the Inspector (see below).

## Sprites

Add one from the viewport menu: **Add ▸ 2D ▸ Sprite**. It starts as a 1 m white square. Select it and use the
Inspector's **Sprite** section:

- **Image** — *Choose image…* uploads a picture; *From Explorer…* uses an image from your library (you can also drag
  an Explorer image onto the Image row). Sprite images are kept **lossless** (PNG, up to 2048 px a side), so pixel art
  stays sharp.
- **Filter** — *Pixel (nearest)* keeps pixel art crisp; *Smooth (linear)* suits painted art.
- **Pixels / m** — how many image pixels make one metre. A 16 px frame at 16 pixels per metre is 1 m tall.
- **Pixel snap** — moves the sprite only in whole pixels, so it never shimmers.
- **Columns**, **Rows**, **Frames**, **Margin**, **Spacing** — the grid of the sprite sheet.
- **Frame** — the frame shown when no clip plays. **Flip horizontally / vertically** mirror it.

### Flipbook clips

A clip is a run of frames from the sheet:

- **Frames**: `0-3` is a range (`3-0` plays it backwards); `0,1,2,1` lists frames one by one.
- **fps**: frames per second. **Loop**: loop, ping-pong or play once — a once clip can name the clip that follows it.
- **Events**: name a frame (for example *step* on frame 2) and an **Animation Marker** node fires when the clip passes it.
- **Autoplay**: the clip that plays by itself.

Start clips from the node editor with **Play Animation**: its *clip* field lists the sprite's clips (left empty, it plays
the autoplay or first clip). **Animation Finished** fires when a *once* clip ends. Clips run on the session's shared
clock, so everyone sees the same frame — late joiners included — without anything extra being sent.

## 2D layers and parallax

Any group can become a 2D layer: select the group and switch on **2D layer** in the Inspector (the section appears on
groups that hold a sprite).

- **Parallax** — 1 moves with the world, 0.5 at half speed (far hills), 0 stays with the camera (a sky). Values above
  1 are for foreground layers that pass faster than the gameplay.
- **Parallax Y** — the same for up and down (the template keeps it at 1, so heights stay as you placed them).
- The layer's depth (its z position) decides which layer is in front.

Parallax shows through an orthographic camera — the flat view and a 2D game camera. In the perspective view and in VR
the layers stay where you placed them, so you can always see and edit the real layout.

## Camera Follow 2D node

Moves a camera object in x and y after a target, keeping its depth:

- **dead zone width / height** — the target moves freely inside this box before the camera follows.
- **damping** — seconds of lag (0 = locked on).
- **offset x / y** — keep the target off-centre (look ahead).
- **follow x / follow y** — follow on one axis only (a side-scroller often follows x only).
- **keep inside bounds** + **minX … maxY** — the view never shows past the edges of your level.
- **pixel snap** — pixels per metre to snap the camera to (0 = off).

Wire it into an **Object Selector** that picks the camera (or put it in the camera's own graph), and look through that
camera with **Set Active Camera** or a **Start camera** node. Each player's view follows on its own.

## Sharing, saving and older versions

- Sprites, clips and layers are part of the scene: peers see every change, and **Undo** takes back one step.
- A late joiner sees running flipbooks at the right frame.
- Someone on an older version of the app sees sprites as plain pictures on flat planes (no animation, no parallax),
  never an error.

## Limits

- A sprite image is at most 2048 px on its longest side; a bigger one is scaled down by whole steps, keeping its pixels square.
- Each sprite is one draw call; hundreds of animated sprites are fine on a desktop, while a headset is happier with fewer.
- Tile maps, LDtk / Tiled import and 2D physics are planned for a later release.
