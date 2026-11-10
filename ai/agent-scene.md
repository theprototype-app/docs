# HUD, sky and play with an agent

An agent joined to your session ([Build with an AI agent](https://docs.theprototype.app/ai/build-with-an-agent.md)) can give a game its
[HUD](https://docs.theprototype.app/hud-editor.md), set the [sky, fog and lights](https://docs.theprototype.app/camera.md#environment-presets), and say where Play
starts. The in-app [Assistant](https://docs.theprototype.app/ai/assistant.md) has the same tools.

Every call works like the agent's other tools:

- You see the change at once, and so does everyone in the session.
- **One call is one undo step.** Ctrl+Z takes it back, or press Undo on the call's line in the agent's
  activity log.
- Viewers cannot use the tools that change things. They can still use the ones that read (`list_hud`,
  `get_environment`).
- A tool returns the ids of everything it made, so the agent can wire them up next.

**The sky and the scene light change the look of everything, so the agent asks first.** You get a prompt with
**Allow** and **Deny**, and nothing changes until you answer. How the question works is described under
[Materials and looks](https://docs.theprototype.app/ai/agent-look.md#when-the-agent-has-to-ask).

## Reference

### create_hud: screens and elements

```json
create_hud {"screens": [{"name": "Race", "showWhile": "playing", "elements": [
  {"kind": "text", "text": "Lap 1/3", "anchor": "top-left", "x": 16, "y": 16},
  {"kind": "timer", "anchor": "top-right", "duration": 90, "countDown": true}
]}]}
```

| field | what it does |
|---|---|
| `screens` | up to 8 screens: `name` (a screen with that name gets the elements added), `elements`, `showWhile` (`menu`, `playing`, `paused`, `over`, or `""` = only when a HUD Screen node shows it), `input` (`menu` frees the mouse to click the screen in Play), `active` |
| `elements` | up to 60 per call: `kind` (any [element kind](https://docs.theprototype.app/hud-editor.md#element-kinds), such as `text`, `bar`, `timer`, `button`, `image`, `slider`), `text`, `anchor`, `x` / `y` / `w` / `h` in pixels, `style`, and the kind's own fields (`bar`: `min`, `max`, `value`; `timer`: `duration`, `countDown` …) |
| `camera` | a camera object's uuid: this HUD shows only while you look through that camera |

**Anchors** are the nine places of the HUD editor: `top-left`, `top-center`, `top-right`, `middle-left`, `center`,
`middle-right`, `bottom-left`, `bottom-center`, `bottom-right`. `top`, `bottom`, `left` and `right` work too.
`x` and `y` move the element in from that edge.

**Style** keys: `size`, `weight`, `font`, `color`, `bg`, `border`, `radius`, `pad`, `align`, `opacity`.

A new screen becomes the one that shows, unless `active` is `false`. The result lists every element `id`. To show a
live value, a flow node names that id in its `element` field: a **HUD Text**, **HUD Bar** or **HUD Timer** node
([Driving the HUD from the graph](https://docs.theprototype.app/hud-editor.md#driving-the-hud-from-the-graph)), for example a Counter wired into a
HUD Text.

### hud_panel: a box with rows inside

```json
hud_panel {"screen": "Paused", "showWhile": "paused", "title": "Paused",
  "rows": [{"kind": "button", "text": "Resume"}, {"kind": "slider", "text": "Volume"}, {"kind": "button", "text": "Quit"}]}
```

The panel is a backdrop with its rows laid out top-down inside it, with an optional `title` row. `anchor`, `x`, `y`,
`w`, `pad`, `gap` and `style` place and size it. Up to 24 rows. The result gives the `panel` id and every row id.

Moving the panel with `edit_hud` moves its rows with it, and removing it removes them.

### edit_hud and list_hud

`edit_hud` changes a HUD that exists:

| field | what it does |
|---|---|
| `updates` | `[{id, …any element field}]`; `screen` moves the element to another screen. An element's `kind` cannot change. |
| `remove` | element ids |
| `screens` | `[{id or name, rename, showWhile, input, active, remove}]`. A HUD keeps at least one screen. |

`list_hud` reads the HUD back: its screens, which one shows, every element with its id, text, place and size, and
what each element is wired to in the flow graph.

### set_sky: sky, background, fog and exposure

| field | what it does |
|---|---|
| `preset` | a [look preset](https://docs.theprototype.app/camera.md#environment-presets) by name, such as `Daylight` or `Night` |
| `hdri` | a [sky image](https://docs.theprototype.app/camera.md#sky-images-hdri): `clearsky`, `meadow`, `sunrise`, `starlight` or `photostudio`, or `{name, rotation, intensity, blur, background, quality, minQuality}`. `{hash}` is an HDR file in your library; *since 1.61* also `"cc0:polyhaven/<id>"` from `search_assets` (fetched into the library first), and an HDR the agent sends with `assets upload`. A web address is refused. `null` removes the sky image. |
| `background` | a colour, such as `"#0b1020"` or `"navy"` |
| `gradient` | `{"top": colour, "bottom": colour}` |
| `fog` | `{color, near, far}` in metres, or `{color, density}` (0.01 thin, 0.1 thick), or `null` for none |
| `exposure` | 1 is normal, 0.5 darker, 2 brighter |

`quality` and `minQuality` are the scene's [Sky quality](https://docs.theprototype.app/camera.md#sky-quality-for-the-scene): `auto`, `standard`,
`high` or `max`.

The app's fog is a linear fog, so a `density` becomes a fog that is gone by `2 ÷ density` metres. For example,
`0.05` gives 40 metres.

### set_light: the sun, ambient light and environment lights

| field | what it does |
|---|---|
| `sun` | `{color, intensity, direction}`: `direction` is the way the light shines and must point downward, such as `[-1, -2, -1]`. `position` works too. `null` switches the sun off. |
| `ambient` | `{sky, ground, intensity}`: the soft light from above and below. `null` switches it off. |
| `add` | `[{kind, color, intensity, position, groundColor}]`, where `kind` is `directional`, `point` or `hemisphere`. Up to 8 environment lights. |
| `update` / `remove` | change or remove environment lights by id (`get_environment` lists them) |

The result lists each new light's id. Spot lights, area lights and lights you place as objects are made with
`create_objects` (`kind: light`), which also takes `castShadow` and a `shadowQuality` of `low`, `medium` or `high`.

### get_environment: read it all

`get_environment` gives the look preset, exposure, background, sky image, fog, sun, ambient light, environment
lights, the lights placed as objects, where Play starts, the opening view, and the names of the presets and
skies. Viewers can use it.

### place_spawn: where Play starts

```json
place_spawn {"position": [0, 0, 6], "facing": [0, 0, 0]}
```

| field | what it does |
|---|---|
| `position` | where the player's feet go |
| `object` | an object's uuid: the player stands on top of it |
| `facing` | a point the player looks toward. `yaw` (radians, 0 faces −Z) and `yawDegrees` work too. |
| `clear` | `true` removes the spawn |

This is the same [spawn point](https://docs.theprototype.app/physics.md) as **Configure Scene ▸ Physics ▸ Play**.

### set_play_camera: first person and the opening view

| field | what it does |
|---|---|
| `mode` | `first` adds a [Character Controller](https://docs.theprototype.app/nodes/charcontroller.md) (walking, or flying with `fly: true`), with `speed`, `jumpHeight` and `eyeHeight`. A second call changes it rather than adding another one. `none` removes it. |
| `openingView` | what a person sees when they open the scene: `{position, target}`, `"spawn"` (just behind and above the player), `"frame"` (the whole scene), or `null` to forget it |

The opening view is saved with the scene. Setting it does not move anyone's camera.

`third`, `orbit` and `fixed` are not Play cameras the app has yet: Play always looks through the player's own
eyes. The tool says so and names what works today: a **Possess Object** node on a click or a key for a chase
or orbit camera, or a camera object with **Set Active Camera** for a fixed shot.

### Levels, portals, checkpoints and loading screens

*Since 1.64.* Four `game_setup` actions build a game of several levels around the one
[Levels table](https://docs.theprototype.app/levels-and-progress.md). Each call is one undo step.

| action | what it does |
|---|---|
| `levels` | the Levels table: `levels` (in play order, each `{name, scene, spawn, goal}`), `keep` (what carries from level to level: score, inventory, health, or `"var:<name>"`), `unlock` (all, or in order). `add`, `update` and `remove` change single rows; `clear: true` removes the table; no field reads it. |
| `portal` | place or change a Portal: `position` or `at: {ping: "latest"}`, `yaw`, and where it goes — a `level` (id or name), a `scene` + `spawn`, or `back: true`; `transition` (`fade`, `iris`, `card`, `none`), `show`, and its own `loading` |
| `checkpoint` | place or change a Checkpoint: `position` / `at`, `label`, `show` (`false` = no message) |
| `loading` | the Levels table's loading screen: `preset` (`fade`, `bar`, `logo`, `image`, `item`), `background`, `image`, `logo`, `textColor`, `bar {style, color}`, `tips`, `title`; `clear: true` = the default bar. Needs a Levels table. |

```json
game_setup {"action": "portal", "at": {"ping": "latest"}, "level": "Tower top", "transition": "card"}
```

## Cookbook

### A race HUD

> "Add a race HUD: the lap top left, a 90 second countdown top right, and a speed bar at the bottom."

```json
create_hud {"screens": [{"name": "Race", "showWhile": "playing", "elements": [
  {"kind": "text", "text": "Lap 1/3", "anchor": "top-left", "x": 16, "y": 16, "style": {"size": 22, "weight": "700"}},
  {"kind": "timer", "anchor": "top-right", "x": 16, "y": 16, "duration": 90, "countDown": true},
  {"kind": "bar", "anchor": "bottom", "y": 24, "w": 320, "max": 100}
]}]}
```

The screen shows only while the game is playing. To count laps, the agent wires a Counter into a **HUD Text**
node whose `element` is the lap text's id, with `create_flow_nodes`.

### A night scene with fog

> "Make it night with a light fog, and put a warm lamp by the fire."

```json
set_sky {"hdri": "starlight", "fog": {"color": "#0b1020", "density": 0.04}, "exposure": 0.6}
set_light {"sun": {"intensity": 0.15, "color": "#8899ff"},
  "add": [{"kind": "point", "color": "#ffaa55", "intensity": 2, "position": [0, 1.5, 0]}]}
```

Both calls ask first. After you press **Allow**, the agent repeats each call with its `confirmId`. A dim blue sun
reads as moonlight. The fog is gone by 50 metres.

### A spawn the player starts at

> "Start the player on the platform, facing the castle, and open the scene behind them."

```json
place_spawn {"object": "…platform uuid…", "facing": [0, 0, -40]}
set_play_camera {"mode": "first", "openingView": "spawn"}
```

The player walks in first person from the platform, and anyone who opens the scene sees it from just behind
where they will stand. A camera that follows behind the player in Play is not in the app yet (see
[set_play_camera](#set_play_camera-first-person-and-the-opening-view)).
