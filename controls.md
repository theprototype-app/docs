# Controls

How to move the camera, select and transform objects, and find every keyboard shortcut — on desktop and in VR.

## Viewport navigation

![The editor with three objects on the floor grid. 1: the selected crate with the Move gizmo on it. 2: the transform tools on the bottom bar — Move, Rotate, Scale and Pivot. 3: the floor grid.](https://docs.theprototype.app/img/controls/viewport-overview.webp)
*Figure: The 3D view with one object selected.*

1. The **selected** object, with the transform gizmo on it.
2. The **gizmo tools** on the bottom bar: Move, Rotate, Scale and the multi-selection Pivot.
3. The **floor grid**, which fades out with distance.

[Try it](https://theprototype.app/)

- **Orbit** — drag with the left mouse button (right-drag also orbits; a quick right-click *tap* opens the context menu instead).
- **Zoom** — mouse wheel. A two-finger swipe on a trackpad pans instead; see [The mouse wheel](#the-mouse-wheel) if yours does the wrong thing.
- **Fly** — hold <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> to pan on the camera's horizontal plane, <kbd>Q</kbd>/<kbd>E</kbd> to fly down/up, hold <kbd>Shift</kbd> for 3× speed. These keys fly only while the 3D view has the keyboard — if a panel has it, click the 3D view first (see [Keys follow the panel you are in](#keys-follow-the-panel-you-are-in)).
- **Focus** — <kbd>F</kbd> frames the selected object.
- **Camera bookmarks** — save the current view from the right-click menu (**Camera bookmarks ▸ Save current view**), recall with <kbd>Shift</kbd>+<kbd>1</kbd>…<kbd>5</kbd>.

[Loop: A short loop: dragging on the 3D view orbits the camera around the scene, the mouse wheel zooms in, and pressing F with the ball selected frames it.](https://docs.theprototype.app/img/controls/orbit-zoom-focus.mp4)

*Figure: Loop, 5 s: drag to orbit, scroll to zoom, click an object and press F to frame it.*

### The mouse wheel

A scroll over the viewport is classified by **what the device is**, not by how big one tick was: a mouse wheel zooms, a two-finger swipe pans, and a pinch zooms. High-resolution wheels — a Steam Deck trackpad in wheel mode, a hi-res mouse on Linux — send tiny ticks that used to be mistaken for a swipe; they zoom now.

If the guess is still wrong on your hardware, pick it yourself: right-click the viewport ▸ **View ▸ Mouse wheel** and choose **Zoom (mouse wheel)**, **Pan (trackpad swipe)** or **Auto-detect**. The same switch is **Settings ▸ Controls ▸ Trackpad gestures**, next to the two-finger pan, pinch zoom and reverse-pan toggles. The first time a scroll pans, a one-time toast points you at that menu.

**Settings ▸ Controls ▸ Wheel diagnostics** shows the last eight wheel events over the viewport — the delta on each axis, the browser's wheel value, and how each one was classified and why. It is there for the odd machine: if a wheel refuses to zoom, copy those rows into a bug report.

## Selection

- **Click** an object to select it — the transform gizmo attaches.
- **Double-click** it to open its properties (right-click ▸ *Properties* and the object list do the same). Pin the properties panel if you'd rather it followed every selection.
- **New objects do not open the properties.** Adding a primitive, placing a pack item or prefab, or pasting selects the new object but leaves the properties panel closed; if the panel is already open, it switches to the new object.
- **Click empty space** to deselect.
- **Shift+click** adds or removes objects from a multi-selection (the last-picked object is the primary).
- **Shift+drag** on empty space draws a box-select marquee.
- **Alt+click** cycles through everything under the cursor, front to back — see [Inside and behind water](#inside-and-behind-water).
- **Ctrl+A** selects everything in the scene. Inside a mesh editing session it keeps its other meaning — select every face, edge or vertex — so the two never collide.
- **Ctrl+D** duplicates the selection — see [Duplicating](#duplicating) for what a copy brings with it.
- Selecting an object **locks it for other peers** (one lock per person); a locked object shows who holds it, and its right-click menu offers **Request control** to ask for a handover.

### Edit and Interact

The editor has two click modes. Switch with the **Interact mode** cell on the bottom bar (it sits
between the transform tools and Play — the default order is Move, Rotate, Scale, Pivot, Interact, Play,
Object list, Node editor, Explorer, Animation), or press **I**:

- **Edit** (the default) — every click selects, so every object, module pieces included, can
  be picked and moved.
- **Interact** — clicks and drags work the way they do in play, without starting the game:
  piano keys play, buttons press, On Click nodes fire, and a press on a crate
  [carries it](https://docs.theprototype.app/physics.md#carrying-things-in-interact) while a simulation runs. Nothing gets selected.

**Interact keeps your selection for later.** Turning Interact on clears the selection — no outline, no gizmo: you are
playing, not editing — and turning it off brings back what was selected, minus anything deleted meanwhile. If you
picked something else while in Interact (from the Objects list, say), that newer choice is kept instead. On a phone the
[selection toolbar](https://docs.theprototype.app/interface.md#the-selection-toolbar) stays up while Interact is on, so you can turn it off again.

**Play** is the third mode, entered with the play button as before.

In **Edit inside a running game**, every object can be moved: a body you drop stays where you put
it (it is parked out of the simulation) until you leave Edit.

**FPS and draw calls** — *Settings ▸ Interface ▸ Viewport* shows a small counter in any mode:
frames per second, frame time, draw calls and triangles. Draw calls turn amber above 120 and red
above 150, the budget of a Quest headset; in VR the same counter is a strip in front of you.

### Clicking through glass

A see-through wall no longer steals the click from what is behind it: shells that are nearly
transparent, or marked **Click-through in the viewport** (Properties ▸ Object), are skipped. To
reach something that is still covered, **click the same spot again** (a moment after the first
click, so it is not a double-click) — each repeat selects the next object down under the cursor,
and wraps round.

### Inside and behind water

Since 1.25 a click selects what is **inside or behind** a water volume — the fish in the Aquarium, the duck in the Fluid
tank toy, the stones on the seabed. With nothing behind it (the open ocean, the very edge of a surface) the click takes
the water itself.

- **<kbd>Alt</kbd>+click cycles** through everything under the cursor, front to back: the first <kbd>Alt</kbd>+click
  takes the frontmost (often the water), the next one on the same spot the object behind it, and so on, wrapping round.
  A small chip by the cursor says **"2 of 4 · Fish orange"**; screen readers hear *"Selected 2 of 4: Fish orange"*.
- **Hold <kbd>Alt</kbd>** to preview: a box marks what an <kbd>Alt</kbd>+click would select, with the same chip. Let go
  of <kbd>Alt</kbd> and the preview disappears.
- The object list always reaches every object, whatever is in front of it.

![Alt+click in the Aquarium: the chip by the cursor says 2 of 3 · Fish orange](https://docs.theprototype.app/img/controls/alt-click-cycle.webp)
*Figure: Alt+click steps through what is under the cursor; the chip says which one you have.*
**Configure Scene ▸ Advanced ▸ Selection passes through** chooses what clicks go through:

| Option | Default | What it does |
|---|---|---|
| **Water** | on | water volumes and particle-fluid tanks let clicks through |
| **Transparent surfaces** | off | any see-through material (glass, a 0.5-opacity panel) lets clicks through |
| **Triggers** | off | trigger volumes (physics sensors, the *Water/trigger* collision group) let clicks through |

It is saved with the scene and shared with everyone in it. Surfaces below 25 % opacity and objects marked
**Click-through in the viewport** always let clicks through, as before.

**In games**, clicking, carrying and the VR laser skip water and trigger volumes: the laser ends on the fish, not on the
water in front of it, and a press reaches what it ends on. A lone trigger with nothing behind it can still be clicked. A
game that wants its rays to stop at water or triggers sets `play.rayHits: {water: true, triggers: true}` in its scene's
play block.

!!! note "Ping moved"
    Since 1.25 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+click pings a spot for everyone (it used to be <kbd>Alt</kbd>+click).
    **Ping here** in the right-click menus is unchanged.

The <kbd>Alt</kbd> preview and the chip are desktop-only; in VR the laser itself shows the target. The cycle order is by
distance along the ray, and objects nested inside a group are picked as the group.

### Module content in the object list

Things a module builds outside the scene (the Untangle board, a piano, a generated dungeon) are
listed in the object list's **Module content** section. Click a row to frame it; its menu hides
it on your screen or opens the module's toolbox. The rows are read-only — the module rebuilds
that content itself.

### The object list from the keyboard

Click anywhere in the object list (<kbd>O</kbd> opens it) to give it focus, and the tree walks from the keyboard:

| Keys | Does |
|---|---|
| <kbd>↑</kbd> / <kbd>↓</kbd> | Move through the visible rows, selecting as you go |
| <kbd>Shift</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd> | Extend the selection |
| <kbd>→</kbd> | Expand a group — or step into its first child if it is already open |
| <kbd>←</kbd> | Collapse a group — or jump to the parent if it is already closed |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last row |
| <kbd>Enter</kbd> | Open the object's Properties |
| <kbd>F2</kbd> | Rename inline (<kbd>Enter</kbd> commits, <kbd>Esc</kbd> cancels) |
| type a name | Jump to the first object starting with those letters; one letter pressed again cycles |
| <kbd>Delete</kbd> / <kbd>Backspace</kbd> | Delete the selection |
| <kbd>F</kbd> | Frame the selection in the 3D view |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> / <kbd>Ctrl</kbd>+<kbd>A</kbd> | Duplicate the selection / select all |
| <kbd>Esc</kbd> | Hand the keyboard back to the viewport |

The list never flies the camera: <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> and <kbd>Q</kbd>/<kbd>E</kbd> do
nothing while it has the keys.

<kbd>↓</kbd> in the list's **Search objects…** box drops you into the results. Type-ahead matches what you typed first, so a Cyrillic name is reachable by its own letters, and falls back to the physical key so a Latin name is still reachable on a non-Latin layout.

### Dragging a selection in the object list

Drag any **selected** row in the object list and the whole selection comes along:

- drop it on a **group** and they move into it;
- drop it on **any other object** and they become its children;
- drop it on the list's empty area or its header and they go back to the top level.

World positions are kept and a drop is one undo step. An object cannot be dropped into its own child. Local-only objects
(ones not shared with the session) dropped onto a shared parent become shared, as before.

Local objects also stay out of files: a downloaded scene, a whole-scene export, a published or submitted scene and a
game export leave them out and say how many ("1 local object was not included"). Share them first to include them.

### What double-click does

Opening properties is the default, but it is a setting: **Settings ▸ Scene ▸ Selection ▸ Double-click action** offers *Open properties*, *Edit mesh*, *Focus and isolate* and *Select same type*.

**Isolate** hides everything else rather than fading it — fading would mean writing to materials that other people are sharing.

### Very small objects

An object scaled — or animated — down to almost nothing has no surface left to click. It gets a small dot drawn at its origin so there is something to aim at, and a click near that dot selects it.

!!! note
    At *exactly* zero scale the viewport click does not reach it yet; select it from the object list instead. That one is a known gap.

### Selecting without a keyboard

On a phone or tablet there is no <kbd>Shift</kbd> to hold and no right-click, so the same
two gestures are available as a **mode**. *Settings ▸ Interface ▸ Touch tools* puts round
**Undo**, **Redo** and **Multi-select** buttons beside the logo — on by default on phones
and narrow windows, off by default with a mouse. With a mouse, [Edit positions](#edit-positions) arranges that row too,
and its menu's **Show cluster** turns it on.

With **Multi-select** on:

- a **tap adds** to the selection instead of replacing it, and
- a **drag on empty space** draws the box-select marquee.

It works the same inside a mesh editing session, on vertices, edges and faces. Everything
else already has a touch path: long-press the viewport for the right-click menu, and the
**+** button opens the same create menu. On a phone the same toggle is **Select multiple** on the
[selection toolbar](https://docs.theprototype.app/interface.md#the-selection-toolbar).

### Tapping to select on a touch screen

- Tap an object to select it; **tap it again to deselect it**.
- With **Select multiple** on, each tap toggles that object in or out of the selection.
- A double-tap still does your [double-click action](#what-double-click-does) (by default: open its properties).
- To reach an object hidden behind another, use the Objects list. (A mouse can still click the same spot again, or
  <kbd>Alt</kbd>+click, to select what is behind.)

### Duplicating

**Ctrl+D** (or right-click ▸ *Duplicate*) makes a working copy of what is selected — right after you create something,
that is the new object. With nothing selected, Ctrl+D says so and creates nothing. A copy is a copy of
everything that belongs to the object, not just its shape:

| Comes along | |
|---|---|
| geometry, transform, children | always |
| material and its texture slots | its own detached copy — unless you ask them to be [shared](#sharing-one-material) |
| physics, origin, camera settings | always |
| **animation clips** | yes — the copy plays its own |
| **object flow graph** | yes, with fresh node ids |
| **shader graph** | yes — otherwise the copy would render frozen |

An embedded **Object Flow** node inside a copied graph keeps pointing at the object it
referenced. Re-aiming it at the copy is a decision only you can make, so it is left alone.

Each of the last three can be switched off in *Settings ▸ Scene ▸ Duplicate* if you would
rather a copy came out bare. An object that inherits the **scene default** shader keeps
inheriting it — it does not get a private snapshot.

### Sharing one material

*Settings ▸ Scene ▸ Duplicate ▸ **Share materials*** changes what a copy gets. Off — the
default — a duplicate gets its own copy of the material, so editing one leaves the other
alone. On, the copy and the original are **one material**: an edit to either changes both,
for everyone in the session. Geometry is always copied either way.

It is your setting, not the scene's: two people in one session can reasonably disagree
about how *they* duplicate. What it produces — the link itself — is scene data, and
replicates like anything else.

An object whose material is shared says so in its **Material** section: *This material is
shared with N other objects — editing it here changes them too, for everyone.* **Unlink**
beside it gives that one object its own copy back and leaves the rest sharing.

The link survives everything a copy normally survives: saving and reloading the scene,
undo, a peer duplicating the object again, and a late joiner arriving afterwards. The one
thing that cannot share is an object with **more than one material slot** — it is left
copying, rather than half-linked.

### Editing a multi-selection

Select several objects (<kbd>Shift</kbd>+click, box select, <kbd>Ctrl</kbd>+<kbd>A</kbd>) and open **Properties**: the
panel says **Editing N objects**, and every row applies to all of them.

![Properties with three objects selected: the Editing 3 objects notice, the Transform section with Move origin and the Pivot row, then the Arrange section with its align and distribute buttons.](https://docs.theprototype.app/img/controls/multi-edit.webp)
*Figure: Properties with three objects selected: every value below applies to all of them.*
- **Shared values show; differing values show a dash.** A slider, number or list whose objects disagree reads **—**, a
  checkbox shows the in-between state, and a material or emission colour says *(mixed)* under the picker.
- **Setting a dashed row sets every object** to the new value — type into a dashed Roughness, tick an in-between
  **Cast shadow**, pick any entry in a dashed list.
- **One edit is one undo step** for the whole selection, and <kbd>Ctrl</kbd>+<kbd>Z</kbd> puts each object back to
  *its own* previous value. Since 1.26 **Visible**, **Cast / Receive shadow**, **Render order**, **Frustum culled** and
  every **Light** row (colour, intensity, distance, decay, angle, penumbra, shadow bias / softness / map size) undo too.
- **Several lights** selected together are edited together; a row only some light types have (a spot light's
  **Angle**) reaches the lights that have it.
- Your peers see the change **in one step**: the whole selection's edit travels as one message.

Name, uuid, LOD, Water and particle emitters stay single-object, and **Geometry** reaches only the objects of one shape
type (the panel says which) — click the one object for those. Transform rows on a multi-selection move, turn and scale
the **set** about its [pivot](#the-pivot-of-a-multi-selection) rather than each object's own numbers: typing a value
moves the set as a whole instead of collapsing it onto one plane.

## Transform gizmo

| Key | Mode |
|---|---|
| <kbd>1</kbd> | Move (translate) |
| <kbd>2</kbd> | Rotate |
| <kbd>3</kbd> | Scale |

![The same crate three times: with the Move gizmo (three arrows), the Rotate gizmo (three rings) and the Scale gizmo (three handles with cubes on their ends).](https://docs.theprototype.app/img/controls/gizmo-modes.webp)
*Figure: <kbd>1</kbd> Move, <kbd>2</kbd> Rotate, <kbd>3</kbd> Scale — the same buttons are on the bottom bar.*
Snapping is configured from the right-click menu under **Snapping** — grid steps and snap-to-surface, plus snapping onto real geometry: vertices, edges, faces and other objects, optionally turning the object onto the surface it lands on. See [Snapping](https://docs.theprototype.app/snapping.md).

### Hiding the gizmo, and getting the selection back

Pressing the key of the mode that is **already active** hides the gizmo and the selection, so you can look at the object with nothing in the way. Pressing **any** mode key brings the same selection back in that mode — a multi-selection comes back whole, with the origin you placed by hand, and inside [Edit Mesh](https://docs.theprototype.app/mesh-editing.md) the face, edge or vertex you had picked comes back too. The gizmo button under **Gizmo & pivot** in the Edit Mesh toolbox does the same thing as the key, and <kbd>G</kbd> counts as a mode key, so it recalls as well.

An object that was deleted, or that a peer locked in the meantime, is left out and a toast says how many were skipped.

!!! note "Inside mesh edit"
    <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd> keep meaning Move / Rotate / Scale inside an [Edit Mesh](https://docs.theprototype.app/mesh-editing.md) session — they are what you reach for mid-edit. The element modes (vertices, edges, faces) are on <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd>.

### Each object's origin

Every object carries its own **origin** — the point it rotates, scales and hinges around. The properties panel's Transform section has one-click presets — **Bottom**, **Centre**, **Median**, **World 0**, and **Children** for a group — or you can place it by hand:

- **Move origin** switches the gizmo to the pivot: drag it (or type coordinates) and the mesh stays put. Grid and surface snapping still apply. Press **Done** when it's where you want it.
- **Pick from mesh…** opens [Edit Mesh](https://docs.theprototype.app/mesh-editing.md) so you can put the origin on real geometry: click a vertex — or Ctrl+click both ends of an edge to hinge on it — then press **Set origin here**.
- **Bottom** puts the pivot on the footprint, so the object sits on the ground.
- Flow **Spin** and **Orbit**, and physics joints, all turn about the origin you set — that is how you hinge a door.

The origin travels with the object: it replicates, saves, undoes, and is baked in on GLTF export.

**Typing a rotation honours it.** Once an object has an origin, a rotation or scale typed into the Transform rows turns it about that origin — the same thing a gizmo drag does — instead of about its own local zero. That matters most for a **group**: a group made by dragging objects together, or with `/group`, sits at world zero, so its origin is one right-click away — **Origin ▸ Centre of children**, **World zero** or **Reset origin** on the group's right-click menu. Lights have an origin too: give a sun one and Rotate swings it around that point (see [Lights](https://docs.theprototype.app/camera.md#lights)).

### The pivot of a multi-selection

With several objects selected, what the set rotates and scales about is a choice — one setting, in three places:

- the **Pivot** button on the [toolbar](#the-toolbar), next to Scale: its icon and tooltip name the current mode, and a
  click steps to the next one;
- the **Pivot** dropdown in the properties panel's Transform section, or right-click ▸ **Pivot point**;
- in VR, **Settings ▸ Editing ▸ Pivot point** (see [Grabbing a selection](https://docs.theprototype.app/vr.md#grabbing-a-selection)).

![Three objects selected together in Rotate mode. 1: one gizmo turns the whole set about the median point of the selection. 2: the Pivot button on the bottom bar, which steps through the pivot modes.](https://docs.theprototype.app/img/controls/multi-pivot.webp)
*Figure: Rotate turns the whole selection about one pivot; the Pivot button picks which.*

1. One gizmo for the whole selection, at its **median point** (the default mode).
2. The **Pivot** button: each click steps to the next pivot mode.

| Mode | Turns about |
|---|---|
| **Median point** | the centre of the selection (the default) |
| **Active object** | the origin of the object you picked last — in VR, the one you grip |
| **Individual origins** | each object's own origin, so a row of doors all swing on their own hinges |
| **Parent origin** | the origin of the parent they all share — offered only when they share one |

The gizmo drag, the typed rows and a VR grip all obey it. Moving is never per-object: a translation moves the set as
one. An origin you placed by hand with **Move origin** overrides the mode until you select again.

### Numeric fields

Every number in the app is the same control: **drag** it to scrub, or **type** into it for live updates. <kbd>↑</kbd>/<kbd>↓</kbd> step by one unit — hold <kbd>Ctrl</kbd> for ×10, <kbd>Shift</kbd> for ×100 — and <kbd>Esc</kbd> reverts what you typed.

That includes the numbers inside **node editor cards**, **shader nodes** and the
**animation window** — dragging one of those scrubs the value without dragging the card.
Scrubbing an animation key or a shader parameter is **one undo step**, not one per pixel.

Since 1.25 that holds for **every slider and number field inside a node** — every node type, and the knobs in a
behaviour's [Open view](https://docs.theprototype.app/behaviours.md#the-live-node-view): a drag changes the value, never the node and never the whole
graph, and the behaviour view no longer flickers the cursor.

![A behaviour's Open view in the node editor: the params' knobs on the left drag their value, not the graph](https://docs.theprototype.app/img/controls/behaviour-view-knobs.webp)
*Figure: In a behaviour's Open view, a param's knob drags its value, not the graph.*
Fields that hold a distance or an angle also accept a typed **unit** (`12cm`, `4in`,
`90deg`) — see [Units](https://docs.theprototype.app/units.md).

#### Number fields and undo

Since 1.27 every number field you can drag — the Inspector's **Position** / **Rotation** / **Scale** and its other
values, shader-node vectors, and the [Animation window](https://docs.theprototype.app/animation.md)'s length, speed, fps, step and key fields — works
the same way with undo:

- **One drag is one undo step.** However far you scrub, one <kbd>Ctrl</kbd>+<kbd>Z</kbd> puts the value back where the
  drag started. (Before, a shader vector took two, and the Animation window's length, fps and step took one per pixel
  moved.)
- **One typed edit is one undo step.** Click a field, type a value (it applies as you type) and press <kbd>Enter</kbd>:
  that is one step, even if you paused between keys.
- **<kbd>Esc</kbd> cancels typing.** It puts back the value the field had before you started, as it already did for
  arrow-key steps, and leaves nothing on the undo stack.
- **Undo shows at once.** After <kbd>Ctrl</kbd>+<kbd>Z</kbd> the Position / Rotation / Scale rows show the restored
  numbers straight away — before, they kept the old number until you clicked something, and dragging from it made the
  object jump.
- The Animation window's playback **Speed** is undoable now too.
- **Selecting a shader node is not an edit.** Clicking a node in the [Shader editor](https://docs.theprototype.app/shader-graph.md) selects it on your
  screen only: it adds no undo step and is not sent to the other people in the session.

### Copy, paste and reset values

Since 1.34 every value in the **Properties** panel and in **Configure Scene** can be copied, pasted and reset — one
number, a whole vector (Position / Rotation / Scale), a colour, a choice, an on/off switch, or a whole section (all of
Transform, all of Material…). What you copy is plain text, so you can paste it into a notepad or a code editor, edit it
there, and paste it back.

**Where:**

- **Right-click a value** (desktop) or **press and hold it** (phone or tablet): **Copy**, **Paste**, **Reset to
  default**.
- **Right-click a vector's name** (*Position*): **Copy vector**, **Paste vector**, **Reset**, and **Paste X / Y / Z
  only**. Right-click one of its X / Y / Z boxes for that single number.
- **Right-click a section header** (*TRANSFORM*): **Copy section**, **Copy as JSON** (indented, for a code editor),
  **Paste section**, **Reset section**. With several objects selected: **Paste to all selected (N)**.
- **Keyboard** (as in Blender): point at a field or a section header and press <kbd>Ctrl</kbd>+<kbd>C</kbd> /
  <kbd>Ctrl</kbd>+<kbd>V</kbd> (<kbd>⌘</kbd><kbd>C</kbd> / <kbd>⌘</kbd><kbd>V</kbd> on a Mac). While you are typing in a
  box, <kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>Ctrl</kbd>+<kbd>V</kbd> copy text as usual.

![Properties of a Box with Position right-clicked: Copy vector (Ctrl+C), Paste vector (Ctrl+V), Reset, and under One axis Paste X only, Paste Y only, Paste Z only](https://docs.theprototype.app/img/controls/copy-paste-vector-menu.webp)
*Figure: A vector row's right-click menu: copy, paste, reset, or paste one axis.*
![The TRANSFORM section header right-clicked: Copy section, Copy as JSON, Paste section and Reset section](https://docs.theprototype.app/img/controls/copy-paste-section-menu.webp)
*Figure: A section header's right-click menu.*
**What the clipboard holds:**

| Copied | Text |
|---|---|
| one value | `1.25` |
| a vector | `position: 1.25, 0, -3` |
| a colour | `#ff8800` |
| a choice | `Median point` (the label you see) |
| a section | `{"transform":{"position":[1.25,0,-3],"rotation":[0,90,0],"scale":[1,1,1]}}` |

Numbers are in the units the panel shows ([Settings ▸ Units](https://docs.theprototype.app/units.md)) — metres, centimetres… — and rotations in
degrees.

**What you can paste:** a number; `1, 2, 3`; `1 2 3`; `Vector3(1, 2, 3)`; `new THREE.Vector3(1, 2, 3)`; `[1, 2, 3]`;
`(1, 2, 3)`; `position: 1, 2, 3`; `{"x": 1, "y": 2, "z": 3}`; `{ x: 1, y: 2, z: 3 }`; the JSON blocks above; several
`name: value` lines (a section); a unit suffix (`12cm, 0, 4in`, `90deg`); colours as `#f80`, `#ff8800`, `0xff8800`,
`rgb(255, 128, 0)` or `[1, 0.5, 0]`; `true` / `off`.

- A vector pastes into any vector: copy a Position and paste it as a Scale.
- A section paste applies only the keys that section has.
- If the clipboard holds the wrong kind of thing, the paste is refused with a short reason (*Expected x, y, z — the
  clipboard holds one number*) and nothing changes.
- **Every paste is one undo step** — one value, a vector, a section or a paste to all selected; one
  <kbd>Ctrl</kbd>+<kbd>Z</kbd> puts it back.

*Reset to default* is greyed out where a row has no known default. The first **Paste** from a menu may ask the browser
for clipboard permission; <kbd>Ctrl</kbd>+<kbd>V</kbd> over a field never asks. Text boxes (names, banner text) keep the
browser's own text menu.

### Text selection

Dragging across a menu, a toolbar or a panel does not paint a text selection, and a drag that starts in the 3D view or
the node editor never selects text. Text fields, code, chat, logs and help text stay selectable as usual.
**Settings ▸ Interface ▸ Allow text selection everywhere** turns selection back on in all the interface (this device
only).

### The menu on a phone

The logo menu fits a short screen — a landscape phone, or a docked Connect bar — and scrolls with a finger, with no
visible scrollbar. On a folding phone it stays right through folding and unfolding with the page open.

### Floating windows

The toolboxes, the Explorer, the flow and animation windows and the panels all behave the same way: drag the header (or, since 1.35, any empty part of the window) to move, drag the bottom-right corner to resize. A window can never be sized past the edge of the screen — the resize corner always stays reachable — and **double-clicking** the corner resets it to its default size while leaving it where you parked it. Size and position are remembered per window.

A window also **keeps its header**: it cannot be dragged so far down that the header hides under the Controls pill, the bottom band on a touch or narrow screen, the dock, or a browser overlay — there is always something left to grab. A tall toolbox parked near the bottom scrolls its body instead of losing its head.

A **right-click while you drag a window** — by its title bar, a resize corner or a tab — no longer pops up the browser's
menu; a normal right-click elsewhere behaves as before. Tabs that sit in a window's title bar, like the undocked
[Code](https://docs.theprototype.app/code-workspace.md) window's, can be clicked, while the title bar around them still drags the window.

**Move a window by any empty part of it** (since 1.35): press and drag anywhere on a floating window that is not a
control — the filter row's padding, the empty space under a list, the space around a table — and the window moves,
with a mouse or a finger. A plain click or tap still does what it always did: buttons press, filters toggle, rows
select. Lists that scroll, text fields, sliders, graphs and 3D views keep their own drag. A window that is a tab of a
group moves by its tab strip, as before.

**Dock it by dragging.** Drag a floating window (by its header or its body) onto the dock's tab strip to make it a dock
tab at that spot, onto the bottom edge to add it at the end, or to the left or right edge (or over an open sidebar) to
make it a sidebar tab. A highlight shows where it will land before you let go. This works on a touch screen too — on an
unfolded phone or a tablet the same targets are there.

#### Moving a floating window

A floating window dragged by its header over a sidebar, the dock's tab strip, the bottom edge or another window's header
**docks there by default** — the target lights up and says what will happen (*Add as tab*, *Move to dock*, a marker
between dock tabs, a highlighted header). Under the target a second line reads **Hold Ctrl to place without docking**
(<kbd>Cmd</kbd> on a Mac).

**Hold <kbd>Ctrl</kbd> (<kbd>Cmd</kbd>) while you drag** to place the window *floating* exactly where you drop it, even
on top of a sidebar or the dock: every dock target stands down, and a small label beside the pointer reads *Placing
without docking — release Ctrl to dock*. You can press or release the key at any moment during the drag; the target
follows the key at once. It works for a single window, a window group dragged by its tab strip, and a tab torn out of
a group.

![The floating Objects window dragged over the right sidebar: it turns see-through, the sidebar column is outlined and the target reads Add as tab, with Hold Ctrl to place without docking underneath](https://docs.theprototype.app/img/controls/window-over-sidebar-hint.webp)
*Figure: A floating window dragged over a sidebar: drop to add it as a tab, or hold Ctrl.*
![The same drag with Ctrl held: the outline and the target are gone, the Objects window lies over the sidebar as it will be dropped, and a label beside the pointer reads Placing without docking — release Ctrl to dock](https://docs.theprototype.app/img/controls/window-place-without-docking.webp)
*Figure: The same drag with Ctrl held: the window will land over the sidebar, not in it.*
On a touch screen there is no key to hold: drop the window anywhere it is not over a target, or press and hold a docked
window's tab and pick **Undock into a floating window** to take it out as a floating one.

#### The window menu

Right-click a floating window's header — or press and hold it on a touch screen — for:

| Entry | What it does |
|---|---|
| **Dock to bottom** | the window becomes a tab of the bottom dock |
| **Move to left sidebar** / **Move to right sidebar** | the window becomes a tab of that [sidebar](https://docs.theprototype.app/interface.md#sidebars) |
| **Float (undock)** | on a tab of a window group: takes that window out of the group |
| **Group with…** | lists the other open windows that can share tabs (the toolbox cannot; Statistics can since 1.39) |
| **Bring to front** | puts it above the other floating windows |
| **Reset size** | back to its default size, where it is |
| **Close** | closes it |

The same menu opens on a tab of a [floating window with tabs](https://docs.theprototype.app/interface.md#floating-windows-with-tabs). The header itself
is unchanged.

![The floating Objects window's header right-clicked: Dock to bottom, Move to left sidebar, Move to right sidebar, Float (undock) greyed because it already floats, Group with…, Bring to front, Reset size and Close.](https://docs.theprototype.app/img/controls/window-menu.webp)
*Figure: A floating window's header menu.*
For the bottom dock's own buttons — **Undock**, **Split**, closing a view from its tab, **Dock all tabs** on a floating
window — and for docking a window into an exact slot by dropping it on the dock's tab bar, see
[Windows and tabs](https://docs.theprototype.app/interface.md#windows-and-tabs).

### Docking to a screen edge

Drag a window's header to the **left or right edge** of the screen and a blue strip appears:
let go and it docks on that side, out of the way of the viewport. Drag its header back into the
middle and it floats again, where it was before.

Since 1.33 each side has **one sidebar**, and every window docked there is a **tab** of it — next
to Configure Scene / Properties and the Objects list. Drop a window on a side that already has a
sidebar (*Add as tab* lights up) and it joins as a tab; a second window on an edge no longer
splits the column. A layout saved with two windows stacked on one edge comes back as two tabs.
Since 1.34 **every** window that docks at the bottom can be a sidebar tab, with no second header,
and every drop is highlighted first (*Float here*, *Move to dock*, *Add as tab*). Switching tabs,
the tab menu, dragging a tab, the width and **Full height** are described in
[Sidebars](https://docs.theprototype.app/interface.md#sidebars).

Docking needs the wider layout: a computer, a tablet or an unfolded phone, where since 1.35 a
finger drags a window onto the same targets. On a folded phone the panels are tabs of the
[bottom dock](https://docs.theprototype.app/interface.md#the-dock-on-a-phone) instead.

### Workspace layouts

Save the windows you have open — which panels, docked or floating, their sizes, the sidebars and the bottom dock, tab
groups — and **the toolbar** under a name, and switch between arrangements in one click.

- **Where:** **Menu ▸ Layouts**, or **Settings ▸ Interface ▸ Windows & chrome ▸ Workspace layouts**.
- **Save:** arrange the windows, type a name, press **Save**. Saving under a name you already have (in any case)
  updates that layout.
- **Use:** click a saved layout to apply it. Rename or delete it from the same list.

**Menu ▸ Layouts** opens the list as a regular dialog; <kbd>Esc</kbd>, its **✕** or a click outside closes it. On a folded
phone it is the **Layouts** tab of the bottom dock instead (also on the dock's **+**) — see
[The dock on a phone](https://docs.theprototype.app/interface.md#the-dock-on-a-phone).

Layouts are kept on this device. A reload still starts with a clean slate: a layout is applied only when you pick one.

**A layout keeps the toolbar too** (since 1.33): which buttons are on it and where it sits, the corner buttons, the
top-right group, the touch tools, and the lift and *Always on top* switches. Since 1.35 it also keeps where every
[button cluster](#edit-positions) sits and whether it is rotated, the Connect bar's *Pinned* / *Float* choice, and the
dock's [splits](https://docs.theprototype.app/interface.md#splitting-the-dock). The desktop and the phone are kept
**separately in the same layout**: saving on a computer (or an unfolded phone) stores the desktop toolbar, saving on a
folded phone stores the [phone bar](https://docs.theprototype.app/interface.md#the-phone-bar-and-more), and saving the same name on the other one adds
its part without touching the first. Applying a layout brings back both. The list marks each layout with a monitor
and/or a phone icon for the parts it holds. Layouts saved before 1.33 restore the windows only and leave the toolbar as
it is.

## The toolbar

Since 1.30 the toolbar is one glass bar where the accent marks the armed tool or an open window and **Play** is the
only orange button; on a touch screen its buttons are 44 px. See [The Interface](https://docs.theprototype.app/interface.md#the-main-hud).

Pressing a toolbar button never takes the keyboard: the keys stay with whatever had them — this holds for the bottom
toolbar, the Connect bar, the touch tools, the draw, sculpt, spline and mesh-edit toolboxes and module toolboxes. So
"press Move, then <kbd>F</kbd>" still frames the selection from the 3D view.

The bar at the bottom of the screen is yours to arrange. **Right-click** (or long-press) any of its buttons. Since 1.34
a right-click **anywhere** on the toolbar — between two buttons, on its edge — opens the toolbar's menu (Edit
positions, Move toolbar, Always on top, Customize toolbar…), never the browser's; so do the round corner buttons. A
button's own menu has:

| Entry | What it does |
|---|---|
| **Swap with ▸** | exchange this button for one that is not on the bar |
| **Edit positions** | drag every button into place on the bar itself — see [Edit positions](#edit-positions) |
| **Move left / Move right** | one place along the bar — past the play button when it is next |
| **Hide button** | take it off the bar (Customize toolbar brings it back) |
| **Move toolbar** | move the whole bar: with a mouse it follows the pointer — click to place it, the arrow keys nudge, <kbd>Esc</kbd> puts it back; on a touch screen drag the bar with your finger and lift to place it, or press **Cancel** above the bar. Disabled on a screen too narrow to move it |
| **Reset toolbar position** | back to the middle |
| **Always on top** | paint the bar over the dock and floating windows (by default they cover it) |
| **Lift toolbar above docked panels** | on by default: while the Node editor or the Explorer is docked at the bottom, the toolbar moves up above the dock |
| **Lift corner buttons above docked panels** | off by default: the round corner buttons (chat, microphone, AI assistant, add…) move up above the dock too; off, the dock covers them |
| **Collapse / Expand toolbar** | shrink the bar down to the play button, and back |
| **Customize toolbar…** | a checklist of every tool, the two corner stacks included: tick to show, untick to hide, ▲/▼ to reorder; **Edit positions…** at the top; **Reset toolbar** goes back to the default buttons and order |

The two **Lift** switches are also in a corner button's right-click menu, next to *Always on top*, and in **Settings ▸
Interface ▸ Windows & chrome**.

### The "…" button

The **…** at the right end of the bar opens *Customize toolbar…*. Since 1.34 it is a button like any other: right-click
it for the toolbar menu, choose **Hide button** to take it off the bar, or untick **… (Customize toolbar)** in
*Customize toolbar…*. In **Edit positions** it carries a red **−**, and the bar's green **+** offers it back. It always
sits at the end of the bar. With it hidden, *Customize toolbar…* is still the last row of every toolbar button's
right-click menu.

### When the buttons do not fit

When there is not room for every button — you switched them all on, or a pinned sidebar takes part of the bottom edge —
the buttons that do not fit move into a **»** button at the end of the bar. They leave from the right end first (in the
order you arranged them), and **Play never moves**. Click **»** for the hidden buttons: they work exactly as on the bar,
and the list ends with *Customize toolbar…*. Make the sidebar narrower (or unpin it) and the buttons come back by
themselves — nothing is switched off, and *Customize toolbar…* still lists them as on the bar. **Edit positions** always
shows every button, wrapping onto more rows when it needs to.

### The toolbar and sidebars

- **Full-height sidebars**: the toolbar never slides under one. Dragging it, or *Move toolbar*, stops at the sidebar's
  edge, and leaves room for the corner buttons beside it.
- **Edit positions** lays its bar beside any open sidebar, full height or not, moving the bar only as far as it has to;
  while it runs, the corner buttons and the buttons beside the logo sit beside any open sidebar too. Outside it, the
  buttons beside the logo follow a pinned (full-height) left sidebar, like the logo.
- **The top of the screen jumps, it does not slide** (since 1.36): when a sidebar is pinned, unpinned or closed, the
  logo, the buttons beside it, the corner buttons, the profile and the Connect bar move to their new place at once.
- **Lift corner buttons above docked panels**, when on, also moves the corner buttons beside a full-height sidebar on
  their side, and back down to the bottom edge when the dock is hidden.

### Edit positions

Right-click any button on the bottom toolbar — or press and hold it on a touch screen — and pick **Edit positions**.
Every place you can arrange switches to edit mode at once.

#### Moving the clusters

Since 1.35 the screen has six **clusters** you can place anywhere: the **toolbar**, the **bottom-left** and
**bottom-right** corner buttons, the **buttons beside the logo**, the **top-right buttons** and the **Connect bar**. (The
logo and your profile picture stay where they are.) In **Edit positions** every cluster has a small **grip**:

- **Drag the grip** to move the whole cluster anywhere. It snaps to the screen's edges and centre lines, the sidebar
  edges and the other clusters — a dashed guide line shows what it snapped to. Clusters never overlap each other, the
  logo or the profile: dropped on top of something, a cluster moves to the nearest free spot.
- **Tap the grip** (or right-click / long-press any button of the cluster) for its menu: **Move**, **Rotate to
  vertical** / **Rotate to horizontal** (the toolbar stands on the left edge; corner buttons lie in a row), **Reset
  position**, **Reset all positions**, **Hide cluster** / **Show all** (the toolbar cannot be hidden — Play lives
  there). The Connect bar does not rotate; its menu has **Pin to top row** / **Float** instead.
- **The Connect bar's menu works outside Edit positions too** (since 1.36): right-click the Connect bar — or press and
  hold it on a touch screen — for **Move**, **Pin to top row** / **Float**, **Reset position** and **Reset all**. A moved
  Connect bar stays where you put it.
- **The buttons beside the logo** are hidden by default on a computer. In **Edit positions** their menu's **Show
  cluster** turns them on (it switches on **Settings ▸ Interface ▸ Touch tools**), and their grip moves them like every
  other cluster.
- **The budget chip** (*Quest 3%* beside the toolbar) is a cluster too since 1.39. Drag its grip — or the chip itself —
  anywhere; it snaps like the others and keeps its place in your layouts. Its menu (tap its grip, or right-click it)
  ▸ **Reset position** puts it back beside the toolbar (or left of it, or above it, when there is no room). Its red
  **−** hides it — a hidden chip is drawn faint in Edit positions with a green **+** to bring it back — and so does
  unticking **Budget chip** in *Customize toolbar…* (on by default).
- **✓** applies, <kbd>Esc</kbd> cancels. A cluster keeps its *relative* place: on a smaller window, after folding or
  unfolding a phone, beside a pinned sidebar or above the dock. [Workspace layouts](#workspace-layouts) carry the places
  and rotations.

![Edit positions: every cluster has a small grip under it — the Undo, Redo and Multi-select row beside the logo, the Connect bar, the top-right group, the bottom toolbar and both corner stacks — and every button carries a red −.](https://docs.theprototype.app/img/controls/edit-positions-clusters.webp)
*Figure: Edit positions, in a small window: every cluster has a grip, every button a red −.*
![Edit positions: the budget chip has its own grip and red − right of the toolbar](https://docs.theprototype.app/img/controls/budget-chip-edit-positions.webp)
*Figure: In Edit positions the budget chip has its own grip and red −.*
![After Rotate to vertical and Rotate to horizontal: the toolbar stands on the left edge with Play in its middle, and the bottom-left corner buttons lie in a row](https://docs.theprototype.app/img/controls/clusters-rotated.webp)
*Figure: Clusters after Rotate to vertical and Rotate to horizontal.*
![Edit positions with a mouse: the buttons beside the logo are drawn faint (hidden by default on a computer) and their grip menu is open — Move, Rotate to vertical, Reset position, Reset all positions, Show cluster and Show all](https://docs.theprototype.app/img/controls/touch-tools-show-cluster.webp)
*Figure: A cluster's grip menu, with Show cluster and Show all.*
#### Arranging the buttons

Single buttons move between the clusters as before. The places that take buttons:

- **The bottom toolbar** and **the two bottom corners**.
- **The top-right group** — Scene notes, Notifications and Connected peers, left of your profile picture. Notifications
  and Connected peers always stay in this group, because their panels open from that corner; Scene notes can go
  anywhere. Connected peers only shows while someone is connected, but in edit mode its place is always drawn so you
  can move it. Remove every button from this group and it disappears completely — no empty box; in **Edit positions**
  it shows again, with a **+** to put buttons back.
- **The row beside the logo** (the touch tools: Undo, Redo and Multi-select) — since 1.34 with a mouse too, not only on
  a touch screen. Reorder them, drag one onto the bottom toolbar or into a corner, remove them, or put other buttons
  beside the logo. Once you change that row it stays shown (this switches on **Settings ▸ Interface ▸ Touch tools**); an
  empty row shows nothing. Workspace layouts keep it.
- **The Connect bar** at the top carries a red **−** to hide it — see [The Connect bar](#the-connect-bar).
- The main menu button and your **profile** picture stay where they are.

Then:

- **Drag** any button to a new place: along the bar, into a corner, the top-right group or the row beside the logo.
  **Play** can move along the bar but always stays on it.
- The small red **−** on a button removes it.
- A stack shows **one** green **+** for its next place; it opens a list of every button from *Customize toolbar…* that is
  not placed yet (Play is never in it). Pick one to put it there.
- Each corner — and the top-right group and the row beside the logo — holds up to **four** buttons; once a stack holds
  four, its **+** is gone. By default the left corner has the AI assistant and the **+** (add) button, the right corner
  Chat and the microphone.
- With the keyboard: <kbd>Tab</kbd> to a button, then the **arrow keys** move it (<kbd>←</kbd> / <kbd>→</kbd> along the
  bar and into the corners, <kbd>↑</kbd> / <kbd>↓</kbd> inside a corner) and <kbd>Delete</kbd> removes it.
- The round green **✓** at the top right of the toolbar **applies** the new layout. <kbd>Esc</kbd>, or a click anywhere
  else, cancels it.

![Edit positions on a computer: every button on the bottom toolbar has a red −, green + slots sit at the ends of the bar, a grip sits beside it, and the green ✓ applies.](https://docs.theprototype.app/img/controls/edit-positions.webp)
*Figure: Edit positions on a computer: the bottom toolbar.*
![Edit positions reaching the top right: the notifications and Explorer buttons in the top-right group each carry a red −, with a green + for the next place in the group.](https://docs.theprototype.app/img/controls/edit-positions-top-right.webp)
*Figure: Edit positions reaching the top right of the screen.*
![The top of the screen in Edit positions with a mouse: the Connect bar has its own red − and a grip under it.](https://docs.theprototype.app/img/controls/edit-positions-connect-bar.webp)
*Figure: The Connect bar in Edit positions.*
The menus name buttons by their short name — **Pivot**, **Microphone**; the toolbar's own tooltips still tell you the
pivot mode and how to talk.

The layout is saved on this device, like *Customize toolbar…*. **Reset toolbar** (in Customize) or **Settings ▸ Reset
window positions** puts everything back. A custom button order no longer shows the wrong icons after a reload. On a
folded phone the app shows its own phone bar instead — arrange it by dragging items between **More** and the bar; there
**More** can come off the bar and **Play** can move along it (see [The phone bar and More](https://docs.theprototype.app/interface.md#the-phone-bar-and-more)).

The **play button**'s right-click menu chooses how you play — **Play (desktop)**, **Enter VR**, **Enter AR passthrough**
(greyed out where the device cannot) — and, in a scene that is a game, **Test play (start from the menu)**, which resets the
game to its menu and starts from the Start screen. See [Build a Game Loop](https://docs.theprototype.app/build-a-game.md#test-play). On a folded phone,
press and hold Play for the phone's version of this menu — *Play as*, *Test play*, **Move left / Move right** and
**Arrange the bar…**; see [On a phone](https://docs.theprototype.app/interface.md#on-a-phone).

### The Connect bar

Since 1.35 the Connect bar is either **pinned** or **floating**. Open its drawer (the chevron) and use the **Pinned /
Float** button (the lock in the drawer's header), or right-click the Connect bar (press and hold it on a touch screen)
— since 1.36 in or out of [Edit positions](#moving-the-clusters) — for **Move**, **Pin to top row** / **Float**,
**Reset position** and **Reset all**:

- **Pinned to the top row** — a full-width bar along the top; the corner buttons drop below it. The default on a touch
  screen (an unfolded phone). With a sidebar open below it, the bar's corner on that side is square.
- **Float** — the centred pill, the default with a mouse. When the top row is too full for it, it shrinks to its
  **compact** form (the status dot and the chevron); tap the dot for the full bar, and it grows back by itself when room
  returns.

![The floating Connect bar right-clicked outside Edit positions: its menu reads Move, Pin to top row, Reset position and Reset all positions (the last two greyed while the bar is in its default place)](https://docs.theprototype.app/img/controls/connect-bar-menu.webp)
*Figure: The Connect bar's right-click menu, outside Edit positions.*
Each kind of screen (touch or mouse) remembers its own choice, and layouts carry it. On a folded phone Connect is the
chip in the phone's top bar, unchanged.

- **Hide or show it**: in **Edit positions** the Connect bar at the top has a red **−**; press it to hide the bar. A
  **+ Connect** stays in its place until you press **✓**, and brings it back whenever you edit again. Or untick
  **Connect bar** in *Customize toolbar…* (section *Top*). On a folded phone the Connect chip stays.
- **Hidden stays hidden**: buttons you hide (for example **Notifications**) stay hidden everywhere — after a reload and
  on the folded phone as well.

See also [The Connect panel](https://docs.theprototype.app/connection.md#the-connect-panel).

## The Settings window

**Settings** (logo menu ▸ Settings) is a window with a grouped menu of categories on the left — on a phone, a list you
tap into — a search box in the header, and one row per setting. Changes save as you make them. Since 1.26 it has its
own page: see [Settings](https://docs.theprototype.app/settings.md).

## Keyboard shortcuts

<kbd>Ctrl</kbd>+<kbd>K</kbd> opens the [command palette](https://docs.theprototype.app/interface.md#the-command-palette-ctrlk): one search over tools,
windows, menus and every setting.

Shortcuts are inert while you type in a text field and while play mode owns the keyboard. The same list is shown in **Settings ▸ Shortcuts** (<kbd>Ctrl</kbd>+<kbd>/</kbd> opens it directly), where a click on a shortcut's keys rebinds it and **Reset all** puts the defaults back.

The keys in the table are the **3D view's**: they fire while the 3D view has focus. A panel you click in gets its own keys — see [Keys follow the panel you are in](#keys-follow-the-panel-you-are-in).

**Every keyboard layout works.** A letter shortcut is matched by the letter printed on the key when there is one — AZERTY, Dvorak and QWERTZ keep their own labels — and by the key's **physical position** otherwise, so <kbd>G</kbd>, <kbd>F</kbd>, <kbd>Ctrl</kbd>+<kbd>Z</kbd> and <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> work on Russian, Greek, Hebrew, Arabic and CJK layouts without switching. Where the browser can tell, **Settings ▸ Shortcuts** shows your layout's own label beside each letter (*п on your layout*); where it cannot, a note says letter shortcuts follow the QWERTY position.

!!! tip "Finding a setting"
    Settings is grouped into **General** (Interface, Controls, Input, Touch controls, Shortcuts), **Workspace** (Scene,
    Explorer, Node types, Export) and **Devices & services** (VR, AI, Connection, Privacy), with **About & what's new** at the
    bottom. If you don't know which one holds what you want, type in the search box: it matches names, descriptions and
    the words people use — **dark** finds the theme, **southpaw** finds Swap sticks. See
    [Finding your way](https://docs.theprototype.app/settings.md#finding-your-way).

| Keys | Action |
|---|---|
| <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> | Gizmo: move / rotate / scale (again on the active mode: hide; any mode key: bring the selection back) |
| <kbd>G</kbd> | Move (grab) — same as <kbd>1</kbd> |
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | Fly the camera (horizontal) |
| <kbd>Q</kbd> / <kbd>E</kbd> | Fly down / up |
| <kbd>Shift</kbd> (hold) | Fly 3× faster |
| <kbd>F</kbd> | Focus the selected object |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | Duplicate the selection (whole set) |
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | Select all objects (inside Edit Mesh: every element) |
| <kbd>Delete</kbd> / <kbd>Backspace</kbd> | Delete the selection (a group asks first) |
| <kbd>Alt</kbd>+click | Cycle the selection through everything under the cursor ([inside and behind water](#inside-and-behind-water)) |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+click | [Ping](https://docs.theprototype.app/notifications.md#pinging) a spot for everyone |
| <kbd>Esc</kbd> | Leave isolation; leave [focus mode](https://docs.theprototype.app/interface.md#focus-mode) while it is on |
| <kbd>Ctrl</kbd>+<kbd>Space</kbd> | [Focus mode](https://docs.theprototype.app/interface.md#focus-mode) — maximize the area under the pointer (the 3D view alone, or a docked window filling the whole window with the [viewport picture-in-picture](https://docs.theprototype.app/interface.md#the-viewport-picture-in-picture)); again to restore |
| <kbd>Z</kbd> | Cycle the [render mode](https://docs.theprototype.app/camera.md#render-mode-view): Shaded → Shaded + AO → Wireframe |
| <kbd>Tab</kbd> | Enter [mesh edit](https://docs.theprototype.app/mesh-editing.md) mode — inside it <kbd>Tab</kbd> cycles Vertices / Edges / Faces; <kbd>Esc</kbd> exits |
| <kbd>I</kbd> | [Edit / Interact](#edit-and-interact) mode — in Interact, clicks play with the scene instead of selecting |
| <kbd>M</kbd> | Toggle element [snapping](https://docs.theprototype.app/snapping.md) |
| <kbd>O</kbd> | Toggle the object list |
| <kbd>N</kbd> | Toggle the node editor |
| <kbd>T</kbd> | Show / hide the tool dock (with nothing docked it opens [empty](https://docs.theprototype.app/interface.md#docked-windows), ready for a drop) |
| <kbd>Ctrl</kbd>+<kbd>B</kbd> | Show / hide the left [sidebar](https://docs.theprototype.app/interface.md#sidebars) (its tabs stay open) |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> | Show / hide the right sidebar |
| <kbd>Alt</kbd>+<kbd>E</kbd> / <kbd>F</kbd> / <kbd>A</kbd> / <kbd>U</kbd> / <kbd>S</kbd> / <kbd>H</kbd> | Explorer / Flow Code / Animation / UV editor / Shader editor / HUD editor |
| <kbd>C</kbd> | Toggle chat (from the 3D view only) |
| <kbd>Shift</kbd>+<kbd>A</kbd> | Add an object at the cursor (enable in Settings) |
| <kbd>P</kbd> | Start / stop the physics [simulation](https://docs.theprototype.app/physics.md) |
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | Play / enter VR (right-click the play button for modes) |
| <kbd>`</kbd> | Toggle the [AI](https://docs.theprototype.app/ai/assistant.md) quick-prompt bar |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | Save the scene |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | Save a [checkpoint](https://docs.theprototype.app/checkpoints.md) |
| <kbd>Ctrl</kbd>+<kbd>Z</kbd> | Undo |
| <kbd>Ctrl</kbd>+<kbd>Y</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | Redo |
| <kbd>Shift</kbd>+<kbd>1</kbd>…<kbd>5</kbd> | Recall camera bookmark 1–5 |
| <kbd>V</kbd> (hold) | Push-to-talk while the mic toggle is off |
| <kbd>Ctrl</kbd>+<kbd>/</kbd> | Show the shortcut list |
| <kbd>?</kbd> | Keyboard cheat sheet (every panel, the focused one first) |

Inside an Edit Mesh session the bare letters <kbd>E</kbd> <kbd>I</kbd> <kbd>G</kbd> <kbd>S</kbd> <kbd>B</kbd> <kbd>F</kbd> <kbd>X</kbd> / <kbd>W</kbd> <kbd>J</kbd> and the loop keys (<kbd>L</kbd>, <kbd>Ctrl</kbd>+<kbd>+</kbd>/<kbd>-</kbd>, <kbd>Ctrl</kbd>+<kbd>I</kbd>) belong to the mesh tools — see [Mesh Editing](https://docs.theprototype.app/mesh-editing.md). That is why the panel shortcuts above use <kbd>Alt</kbd>: they keep working while a mesh session is open. Since 1.23 the mesh tools' keys can be rebound too, in their own *Mesh edit* group of **Settings ▸ Shortcuts**.

**In the viewport picture-in-picture** — the small 3D view shown while a docked window is maximized (see
[The viewport picture-in-picture](https://docs.theprototype.app/interface.md#the-viewport-picture-in-picture)) — these keys work while the pointer is
over it. They have their own *Viewport picture-in-picture* group in **Settings ▸ Shortcuts**:

| Keys | In the viewport picture-in-picture |
|---|---|
| <kbd>W</kbd> / <kbd>E</kbd> / <kbd>R</kbd> | Move / Rotate / Scale |
| <kbd>F</kbd> | Frame the selection with the picture-in-picture's own camera |
| <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd>, <kbd>G</kbd>, <kbd>Delete</kbd>, <kbd>Ctrl</kbd>+<kbd>D</kbd>… | as in the 3D view |

**Over a field in Properties or Configure Scene**, <kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>Ctrl</kbd>+<kbd>V</kbd> copy and
paste that value (or a whole section over its header) — see [Copy, paste and reset values](#copy-paste-and-reset-values).

### Keys follow the panel you are in

A shortcut fires only in the panel that has focus — the one you last clicked. The table above is the 3D view's, and the
node editor has its own set: see [Node editor: keyboard, groups and notes](https://docs.theprototype.app/node-editor.md). Press <kbd>?</kbd> anywhere
for a cheat sheet of every panel's keys, the focused panel first.

Since 1.25 this covers **every panel and tool window**, docked or floating: the Explorer, the Inspector, the node
editor's chrome, a behaviour's graph view, the [code workspace](https://docs.theprototype.app/code-workspace.md), the HUD editor, Animation, UV,
Shader, Flow Code, the Profiler, previews, chat… Clicking in one gives it the keyboard, and the panel that has the keys
shows an outline.

- **<kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> / <kbd>Q</kbd> <kbd>E</kbd> never fly the camera from a panel**,
  and the 3D view's own letters (<kbd>C</kbd> chat, <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd>, <kbd>P</kbd>, <kbd>M</kbd>…)
  do nothing there. Click the 3D view to give it the keys back.
- **<kbd>T</kbd>, <kbd>N</kbd> and <kbd>O</kbd>** (the tool dock, the node editor, the object list) are window management,
  so they also work from a panel. So do <kbd>Ctrl</kbd>+<kbd>B</kbd> / <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> —
  except inside the [code workspace](https://docs.theprototype.app/code-workspace.md#sidebars), where they toggle its own sidebars.
- **Global keys work everywhere**: <kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Y</kbd> (also with a checkbox
  or slider focused, and inside the Profiler timeline), <kbd>Ctrl</kbd>+<kbd>S</kbd>, <kbd>Ctrl</kbd>+<kbd>Enter</kbd>,
  the <kbd>Alt</kbd>+letter panel toggles, <kbd>?</kbd> and <kbd>V</kbd> (push to talk).
- **The object list** keeps its own keys and the scene's selection keys — see
  [The object list from the keyboard](#the-object-list-from-the-keyboard).
- A panel that has no keys of its own simply ignores the 3D view's letters: click the 3D view first to fly. Inside a
  text field or the code editor, typing is always typing.

The <kbd>?</kbd> cheat sheet and **Settings ▸ Shortcuts** list *Panels and tool windows* and *Object list* among the
places keys belong to.

## Right-click menus

**Empty viewport** — a quick right-click opens the scene menu:

- **Search objects…** — find an object in the scene by name (off by default: **Settings ▸ Interface ▸ Lists & menus ▸ Object search in menu**).
- **Add** — the full primitive catalog (meshes, building blocks, [architecture](https://docs.theprototype.app/architecture.md) — walls, doors, windows and stairs — cameras, lights, [water](https://docs.theprototype.app/water.md), [effects](https://docs.theprototype.app/particles.md), a [fluid tank](https://docs.theprototype.app/simulation.md#fluid-tank)) plus empty groups; objects spawn at the clicked point.
- **Undo / Redo**, **Ping here**.
- **Selected ▸** — the selected object's own menu (shown only while something is selected).
- **Tools** — Node editor, Draw mode (drag 3D strokes on surfaces, or click out an editable [spline](https://docs.theprototype.app/splines.md)), Measure distance, Simulate physics (and *Reset simulation* while one runs), [Recording…](https://docs.theprototype.app/recording.md) (a turntable or flythrough video).
- **Snapping** — position / rotation / scale steps, snap to surface, element snapping, *More snapping settings…* (see [Snapping](https://docs.theprototype.app/snapping.md)).
- **View** — Show grid, Grid & axes settings…, Show helpers in Play (debug), the Mouse wheel mode, Scene look…, Screenshot.
- **Module tools** — the toolboxes of installed modules.
- **Camera bookmarks** — Save current view, the saved views, *Manage saved views…*, Clear bookmarks.

**An object** (viewport or object list) — Focus camera, Duplicate, Group selection / Ungroup, Origin and Pivot point, Convert to mesh, Transform ▸ ([Drop to ground, Align, Distribute](https://docs.theprototype.app/measure-align.md#align-distribute-and-drop-to-ground)), Preview camera (on a [camera](https://docs.theprototype.app/camera.md#camera-objects)); **Edit**: Properties, Rename, Edit shader, [Edit mesh](https://docs.theprototype.app/mesh-editing.md), Edit spline, Sculpt mesh; **Physics & effects**: Physics ▸ Weld / Hinge, Effects, Enable / Disable flow effects; **Share**: Add note, Ping this object, [Save as…](https://docs.theprototype.app/prefabs.md); and Delete. <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+click pings anywhere in the scene (since 1.25; <kbd>Alt</kbd>+click now [cycles the selection](#inside-and-behind-water)).

**Every right-click menu can be typed into.** Start typing and the menu turns into a filtered list of every entry in it,
submenus included; <kbd>↑</kbd>/<kbd>↓</kbd> walk the rows, <kbd>Enter</kbd> runs one, and with nothing typed
<kbd>→</kbd> opens a submenu and <kbd>←</kbd> goes back. <kbd>Esc</kbd> unwinds one step at a time — the text, then
the search, then the submenu, then the menu. Rows show their keyboard shortcut on the right. The search list's height
can be dragged, and each kind of menu remembers it. On a touch screen nothing pops a keyboard up unless you tap the
search row.

With **several objects** selected, the menu acts on the whole set — the entries are counted ("Delete 4 objects") — and adds **Group selection**, **Convert to mesh** (merge them into one editable mesh, materials kept) and the Physics ▸ Weld / Hinge pair. With exactly two meshes selected, right-click the first one for **Boolean** (union, subtract, intersect — see [Mesh Editing](https://docs.theprototype.app/mesh-editing.md#boolean)).

## VR basics

Enter VR from the headset button (WebXR). The essentials below get you started; the [VR Guide](https://docs.theprototype.app/vr.md) has the full control and radial-menu map.

- **Radial menu** — press <kbd>B</kbd>/<kbd>Y</kbd> on your menu hand to toggle it (or, in hold mode, hold the button and release over a sector). Its first ring is Objects, Add, Scene, Tools, Redo, Undo, Chat and Settings (every VR setting, the microphone, exit VR); the hub is **Selected** when something is selected.
- **Hand tracking** — hands have no <kbd>B</kbd>/<kbd>Y</kbd>, so **pinch and hold** (about half a second) on the menu hand to toggle the radial menu; a quick pinch stays a normal click.
- **Trigger** points and selects; **grip** grabs and moves objects; gripping with **both hands** grabs the world itself to reposition yourself.
- Floating panels (menu, objects, properties, keyboard, chat…) can be grabbed and repositioned with the grip.

!!! note
    Everything above replicates: selection locks, transforms, notes, pings and draw strokes are all visible to your peers in real time.
