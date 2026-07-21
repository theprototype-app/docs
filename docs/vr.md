# VR Guide

ThePrototype runs in a WebXR headset browser — build, edit and collaborate in room-scale with the same scene your desktop peers see. This page maps out the controls, the radial menu and the VR-specific settings.

!!! note
    VR is fully collaborative: your movement, hands, selections, edits, notes and pings all replicate. Desktop and VR peers share one scene.

## Entering VR

Open the app in your headset browser and press the on-screen **Play** button — when a headset is present it reads **Enter VR** (or **Enter AR** in passthrough mode). Passthrough/mixed-reality is a Settings toggle that keeps your room visible behind the scene.

**Refresh rate** — under **Settings ▸ VR** you can pick **Max / 90 / 120 Hz**. *Max* uses the highest your headset reports; 120 Hz needs the Quest 120 Hz system setting enabled and applies on VR entry.

## The controllers at a glance

| Input | Does |
|---|---|
| **Trigger** | Point & select — pick objects, press menu tiles, paint colors, draw, pick faces/vertices. |
| **Grip / squeeze** | Grab the pointed object and move it. |
| **Both grips (empty air)** | Grab the *world* — move, rotate and scale yourself relative to the scene. |
| **Left thumbstick** | Move / strafe (forward follows your aim while VR flying is on). |
| **Right thumbstick up** | Aim & fire a teleport arc. |
| **Right thumbstick left/right** | Snap-turn. |
| **Menu-hand B / Y button** | Toggle the radial menu. |
| **Right-hand A button (hold)** | Push-to-talk voice. |
| **Right thumbstick click** | Ping where you're pointing. |

One hand is the **menu/pointer hand** (right by default; switchable), the other drives locomotion.

## The radial menu

Press **B/Y on your menu hand** to open the radial menu. On hand-tracked hands (no buttons), **pinch and hold** for about half a second instead — a quick pinch stays a normal click.

Point at a sector and pull the trigger (or nudge it with the thumbstick and click) to choose it. Sub-menus stack; the **center hub** is context-sensitive:

- **✕ Close** at the root with nothing selected,
- **Edit** at the root when an object is selected,
- **← Back** inside a sub-menu.

### Root ring

| Sector | Opens |
|---|---|
| **Objects** | The scene object list panel. |
| **Add ▸** | Spawn primitives (Box, Wedge, Stairs, Sphere, Cylinder, Torus) and open **Prefabs**. |
| **Scene ▸** | Environment presets + the snap-turn angle. |
| **Tools ▸** | Select · Box Select · Draw · Ping. |
| **Undo / Redo** | Step history. |
| **Chat** | The VR chat panel. |
| **System ▸** | Grid, world reset, settings, hand swap, stats, grab mode, mic, exit VR. |

### Edit ring (with an object selected)

The hub becomes **Edit**. It offers **Snap**, **Duplicate**, **Delete**, **Color** (a live palette), **Wireframe**, **Properties**, **Save prefab**, and **Edit Mesh** — which becomes **Ungroup** when the selection is a group. Mesh editing opens face/vertex tools (Extrude, Inset, Move, Delete).

### System ▸

Grid toggle, **World 1:1** (reset a scaled/rotated world grab), **Settings**, **Swap hand**, **Statistics**, **Grab mode** (cycle the grip style), **Mic ▸** (PTT / Open / Off) and **Exit VR**.

## Getting around

- **Move** — push the left thumbstick. With **VR flying** on, forward follows where your controller aims; otherwise it stays level. Hold the **left grip** to switch the stick to panning and elevation.
- **Teleport** — push the **right thumbstick up** to arc a beam, release to blink to the landing spot (on the ground or any upward-facing surface). Toggle teleport in Settings.
- **Snap-turn** — flick the right thumbstick left/right to rotate in fixed steps. The **snap angle** is Off / 15° / 30° / 45° (default 45°), shown live in the Scene radial and VR Settings; **Mirror snap turn** flips the direction.
- **World grab** — grip with **both hands in empty air** to grab the whole world: pull your hands apart/together to scale, twist to rotate, move to reposition. **System ▸ World 1:1** snaps it back to normal.

