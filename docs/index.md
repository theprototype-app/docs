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

**1.21 — quick fixes, publish anywhere** *(draft)*. **Menu ▸ Publish / Export** gathers both ways out: publish to the
community with a play link and QR code that open straight into the game, or [export](publish-export.md) a zip of plain
HTML that plays on itch.io or any static host, or an iframe snippet — every one with the *Made with ThePrototype* badge.
On a phone, games get [touch action buttons](touch-controls.md) you can rearrange and re-skin. A new
[loading placeholder](loading.md) style fills up as each model downloads, can be moved while it waits, and turns red
with **Retry** and **Replace model…** when a file fails. Every [theme](appearance.md) is readable now. *TODO (36-int-121):
add the remaining 36-ui-polish items (menus, text selection, settings search, phone quality) from the 1.21 CHANGELOG.*

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
- [Connection](connection.md) — invite links, approving peers, and choosing a signaling server.

**Building**

- [Explorer](explorer.md) — your local asset library: import files, organize folders, drag assets into the scene.
- [Packs](packs.md) — ready-made model and audio collections you can browse and import.
- [Prefabs](prefabs.md) — save any object as a reusable asset.
- [Mesh Editing](mesh-editing.md) — vertices, edges and faces: extrude, bevel, knife, loops and mirroring.
- [Snapping](snapping.md) — line things up: grid steps, surfaces, and snapping onto real geometry.
- [UV & Textures](uv-editor.md) — unwrap a model, paint on it, and give parts of it their own materials.
- [Scene Look (Post-processing)](post-processing.md) — grade the finished frame: ambient occlusion, colour, bloom, grain. Saved with the scene and shared with everyone.
- [Animation](animation.md) — keyframe clips with a timeline, curves, markers and onion skin.
- [Physics & Simulation](physics.md) — mass, joints, dropping and throwing objects.
- [Terrain & Sculpting](terrain.md) — add ground and shape it with a brush.
- [Saving & Sessions](saving.md) — the `.tpscene` bundle format, GLTF export, sessions and autosave.

**The scene**

- [Camera & View](camera.md) — lens presets, render modes, shadows, the grid and environment.
- [Notifications & Notes](notifications.md) — the notification center, scene notes and pinging.
- [Music & Sound](audio.md) — shared background music, spatial sound and voice chat.

**Behavior, AI & more**

- [Node System](node-system.md) — the Flow editor that drives animation, logic and interactivity, plus a [reference page for every node](nodes/slider.md).
- [AI Assistant](ai/assistant.md) — build and edit the scene from a prompt.
- [VR Guide](vr.md) — the full room-scale control and radial-menu map.
- [Modules](modules.md) — enable playable content modules or write your own.
- [Community](community.md) — publish a scene from the app, share its link, play and remix what others made, enter a contest.
