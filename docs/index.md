# Welcome

ThePrototype is a collaborative 3D prototyping app that runs entirely in your browser — peer-to-peer, with no server and no accounts.

You build scenes from primitives, imported models and packs, wire behavior with a visual node graph, and everything you do is instantly visible to everyone connected to you. Peers connect directly to each other (WebRTC); the only shared infrastructure is a small signaling service used to establish the connection.

## Quick start

1. **Open the app** in a desktop browser (VR headset browsers work too).
2. **Create something** — right-click the empty viewport and pick **Add ▸ Mesh ▸ Cube**, or press <kbd>Shift</kbd>+<kbd>A</kbd> to open the Add menu.
3. **Move it** — click the cube to select it, then use the gizmo (<kbd>1</kbd> move, <kbd>2</kbd> rotate, <kbd>3</kbd> scale).
4. **Invite a friend** — open the Connect panel, copy your peer ID and send it to them. They paste it into their own Connect field and press **Connect**; you approve the request, and from then on you are editing the same scene together.

!!! tip
    Everything replicates automatically: objects, transforms, materials, the node graph, chat, pings and voice. There is no "sync" button — if you can see it, your peers can too.

## Where to go next

- [Controls](controls.md) — navigation, selection, the transform gizmo, shortcuts, right-click menus and VR basics.
- [Explorer](explorer.md) — your local asset library: import files, organize folders, drag assets into the scene.
- [Packs](packs.md) — ready-made model collections you can browse and import.
- [Prefabs](prefabs.md) — save any object as a reusable asset.
- [Saving & Sessions](saving.md) — the `.tpscene` bundle format, GLTF export, sessions and autosave.
- [Node System](node-system.md) — the Flow editor that drives animation, logic and interactivity, plus a [reference page for every node](nodes/slider.md).
- [Modules](modules.md) — enable playable content modules or write your own.
