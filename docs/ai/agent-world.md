# Worlds with an agent: terrain, water, effects and assets

An agent joined to your session ([Build with an AI agent](build-with-an-agent.md)), Claude on claude.ai
([Use theprototype from claude.ai and voice](claude-connector.md)) and the in-app [Assistant](assistant.md) can build
whole places: hills and a forest, a lake, a campfire with its crackle, and things from your library and the model packs.

These tools work like the agent's other tools. Everyone in the session sees the change at once. One call is one undo
step (Ctrl+Z, **Undo** on the call's line in **Agent activity**, or *"undo that"*). A viewer's agent cannot use the tools
that change things; it can still search for assets.

!!! note "New in 1.60"
    Everything on this page is new in 1.60.

!!! tip "Try it"
    **Templates ▸ Game plot** opens an empty plot (the ground, a start pad, a finish arch, a fire pit and four gems).
    Ask for hills with a forest and a lake, a campfire with its crackle, a race HUD with a timer and a start on the pad,
    then *"check my game"*. While Claude is connected, the **Connect Claude** row says so until it has used one of
    these tools.

## Find and place assets

### search_assets: find something to build with

It searches the shared [library](../explorer.md), the [model packs](../packs.md), your [prefabs](../prefabs.md) and
Poly Haven's CC0 materials and HDRIs, by words and kind. It only reads, so a viewer's agent can use it too.

| field | what it does |
|---|---|
| `query` | words, like `pine tree`, `wooden crate` or `campfire crackle`. Leave it empty to list everything of the kinds asked for. |
| `kinds` | any of `model`, `material`, `hdri`, `sound`, `image`, `prefab` (default: all) |
| `sources` | where to look (default: everywhere) |
| `limit` | how many results (default 12) |

Each result has an `id`, its name, kind, source, licence, its size when known, and which tool uses it. The id is what the
other tools take:

- `lib:<hash>` is a file in the shared library.
- `pack:<pack>/<item>` is a model from a pack.
- `prefab:<id>` is one of your prefabs.
- `cc0:polyhaven/<id>` is a CC0 material or HDRI. `set_material` (`cc0`) and the scene look take it.

### place_asset: put a model or prefab in the scene

It places the model the same way dragging it from the Asset Browser does.

| field | what it does |
|---|---|
| `asset` | an id from `search_assets` (`lib:`, `pack:` or `prefab:`) |
| `position` | where it stands, in world metres |
| `yaw` | a turn about the up axis, in radians |
| `scale` | a size factor (1 = as made) |
| `count`, `spacing` | a row of copies, `spacing` metres apart (default 2) |
| `name` | a name for the new objects |

It returns the new uuids. To bring in a model from a URL, the agent uses `import_model` instead.

### prefab: keep a group of objects and stamp it again

- `mode: "save"` with `objects` keeps them as a prefab, with their materials, flows and behaviours, and returns its id.
  The prefab goes into **your** prefab library on this device. Saving changes nothing in the scene, so there is nothing
  to undo.
- `mode: "place"` with `prefab` (the id or the name) puts copies in the scene with new ids. `position`, `yaw`, `count`
  and `spacing` work as in `place_asset`. One undo step removes them.

## Shape the land

### terrain: make or change a terrain

Without `uuid` it makes a [terrain](../terrain.md) (`size` metres, at `position`). With `uuid` it changes that terrain.

| field | what it does |
|---|---|
| `size` | the edge length in metres, up to 200 (when making one) |
| `height` | how high the noise hills reach, in metres |
| `detail` | how close together the hills are (0.005 to 0.6) |
| `octaves`, `ridged`, `warp` | rougher detail, sharp ridges, twisted shapes |
| `edges` | `flat`, `island` (it falls away to the sides) or `bowl` |
| `seed` | another set of hills |
| `ops` | sculpting and painting, in order (below) |
| `layers` | up to 4 paint layers `{color, texture, tiling}`. `texture` is a library hash or a pattern name like `grass`, `sand` or `stone`. |
| `force` | reshape a terrain that was sculpted by hand (the hand sculpting is lost) |

Each entry in `ops` is `{op, at, radius, strength, …}`. `at` is `[x, z]` in metres from the terrain's centre. Up to 64
entries:

- `raise` / `lower`: push the ground up or down. `height` gives the metres at the centre.
- `smooth`: even out bumps. `flatten`: level the ground to the height at the centre.
- `paint`: paint `layer` 0 to 3 over the area.
- `passes`: repeat an op (up to 20).

The sculpting is the same brush as [Sculpt terrain](../terrain.md), and the whole call is still one undo step.

### scatter: a forest, rocks, flowers

`scatter` covers a terrain, or any mesh, with many cheap copies. The copies are seeded, so every peer sees the same
ones.

| field | what it does |
|---|---|
| `surface` | the terrain or mesh uuid |
| `asset` | a primitive (`Box`, `Sphere`, `Cone`, `Cylinder`, `Capsule`, `Dodecahedron`) or a model id from `search_assets` (`lib:` or `pack:`) |
| `assets` | up to 8 of those, mixed evenly |
| `density` / `count` | copies per square metre (0.01 to 4, default 0.2), **or** an exact count (up to 8000) |
| `scale` | `[min, max]` size factors (default `[0.8, 1.2]`), or one number |
| `spacing` | the least distance between copies, in metres |
| `rules` | where copies may go: `slope: [min°, max°]` (0 = level ground), `height: [min, max]` metres, `layer: {i, min}` (only where paint layer `i` is at least `min`) |
| `randomRotation`, `tint`, `sink` | a random turn (on by default), colour variation 0 to 1, metres pushed into the ground |
| `collider` | physics for the copies: `none` (default), `box`, `sphere` or `hull` |
| `seed` | another arrangement |
| `remove` | a set's id, to delete that set instead |

It returns the set's id and how many copies were placed. A surface holds up to 8 sets.

## Water

### water: a pool, a lake, the sea

Without `uuid` it makes a body of [water](../water.md). With `uuid` it changes one, or turns an object into water when
a `preset` is given.

| field | what it does |
|---|---|
| `kind` | `tank`, `pool`, `round`, `lake` or `ocean` (when making one) |
| `size` | `[width, height, length]` in metres (`[radius, height]` for `round`) |
| `position` | the bottom centre of the water |
| `preset` | `pool`, `aquarium`, `ocean`, `lake`, `river`, `lava`, `swamp`, `toxic` or `ice` |
| `level` | how full, 0 to 1 |
| `color`, `look` | the colour, and look fields like `shallowColor`, `deepColor`, `clarity`, `foam` |
| `waves`, `flow` | waves `{count, amplitude, wavelength, speed, direction}`, and a current |
| `remove` | `true` makes it a plain object again |

New water is a static sensor: in Play, things fall in and float. It casts no shadow.

## Effects and sound

### create_particles: fire, smoke, sparkles, fireflies

`preset` is one of `sparkles`, `fire`, `smoke`, `dust`, `confetti`, `sparks`, `trail`, `wisps`, `fireflies`, `rain` or
`snow`. These are the same presets as **Add ▸ Effects** ([Particles](../particles.md)).

- Without `object` it places a small emitter at `position`. Rain and snow hang at cloud height over the point.
- With `object` it puts the particles on that object: a torch, a log, a car's exhaust.
- `overrides` changes any particle field: `count`, `lifetime`, `speed`, `gravity`, `sizeStart`, `colorStart`,
  `colorEnd`, `opacity` and the rest. A field that does not exist is refused by name.
- `remove: true` takes them off the object.

### place_sound: a sound in the world

| field | what it does |
|---|---|
| `asset` | a library sound (`lib:<hash>`, or search with `kinds: ["sound"]`), or an **https** URL of a sound file |
| `object` | put the sound on this object, or leave it out and give `position` |
| `radius`, `volume` | how far it carries at full volume (metres), and how loud (0 to 1) |
| `on` | play it once on `click`, `enter`, `exit`, `grab` or `hit` on the object. Without `on` it loops all the time, like a crackle or a river. |
| `loop` | loop or not |

The sound is a [Sound node](../audio.md) in the object's flow, so you can open it in the node editor and change it.

### set_music: the scene's background music

`asset` is a library sound or an https URL (`null` clears it). It also takes `volume` (0 to 1), `play: true` and
`stop: true`. Everyone hears the track in sync. Each person can still turn it down for themselves in
[Music](../music.md).

### Sounds and pictures from a URL

A sound or texture given as a URL becomes a file in the library **first**, the same as an upload:

- **https** only. Addresses on your computer or your local network are refused, also after a redirect.
- The site must allow other origins (CORS).
- There is a size limit: 16 MB.
- The file's own bytes must be audio (WAV, OGG, MP3, FLAC, M4A or WebM) or an image. A web page with a `.wav` name is
  refused.
- A sound is decoded once to prove it plays. Nothing in the file is run.

## Textures by name

`set_material` takes `pattern`: `wood`, `planks`, `brick`, `tiles`, `marble`, `stone`, `concrete`, `metal`, `grass`,
`sand`, `fabric`, `checker`, `stripes` or `noise`. The texture is drawn on the spot and stored in the library, so it
reaches everyone like any other picture.

- A plain name works, or `{name, colors, scale, seed, size}`. `colors` lists the colours dark first, `size` is 128 to
  1024 pixels, and `seed` gives another variation.
- `patternScale` repeats it across the surface.
- `maps: {roughness: {pattern: "noise"}}` puts a pattern in another slot.
- Terrain layers take the same names.

See [Materials and looks](agent-look.md).

## Cookbook

### Forest on hills

1. `terrain` with `size: 60`, `height: 4`, `detail: 0.04`, `edges: "island"` and
   `ops: [{op: "raise", at: [0, 0], radius: 12, height: 6}]`.
2. Paint it: `layers: [{texture: "grass", tiling: 12}, {texture: "stone", tiling: 8}]`, then
   `ops: [{op: "paint", at: [0, 0], radius: 8, layer: 1}]` for a rocky top.
3. `search_assets` with `query: "pine tree"` and `kinds: ["model"]`. If nothing comes back, use `Cone`.
4. `scatter` on the terrain with that asset, `density: 0.15`, `scale: [0.7, 1.5]`,
   `rules: {slope: [0, 30], layer: {i: 0, min: 0.5}}` and `tint: 0.2`. The trees keep off the steep slopes and the rock.
5. A second `scatter` of `Dodecahedron` with `count: 80`, `scale: [0.2, 0.6]` and `sink: 0.1` adds rocks.

### Campfire with sound

1. A ring of stones: `create_objects` with `from` and `count` (or a few `Dodecahedron`s), and two logs from `create_mesh`
   or Cylinders.
2. `create_particles` with `preset: "fire"` and `position` at the centre of the ring, then `preset: "smoke"` a little
   above it.
3. `place_sound` with `object` set to the fire's uuid, `asset` set to a crackle (`search_assets` `kinds: ["sound"]`, or
   an https URL), `radius: 6` and `loop: true`.
4. At night: `create_particles` with `preset: "fireflies"` nearby, and `set_look` for a dark sky.

### Lake with a jetty

1. `terrain` with `edges: "bowl"` and `height: 3`, or a `lower` op in the middle of a hill.
2. `water` with `kind: "lake"`, `size: [24, 1.5, 24]`, its `position` at the bottom of the hollow, and `level: 0.8`.
   Use `preset: "swamp"` for a murkier one.
3. The jetty: a long `Box` on a few thin Cylinder posts, then `set_material` with `pattern: "planks"` and
   `patternScale: 3` on its top.
4. `scatter` reeds (`Cylinder`, `scale: [0.05, 0.12]`) with `rules: {height: [-0.5, 0.5]}` along the shore.
5. `place_sound` with a water-lapping loop near the jetty.

## On claude.ai

On claude.ai these tools are reached through the connector's [tool families](claude-connector.md#tool-families):

- `assets` has `search`, `place`, `prefab` and `image`.
- `effects` has `terrain`, `scatter`, `water`, `particles`, `sound` and `music`.
- `set_look` `material` takes `pattern`.
