# Welcome

ThePrototype is a collaborative 3D prototyping app that runs in your browser — sessions are peer-to-peer, and you need no account.

You build scenes from primitives, imported models and packs, wire behavior with a visual node graph, and everything you do is instantly visible to everyone connected to you.

## How it works

**Sessions are peer-to-peer.** Your edits, objects, node graphs, voice and chat go straight from your browser to the
people you are connected to (WebRTC). Servers do the jobs a browser cannot do alone; on theprototype.app they are ours:

- **Signaling** introduces you to each other, and a **TURN relay** carries a session's encrypted traffic when two
  networks cannot reach each other directly ([Connection](connection.md)).
- **Accounts and cloud saves** — optional. Without signing in your scenes stay in your browser; signed in, you can
  keep [cloud saves](community.md#cloud-saves-and-kept-rooms).
- **Assets** — packs, skies and models download from our storage and the jsDelivr CDN (and are
  [kept on your device](settings.md#downloads-kept-on-this-device) afterwards).
- **Community pages** — published scenes, play links, embeds and the gallery.
- **Anonymous error reports** (on by default, one switch turns them off — [Privacy](privacy.md)) and **anonymous
  aggregate counters**, such as page views, with no cookies and nothing that identifies you.

The app is open source: a build pointed at your own signaling server, or fully [self-hosted](security.md#self-hosting),
involves none of our servers.

## Quick start

1. **Open the app** in a desktop browser (VR headset browsers work too).
2. **Create something** — right-click the empty viewport and pick **Add ▸ Mesh ▸ Cube**. (If you prefer <kbd>Shift</kbd>+<kbd>A</kbd> for the Add menu, switch on **Shift+A quick add** in **Settings ▸ Controls ▸ Keyboard & mouse**.)
3. **Move it** — click the cube to select it, then use the gizmo (<kbd>1</kbd> move, <kbd>2</kbd> rotate, <kbd>3</kbd> scale).
4. **Invite a friend** — open the Connect panel, copy your peer ID and send it to them. They paste it into their own Connect field and press **Connect**; you approve the request, and from then on you are editing the same scene together.

!!! tip
    Everything replicates automatically: objects, transforms, materials, the node graph, chat, pings and voice. There is no "sync" button — if you can see it, your peers can too.

**Install it as an app.** theprototype.app is a web app you can install: your browser's *Install app* (or *Add to Home
screen* on a phone) puts it on your desktop or home screen, and it opens in its own window without the browser's bars —
on a phone that gives the scene the whole height of the screen.

**Open source.** The app itself is open source under the MIT licence:
[github.com/theprototype-app/core](https://github.com/theprototype-app/core) (also **Settings ▸ About ▸ Source Code**),
with a contributing guide and an `llms.txt` for coding agents.

## What's new

**1.48 — AI agents in your session.** Send Claude (or any MCP agent) your session link and build together:
`claude mcp add theprototype -- npx -y @theprototype/agent mcp '<link>'` and it joins as a peer, builds with the app's
own tools — objects, flow nodes, physics — checks its work with screenshots, and lists every step in the AI assistant
window for everyone to select or undo ([Build with an AI agent](ai/build-with-an-agent.md)). **Connect ▸ Request AI**
makes [invite links](invites.md) for agents and people: View or Edit, 10 minutes to a day, one or more uses, revocable,
no approval card. Right-click anyone in the Connected panel for the new [peer menu](people.md) — profile, Go to, Hide —
and, for the host or an admin, **Remove** or **Remove and block** with **Allow back**.

**1.47 — game logic in the headset.** Radial ▸ **Tools ▸ Logic** opens the node graph as a panel in VR: move cards,
wire sockets with the laser and set values on a wrist pad, and everyone sees it live — see
[Logic in the headset](building-in-vr.md#logic-in-the-headset). An Android phone can now
[join a room the headsets calibrated](colocation.md#join-from-a-phone) with two taps on the floor and see the scene where
they do, and an unfolded phone's Play menu offers the AR table and Join the room.

**1.46 — every panel in its own window.** Pop out any panel — or a whole dock — into its own browser window and
spread the editor over two monitors: the Explorer on one screen, the Node editor and Timeline on another, the 3D view
full-size in the app. Drag tabs between windows and docks; a panel lives in one place, and your windows come back on
the next visit ([Windows on several monitors](interface.md#windows-on-several-monitors)). The Code tab now makes,
renames, moves and deletes [files and folders](code-workspace.md#files-and-folders) itself — a new script opens from a
behaviour template. Also: renaming a shared file reaches everyone, and saving a shared file no longer leaves a copy of
its old version in the Library.

**1.45 — build in the headset.** Everything you need to build a scene now works in VR — see
[Building in VR](building-in-vr.md). Both grips **shrink the world** to a 1:50 miniature to work from above (Back to 1:1
on the radial), **Tools ▸ Measure** snaps points to corners with the laser, **Selected ▸ Arrange** aligns, spaces and
drops a selection, the Sculpt ring gains terrain **Paint** and the **Scatter** brushes, and **Add ▸ Assets** opens an
Asset Browser on your wrist with the drag-to-place ghost on your laser. With hand tracking a pinch browses and places.
Also: [On Impact](nodes/onimpact.md) fires on a hit from any side (new **From** option; old scenes keep landings only),
Rotate / Motor nodes spin up from rest and an auto-starting HUD Timer counts its full time, six nodes show the sockets
they read, and the profile button opens with Enter or Space. Someone who joined your room keeps their role after a
network or signaling blip — they used to come back View-only ([connection drops](connection.md#when-the-connection-drops)).

**1.44 — quick wins.** [Play here](play-here.md) starts Play where your camera is (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Enter</kbd>)
and Stop puts the camera back. Drop an image on the viewport for a see-through [reference image](reference-images.md)
to trace over — hidden in Play, never exported. With the app installed, [share files into it](sharing-into-the-app.md)
from your phone or open a `.tpscene` from your desktop. Paste a scene link into Notion or WordPress and it
[plays in place](community.md#paste-a-link-get-a-game-oembed) (oEmbed). Movement stays
[smooth on a lossy connection](connection.md#smoother-movement-on-a-bad-connection), and packs and skies are
[kept on your device](settings.md#downloads-kept-on-this-device). Also: people who drop out leave the Users list on
their own, a guest who joins automatically is announced with **Remove**, rooms and people can be
[reported](community.md#reporting), and the AI assistant's objects stay put in Play unless you ask for physics.

**1.43.1 — security fix.** Code that travels in a scene — Script nodes, Behaviour files, a Character Controller's
Player code and Custom (code) HUD elements — now runs in a [sandbox](security.md#scene-code-runs-in-a-sandbox) with
no access to the page, your keys, your sign-in or the network. Built apps ship a Content-Security-Policy
([self-hosting](security.md#self-hosting)), invite links that name another signaling server ask first, and on
theprototype.app play links and embeds open from play.theprototype.app. Advisory:
[GHSA-r74q-9hg7-wrgr](https://github.com/theprototype-app/core/security/advisories/GHSA-r74q-9hg7-wrgr).

**1.43 — scatter everywhere.** [Scatter](scatter.md) works on [any object](scatter.md#add-scatter-to-an-object) now,
not just terrains — moss on a rock, barnacles on a ship — and moves with it. A set can
[fill](scatter.md#fill-and-masks) by count or density with a minimum spacing and slope, height or painted-layer masks,
[mix models](scatter.md#mix-tint-and-sink) by weight with tint and sink, and draw pack items, prefabs (their look) or
any object you pick. [Edit instances](scatter.md#edit-instances) with Rotate, Scale, Relax and a Select tool with a
gizmo, and [convert both ways](scatter.md#convert-both-ways) — a prefab comes back with its logic. Everyone gets the
same layout from a seed + your edits, while [far scatter thins](scatter.md#distant-scatter-each-device) to each
device's budget.

**1.42 — together and anywhere.** Open the same code as someone in your session and you
[type into one text together](code-workspace.md#editing-together): two people in one line both keep their typing,
everyone's cursor and selection show in their colour, an **Editing with you** strip names who is where, a late joiner
sees the unsaved text, and <kbd>Ctrl</kbd>+<kbd>S</kbd> saves as before. Explorer
[text documents](code-workspace.md#text-documents) open in the Code tab and are shared the same way. **Pop out** puts
the [code editor in its own window](code-workspace.md#pop-out-to-its-own-window) for a second monitor; **Dock back**
returns it. On an Android phone, [AR table](ar-table.md) puts your scene on a real table through the camera — tap to
place, pinch and twist, then **Play**. Also: checkpoint pictures show the scene without gizmos, and
[very large scenes](checkpoints.md#very-large-scenes) skip automatic checkpoints.

**1.41 — accessibility.** A new [Accessibility](accessibility.md) page in Settings: a **UI scale** from 90 to 150 %
(every panel and the phone layout; the 3D view keeps its full resolution), **Motion** (*Follow system* / *Reduce* /
*Full*) and **Show captions**. **High contrast** is a real theme now — text at 7:1, a thick selection outline and
bigger handles — and status colours are [colour-blind safe in every theme](accessibility.md#status-colours-you-can-tell-apart),
each with a shape. The whole editor works [from the keyboard](accessibility.md#keyboard-navigation) (a skip link,
focus rings, arrow keys in toolbars, <kbd>F6</kbd> between regions, <kbd>Esc</kbd> out of everything) and with a
[screen reader](accessibility.md#screen-readers) (toasts read aloud, selection says name and kind, the object list is
a tree). Every game gets a player **Accessibility** menu — captions, a colour-blind filter, HUD text size and
remappable controls — and VR has a Low / High comfort vignette, **Recenter** for seated play and **One-handed** mode:
see [Making your game accessible](making-your-game-accessible.md).

**1.40 — physics and water.** A fast, small body can have [continuous collision](physics.md#continuous-collision-per-object)
of its own (**Properties ▸ Physics ▸ Continuous collision**), so a bullet or a thrown ball never passes through a thin
wall. [On Impact](nodes/onimpact.md#on-the-object-that-was-hit) also fires on the static or kinematic object that was
hit — a pressure plate, a target, a moving platform — with **other** = the body that landed. A fluid tank's pour
[joins the pool](simulation.md#pouring-into-a-pool) it lands in and ripples it, and tanks can run on the graphics card:
[GPU fluid](simulation.md#gpu-fluid) (**Settings ▸ Scene ▸ Performance**) measures your device once and uses WebGPU
only where it is clearly faster. Also: a **View only** joiner sees the room's HUD, shader graphs, animation and look at
once ([Joining](connection.md#the-request-and-how-it-ends)), 3D labels and VR panel text work offline, error reports
strip server names and IP addresses ([Privacy](privacy.md#what-a-report-holds)), and the Pool party toys float like
foam.

**1.39 — logic you can see.** The [Node Graph Debugger](debugger.md) pauses your game when an event reaches a node
with a breakpoint (<kbd>F9</kbd>), steps event by event (<kbd>F10</kbd>), shows the live value on every wire and keeps a
watch list — all local to you, while the other players keep playing. The [Timeline](timeline.md) lays camera shots
(with a glide between two cameras), animation clips, sounds and events into a sequence that the
[Play Sequence](nodes/playseq.md) node or **Autoplay** starts — in exported games too — and
[On Sequence Event](nodes/onseqevent.md) wires back into your graph. [Measurements](measure-align.md#kept-measurements)
are now kept in the scene: in the object list, shared and saved, and <kbd>Tab</kbd> edits their points. Scattered rocks
and trees can be [solid](terrain.md#scatter-collider) for every player. The app sends
[anonymous error reports](privacy.md#anonymous-error-reports) — no account, no IP, no scene content; **Settings ▸
Privacy** turns them off — and [status.theprototype.app](connection.md#the-status-page) says whether the service is up.
Also: the [budget chip](controls.md#moving-the-clusters) moves and hides in Edit positions,
[large CC0 materials](materials.md#what-gets-saved-and-where) reach every peer,
[Settings ▸ About ▸ Third-party licences](settings.md#third-party-licences) lists every library the app uses, small
models [skip the optimizer](import-optimize.md#what-happens-on-import), Statistics groups with other windows and a
floating window [drops into a split dock pane](interface.md#splitting-the-dock).

**1.38 — build precisely.** [Measure](measure-align.md#measure) snaps to corners, edges and faces, chains segments
with a running total and the angle between them, and pins dimension labels only you see; [Align, Distribute and Drop to
ground](measure-align.md#align-distribute-and-drop-to-ground) line up a selection from the Properties **Arrange**
section or the object menu's **Transform ▸**, one undo each. The [Asset Browser](free-assets.md) brings free CC0 models,
skies and textures from Poly Haven and materials from ambientCG into your Library, sky and material presets — every
asset keeps its credit. And a Terrain can be [painted with four texture layers](terrain.md#painting-layers) and
[scattered](terrain.md#scatter) with trees, rocks or any Library model.

**1.37 — fast on every device.** [Big models are optimized as they come in](import-optimize.md): over 50k triangles or
with a texture over 2048 px, an import gets a level-of-detail chain and its textures are resized and GPU-compressed
(KTX2/Basis — about an eighth of the texture memory on a Quest), while the original stays in the Library and the toast
offers **Keep original only**. **Settings ▸ Import** holds the defaults, a file's Properties has its own **Import
settings** and **Reimport**, and **Configure Scene ▸ Level of detail** sets one [LOD distance](lod.md#the-scenes-lod-distance)
for the whole scene. Exports get [**Optimize for: For Quest / web**](publish-export.md#optimize-for-quest-web) — a GLTF
becomes a compact `.glb`, a Scene keeps its format with compressed textures and LOD chains. A
[budget chip](performance.md#the-budget-chip-will-it-fit-on-a-quest) beside the toolbar says whether the scene fits a
Quest, a phone or a desktop, and **Statistics ▸ Budget** lists the heaviest objects with what optimizing them would save.
[HEIC / HEIF photos](explorer.md#heic-heif-photos) import as images and textures, and [Race](race.md#in-vr) keeps its
shadows in VR — inside the Quest budget.

**1.36 — your 1.35 review.** Right-click the [Connect bar](controls.md#the-connect-bar) — or press and hold it on a
touch screen — for **Move**, **Pin to top row** / **Float**, **Reset position** and **Reset all**, in or out of Edit
positions; a moved Connect bar stays where you put it. The buttons beside the logo, hidden by default on a computer,
come back from [Edit positions](controls.md#moving-the-clusters): their menu's **Show cluster** turns them on and their
grip moves them like every other cluster. When a sidebar is pinned, unpinned or closed, the logo, the buttons beside
it, the corner buttons, the profile and the Connect bar jump to their new place at once instead of sliding, and the
[profile menu](interface.md#the-main-hud) opens under the profile button wherever it is. Hold <kbd>Ctrl</kbd>
(<kbd>Cmd</kbd> on a Mac) while dragging a floating window to [place it without docking](controls.md#moving-a-floating-window)
— over a sidebar or the dock; docking stays the default, and on touch a docked tab's **Undock into a floating window**
takes a window out. Fixed: switching dock tabs no longer flashes a docked Statistics, Objects, Chat or AI assistant
window full screen for a frame, and the empty dock's tab strip no longer shows a sliver of a tab bar left of its **+**. Under the hood: the
open security alerts are cleared, Node is pinned, and every release ships an SBOM.

**1.35 — your 1.34 review.** A floating window now [moves by any empty part of it](controls.md#floating-windows), not
only its header, and **docks by drag** — onto the dock's tab strip, the bottom edge or either sidebar, with the mouse
and on an unfolded phone by touch; right-click (or press and hold) its header or a group tab for the
[window menu](controls.md#the-window-menu): Dock to bottom, Move to the left / right sidebar, Float, Group with…,
Bring to front, Reset size, Close. <kbd>T</kbd> opens an [empty dock](interface.md#docked-windows) that takes a drop,
and [every **+**](interface.md#the-menus) lists every window: one that is already open is ticked, says where it is and
comes to the front there — no second copy — and <kbd>Ctrl</kbd>- or <kbd>Shift</kbd>-click picks several.
[Sidebars](interface.md#sidebars) get a **+** too, stay open when you empty them, and <kbd>Ctrl</kbd>+<kbd>B</kbd> /
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> show and hide the left and right sidebar with their tabs kept open. The
[dock splits side by side](interface.md#splitting-the-dock): **Split** puts two windows in one *A / B* tab with a
draggable divider, and splits are remembered. Every docked window — Statistics, Chat and the AI assistant too — stops
at a Full-height sidebar. [Edit positions](controls.md#moving-the-clusters) arranges every button cluster — the toolbar,
both corner stacks, the buttons beside the logo, the top-right group and the Connect bar: drag one anywhere, it snaps
and never overlaps, and **Rotate to vertical** stands the toolbar on the left edge; **Move toolbar** works by touch.
The [Connect bar](controls.md#the-connect-bar) is **Pinned** or **Float**, and a floating one with no room turns
compact. In [focus mode](interface.md#the-viewport-picture-in-picture) a **Viewport** button beside Exit focus shows or
hides the 3D preview, and the choice is remembered; [Settings](settings.md) no longer closes your sidebars or docked
windows. Fixed: a [Profiler](profiler.md) selection counts exactly the frames you picked, an invite link to a server
that cannot be reached [puts you back online](connection.md#when-things-go-wrong) on your previous server, a big scene
no longer stalls a phone while it opens, and repeated lines in [Copy diagnostics](connection.md#diagnostics-you-can-copy)
are counted (×N).

**1.34 — your 1.33 review.** Right-click any value in Properties or Configure Scene (press and hold on a touch screen)
to [copy, paste or reset it](controls.md#copy-paste-and-reset-values) — one number, a whole vector or just its X, Y or
Z, a colour, a choice, or a whole section from its header (also *Copy as JSON*); <kbd>Ctrl</kbd>+<kbd>C</kbd> /
<kbd>Ctrl</kbd>+<kbd>V</kbd> over a field skips the menu, a section pastes to every selected object, and every paste is
one undo. It is plain text, so `1, 2, 3`, `Vector3(1, 2, 3)`, `#ff8800` and JSON all paste back. Sidebar tabs get an
**×**, a [right-click menu](interface.md#sidebars) and sideways scrolling; [drag a tab](interface.md#dragging-a-tab)
into the 3D view to float it, onto the dock or onto the other side, with every drop highlighted first. [Any
window](interface.md#any-window-in-a-sidebar) — Node editor, Code, Explorer, Statistics… — can live in a sidebar, with
no second header, and the [header lock](interface.md#panel-headers) sits beside Full height. Toolbar buttons that do not
fit fold into a [**»** menu](controls.md#when-the-buttons-do-not-fit) and come back by themselves; a right-click
anywhere on the toolbar opens its menu; the [**…** button](controls.md#the-button) and the
[Connect bar](controls.md#the-connect-bar) can be hidden, and the Connect bar takes its own row only when the top is
full. The toolbar [keeps clear of full-height sidebars](controls.md#the-toolbar-and-sidebars), and with a mouse
[Edit positions](controls.md#edit-positions) arranges the row beside the logo too. [Focus mode](interface.md#focus-mode)
on a docked window now fills the whole window while the sidebars step aside, and the 3D view stays with you as a live,
resizable [picture-in-picture](interface.md#the-viewport-picture-in-picture) you can orbit, select in and transform
with <kbd>W</kbd> / <kbd>E</kbd> / <kbd>R</kbd>. The [camera preview](camera.md#camera-objects) resizes too. On a phone
[Statistics is a dock tab](interface.md#the-dock-on-a-phone), and the tip in More goes away once you have arranged the
bar (**Settings ▸ Interface ▸ Reset tips** brings it back).

**1.33 — your 1.32 review.** On a computer each side of the screen has [one sidebar](interface.md#sidebars), and
Configure Scene, Properties, Objects and any window you dock to an edge are its **tabs** — opening one brings its tab
forward instead of a second column. Drag a tab to the other side to dock it there, and the **↕** button runs a sidebar
from the top edge to the bottom. A lock in the Properties and Configure Scene headers lets the name and *Filter
properties* [scroll away](interface.md#panel-headers). On a phone you [arrange the bottom bar from More](interface.md#the-phone-bar-and-more):
press and hold any item and drag it onto the bar, along it or off it — Play too — up to seven items, with Inspect, Move,
Rotate, Scale, Statistics, Tools & View and Focus mode all placeable, and **Show** switches for the selection toolbar,
the dock's tab row and the grab handle; *Edit bar…* is gone and a 1.32 bar carries over. [Every floating
window docks](interface.md#docked-windows) by dropping it on the dock's tab row — Objects, Statistics, the Live profiler,
Chat and the AI assistant too — and floating windows can overlap the dock. [Focus mode](interface.md#focus-mode)
(<kbd>Ctrl</kbd>+<kbd>Space</kbd>) gives the screen to the 3D view or to the docked window under the pointer;
<kbd>Esc</kbd> brings everything back. [Edit positions](controls.md#edit-positions) now reaches the top-right icons
and the touch tools, with up to four buttons a corner; **Lift corner buttons above docked panels** joins the
[toolbar's menu](controls.md#the-toolbar), and [workspace layouts](controls.md#workspace-layouts) keep the toolbar —
the desktop one and the phone bar separately. Configure Scene starts with a [Quality preset](performance.md#the-quality-preset)
(Auto / High / Medium / Low, this device), the auto-quality notice is [one card](performance.md#when-quality-is-lowered-for-you)
instead of a stack, the unsaved-scene notice no longer flickers while a peer edits, and
[Save options](saving.md#save-options) open full screen on a phone.

**1.32 — your 1.31 review, fixed.** On a phone every sheet has [one grab bar](interface.md#sheets-on-a-phone): drag
it to resize the sheet, swipe it down to close it, and no sheet covers **Play**. **Customize character** and **Profile
settings** open again from the profile menu, and in the Explorer you [press and hold](explorer.md#on-a-phone) a file
or folder for its actions. [Docked windows](interface.md#docked-windows) close from their tab; **Undock** sits beside
*Minimize the dock* (**Settings ▸ Interface ▸ Windows & chrome ▸ Undock button** can take every tab out as one
window), a floating window with tabs can **Dock all tabs**, a tab dragged onto a floating window joins it, and the
phone's **+** opens a **Windows** sheet. Long names stay on one line, and **Layouts** is a regular dialog (a dock tab on a phone). Automatic
quality no longer switches water refraction and the rest off and on, and says what it lowered
[once, with **Keep full quality**](performance.md#when-quality-is-lowered-for-you). A big photo now
[becomes a texture](image-editor.md#big-photos-as-textures) instead of being refused, and the new
[Image editor](image-editor.md) crops, rotates, resizes and adjusts a picture and updates its textures for everyone.
**Templates ▸ Examples ▸ Aquarium** is a reef from the new [Aquarium Kit](packs.md#aquarium-kit-132), swimming with
four new motion nodes — [Follow Path](nodes/followpath.md), [Wander](nodes/wander.md),
[Orient to Velocity](nodes/orientvelocity.md) and [Body Wave](nodes/bodywave.md) — with a
[Fish scales](materials.md#fish-scales-and-the-look-tier) preset. LOD groups no longer stay on their first level in
scenes with water.

**…and from your review of the 1.32 preview.** Right-click (or press and hold) a toolbar button ▸
[Edit positions](controls.md#edit-positions) to drag the toolbar and corner buttons into place — **−** removes, **+**
adds, **✓** applies. On a phone the [selection toolbar](interface.md#the-selection-toolbar)'s **Inspect** opens *and
closes* the properties, a tap on a selected object deselects it, adding an object no longer opens the properties, and
[Interact](controls.md#edit-and-interact) gives your selection back when you leave it and
[carries things](physics.md#carrying-things-in-interact) from the point you grabbed. Phone sheets
[pull down to close](interface.md#sheets-on-a-phone) from their list, the main menu closes on a press outside it, and a
note steps through [all the notes](notifications.md#adding-a-note). Tabbed windows drag by touch, and on a computer you
can [drop a window onto the dock's tab bar](interface.md#docked-windows) exactly where you want it; the dock's **+**
lists every window, the [Image editor](image-editor.md#in-the-dock) included. **Customize character** opens a
[studio](avatars.md#the-studio) around your character, and **Surprise me** deals a new look on every press.
[Dialogs](interface.md#dialogs) cover the whole screen, and questions — *Delete flow*, *Restore previous session?* —
are dialogs instead of toasts. The connection pill shows a [coloured dot](connection.md#the-status-dot), and
reconnecting after a tab switch no longer toasts. The node editor has a one-line
[breadcrumb bar](node-editor.md#the-breadcrumb-bar), and the Profiler a [Details and Settings](profiler.md#details-and-settings)
sidebar and a resizable split. And from the second look at the preview:

- On a phone, **Properties, Objects, Notes, Configure Scene and Layouts** are [tabs of the bottom dock](interface.md#the-dock-on-a-phone)
  beside the Explorer, instead of drawers behind it. **Inspect** brings Properties to the front, nothing covers **Play**,
  and unfolding the phone puts each panel back in its sidebar or window — folding brings the tabs back.
- Tapping the bottom-bar button of the view on screen [minimizes the dock](interface.md#on-a-phone); the main menu closes
  as Configure Scene opens on a phone (on a computer it stays open).
- **More** can come off the phone's bottom bar, and **Play** can move along it. Play starts as plain Play on a phone;
  pick VR or AR from its press-and-hold menu and its icon follows.
- The selection toolbar follows a sheet as you resize it, without lagging behind, and the profile sheet no longer repeats
  your picture.
- The phone's Connect chip says **Connected**, **Connecting…** or **Offline** beside the [dot](connection.md#the-status-dot)
  when there is room.
- The [peers panel](connection.md#who-is-here-the-peers-panel) is wider, one row per person; on a phone it is a sheet like
  the notifications.
- The main menu's [Project section](interface.md#the-main-menus-project-actions) has a compact two-column layout —
  **New from template…**, **Load** | **Save ▾**, **Import** | **Export…** — and **▾** opens one
  [Save options](saving.md#save-options) dialog. A phone keeps the list; **Settings ▸ Interface ▸ Project actions** switches.
- [Settings rows](settings.md#reading-a-row) keep a switch, a short list, a colour or a button beside their name again, and
  stack only what cannot fit.
- [Modules](modules.md#the-modules-manager) on a phone keep their buttons to the right and expand a long description on a
  tap. In Browse, install several at once: each card says **Installing…** until it is done, and a failed one says why with
  **Retry**.

**1.31 — drag to place.** Drag any object from [Explorer ▸ Packs or ▸ Library](explorer.md#placing-objects) onto the
viewport and a ghost shows where it will land and how big it is — width × depth × height in metres beside the
pointer, the real model when it is already loaded and light enough, its box otherwise. <kbd>R</kbd> or the wheel turns
it, <kbd>Alt</kbd> drops it at the camera's focus, <kbd>Esc</kbd> or dropping back on the Explorer places nothing, and
a drop is one undo step that everyone sees. On a phone, press and hold a card to drag it. **Settings ▸ Scene ▸
Performance ▸ [Placement preview](explorer.md#the-placement-preview-setting)** picks how detailed the ghost may be. Packs
mark what is downloaded, and a pack item's Delete is now
[Delete cache](explorer.md#downloaded-pack-items-and-delete-cache) — the item stays in the pack.

**1.30 — a calm new look, on a desk and in a pocket.** Every window, menu, dialog, the main HUD and the phone layout
now share [one interface](interface.md): one window header and [one tab strip](interface.md#windows-and-tabs), one menu
style with a [shorter object menu](interface.md#menus) (rare actions one level down, nothing removed), calmer dialogs,
and one accent colour — blue for what you can act on, orange only for Play and live states. The HUD is one glass
toolbar, the [Connect bar collapses to a chip](connection.md#the-connect-panel) once you are connected, toasts stack three
at a time, and <kbd>Ctrl</kbd>+<kbd>K</kbd> opens a [command palette](interface.md#the-command-palette-ctrlk) over every
tool, window, menu and setting. While you play a small [banner](physics.md#play-mode-is-interact-mode) says how to stop
(a scene can hide it or use its own words). [Customize character](avatars.md#customize-character) is a resizable drawer
that puts your view back exactly. On a phone, a [decluttered layout](interface.md#on-a-phone) keeps the logo, a Connect
chip and a bottom bar you can rearrange — Add · Objects · Play · Explorer · More — with windows as bottom sheets that
remember their height. Light and custom [themes](appearance.md) restyle everything. Every shortcut, setting, scrub field
and panel works as before.

**1.29 — groundwork for cloud saves and kept rooms.** Under the hood, the app can now tell the
theprototype.app cloud plugin when the scene changes, fingerprint what is in it, and hand over or open a whole
project — what [cloud saves and rooms that stay open when everyone leaves](community.md) are built on. They switch on
on theprototype.app separately; the open-source app is unchanged. Plugin authors: the new calls are in the
[module SDK](module-sdk.md#for-cloud-plugin-authors-scene-changes-and-whole-projects).

**1.28 — VR + mesh: sculpt and snap the world from the headset, polyline knife, live symmetry, smart unwrap.** In a
headset, radial menu ▸ **Add ▸ Terrain** drops a terrain in front of you and you [sculpt it](vr.md#sculpting-terrain-in-vr)
with the trigger — Raise, Lower, Smooth and Flatten, the brush sized and weighted on the thumbstick. Grabbing the world
with both grips now [turns it in 15° steps and sticks at 1×, 2×, 5× and 10×](vr.md#snapping-the-world-while-you-grab-it)
(**World grab snapping**, on by default), **Scene ▸ Dollhouse** shows the scene as a model on a table so you can
[point into it and stand anywhere](vr.md#dollhouse-teleport), and **Add ▸ Architecture ▸** has the desktop's twelve
[walls, doors, windows and stairs](architecture.md#in-vr). In [Edit Mesh](mesh-editing.md) the knife cuts along a
[polyline](mesh-editing.md#polyline-cuts) — <kbd>Shift</kbd>+click for each corner, <kbd>Enter</kbd> to finish — and
[live symmetry](mesh-editing.md#live-symmetry) mirrors every edit across X, Y or Z as you make it, in one undo step. The
new [Smart unwrap (xatlas)](modules.md#smart-unwrap-xatlas) module adds **Unwrap ▸ Smart (xatlas)** to the
[UV editor](uv-editor.md#smart-unwrap-xatlas): automatic seams, packed with no overlaps.

**1.27 — world + nodes: sky images, architecture, smarter nodes, particles that trail.** A [sky
image](camera.md#sky-images-hdri) (an HDRI) can now be the scene's sky and its light: objects take its colours, shiny
ones reflect it, water mirrors its clouds and the sun sits where the photo's sun is. Pick **Clear sky**, **Meadow**,
**Sunrise**, **Starlight** or **Photo studio**, or upload your own `.hdr` / `.exr`, with Rotation, Image light, Sky blur
and Tone mapping, and a [quality setting](camera.md#sky-image-quality) for headsets. **Add ▸
[Architecture](architecture.md)** builds walls with doorways and windows, doors and casement windows that open in
Interact and Play for everyone, and straight, L, U and spiral stairs, every number editable in the Inspector.
[Math](nodes/math.md#more-than-two-inputs) and [Gate](nodes/gate.md#more-than-two-inputs) take up to eight inputs, the
[Switcher](nodes/switcher.md#switching-values) passes on the value wired into the selected item, and the new [Camera
Rig](nodes/camerarig.md) node makes a camera object follow or watch something. Particles can be [drawn as streaks,
trails or a ribbon](particles.md#how-particles-are-drawn) and [inherit the emitter's
speed](particles.md#inherit-velocity), with new **Ribbon trail** and **Magic wisps** presets. [Duplicating both
ends of a joint](physics.md#duplicating-jointed-objects) copies the joint, and [detaching one during a
run](physics.md#breaking-a-joint-during-a-simulation) breaks it with sparks. The [Drivable Car](modules.md#drivable-car)
steers with its front wheels, [Blocks](modules.md#blocks) drops a hundred blocks in one draw call, and modules get
[angle motors, joint limits and their own physics world](module-sdk.md#for-module-authors-joints-and-your-own-physics-world).
Every [number field](controls.md#number-fields-and-undo) is one undo step per drag or typed edit, <kbd>Esc</kbd> cancels
typing, and on theprototype.app [What's New](community.md#whats-new-on-theprototypeapp) opens with the cloud's own news.

**1.26 — editor productivity: edit many at once, prefabs that update, material presets, a new Settings.** With
several objects selected, the [Inspector edits them all](controls.md#editing-a-multi-selection): rows that differ show a
dash, setting one sets every object, and one <kbd>Ctrl</kbd>+<kbd>Z</kbd> puts each back to its own value — lights and
the visibility and shadow flags included. The [pivot point](controls.md#the-pivot-of-a-multi-selection) (Median, Active,
Individual, Parent) has a toolbar button, in VR a grip [carries the whole selection](vr.md#grabbing-a-selection), and
[dragging a selection](controls.md#dragging-a-selection-in-the-object-list) in the object list drops it into a group or
under a parent. Placed [prefab copies stay linked](prefabs.md#updating-every-copy): editing the prefab offers to update
every copy, each keeping its own changes, in one undo step for everyone; copies carry their flow graphs, and the
Prefabs tab gets [folders and tags](prefabs.md#folders-and-tags). [Material presets](materials.md) put Wood, Metal,
Plastic, Glass, Stone, Rubber and Neon one click away in the Inspector, and you can save, import and share your own.
[Settings](settings.md) is redesigned — a grouped menu, sub-pages with a breadcrumb, search that shows where each match
lives, a reset per category, **About ▸ Danger zone** and a [Compact density](settings.md#density). Also new:
[workspace layouts](controls.md#workspace-layouts) (**Menu ▸ Layouts**), [chat](notifications.md#chat) with @mentions,
emoji shortcodes, an unread badge and history for people who join, [threaded replies on
notes](notifications.md#adding-a-note), [Report a problem](profiler.md#report-a-problem) with a picture you can mark up,
an [Undo toast](notifications.md#undo-after-clear-delete-remove) after Clear scene, Delete, removing a module and
resetting settings, and <kbd>Z</kbd> to [cycle the render mode](camera.md#render-mode-view). [Race](race.md) plays [on a
phone](race.md#on-a-phone) with pedals and [in VR](race.md#in-vr) from the driver's seat, and modules get
[pointer, camera, play-mode and VR-seat hooks](module-sdk.md#for-module-authors-pointer-camera-play-mode-and-vr-seat).
Characters [stand on the floor](avatars.md#feet-on-the-ground) with planted feet, an idle one gets [knocked
off](avatars.md#knocked-off-idle) (stars, a woozy sway, star eyes), and [flying in Play is opt-in](physics.md#flying)
per game — a scene can also remove it.

**1.25 — your feedback, fixed: panels that keep their keys, water that behaves.** [Keys follow the panel you are
in](controls.md#keys-follow-the-panel-you-are-in): <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> no longer fly the
camera from the Explorer, the Inspector, a node's graph view, the HUD editor or any tool window, the panel with the keys
shows an outline, the object list keeps <kbd>Delete</kbd> / <kbd>F</kbd> / <kbd>Ctrl</kbd>+<kbd>D</kbd>, and sliders in
nodes never drag the graph. The [code workspace](code-workspace.md) gains sidebars — Open editors and a searchable
Project tree (<kbd>Ctrl</kbd>+<kbd>B</kbd>); Outline, Problems, Bound nodes and Find in files
(<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd>, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>) — plus a scrolling tab
strip, <kbd>Ctrl</kbd>+<kbd>P</kbd> quick open, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> go to symbol and a guard
before closing unsaved code, and a game's [Player has code](code-workspace.md#the-players-code) you can open and save.
The [node editor](node-editor.md#where-it-opens) opens with the whole graph in view, or where you left it (saved with
the scene); [Tidy graph](node-editor.md#tidy-graph) (<kbd>L</kbd>, <kbd>Shift</kbd>+<kbd>L</kbd>) lays a graph out in one
undo step, and [every game's Main graph](games.md#tidy-main-graphs) is tidied. A click now selects [what is inside or
behind water](controls.md#inside-and-behind-water), <kbd>Alt</kbd>+click cycles everything under the cursor, and
**ping moved to <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+click**; opening a scene while another is loading [always gives you the
newest one](saving.md#opening-another-scene-and-modules). Things under water [rise or sink by their
density](physics.md#things-float), every [water setting](water.md#making-water) works on every preset, scenes can [start
their simulation on load](physics.md#start-simulation-on-load) with one Reset / Pause for everything, and water gains
visible bubble emitters, [pour emitters](water.md#pour-emitters), [spilling fluid tanks](simulation.md#spilling) and a
lighter look on phones that still bends the light. New: [Fluids](fluids.md) — **Add ▸ Water ▸ Fluid** pours real particle
water, **Flow path** makes rivers, chutes and pipes, the **Rotate / Motor** and **Float Along Flow** nodes turn wheels
and float boats, and the **Water works** example runs a closed water loop. Also fixed: an old game scene with two
modules no longer opens with its two Code link cards on top of each other, and particle fluid no longer tunnels through
thin walls under pressure.

**1.24 — characters that walk, a race, and your games' stats.** Everyone in a session is now a
[rigged character](avatars.md) — nine CC0 KayKit adventurers and skeletons that walk, run, strafe and jump with their
camera and reach for their VR controllers — and **Customize Character** (profile menu) is a side panel with a live
preview on yourself: body, head (the character's own, a stylised one or your photo), hat, outfit colour and your ping;
the classic floating head is one click away. **Templates ▸ Games** has a new game, [Race](race.md): up to four players,
three laps round a valley, with laps, speed and grip on the **Race rules** node and a road you reshape by moving its
points. [Edit Mesh](mesh-editing.md) gains slide edges, fill holes (<kbd>F</kbd>), connect (<kbd>J</kbd>) and dissolve
vertices, solidify and separate, mitered bevel corners and rounded vertex bevels, and two meshes can be combined with a
[Boolean](mesh-editing.md#boolean) union, subtract or intersect from the object menu. [Checkpoints](checkpoints.md)
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>) keep named and automatic versions of your scene on this device, with a
timeline that restores, compares, notes and pins them, and [Settings](controls.md#the-settings-window) is a window with a
section sidebar. **Tools ▸ [Recording…](recording.md)** films a turntable or a flythrough as a webm, and
[Publish / Export ▸ Community gallery](publish-export.md#the-community-gallery-tab) builds a gallery submission for GitHub.
Every game keeps [one permanent id](community.md#one-game-one-count), so re-exports and the play link count as one game in
**Your games & stats**; community cards, play links and the pause menu get [hearts](community.md#hearts), and the
community browser a **Mine** filter. In a headset a game's HUD [floats in front of you](vr.md#the-game-hud-in-a-headset)
as laid out on the desktop, **Tools ▸ AI** opens an [AI chat panel](vr.md#the-ai-assistant-in-vr) you can talk to, the
assistant gets [voice typing](ai/assistant.md#voice-typing), and the VR keyboard and Settings panel gain punctuation and
a Search tab. Modules can ask [`api.hud.vrHud()`](module-sdk.md#for-module-authors-124) and give their HUD elements a
`vrText`.

**1.23 — readable game logic.** Every rebuilt game's rules are now [one readable script on its Main
graph](game-rules.md) — Mini Golf, Football, Dungeon Realms, The Alchemist's Escape, Sky Run, Target Toss and Marble
Maze — wired to its buttons, HUD, sounds and the kit: tune a number in the node's properties panel, or change the code
and press <kbd>Ctrl</kbd>+<kbd>S</kbd>, and the game plays by your rules on every player's screen, saved with the scene.
The scene's graph is the [Main graph](main-graph.md), and opening an older game adds links to the code that runs it.
Every node's properties are in the node editor's side panel (Script inputs, Behaviour params, module nodes), and a
double-click opens any node's code — module code read-only, with **Make editable copy** for nodes bound to it. The
[code workspace](code-workspace.md) puts scripts, behaviours, script files, module sources and the graph as JSON in
tabs; <kbd>Ctrl</kbd>+<kbd>S</kbd> checks the code and reloads every node that runs it, on every peer, and broken code
never applies. [Script](nodes/script.md) nodes grow the sockets their code uses and get `api.object`, `raycast`, `keys`
and `spawn`; [Math](nodes/math.md) gains pow, sin, cos, abs, round, floor, clamp and negate; and HUD Button, On Game
State and HUD Timer now give a value when wired into a number input. The [node editor](node-editor.md) has its own
keys — shortcuts follow the panel you clicked, so <kbd>C</kbd> opens the chat only from the 3D view — plus groups you
open like folders, markdown notes and frames, right-click menus for the canvas, a node and a selection, mute, collapse,
align and nudge, undo for every edit, and a <kbd>?</kbd> cheat sheet. **Settings ▸ Node types** hides the node types you
never use, groups save and load as `.tpnode` files, and the Edit Mesh keys can be rebound. For modules,
[`api.kit.provide`](module-sdk.md#for-module-and-game-authors-123) lends a game's rules its engine, behaviours get
sockets, and `api.flow.seedGraph` seeds a wired example once.

**1.22 — VR + water.** Any object can be [water](water.md): **Add ▸ Water** makes a tank, a pool or an ocean with waves,
refraction, caustics, foam, underwater fog and bubbles, in nine presets from Pool to Lava and Ice, plus **Rain** and
**Snow** [particle presets](particles.md). [Things float](physics.md#things-float) — or sink, or drift with a river —
and **Add ▸ Simulation ▸ [Fluid tank](simulation.md#fluid-tank)** is a glass box of liquid you can slosh and pour. The
[Jiggle](nodes/jiggle.md) node makes anything lag, wobble and sway. Concave scenery collides as it looks with
[exact mesh colliders](colliders.md#exact-mesh-colliders), **Decompose** keeps a moving arch's openings, and
[collision groups](colliders.md#collision-groups) make ghost walls; On Impact / On Enter / On Exit get
[only with and other](colliders.md#contact-filters-only-with-and-other). In a headset the [radial menu](vr.md#the-radial-menu)
has the desktop's names and icons, [every VR setting](vr.md#vr-settings-reference) is in it, every button can be
[remapped](vr.md#remapping-your-buttons), and seated mode, height, smooth turning and the comfort vignette work everywhere,
not only in games. **Welcome to ThePrototype VR** and a six-step editor tour show newcomers around ([Tours](tours.md)),
and the Quest browser offers **Enter VR** by itself. Opening a scene puts the camera on its [start view](loading.md#start-view)
at once — with **Hold camera until loaded** if you want it kept there — and [Modern placeholders](loading.md#two-looks)
are the default. **Community** joins the profile menu under *Support the project*
([Community](community.md)), and **Templates ▸ Examples** has five new scenes: Aquarium, Pool party, Island ocean, Jelly
room and Fluid tank toy.

**1.21 — quick fixes, publish anywhere**. **Menu ▸ Publish / Export** gathers both ways out: publish to the
community with a play link and QR code that open straight into the game, or [export](publish-export.md) a zip of plain
HTML that plays on itch.io or any static host, or an iframe snippet — every one with the *Made with ThePrototype* badge.
On a phone, games get [touch action buttons](touch-controls.md) you can rearrange and re-skin. A new
[loading placeholder](loading.md) style fills up as each model downloads, can be moved while it waits, and turns red
with **Retry** and **Replace model…** when a file fails. Every [theme](appearance.md) is readable now, Settings has a real
[search](controls.md#keyboard-shortcuts) (names, groups and keywords), menus and panels no longer select text when you
drag ([setting](controls.md#text-selection)), the logo menu fits and scrolls on short and folding phone screens, the
Live profiler moved into the [Profiler tab](profiler.md#watching-a-headset-live), a phone's automatic quality follows its
own refresh rate, hand-set fog keeps its near and far, and Ctrl+D with nothing selected creates nothing.

**1.20 — five new games, measure on the device, build games from a kit.** [Five new games](games.md)
are in the Games tab with no download: The Alchemist's Escape, Marble Maze, Mini Golf, Sky Run and Target Toss. The [Profiler](profiler.md) records
frame time, draw calls and triangles — and, in detail, which objects draw most — against the
Quest budget, compares two recordings, and watches a headset live from the desktop; **Report this
moment** keeps the last 30 seconds when something stutters. Games get a [game kit](game-kit.md)
(rules, rounds, levels, score, pickups, enemies with health and movers) as **Kit:** nodes and as
code, and game logic can be written as a small [behaviour](behaviours.md) file with a live node
view. The [Script node](nodes/script.md) gains typed inputs and outputs, Flow Code shows a graph
as [compact text](node-system.md#flow-code-the-graph-as-text), and modules now
[unload completely](module-sdk.md#new-in-120).

**1.19 — doors that open, scenes that load, games that switch.** Four new [packs](packs.md#the-kits-119)
(Interiors, Town & Market, Interactive, Arcane Study) and two new example levels; doors, lids and levers work in
Interact and Play, and nothing animates by itself any more. Every pack object has [levels of detail](lod.md). Big
scenes load with a progress bar and **Cancel**, opening another scene [asks about the game's modules](saving.md#opening-another-scene-and-modules),
and **Clear scene** can clear the game setup too. A frame counter shows FPS and draw calls.

**1.18 — menus, levels and smooth frames in a headset.** Every game has the same pause menu with per-game Settings and
Levels; in VR the left **X** opens it. The controller laser is easier to see, the radial menu follows the thumbstick,
teleport keeps you inside the play area, and some games let your grips move the world. [Towers](games.md#towers) becomes
twelve levels with stars, the [Stars Room](games.md#stars-room) makes stars with a clap, and three new nodes —
[On Clap](nodes/onclap.md), [Point Grab](nodes/pointgrab.md) and [Game Setting](nodes/gamesetting.md) — build games out
of settings and gestures. A headset starts with lighter quality and [simplifies distant models](lod.md).

**1.17 — games that look finished.** [Edit and Interact](controls.md#edit-and-interact) (the **I** key), click-through
glass, a *Module content* section in the object list, and [Test play](build-a-game.md#test-play) that starts a game from
its menu. Every game got a start screen, best scores saved on the device ([Store Value](nodes/storevalue.md)), game
sounds, music, banners and controller buzz; four kit packs and three walkable levels arrived.

**1.16 — Waves, and one world to keep.** [Waves](games.md#waves) joins the Games tab, the tab shows every game again,
and two people pressing play at once no longer fight over the simulation.

**1.15 — where everyone is.** Every scene card in the Explorer shows [who is in it](explorer.md#the-project-and-the-scene-you-have-open),
with **Join ‹name›**; scenes can be renamed and their files follow; copy and paste a scene to get a new one. Dungeon
Realms and Untangle became games, `?embed=1` hides the editor for [embedding](community.md), and (1.15.1) public rooms
take a [code or a knock](connection.md#public-rooms-theprototypeapp).

**1.14 — heavy models stop being a cliff.** A model is weighed before it lands, and one that
would hurt asks first, with **Reduce** on a background worker as a third way out and
**Restore original model** to take it back. See [Importing files](explorer.md#when-a-model-is-too-heavy).
Football joins Towers and the Stars Room as a [Games-tab template](football.md).

**1.13 — knock it about.** Hit a floating object with your hand and it flies off, with an
[On Hit node](nodes/onhit.md) to react to it; the [Stars Room](build-a-game.md) and
[VR Football](football.md) are built on it. [Scene look](post-processing.md) becomes one
section with post-processing node graphs, materials can be shared between duplicates, and
proportional editing reaches your peers.

**1.12 — hold together.** A connection request now ends rather than hanging, a session has a
[size](connection.md#session-size), the signaling link stops giving up, and a scene too heavy
for your machine [reduces quality or pauses instead of freezing](performance.md) — with a
[Statistics panel](performance.md#the-meter) and a
[diagnostics bundle](connection.md#diagnostics-you-can-copy) you can copy into a bug report.

## Where to go next

**Getting started**

- [Controls](controls.md) — navigation, selection, the transform gizmo, shortcuts and right-click menus.
- [Tours](tours.md) — the editor tour and the VR welcome, and how to replay them.
- [Settings](settings.md) — the grouped menu, search, sub-pages, resetting a category or everything.
- [Connection](connection.md) — invite links, approving peers, and choosing a signaling server.

**Building**

- [Explorer](explorer.md) — your local asset library: import files, organize folders, drag assets into the scene.
- [Packs](packs.md) — ready-made model and audio collections you can browse and import.
- [Prefabs](prefabs.md) — save any object as a reusable asset, update every placed copy, sort them into folders and tags.
- [Material Presets](materials.md) — named surface looks, seven built in, saved and shared with your session.
- [Architecture](architecture.md) — walls with doorways and windows, doors that open, and stairs, all from numbers you can change.
- [Mesh Editing](mesh-editing.md) — vertices, edges and faces: extrude, bevel, polyline knife, loops, and mirroring live or in one go.
- [Snapping](snapping.md) — line things up: grid steps, surfaces, and snapping onto real geometry.
- [UV & Textures](uv-editor.md) — unwrap a model, paint on it, and give parts of it their own materials.
- [Scene Look (Post-processing)](post-processing.md) — grade the finished frame: ambient occlusion, colour, bloom, grain. Saved with the scene and shared with everyone.
- [Animation](animation.md) — keyframe clips with a timeline, curves, markers and onion skin.
- [Physics & Simulation](physics.md) — mass, joints, dropping and throwing objects.
- [Colliders](colliders.md) — collider shapes, exact meshes, decomposition, collision groups and sensors.
- [Particle Effects](particles.md) — dust, smoke, fire, sparkles, rain and snow, drawn as sprites, streaks, trails or ribbons.
- [Water](water.md) — tanks, pools, oceans and lava with waves, refraction, caustics, foam and bubbles.
- [Fluid Tank & Jiggle](simulation.md) — particle liquid you can pour, and springy secondary motion.
- [Fluids](fluids.md) — particle water poured into the scene, rivers, chutes and pipes, and wheels that turn it.
- [Terrain & Sculpting](terrain.md) — add ground and shape it with a brush, on the desktop or in a headset.
- [Saving & Sessions](saving.md) — the `.tpscene` bundle format, GLTF export, sessions and autosave.

**The scene**

- [Camera & View](camera.md) — lens presets, render modes, shadows, the grid, the environment and sky images.
- [Notifications & Notes](notifications.md) — the notification center, scene notes and pinging.
- [Music & Sound](audio.md) — shared background music, spatial sound and voice chat.

**Behavior, AI & more**

- [Node System](node-system.md) — the Flow editor that drives animation, logic and interactivity, plus a [reference page for every node](nodes/slider.md).
- [AI Assistant](ai/assistant.md) — build and edit the scene from a prompt.
- [VR Guide](vr.md) — the full room-scale control and radial-menu map.
- [Modules](modules.md) — enable playable content modules or write your own.
- [Community](community.md) — publish a scene from the app, share its link, play and remix what others made, enter a contest.
