# Controls

How to move the camera, select and transform objects, and find every keyboard shortcut — on desktop and in VR.

## Viewport navigation

- **Orbit** — drag with the left mouse button (right-drag also orbits; a quick right-click *tap* opens the context menu instead).
- **Zoom** — mouse wheel. A two-finger swipe on a trackpad pans instead; see [The mouse wheel](#the-mouse-wheel) if yours does the wrong thing.
- **Fly** — hold <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> to pan on the camera's horizontal plane, <kbd>Q</kbd>/<kbd>E</kbd> to fly down/up, hold <kbd>Shift</kbd> for 3× speed.
- **Focus** — <kbd>F</kbd> frames the selected object.
- **Camera bookmarks** — save the current view from the right-click menu (**Camera bookmarks ▸ Save current view**), recall with <kbd>Shift</kbd>+<kbd>1</kbd>…<kbd>5</kbd>.

### The mouse wheel

A scroll over the viewport is classified by **what the device is**, not by how big one tick was: a mouse wheel zooms, a two-finger swipe pans, and a pinch zooms. High-resolution wheels — a Steam Deck trackpad in wheel mode, a hi-res mouse on Linux — send tiny ticks that used to be mistaken for a swipe; they zoom now.

If the guess is still wrong on your hardware, pick it yourself: right-click the viewport ▸ **View ▸ Mouse wheel** and choose **Zoom (mouse wheel)**, **Pan (trackpad swipe)** or **Auto-detect**. The same switch is **Settings ▸ Controls ▸ Trackpad gestures**, next to the two-finger pan, pinch zoom and reverse-pan toggles. The first time a scroll pans, a one-time toast points you at that menu.

**Settings ▸ Controls ▸ Wheel diagnostics** shows the last eight wheel events over the viewport — the delta on each axis, the browser's wheel value, and how each one was classified and why. It is there for the odd machine: if a wheel refuses to zoom, copy those rows into a bug report.

## Selection

- **Click** an object to select it — the transform gizmo attaches.
- **Double-click** it to open its properties (right-click ▸ *Properties* and the object list do the same). Pin the properties panel if you'd rather it followed every selection.
- **Click empty space** to deselect.
- **Shift+click** adds or removes objects from a multi-selection (the last-picked object is the primary).
- **Shift+drag** on empty space draws a box-select marquee.
- **Ctrl+A** selects everything in the scene. Inside a mesh editing session it keeps its other meaning — select every face, edge or vertex — so the two never collide.
- **Ctrl+D** duplicates the selection — see [Duplicating](#duplicating) for what a copy brings with it.
- Selecting an object **locks it for other peers** (one lock per person); a locked object shows who holds it, and its right-click menu offers **Request control** to ask for a handover.

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
| <kbd>Esc</kbd> | Hand the keyboard back to the viewport |

<kbd>↓</kbd> in the list's **Search objects…** box drops you into the results. Type-ahead matches what you typed first, so a Cyrillic name is reachable by its own letters, and falls back to the physical key so a Latin name is still reachable on a non-Latin layout.

### What double-click does

Opening properties is the default, but it is a setting: **Settings ▸ Selection** lets double-click open properties, enter mesh editing, select everything of the same kind, or focus and isolate the object instead.

**Isolate** hides everything else rather than fading it — fading would mean writing to materials that other people are sharing.

### Very small objects

An object scaled — or animated — down to almost nothing has no surface left to click. It gets a small dot drawn at its origin so there is something to aim at, and a click near that dot selects it.

!!! note
    At *exactly* zero scale the viewport click does not reach it yet; select it from the object list instead. That one is a known gap.

### Selecting without a keyboard

On a phone or tablet there is no <kbd>Shift</kbd> to hold and no right-click, so the same
two gestures are available as a **mode**. *Settings ▸ Interface ▸ Touch tools* puts round
**Undo**, **Redo** and **Multi-select** buttons beside the logo — on by default on phones
and narrow windows.

With **Multi-select** on:

- a **tap adds** to the selection instead of replacing it, and
- a **drag on empty space** draws the box-select marquee.

It works the same inside a mesh editing session, on vertices, edges and faces. Everything
else already has a touch path: long-press the viewport for the right-click menu, and the
**+** button opens the same create menu.

### Duplicating

**Ctrl+D** (or right-click ▸ *Duplicate*) makes a working copy. A copy is a copy of
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

The properties panel edits **everything you have selected**, not just the last object you clicked. Change a colour, a material, a shadow flag or a physics setting and it applies to the whole set as a **single undo step**; a row whose objects disagree shows a dash until you set it.

Transform rows on a multi-selection drive the selection's **origin** rather than each object's absolute position — typing a value moves the set as a whole instead of collapsing it onto one plane. Name, uuid and geometry stay single-object: click the one object for those.

## Transform gizmo

| Key | Mode |
|---|---|
| <kbd>1</kbd> | Move (translate) |
| <kbd>2</kbd> | Rotate |
| <kbd>3</kbd> | Scale |

Snapping is configured from the right-click menu under **Snapping** — grid steps and snap-to-surface, plus snapping onto real geometry: vertices, edges, faces and other objects, optionally turning the object onto the surface it lands on. See [Snapping](snapping.md).

### Hiding the gizmo, and getting the selection back

Pressing the key of the mode that is **already active** hides the gizmo and the selection, so you can look at the object with nothing in the way. Pressing **any** mode key brings the same selection back in that mode — a multi-selection comes back whole, with the origin you placed by hand, and inside [Edit Mesh](mesh-editing.md) the face, edge or vertex you had picked comes back too. The gizmo button under **Gizmo & pivot** in the Edit Mesh toolbox does the same thing as the key, and <kbd>G</kbd> counts as a mode key, so it recalls as well.

An object that was deleted, or that a peer locked in the meantime, is left out and a toast says how many were skipped.

!!! note "Inside mesh edit"
    <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd> keep meaning Move / Rotate / Scale inside an [Edit Mesh](mesh-editing.md) session — they are what you reach for mid-edit. The element modes (vertices, edges, faces) are on <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd>.

### Each object's origin

Every object carries its own **origin** — the point it rotates, scales and hinges around. The properties panel's Transform section has one-click presets — **Bottom**, **Centre**, **Median**, **World 0**, and **Children** for a group — or you can place it by hand:

- **Move origin** switches the gizmo to the pivot: drag it (or type coordinates) and the mesh stays put. Grid and surface snapping still apply. Press **Done** when it's where you want it.
- **Pick from mesh…** opens [Edit Mesh](mesh-editing.md) so you can put the origin on real geometry: click a vertex — or Ctrl+click both ends of an edge to hinge on it — then press **Set origin here**.
- **Bottom** puts the pivot on the footprint, so the object sits on the ground.
- Flow **Spin** and **Orbit**, and physics joints, all turn about the origin you set — that is how you hinge a door.

The origin travels with the object: it replicates, saves, undoes, and is baked in on GLTF export.

**Typing a rotation honours it.** Once an object has an origin, a rotation or scale typed into the Transform rows turns it about that origin — the same thing a gizmo drag does — instead of about its own local zero. That matters most for a **group**: a group made by dragging objects together, or with `/group`, sits at world zero, so its origin is one right-click away — **Origin ▸ Centre of children**, **World zero** or **Reset origin** on the group's right-click menu. Lights have an origin too: give a sun one and Rotate swings it around that point (see [Lights](camera.md#lights)).

### The pivot of a multi-selection

With several objects selected, what the set rotates and scales about is a choice. The **Pivot** dropdown in the Transform section — or right-click ▸ **Pivot point** — offers:

| Mode | Turns about |
|---|---|
| **Median point** | the centre of the selection (the default) |
| **Active object** | the origin of the object you picked last |
| **Parent origin** | the origin of the parent they all share — greyed out when they do not share one |
| **Individual origins** | each object's own origin, so a row of doors all swing on their own hinges |

The gizmo drag and the typed rows both obey it. Moving is never per-object: a translation moves the set as one. An origin you placed by hand with **Move origin** overrides the mode while it stands.

### Numeric fields

Every number in the app is the same control: **drag** it to scrub, or **type** into it for live updates. <kbd>↑</kbd>/<kbd>↓</kbd> step by one unit — hold <kbd>Ctrl</kbd> for ×10, <kbd>Shift</kbd> for ×100 — and <kbd>Esc</kbd> reverts what you typed.

That includes the numbers inside **node editor cards**, **shader nodes** and the
**animation window** — dragging one of those scrubs the value without dragging the card.
Scrubbing an animation key or a shader parameter is **one undo step**, not one per pixel.

Fields that hold a distance or an angle also accept a typed **unit** (`12cm`, `4in`,
`90deg`) — see [Units](units.md).

### Floating windows

The toolboxes, the Explorer, the flow and animation windows and the panels all behave the same way: drag the header to move, drag the bottom-right corner to resize. A window can never be sized past the edge of the screen — the resize corner always stays reachable — and **double-clicking** the corner resets it to its default size while leaving it where you parked it. Size and position are remembered per window.

A window also **keeps its header**: it cannot be dragged so far down that the header hides under the Controls pill, the bottom band on a touch or narrow screen, the dock, or a browser overlay — there is always something left to grab. A tall toolbox parked near the bottom scrolls its body instead of losing its head.

## Keyboard shortcuts

Shortcuts are inert while you type in a text field and while play mode owns the keyboard. The same list is shown in **Settings ▸ Shortcuts** (<kbd>Ctrl</kbd>+<kbd>/</kbd> opens it directly), where a click on a shortcut's keys rebinds it and **Reset all** puts the defaults back.

**Every keyboard layout works.** A letter shortcut is matched by the letter printed on the key when there is one — AZERTY, Dvorak and QWERTZ keep their own labels — and by the key's **physical position** otherwise, so <kbd>G</kbd>, <kbd>F</kbd>, <kbd>Ctrl</kbd>+<kbd>Z</kbd> and <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> work on Russian, Greek, Hebrew, Arabic and CJK layouts without switching. Where the browser can tell, **Settings ▸ Shortcuts** shows your layout's own label beside each letter (*п on your layout*); where it cannot, a note says letter shortcuts follow the QWERTY position.

!!! tip "Finding a setting"
    Settings is grouped into **Interface** (theme, notifications, windows, lists and menus), **Controls** (keyboard, mouse and trackpad), **Scene** (grid, shadows, autosave and everything about the scene itself), then **VR**, **AI**, **Connection**, **Shortcuts** and **About**. If you don't know which one holds what you want, type in the search box at the top — it filters every section at once, and the ✕ clears it.

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
| <kbd>Esc</kbd> | Leave isolation |
| <kbd>Tab</kbd> | Toggle [mesh edit](mesh-editing.md) mode (<kbd>Esc</kbd> also exits) |
| <kbd>M</kbd> | Toggle element [snapping](snapping.md) |
| <kbd>O</kbd> | Toggle the object list |
| <kbd>N</kbd> | Toggle the node editor |
| <kbd>T</kbd> | Show / hide the tool dock |
| <kbd>Alt</kbd>+<kbd>E</kbd> / <kbd>F</kbd> / <kbd>A</kbd> / <kbd>U</kbd> / <kbd>S</kbd> / <kbd>H</kbd> | Explorer / Flow Code / Animation / UV editor / Shader editor / HUD editor |
| <kbd>C</kbd> | Toggle chat |
| <kbd>Shift</kbd>+<kbd>A</kbd> | Add an object at the cursor (enable in Settings) |
| <kbd>P</kbd> | Start / stop the physics [simulation](physics.md) |
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | Play / enter VR (right-click the play button for modes) |
| <kbd>`</kbd> | Toggle the [AI](ai/assistant.md) quick-prompt bar |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | Save the scene |
| <kbd>Ctrl</kbd>+<kbd>Z</kbd> | Undo |
| <kbd>Ctrl</kbd>+<kbd>Y</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | Redo |
| <kbd>Shift</kbd>+<kbd>1</kbd>…<kbd>5</kbd> | Recall camera bookmark 1–5 |
| <kbd>V</kbd> (hold) | Push-to-talk while the mic toggle is off |
| <kbd>Ctrl</kbd>+<kbd>/</kbd> | Show the shortcut list |

## Right-click menus

**Empty viewport** — a quick right-click opens the scene menu:

- **Add** — the full primitive catalog (meshes, building blocks, lights) plus empty groups; objects spawn at the clicked point.
- **Undo / Redo**.
- **‹Selected object› ▸** — Focus, Duplicate, Align to ground, Edit mesh, Add note, Delete (shown only while something is selected).
- **Tools** — Draw mode (drag 3D strokes on surfaces, or click out an editable [spline](splines.md)), Measure distance, Simulate physics.
- **Snapping** — enable/disable and step sizes.
- **View** — grid on/off, Screenshot.
- **Camera bookmarks** — save/recall/clear views.

**An object** (viewport or object list) — Focus camera, Properties, Duplicate, Save as prefab, [Edit mesh](mesh-editing.md), Sculpt mesh, Add note, Ping this object, Rename, Show/Hide, and Enable/Disable flow effects. <kbd>Alt</kbd>+click pings anywhere in the scene.

With **several objects** selected, the menu acts on the whole set — the entries are counted ("Delete 4 objects") — and adds **Group selection**, **Convert to mesh** (merge them into one editable mesh, materials kept) and the Physics ▸ Weld / Hinge pair.

## VR basics

Enter VR from the headset button (WebXR). The essentials below get you started; the [VR Guide](vr.md) has the full control and radial-menu map.

- **Radial menu** — press <kbd>B</kbd>/<kbd>Y</kbd> on your menu hand to toggle it (or, in hold mode, hold the button and release over a sector). It contains Objects, Add, Scene, Tools (Select / Box Select / Draw), Undo/Redo, Chat and System (grid, settings, mic, exit VR).
- **Hand tracking** — hands have no <kbd>B</kbd>/<kbd>Y</kbd>, so **pinch and hold** (about half a second) on the menu hand to toggle the radial menu; a quick pinch stays a normal click.
- **Trigger** points and selects; **grip** grabs and moves objects; gripping with **both hands** grabs the world itself to reposition yourself.
- Floating panels (menu, objects, properties, keyboard, chat…) can be grabbed and repositioned with the grip.

!!! note
    Everything above replicates: selection locks, transforms, notes, pings and draw strokes are all visible to your peers in real time.
