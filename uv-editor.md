# UV & Textures

A texture is a flat image wrapped around a 3D model. The **UV editor** shows you that wrapping — the model's surface unfolded into a square — and lets you rearrange it, generate it from scratch, paint straight onto it, and give different parts of one mesh their own materials.

Everything here is shared: a peer sees your unwrap, your brush strokes and your material slots as you make them.

## Opening it

The UV editor is a tab in the bottom dock, next to the node editor. Open it from the dock's **＋** menu ▸ **UV editor**. Select a mesh in the viewport and its UV map appears; the dock's **Undock** button takes it out as a floating window, and the window's **Dock** puts it back.

The editor follows your **selection**. If you have an Edit Mesh session open it targets that object, and if you select a group it finds the textured mesh inside it.

## Reading the map

The square is UV space: the whole texture, from 0 to 1 on both axes. The mesh's triangles are drawn over it as a wireframe, so you can see which part of the image lands on which part of the model.

- **Scroll** to zoom (toward the pointer, *since 1.79*), **middle-drag** to pan, **Fit** re-centres the square.
- **Hold <kbd>Space</kbd> and drag** to pan with any tool (*since 1.79*; the cursor turns into a hand). Before, Box,
  Lasso and Paint had no way to pan without a middle button.
- On a touch screen, **two fingers** pinch to zoom and move together to pan — see [Touch](#touch).
- Toggle **wireframe**, and the texture itself, from the view controls.

!!! note "Big models show, but don't drag"
    Two limits, for two different reasons:

    - Above about 20 000 triangles the wireframe and its handles are hidden — drawing 300 000 line segments per frame would grind. The texture still shows and painting still works.
    - Moving UVs rewrites the geometry, which has to fit one sync message, so on very dense meshes dragging is disabled with a note saying so. **Painting is unaffected** — it writes to the image, never the geometry.

## Moving UVs

Pick a selection tool from the toolbar:

| Tool | What it does |
|---|---|
| **Select** | Click a vertex; <kbd>Shift</kbd> (or <kbd>Ctrl</kbd>) adds. Dragging the background pans; clicking it deselects. **<kbd>Shift</kbd>-drag on empty space box-selects** and adds to the selection (*since 1.79*; it used to pan — middle-drag and <kbd>Space</kbd>-drag still pan). |
| **Box** | Drag a rectangle; everything inside is selected. |
| **Lasso** | Draw a shape around the vertices you want. |
| **Paint** | See [Painting](#painting) below. |

Drag any selected point to move it. Each drag is one undo step and replicates when you let go.

### Move, rotate and scale

The topbar arms one of three transform modes — press <kbd>1</kbd>, <kbd>2</kbd> or <kbd>3</kbd> — and every gesture below applies whichever is armed:

| Gesture | Does |
|---|---|
| **Left-drag** a selected point | Transform with the pointer |
| **Middle-click** a selected point | A *grab*: the selection follows the cursor with no button held. Click or <kbd>Enter</kbd> commits, <kbd>Esc</kbd> puts it back |
| **Arrow keys** | Nudge by exactly **one texture pixel**, rotate by one degree, or scale by 1% — <kbd>Ctrl</kbd> ×10, <kbd>Shift</kbd> ×100 |

Scaling with the arrows is **per axis** — left/right scales in U, up/down in V, and <kbd>Alt</kbd> makes it uniform. Shrinking is the exact reciprocal of growing, so a press one way and a press back leaves the map where it started. Every press is its own undo step.

### Keys

*New in 1.79.* The UV editor has its own rows in **Settings ▸ Shortcuts**:

- **Tool keys** for Select, Box, Lasso and Paint: no key by default; the Blender style
  [keymap](https://docs.theprototype.app/controls.md#keymap-presets) puts them on <kbd>W</kbd> / <kbd>B</kbd> / <kbd>C</kbd> / <kbd>P</kbd>.
- **Move now, Rotate now, Resize now**: the selected points follow the pointer at once, as in the
  [3D view](https://docs.theprototype.app/controls.md#move-now-rotate-now-resize-now). <kbd>X</kbd> / <kbd>Y</kbd> lock U / V, <kbd>Shift</kbd> moves
  fine and <kbd>Ctrl</kbd> snaps; <kbd>Enter</kbd> or a click keeps it, <kbd>Esc</kbd> or a right click cancels it (a
  right click now cancels a middle-click grab too). No key by default; the Blender preset puts them on <kbd>G</kbd> /
  <kbd>R</kbd> / <kbd>S</kbd>, and <kbd>1</kbd> still arms Move.

The <kbd>?</kbd> sheet lists them once they have a key, and <kbd>Space</kbd>-drag pan.

### The transform origin

Rotation and scaling happen about a **placeable origin**. Press the ⌖ button (or use the right-click menu) and click where you want it; drag it around at any time. It snaps onto the nearest UV point unless you hold <kbd>Alt</kbd>.

The origin is a local editing aid — it is never replicated and never saved.

### Selecting from the keyboard

| Keys | Does |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>Space</kbd> | Enter cursor mode and drop a cursor; press again to take or drop the cursor's point |
| **Arrows** (in cursor mode) | Walk the cursor to the nearest point in that direction |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+**arrow** | Grow the selection in that direction |
| <kbd>Esc</kbd> | Leave cursor mode, keeping the picks; again clears them |
| <kbd>Ctrl</kbd>+<kbd>A</kbd> / <kbd>Ctrl</kbd>+<kbd>I</kbd> / <kbd>L</kbd> | Select all / invert / grow to the linked island |

### Only the faces you picked

A primitive's sides usually **share** the same UV space — a default cube has 24 UV entries but only four distinct coordinates, so dragging one side drags all six. The **Only selected faces** toggle scopes the editor to the faces you have picked in [Edit Mesh](https://docs.theprototype.app/mesh-editing.md), which is how you separate them.

### Island tools

An **island** is a connected patch of the map — a piece of the model that was cut out and laid flat on its own.

| Button | What it does |
|---|---|
| **Linked** | Grow the selection to the whole island it touches. |
| **Rotate** | Turn the selection 90°. |
| **Flip U / Flip V** | Mirror it horizontally / vertically. |
| **Fit** | Scale the selection to fill the 0–1 square, keeping its aspect. |

## Unwrapping

**Unwrap ▾** generates a fresh mapping for the mesh. Four projections ship with the app:

| Backend | Good for |
|---|---|
| **Box projection** | General shapes — projects from all six directions and packs the pieces. |
| **Planar projection** | Flat things: a wall, a sign, a ground plane. |
| **Cylindrical** | Tubes, columns, bottles, tree trunks. |
| **Spherical** | Balls, domes, planets. |

The result is packed into the square with a small margin, and never stretched unevenly — a non-uniform fit would shear the texture.

!!! tip "Unwrap just one part"
    If you have faces selected in Edit Mesh, unwrap rewrites **only those faces** and leaves the rest of the map alone. That is how you re-do one panel of a model without disturbing everything else.

Unwrap is a registry, not a fixed list: a [module](https://docs.theprototype.app/modules.md) can add a heavier automatic unwrapper — or replace a built-in — and it appears in this menu like the rest. See [Module SDK](https://docs.theprototype.app/module-sdk.md#registerunwrapbackend).

### Smart unwrap (xatlas)

Since 1.28 the [Smart unwrap (xatlas)](https://docs.theprototype.app/modules.md#smart-unwrap-xatlas) module adds **Smart (xatlas)** to the Unwrap
menu. Instead of projecting from a direction, it places the seams itself, flattens each piece and packs them all into
the 0–1 square with no overlaps.

1. Install it from **Menu ▸ Modules ▸ Browse ▸ Smart unwrap (xatlas)**. The Unwrap menu picks it up the next time you
   open it — no need to reopen the editor.
2. Select a mesh, open the UV editor and pick **Unwrap ▸ Smart (xatlas)**.

![The UV editor after Unwrap ▸ Smart (xatlas) on a sphere: the sphere's surface cut into islands along seams the module chose, packed into the 0 to 1 square with no overlaps. 1: the Unwrap menu.](https://docs.theprototype.app/img/uv-editor/smart-unwrap.webp)
*Figure: A sphere unwrapped with Smart (xatlas).*

1. **Unwrap ▸ Smart (xatlas)**, added by the module.

Like the built-in projections, it unwraps only the faces you picked in Edit Mesh if you picked any. It is one undo step,
and your peers get the new mapping.

!!! note "Limits"
    - It takes about 0.1 s for a few hundred triangles and about 1–1.5 s for 10,000; the app waits while it works.
    - Pieces are never rotated: xatlas turns a piece by mirroring it, and painted text would then read backwards.

## Painting

Pick the **Paint** tool and draw — on the UV map or straight on the model in the viewport (since 1.75; a ring on the surface shows the brush). Set the brush **colour** and **size** in the panel.

*New in 1.75:* the brush paints more than colour. Its **Channel** picks **Colour**, **Rough** (roughness), **Metal**
(metalness) or **Glow** (emission), each in its own map, and the panel adds hardness, flow, an eraser, **Mirror X**,
image stamps and painting in a headset. See [Paint on meshes](https://docs.theprototype.app/mesh-paint.md).

- Strokes appear live for your peers while you draw.
- Each stroke is **one undo step**.
- The finished image is stored with the material, so it saves and loads like any other texture.

If the slot has no texture yet, painting creates one.

Painting over a texture ends its link to the library image it was made from, so a later save in the
[Image editor](https://docs.theprototype.app/image-editor.md#textures-and-their-images) will not paint over your strokes.

### Pen pressure

Paint with a **pen** and pressure shapes the stroke. The **Pen pressure** switch in the Brush panel picks what pressing
harder does:

- **Size** (the default) — a light touch paints thin, a firm one paints the full brush size.
- **Opacity** — the width stays put and a light touch **tints** instead of painting the full colour.
- **Size + opacity** (*new in 1.79*) — both.
- **Off** — the pen paints like a mouse.

![The Paint tool's Brush panel: Pen pressure with Size, Opacity, Size + opacity and Off, the Pen only draws switch and the Channel row.](https://docs.theprototype.app/img/uv-editor/brush-panel-dark.webp#only-dark)
![The Paint tool's Brush panel in the light theme: Pen pressure with Size, Opacity, Size + opacity and Off, the Pen only draws switch and the Channel row.](https://docs.theprototype.app/img/uv-editor/brush-panel-light.webp#only-light)
*Figure: The Brush panel: Pen pressure and Pen only draws.*
*Since 1.79* a stroke never gets stronger than the pressure you used, however often it crosses itself; going over a
spot again in a **new** stroke builds it up, the way layers do.

![Four red pen strokes on a white texture in the UV editor: light strokes that tint rather than paint the full red, a stroke that tapers with pressure and a full-strength line.](https://docs.theprototype.app/img/uv-editor/pressure-opacity.webp)
*Figure: With Opacity a light touch tints instead of painting the full colour.*
A mouse stroke is unchanged whichever you pick, and peers watching a live pen stroke see the same widths you do. Fast
strokes are sampled between frames, so a quick curve comes out smooth rather than as a string of dots.

### Spacing and smoothing

*New in 1.79*, in the Brush panel beside Hardness, Opacity, Flow and the Eraser:

- **Spacing** — the gap between dabs, as a share of the brush width: low is a smooth line, high a dotted one.
- **Smoothing** — a stroke stabiliser: the brush trails the pen on a string and only moves when you pull it, so a
  shaky hand draws a calm line. 0 is off.

Both apply when you [paint on the model](https://docs.theprototype.app/mesh-paint.md) in the viewport too. The VR brush does not use smoothing.

### Touch

*New in 1.79:*

- One finger uses the active tool. **Two fingers** pinch to zoom (toward the point between them) and move together to
  pan. A second finger landing never leaves a dot: the stroke the first finger started is dropped.
- **Pen only draws** (on by default): once a pen has touched the screen, fingers stop painting — one finger pans, two
  pinch-zoom — so your other hand can rest on the screen. A palm under the pen is ignored. Turn it off in the Brush
  panel or in **Settings ▸ Controls ▸ Pen and touch** to paint with a finger too.
- The mouse wheel zooms toward the pointer here and in the [image preview](https://docs.theprototype.app/explorer.md); the preview also pinch-zooms
  about your fingers. On a tablet, fingers on an image in the preview zoom and pan the **image** (they used to move the
  window); move the preview window by its title bar.

Custom brush tips, pressure curves and symmetry painting are not in this release.

## Material slots

One mesh can carry several materials. The **Materials** list in the sidebar shows the slots; the canvas shows the slot you have selected.

*Since 1.79* it is the same slot list as **Inspector ▸ Material** (see
[Material slots](https://docs.theprototype.app/materials.md#material-slots)): rename, switch material, select or assign its faces, make unique,
duplicate, reorder, switch off or remove a slot from its **⋯** menu, with 44 px rows on a touch screen (long-press a
row for its menu). The image and assign buttons stay on each row.

| Action | How |
|---|---|
| **Add a slot** | **Add material slot** — copies the last one, so you start from something sane. |
| **Give it an image** | Drop an image on the slot, use its image button, or its **folder button** to pick one from the [Explorer](https://docs.theprototype.app/explorer.md) (*since 1.79*). |
| **Assign faces to it** | Select faces in [Edit Mesh](https://docs.theprototype.app/mesh-editing.md), then press that slot's **◎** button. |
| **Remove an image** | The slot's ✕ button. |

**Drop an Explorer image on the canvas** (*since 1.79*) and it becomes the colour map of the slot you are working on, so
you can paint over it. If the slot shows pixels that are in no Explorer file (painted here, or picked from disk), you
are asked first; Undo brings the old image back.

![Replace the painted image? asked over the UV editor after an Explorer image was dropped on the canvas: Replace or Cancel.](https://docs.theprototype.app/img/uv-editor/replace-painted-ask.webp)
*Figure: Dropping an Explorer image on a slot that holds painted pixels asks first.*
Slots replicate, save and undo like everything else, and a mesh you made with **Convert to mesh** arrives with one slot per original material already set up.

!!! note
    Switching a multi-slot mesh to a different material *type* is refused rather than silently collapsing it to one material — split it first if that's what you want.

## The texture panel

Under **Texture** the sidebar reports the selected slot's real size and roughly what it costs on the GPU, with one-click resizes:

- **Half** — halve the longest side.
- **512 / 1024 / 2048** — resize the longest side to that.

Resizing keeps the aspect ratio, is shared with peers, and is one undo step. It is the quickest fix for a scene that has become heavy because a few 4K textures came in with imported models.

### UV test grid

**UV test grid** replaces every material in the scene with a checkerboard so you can see stretching and seams at a glance: even squares mean an even mapping.

!!! warning "Local only, on purpose"
    The grid is yours alone — it is never sent to peers and never saved. (It replaces materials scene-wide while it is on, which is why it can't be: baking it into an autosave would overwrite someone's real textures.)

## Imported models

Textures that arrive with a `.glb`/`.gltf` keep their sampler settings — tiling, orientation, filtering — when you paint over them, so a repeating texture goes on repeating and nothing flips. Imported models usually arrive already unwrapped; you'd unwrap one only to redo its mapping deliberately.

## See also

- [Mesh Editing](https://docs.theprototype.app/mesh-editing.md) — selecting the faces the UV tools scope to.
- [Paint on meshes](https://docs.theprototype.app/mesh-paint.md) — every brush setting, the roughness, metalness and glow channels, and painting in a headset.
- [Explorer](https://docs.theprototype.app/explorer.md) — where your image assets live.
- [Saving & Sessions](https://docs.theprototype.app/saving.md) — how textures travel inside a `.tpscene`.
