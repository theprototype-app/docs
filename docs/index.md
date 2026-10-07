# Welcome

ThePrototype is a collaborative 3D prototyping app that runs entirely in your browser — peer-to-peer, with no server and no accounts.

You build scenes from primitives, imported models and packs, wire behavior with a visual node graph, and everything you do is instantly visible to everyone connected to you. Peers connect directly to each other (WebRTC); the only shared infrastructure is a small signaling service used to establish the connection.

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
