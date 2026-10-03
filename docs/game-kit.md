# Game kit

Almost every game needs the same handful of rules: how far a player may reach, a round with a
countdown and a time limit, levels that unlock, a score, things to pick up, enemies that spawn,
take damage and walk towards you. The **game kit** builds these once, in the app, so a game does
not have to.

Each piece of the kit is available two ways, generated from the same description, so they behave
identically and use the same words:

- as **Kit:** node groups in the [Flow editor](node-system.md) palette — **Kit: Rules**,
  **Kit: Round**, **Kit: Levels**, **Kit: Score**, **Kit: Pickups**, **Kit: Spawner**,
  **Kit: Health** and **Kit: Mover**;
- as `api.kit.*` for [modules](module-sdk.md#the-game-kit-apikit) and
  [behaviours](behaviours.md).

**Towers** (Templates ▸ Games) runs on the kit — its reach rule, levels, score and round.

## One peer decides

In a shared session a press is seen by every peer — and a naive "add 1 to the score" then adds
one per peer. The kit avoids that by having **one authority peer** make every change: the peer
running the physics simulation, otherwise the one with the lowest peer id. Ask for a change on any
peer and it becomes a request the authority applies **exactly once**. A kit node fired by a shared
pulse is asked by every peer with the *same* request, so one press is one change.

- **Reads** (the round phase, the score, a level's stars) are the same on every peer.
- **Events** (*On go*, *On score*, *On pickup*) fire on every peer — the place to play a sound.
  A few are local on purpose: *On grab refused* only for the player who was refused, *On new
  best* on each device whose best was beaten.
- A player who **joins late** gets the current state and does not hear old events.
- When the **authority leaves**, the next peer takes over, including the enemies of a wave in
  progress.
- **Clearing the scene** resets the kit.

## The pieces

### Rules

Grab reach, jump height and play bounds.

- **Set grab reach** — how far from their body (in metres) a player may take hold of something;
  0 removes the limit. Every grab path obeys it: desktop Play, Interact, and the VR grip.
- **Set jump height** — how high a walking player jumps (<kbd>Space</kbd> on the desktop, **A**
  in VR) while a Character Controller walks; 0 = no jump.
- **Set play bounds** — a box a teleport must land inside.
- **Clear rules** — the scene's own play settings apply again.
- **On grab refused** — pulses for the player whose grab was refused (too far, or a game rule
  said no).

In code, a game can also **veto** a grab with its own rule (`rules.onGrabRequest`) — Towers'
"climb closer to take a piece" is one.

### Round

A round's whole life: an intro countdown, play, a time limit, pause, won or lost, results.

- **Round setup** — the intro countdown (seconds), a time limit (0 = none), what the clock
  running out means (*lose*, or *win* for a survive-the-timer game), and how long the won/lost
  moment lasts before the results.
- **Start round** (two players pressing Start start *one* round), **Restart round** (works while
  playing), **Pause round** / **Resume round**, **Win round** / **Lose round** (with an optional
  reason), **Add time**, **Back to menu**.
- Values: **Round phase** (menu, intro, playing, paused, won, lost, results), **Round playing?**,
  **Round time**, **Time left**, **Intro countdown**, **Round number**, **Round outcome**.
- Events: **On round start**, **On go**, **On round paused** / **resumed**, **On round won** /
  **lost**, **On results**, **On back to menu**.

The round drives the app's shared game state, so HUD screens bound to a state and the
[pause menu](build-a-game.md#6-a-pause-menu-you-can-actually-click) keep working — and the pause menu's **Restart** restarts a kit
round by itself.

### Levels

A level table with unlocks and stars.

- **Go to level** (a locked level is refused, with the reason), **Next level**, **Finish level**
  (won or not, a score, a time — stars follow the game's rule and a win unlocks the next level),
  **Set game mode** (switches mode and *keeps* the current level).
- Values: **Current level**, **Level name**, **Level number**, **Level stars**,
  **Level unlocked?**, **Total stars**, **Game mode**.
- Events: **On level chosen**, **On level finished**, **On level unlocked**.

Progress is saved **per device**: every player keeps the stars they saw earned. The table feeds
the pause menu's level picker automatically.

### Score

- **Add score** — points to the shared score and to the player who earned them; counted **once**
  however many peers saw the pulse. **Set score**, **Reset score** (a new round does this by
  itself).
- Values: **Score** (shared), **My score** (each peer reads its own), **Best score** (the best
  this device has seen for this game and level), **Leader**.
- Events: **On score**, **On new best**.

### Pickups

- **Collect pickup** — takes a pickup once for everybody (wire an On Click or On Enter into it):
  its points go to the shared score and to the player who took it, and it comes back after
  *respawn* seconds (0 = never). A second take before it is back is refused. Inside a pickup's
  own object flow, an unwired pickup means that object.
- **Reset pickups** puts every pickup back (a new round does this by itself).
- Values: **Pickup available?** (wire it into a Visibility node to hide a taken pickup),
  **Pickups taken**, **Pickups left**.
- Events: **On pickup**, **On pickup back**, **On all pickups taken** (a "collect them all" win).

A pickup a module or behaviour registers can also be taken just by **walking into it**.

### Spawner

Enemies, targets and other **entities**: copies of a template object, each with its own health,
tags and data, drawn on every peer. They are not saved and do not appear in the object list.

- **Spawn entities** — make *count* entities of a *kind*, drawn as copies of the *template*
  object, at a place (unwired: where the template stands), spread out, with hit points, a speed
  (above 0 they get a mover) and how long a dead one stays before it is removed.
- **Remove entity**, **Clear entities** (of a kind, or all).
- Value: **Entities alive** (of a kind, or all).
- Events: **On entity spawned**, **On entity removed**, **On all entities dead** — the wave is over.

A new round clears the entities.

### Health

Hit points on entities. Damage asked for on any peer is applied once, on the authority, and
credited to the player who asked.

- **Damage entity** (at 0 it dies; a dead entity takes no more), **Damage in area** (every living
  entity of a kind within a radius — a blast, a stomp), **Heal entity** (never above its maximum),
  **Revive entity** (back at full health).
- Value: **Entity health**.
- Events: **On entity damaged**, **On entity healed**, **On entity died**, **On entity revived**.

Code has a little more: regeneration and armour, and reads for an entity's maximum, its fraction left and whether it is alive.

### Mover

Steering for entities.

- **Chase** — every living entity of a kind chases a target object (unwired: the nearest player),
  steering round walls and each other. Crowds queue at the goal instead of jostling.
- **Stop moving**.
- **Knock back** — throw one entity with a velocity; it comes back to rest on the ground, inside
  the level and out of walls.
- **On entity stuck** — an entity made no headway and started a recovery: a sidestep, then a new
  route round the walls.

Movers treat the scene's top-level objects in their walking band as obstacles, and stay inside
the game's play bounds.

## For module authors and developers

Every node above has a code twin under `api.kit`; the full table of actions, reads and events is
on the [Module SDK](module-sdk.md#the-game-kit-apikit) page. Logic written as a
[behaviour](behaviours.md) calls the same `kit`.

Game rules can be proved without a browser: the core repo's **headless logic sim**
(`tests/unit/sim`) runs several fake peers on a fake clock through the real message validation,
so "two players press Start at once" or "the host leaves mid-wave" is a unit test that runs in
milliseconds. See *The game kit* in the core repo's `MODULES.md`.