## Grabbing, scaling and stretching

- **Grip** an object to grab it. The default *rigid* grab treats the controller as a handle — the grabbing hand's thumbstick reels the object nearer/farther and scales it. (Other grab styles are available via **System ▸ Grab mode**.)
- **Two hands** on the same object scales it uniformly by the distance between them.
- **VR Stretch** — non-uniform, per-axis scaling. From the Edit menu, grab the **W/H/D slider handles** and drag horizontally to stretch that axis; the result is baked when you confirm.
- **Box Select** (Tools ▸ Box Select) — pull the trigger to anchor one corner, drag out a box, release to select everything inside it.

## Editing meshes in VR

VR supports both face and vertex editing:

- **Faces** — point at a face and Extrude, Inset, Move or Delete it. Extrude/Inset become a live adjust you drive by moving the controller; you can also grip a face to grab it directly.
- **Vertices** — pick vertex handles with the ray, or grip-drag them. *Hold to move vertex* (Settings) chooses between hold-style and toggle-style dragging.

!!! warning "Density caps"
    To stay smooth in VR, mesh editing is limited to **300 triangles** for face editing and **500 vertices** for vertex editing. Denser meshes refuse with a toast. (The default sphere is above these caps — a lower-detail primitive or an imported low-poly mesh edits fine. The full-featured mesh editor is desktop-only.)

## Floating panels

The menu opens follower panels that hang in space — Objects, Properties, Color palette, Prefabs, Keyboard, Chat, Stats, plus the Edit/Snap/Settings menus. Every panel is **grip-grabbable**: hold the grip on a panel to detach and reposition it, and the gripping hand's stick resizes it. Your layout is remembered; **Reset panel positions** (VR Settings, or the desktop Settings button) restores the defaults.

Typing uses the **VR keyboard** — it pops up for renaming an object and for chat messages; point at keys and press with the trigger.

## Hand models

How you see hand-tracked *peers* is a local choice — **Settings ▸ VR ▸ Peer hand style** (also **System ▸ Settings** in VR):

- **Model** — rounded capsule hands,
- **Hands** — cuboid finger bones,
- **Spheres** — a sphere per joint.

You can also set **My hand model** to a GLB from your Explorer library — it becomes part of your identity, pushed to peers so they see your custom hands rigidly posed at your wrists.

## Pinging in VR

Click the **right thumbstick** (or **Tools ▸ Ping**) to ping where you're pointing. If the ray hits an object, the ping flashes a highlight on it for everyone; otherwise it marks the point on the ground. Pings carry your chosen color and chime and buzz a short haptic pulse — see [Pinging](notifications.md#pinging).

## Voice in VR

Hold the **right-hand A button** for push-to-talk, or set a mic mode (**PTT / Open / Off**) from **System ▸ Mic**. A mic dot in the corner glows green while you transmit. Voice is spatial — peers hear you from where your avatar stands.

## VR settings reference

Reachable from **System ▸ Settings** in VR, and mirrored in the desktop **Settings ▸ VR** section:

| Setting | Values |
|---|---|
| Teleport | on / off |
| Snap turn | Off / 15° / 30° / 45° |
| Mirror snap turn | on / off |
| VR flying | on / off |
| Hold to move vertex | on / off |
| Refresh rate | Max / 90 / 120 Hz |
| Peer hand style | Model / Hands / Spheres |
| My hand model | any GLB in your library |
| VR menu on left | on / off |
| Passthrough (AR) | on / off (applies next entry) |
| Reset panel positions | button |

!!! note
    On-device feel — comfort, reach, snap cadence — is best judged in the headset. Start with teleport on and 45° snap turns if motion bothers you.
