# Controls

How to move the camera, select and transform objects, and find every keyboard shortcut — on desktop and in VR.

## Viewport navigation

- **Orbit** — drag with the left mouse button (right-drag also orbits; a quick right-click *tap* opens the context menu instead).
- **Zoom** — mouse wheel.
- **Fly** — hold <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> to pan on the camera's horizontal plane, <kbd>Q</kbd>/<kbd>E</kbd> to fly down/up, hold <kbd>Shift</kbd> for 3× speed.
- **Focus** — <kbd>F</kbd> frames the selected object.
- **Camera bookmarks** — save the current view from the right-click menu (**Camera bookmarks ▸ Save current view**), recall with <kbd>Shift</kbd>+<kbd>1</kbd>…<kbd>5</kbd>.

## Selection

- **Click** an object to select it — the transform gizmo attaches.
- **Double-click** it to open its properties (right-click ▸ *Properties* and the object list do the same). Pin the properties panel if you'd rather it followed every selection.
- **Click empty space** to deselect.
- **Shift+click** adds or removes objects from a multi-selection (the last-picked object is the primary).
- **Shift+drag** on empty space draws a box-select marquee.
- Selecting an object **locks it for other peers** (one lock per person); a locked object shows who holds it, and its right-click menu offers **Request control** to ask for a handover.

### Editing a multi-selection

The properties panel edits **everything you have selected**, not just the last object you clicked. Change a colour, a material, a shadow flag or a physics setting and it applies to the whole set as a **single undo step**; a row whose objects disagree shows a dash until you set it.

Transform rows on a multi-selection drive the selection's **origin** rather than each object's absolute position — typing a value moves the set as a whole instead of collapsing it onto one plane. Name, uuid and geometry stay single-object: click the one object for those.

## Transform gizmo

| Key | Mode |
|---|---|
| <kbd>1</kbd> | Move (translate) |
| <kbd>2</kbd> | Rotate |
| <kbd>3</kbd> | Scale |

Snapping (grid step, rotate degrees, scale step, snap-to-surface) is configured from the right-click menu under **Snapping**.

!!! note "Inside mesh edit"
    While an [Edit Mesh](mesh-editing.md) session is open, <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd> switch between vertices, edges and faces instead.

### Each object's origin

Every object carries its own **origin** — the point it rotates, scales and hinges around. The properties panel's Transform section has one-click presets — **Bottom**, **Centre**, **Median**, **World 0**, and **Children** for a group — or you can place it by hand:

- **Move origin** switches the gizmo to the pivot: drag it (or type coordinates) and the mesh stays put. Grid and surface snapping still apply. Press **Done** when it's where you want it.
- **Pick from mesh…** opens [Edit Mesh](mesh-editing.md) so you can put the origin on real geometry: click a vertex — or Ctrl+click both ends of an edge to hinge on it — then press **Set origin here**.
- **Bottom** puts the pivot on the footprint, so the object sits on the ground.
- Flow **Spin** and **Orbit**, and physics joints, all turn about the origin you set — that is how you hinge a door.

The origin travels with the object: it replicates, saves, undoes, and is baked in on GLTF export.

### Numeric fields

Every number in the app is the same control: **drag** it to scrub, or **type** into it for live updates. <kbd>↑</kbd>/<kbd>↓</kbd> step by one unit — hold <kbd>Ctrl</kbd> for ×10, <kbd>Shift</kbd> for ×100 — and <kbd>Esc</kbd> reverts what you typed.

## Keyboard shortcuts

Shortcuts are inert while you type in a text field and while play mode owns the keyboard. The same list is shown in **Settings ▸ Shortcuts** (<kbd>Ctrl</kbd>+<kbd>/</kbd> opens it directly).

!!! tip "Finding a setting"
    Settings is grouped into **Interface** (theme, notifications, windows, lists and menus), **Controls** (keyboard, mouse and trackpad), **Scene** (grid, shadows, autosave and everything about the scene itself), then **VR**, **AI**, **Connection**, **Shortcuts** and **About**. If you don't know which one holds what you want, type in the search box at the top — it filters every section at once, and the ✕ clears it.

| Keys | Action |
|---|---|
| <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> | Gizmo: move / rotate / scale |
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | Fly the camera (horizontal) |
| <kbd>Q</kbd> / <kbd>E</kbd> | Fly down / up |
| <kbd>Shift</kbd> (hold) | Fly 3× faster |
| <kbd>F</kbd> | Focus the selected object |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | Duplicate the selection (whole set) |
| <kbd>Delete</kbd> / <kbd>Backspace</kbd> | Delete the selection (a group asks first) |
| <kbd>Tab</kbd> | Toggle [mesh edit](mesh-editing.md) mode (<kbd>Esc</kbd> also exits) |
| <kbd>O</kbd> | Toggle the object list |
| <kbd>N</kbd> | Toggle the node editor |
| <kbd>C</kbd> | Toggle chat |
| <kbd>Shift</kbd>+<kbd>A</kbd> | Open the Add menu |
| <kbd>P</kbd> | Start / stop the physics [simulation](physics.md) |
| <kbd>`</kbd> | Toggle the [AI](ai/assistant.md) quick-prompt bar |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | Save a session |
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
- **Tools** — Draw mode (drag 3D strokes on surfaces), Measure distance, Simulate physics.
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
