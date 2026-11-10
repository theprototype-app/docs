# Test and fix a game with an agent

An agent joined to your session ([Build with an AI agent](https://docs.theprototype.app/ai/build-with-an-agent.md)) and Claude on claude.ai
([Use theprototype from claude.ai and voice](https://docs.theprototype.app/ai/claude-connector.md)) can now see what a game **does**, not only what is in
the scene: why a node did not fire, what is wrong with the wiring, what the last errors were, and — on the agent's own
page — what happens when a player walks in and clicks things. Added in 1.60.

None of these tools change your scene, except that `playtest` plays the agent's own copy of it for a moment. On
claude.ai they are grouped as **run** (`inspect`, `validate`, `logs`).

## Why didn't it fire? (`inspect_runtime`)

`inspect_runtime` reads the running game the way the app's debugger does, without being able to change it:

- `node`: one flow node — when it last fired (seconds ago) and how often, what is wired into it and out of it, and in
  plain words **why it has not fired**: an On Click that waits for its object to be clicked, an action whose source
  never fired, an Object Selector wired the wrong way round, clicks switched off in Play.
- `object`: every node that acts on one object, with the same answers.
- With neither: an overview — who simulates the physics, the game state, round and variables, the kit pieces and what
  they refused, and the nodes that fired most recently (`limit`).

## What is wrong with this game? (`validate_scene`)

`validate_scene` is a playability check. Each issue has a level (`error` or `warning`), a sentence, the node or object it
is about and, where there is one, a fix:

| Issue | What it means |
| --- | --- |
| reversed selector | an Object Selector is wired **into** an On Click; it has to come out of the click (or sit in the object's own graph) |
| source with no object | an On Click / On Grab in the scene graph that reaches no object |
| action with no source | an action node (Set Game State, Travel, Spawn, a kit action …) with nothing upstream that fires; actions only run from an event |
| Game Start as an event | Start camera (called Game Start before 1.64) never fires; use On Play start or On Game State instead |
| HUD binding | a HUD node naming an element or screen that does not exist, or none at all |
| walk with no spawn | Play walks on the ground but the scene has no spawn point |
| clicks off | the scene has click nodes but Play's interaction is not set to click |
| unlit | no light and no environment: the game will be black |
| behaviour | a behaviour script with a problem (the line and what to change) |

## The last errors (`logs`)

`logs` returns the newest errors and warnings the page has seen (`count`, up to 50), and the toasts the people in the
session were shown. `status` carries the last five too, so an agent sees a failure without asking.

## Play it (`playtest`)

`playtest` is a virtual player in the **agent's own** Play — never in yours, and never from claude.ai (the connector
acts in your own tab, so there is no separate player to drive). Steps, up to 40 and 60 seconds in all:

- `walk`: a point or a path, at walking speed · `look`: a point to face · `click` / `grab`: an object · `key`: a key code
  (`KeyE`), with `hold` seconds · `hud`: a HUD button · `wait`: seconds.

It answers with the nodes that fired (and on what), the game state before and after, the HUD values and any errors. It
fires the same **source** events a player would (On Click, On Grab, On Enter, key presses), so an action node
downstream runs exactly as in a real game. Firing an action node by itself does nothing, in a playtest as in Play.

## Checkpoints (`undo_last`)

Besides taking back its last call, `undo_last` can keep **named checkpoints** of the agent's own work:

- `checkpoint: "before the doors"` remembers this point (up to 10; the oldest goes) · `checkpoints: true` lists them.
- `restore: "before the doors"` takes back everything the agent did since, as **one** step on the agent's line in
  **Agent activity**. When other people are in the session the host is asked first (**Allow** / **Deny**), the way a
  whole-scene change is; if someone has changed the same objects since, it refuses and says who.

## Also new for agents

- **`list_scene`** takes `bounds: {min, max}` (objects inside a box) and pages with `limit` and `cursor` (the reply's
  `nextCursor`), beside the name, type and `near` filters.
- **Set Color, Visibility and Spin** nodes take a `target` object: a button's graph can hide a door without an Object
  Selector chain.

## Cookbook

- **"The gate doesn't open":** `validate_scene`; for the node it names, `inspect_runtime {node}`; fix the wire; then
  `playtest` the walk to the gate and the click.
- **A collect-the-gems check:** `playtest` with a `walk` to each gem and a `click` on it, then compare the score in the
  HUD values with the number of gems.
- **Try something risky:** `undo_last {checkpoint: "safe"}`, build, and if it is wrong `undo_last {restore: "safe"}`.
