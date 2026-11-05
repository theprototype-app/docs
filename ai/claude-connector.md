# Use theprototype from claude.ai and voice

Add **theprototype** as a connector in claude.ai, press **Connect Claude** in your open
theprototype tab, and talk Claude through building — in a chat on the web or desktop, in the
Claude phone app, or out loud in voice mode. Claude works **in your own tab, with your own
access**: everything it does shows up for everyone in your session and can be undone, exactly
like your own edits.

!!! info "New"
    The Claude connector needs a theprototype account and works on theprototype.app (the hosted
    app). Running the open-source app yourself? Use the [agent bridge](https://docs.theprototype.app/ai/build-with-an-agent.md)
    instead — it gives Claude Code or Claude Desktop the same tools over a session link.

## What you need

- A theprototype account, signed in on theprototype.app.
- A Claude plan that lets you add custom connectors in claude.ai.
- A theprototype tab that **stays open** while Claude works (a computer is easiest; your phone can
  be the one you talk to).

## Set it up (once)

1. Press **Add to Claude** in the **AI assistant** window (shown while no AI provider is set up), or find
   theprototype in [Claude's connector directory](https://claude.ai/directory/connectors/theprototype).
   Or add it by hand: in claude.ai open **Settings ▸ Connectors ▸ Add custom connector** and enter
   `https://theprototype.app/mcp`; the window has a copy button beside the address.
2. claude.ai sends you to theprototype to approve it. The page names the app asking and where it
   will return (claude.ai). Leave **Allow changes** ticked to let Claude build, or untick it for a
   **look-only** connection that can only read the scene and take pictures. Press **Allow**.
   Not signed in? Use **Sign in on theprototype.app**, then **I signed in — retry**.
3. Back in claude.ai, switch the connector on for your chat (the tools menu under the message box).

## Connect your tab (each time you build)

1. Open theprototype.app, sign in, and open or join the scene you want to work on.
2. Press the **AI** button and press **Connect Claude** (also in **Settings ▸ Connected apps**).
   A chip reads **Claude connected · this tab**. The AI button always opens the window; signed out,
   the same card offers **Sign in to connect**, which opens your profile menu at the top right, the one place to
   sign in. With no AI provider set up, the window also offers **Use your own AI provider** (**Open settings**).
   Working with a local model or your own key while signed out? **Sign in to connect** stays in the window's header.
3. Ask Claude something: *"Build a campfire with five logs and a warm light"*, *"Make the flame
   flicker"*, *"What can you do here?"*

![The AI assistant window, signed out: Choose how the assistant thinks, with the Connect Claude card — Sign in to connect, step 1 Add theprototype to Claude with the connector address and How it works, step 2 sign in and press Connect Claude. 1: Sign in to connect. 2: Add to Claude. 3: How it works.](https://docs.theprototype.app/img/ai-claude-connector/connect-card.webp)
*Figure: The AI window's Connect Claude card, before you sign in.*

1. **Sign in to connect** opens your profile menu: **sign in** first.
2. **Add to Claude** adds the connector in claude.ai — **once only**.
3. **How it works** opens **this page**.

One tab at a time: pressing Connect Claude in a second tab asks first, then moves the connection
there. If your network blips, the tab reconnects by itself.

!!! warning "Keep the tab open — and in front"
    Claude's tools run in that tab. If you close it, Claude answers *"No theprototype tab is
    connected — open theprototype.app, sign in and press Connect Claude"*. A tab left in the
    background is slowed down by the browser and cannot take pictures; after a few minutes the tab
    warns you. On a phone, talk to Claude in the Claude app and keep theprototype open on a
    computer or tablet beside you.

## Voice mode

In voice mode Claude keeps its answers short and says what changed in plain words (*"Added three
trees by the fire"*) — it never reads out ids or numbers. Good things to say:

- *"What can you do here?"* — a short spoken summary of what it can build in this tab.
- *"Put a table in the middle and four chairs around it."*
- *"Make the box spin slowly"*, *"Open the door when I click it."*
- *"Make it bigger"*, *"Paint the walls light blue"*, *"Undo that"* (or press **Ctrl+Z** yourself).

## What Claude can and cannot do

| Claude can | Claude cannot |
|---|---|
| Add shapes, lights and groups; move, resize, recolour, rename, hide and delete them | Open files or import them from your computer, or change your settings |
| Make things move and react with flow nodes (spin, bounce, follow a path, open on click) and look up how each node wires | Install modules, approve people who knock, or answer the app's questions for you |
| Add physics and run the simulation in your tab at its full frame rate, whether you host or joined (your own assistant's **Physics tools** setting is not changed) | See anything outside the theprototype tab, or move your camera |
| Animate a model's named parts, and see where everyone stands and looks, so *"put a tree in front of me"* lands in front of you, in VR too (a look-only connection sees only your own position) | |
| Ask your tab to join a session from a link you give it: nothing happens until you press **Join** on the card in the tab (see below) | |
| Write small code behaviours | Do more than you can: a **viewer's** Claude can look but not build, and locked objects stay locked |
| Take a picture of the scene to check its work, and save the open scene as a new version in your Library (see below) | Keep working after you close the tab |
| Make shapes the basic objects cannot — a vase on a lathe, a rail along a path, an extruded sign, a mesh from its own points — and reshape or model them ([Shapes and modelling](https://docs.theprototype.app/ai/agent-geometry.md)) | Fetch an image from your computer or your local network |
| Change materials and textures, node shaders, UV mapping and the scene's post effects; a change to the whole scene's look asks you first with **Allow** / **Deny** in the tab ([Materials and looks](https://docs.theprototype.app/ai/agent-look.md)) | |
| Set the point a thing turns about, and put an image into your library from an https address or one it draws ([Undo, pivots and images](https://docs.theprototype.app/ai/agent-assist.md)) | |

### Joining a session from a link

Give Claude a session or invite link and ask it to join. Your tab shows **Join a session?**, naming the
session and who asks (*Claude (connector)*). **Cancel**, or 90 seconds with no answer, refuses. After **Join**
the app's usual questions still apply: leaving your current session, another signaling server, the host's
Approve, and what to do with work you have open. One question at a time: if another is open in the tab, Claude
is told to try later. A look-only connection cannot ask to join.

Claude only says it joined once the connection is really up. If the session cannot be reached, the host refuses
or you cancel, it tells you what happened, and **status** shows the last result and whether the host is still
deciding.

### Saving the scene

*"Save this"* is the same save as **Ctrl+S**: a new version, and **Version history** can bring back older ones.
In someone else's session it saves on the host. A viewer cannot save, a private scene cannot be saved this way,
and Claude cannot write over a different scene: if the name it picks is taken, it is told to choose another or
to ask you to open that scene first.

### Importing files

Since 1.61 Claude can bring in a **3D model** with `create_shape` `import`: a glTF, GLB or OBJ it sends in parts, or
one at a public **https** address. It goes into your library first, and its named parts can be animated
([details](https://docs.theprototype.app/ai/agent-geometry.md#import_shape-a-gltf-glb-or-obj-file)). Other files, and files on your computer, you drop
into the tab yourself; then ask Claude to place or change them.

### Scripts, spin and particles

- **Scripts** run every frame in a sandbox, on a view of their object, starting again from the base pose. Write
  the pose from the time, as in `object.rotation.y = base.rot[1] + elapsed * speed`. `elapsed` is seconds of the game
  round, the same for everyone inside a round; outside a round it counts from your own Play press. `time` is unchanged.
  Something like `+= 0.01` will not build up: the warning says why and points at `elapsed`. Errors from running
  scripts appear in **status**.
- **Animated objects:** on an object that is being animated, Claude reads and edits the pose you authored, and is
  told it is animated and where it is right now.
- **Physics in a group:** the simulation only runs objects at the top of the scene. If an object with physics is
  inside a group, Claude is told so and can move it out, or set physics on the group itself.
- **Particles** on a rotated parent: in world space, an emitter can follow the object (*a rocket's exhaust*) or
  keep world axes (*a fire that burns straight up*). Gravity is acceleration along world Y in m/s²: negative falls, positive rises.

## See and undo what it did

Every step Claude takes is a line labelled **Claude (connector)** in **Agent activity**, with its
own **Undo**. Anyone in the session sees the changes as they happen, and anyone with edit access
can undo them from their own screen.

Or just say **"undo that"**: Claude takes back its own last step. If someone has changed the same things since,
it changes nothing and tells you who changed what.

**Screenshots** have a 4:3 shape whatever your window's shape, except the *current* view, which keeps your canvas. Claude
can pick the angle (front, back, left, right, top, below, iso, or a yaw and pitch), a camera position and target, the objects to
frame, a zoom (0.1-10) and a margin (0.5-4). It is told which camera it used, and your own view never moves.

### Tool families

To keep its list short, Claude on claude.ai reaches the newer tools in **families**: one tool with an `action`. They do
exactly what the agent tools of the same job do, with the same limits:

| family | actions | the agent tools behind them |
|---|---|---|
| `create_shape` | `lathe`, `tube`, `extrude`, `mesh`, `import` | `create_lathe`, `create_tube`, `extrude_shape`, `create_mesh`, `import_shape` ([Shapes and modelling](https://docs.theprototype.app/ai/agent-geometry.md)) |
| `edit_shape` | `params`, `mesh`, `update`, `duplicate`, `pivot`, `pivot_group` | `set_geometry`, `edit_mesh`, `update_mesh`, `duplicate`, `set_pivot`, `create_pivot` |
| `set_look` | `material`, `list_materials`, `get_material`, `shader`, `edit_shader`, `assign_shader`, `shader_nodes`, `post`, `get_post`, `post_graph`, `unwrap`, `uv`, `quality`, `sky`, `light`, `environment` | `set_material` … `set_uv`, `set_quality` ([Materials and looks](https://docs.theprototype.app/ai/agent-look.md)); `set_sky`, `set_light`, `get_environment` ([HUD, sky and play](https://docs.theprototype.app/ai/agent-scene.md)) |
| `hud` | `create`, `list`, `update`, `panel` | `create_hud`, `list_hud`, `edit_hud`, `hud_panel` ([HUD, sky and play](https://docs.theprototype.app/ai/agent-scene.md)) |
| `game_setup` | `spawn`, `play_camera` | `place_spawn`, `set_play_camera` ([HUD, sky and play](https://docs.theprototype.app/ai/agent-scene.md)) |
| `assets` | `search`, `place`, `prefab`, `image` | `search_assets`, `place_asset`, `prefab` ([Worlds](https://docs.theprototype.app/ai/agent-world.md)), `add_image` ([Undo, pivots and images](https://docs.theprototype.app/ai/agent-assist.md)) |
| `effects` | `terrain`, `scatter`, `water`, `particles`, `sound`, `music` | `terrain`, `scatter`, `water`, `create_particles`, `place_sound`, `set_music` ([Worlds with an agent](https://docs.theprototype.app/ai/agent-world.md)) |
| `run` | `inspect`, `validate`, `logs` | `inspect_runtime`, `validate_scene`, `logs` ([Test and fix a game](https://docs.theprototype.app/ai/agent-runtime.md)) |

`undo_last` is a tool of its own. A look-only connection can still use the actions that only read (`list_materials`,
`get_material`, `shader_nodes`, `get_post`, `environment`, `hud` `list`, `assets` `search` and all of `run`).
`playtest` (a test player) runs only on an agent's own page, so it is not on claude.ai.

**New in 1.59** — the same tools, with more in them:

- `create_shape` takes `{"shapes": [{"action": "lathe", "lathe": {…}}, …]}` with no `action`: up to 50 shapes in one
  call and one undo step, checked first, so nothing is made if one entry is wrong (the error names it, `shapes[3]`).
- A shape made with `parentUuid` is placed in the **group's own space** — its position, rotation, scale and its points
  — and with no position it sits at the group's origin. `mesh` also takes `colors`, `materials` + `faceMaterials` and
  `flatShading` ([Shapes and modelling](https://docs.theprototype.app/ai/agent-geometry.md#building-a-model-part-by-part)).
- `create_objects` makes copies of an object (`from`, `count`, `offset`, `randomRot`, `randomScale`, `seed`), and
  `create_objects` / `update_objects` take `lookAt` and `castShadow` / `receiveShadow`
  ([details](https://docs.theprototype.app/ai/build-with-an-agent.md#rules-a-good-agent-follows)).
- `edit_shape` `pivot_group` takes `local`; `list_scene` gives each mesh's vertex and triangle count and its bounds;
  `status` says how heavy the scene is (`sceneBudget`); `set_look` names the material presets.

**New in 1.60** — four families, so Claude can build a small game and check it:

- `hud` makes the game's screen overlay: timers, scores, bars, buttons, images and panels ([HUD, sky and play](https://docs.theprototype.app/ai/agent-scene.md)).
- `game_setup` says where Play starts, turns on first-person walking or flying, and sets the view a scene opens with.
- `set_look` `sky`, `light` and `environment` change the sky, fog, exposure, the sun and the ambient light. They change
  everyone's view, so your tab asks the host first.
- `run` tells Claude what the game does: `validate` lists what would not work when someone presses Play, each with its
  fix; `inspect` says why something did not fire; `logs` reads the tab's recent errors
  ([Test and fix a game](https://docs.theprototype.app/ai/agent-runtime.md)).
- `where_are_users` takes `pings`, and `create_objects` / `update_objects` take `at: {ping}`, `snap: "floor"`, `align`
  and `face_user`: point at a spot and say "put a lamp here" ([Here, this and you](https://docs.theprototype.app/ai/agent-spatial.md)).

Worlds ([Worlds with an agent](https://docs.theprototype.app/ai/agent-world.md)):

- `effects` builds places: terrain with hills and paint, scatter (a forest, rocks), water, particles (fireflies are new),
  positional sounds and the background music.
- `assets` `search` finds models, sounds, images and CC0 materials. `place` and `prefab` put them in the scene.
- `set_look` `material` takes `pattern` (wood, brick, marble …). `create_shape` `mesh` takes `subdivide: 1-2`, and
  `edit_shape` `update` sends a mesh new vertices.

**New in 1.61** — no new tool names, more in the families:

- `create_shape` `text` writes [3D text](https://docs.theprototype.app/3d-text.md), flat or solid with a bevel; `edit_shape` `params` changes its
  words and style, and `assets` `fonts` lists the fonts Claude may use (the bundled ones and those in your Library).
- `edit_shape` `duplicate` copies an object in a row, or makes its mirror image (a left arm becomes the right one).
- `create_shape` `import` brings in a glTF, GLB or OBJ model; `mesh` colours are sRGB with `#rrggbb` allowed.
- `effects` `scatter` takes `source` (real copies of something Claude built) and `avoid` (keep paths clear).
- `set_look` `quality` asks you, on your own device, for higher quality when a phone hides the post effects; `post`
  says whether your screen draws them, and `screenshot` takes `postEffects: true`.
- `status`'s `sceneBudget` names the heaviest objects (`top`) and says whether the frame time is just the screen's
  refresh (`vsync`).
- A `parentUuid` that names nothing is an error and makes nothing; groups stay groups after a restore.
- `assets` `upload` sends a sound or an HDR sky as bytes (Claude's own music, or a file it fetched itself) and answers
  with its hash. `assets` `search` lists the sounds of the sound packs, and `effects` `sound` / `music` take them.
- `set_look` `sky` takes a Poly Haven HDRI from search.
- `effects` `terrain`: `height` is the highest peak, layers show at once, and `paintBy: "height"` paints them low to
  high. `scatter` keeps circles clear (`avoid` / `rules.avoid` with a `radius`) and takes an `id`.
- `front` tells `lookAt` and `face_user` which way a model faces.
- `screenshot`: `view: "camera"` looks through a scene camera, `hud: true` adds the game HUD, and people are left out
  unless `avatars: true`.
- Pressing **Allow** lets the change through on the first repeat; the answer says `pending`, `allowed`, `denied` or
  `expired`. Pings mark the spot you clicked, and `wait_for_edit` wakes when you ping.
- `list_scene` `near` / `bounds` take `by: "touches"` or `"inside"`; `sceneBudget` has `callsBySource` and never calls
  a frame on the screen's refresh slow.
- Claude keeps your names and ids as they are: object names, prefab ids and undo lines are not rewritten.

Claude reads its tool list when it connects, so it sees these after the connector reconnects.

## Stop it

- **Disconnect** (next to the chip, or in Settings ▸ Connected apps) stops Claude at once, including
  a step it is in the middle of. Press Connect Claude again to continue.
- **Revoke** in **Settings ▸ Connected apps** removes the connector's access to your account
  completely; claude.ai has to be approved again before it can work in any tab. You can also
  remove the connector in claude.ai's settings.

## Privacy and limits

- Nothing runs on our servers except a relay: Claude's request goes to your tab, your tab does the
  work, and the answer goes back. Your scene is never stored by the connector, and we do not log
  what Claude asks or what your tab answers — only counts (how many calls, how long they took).
- Pictures come from the theprototype canvas only, downscaled, and never while the tab is hidden.
- If the link to your tab drops for a moment, Claude's call carries on and answers once the link is back. If
  something can't run right now, such as a tool whose code failed to load, **status** tells Claude, usually with
  the fix: reload the tab.
- There is a fair-use limit on calls per minute. If Claude goes too fast it is told to wait a few
  seconds; ask again and it continues.

See also: [Build with an AI agent](https://docs.theprototype.app/ai/build-with-an-agent.md) · [Assistant](https://docs.theprototype.app/ai/assistant.md) ·
[Security](https://docs.theprototype.app/security.md)
