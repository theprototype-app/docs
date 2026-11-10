# Game kit

Almost every game needs the same handful of rules: how far a player may reach, a round with a
countdown and a time limit, levels that unlock, a score, things to pick up, enemies that spawn,
take damage and walk towards you. The **game kit** builds these once, in the app, so a game does
not have to.

Each piece of the kit is available two ways, generated from the same description, so they behave
identically and use the same words:

- as **Kit:** node groups in the [Flow editor](https://docs.theprototype.app/node-system.md) palette — **Kit: Rules**,
  **Kit: Round**, **Kit: Levels**, **Kit: Score**, **Kit: Pickups**, **Kit: Spawner**,
  **Kit: Health** and **Kit: Mover**;
- as `api.kit.*` for [modules](https://docs.theprototype.app/module-sdk.md#the-game-kit-apikit) and
  [behaviours](https://docs.theprototype.app/behaviours.md).

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
  progress. Someone **joining** does not take a running round over (since 1.48.1).
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
  **lost**, **On results**, **On back to menu**. *On round start*, *On go*, *On round lost* and
  *On results* pulse on every peer, whoever pressed the button.

**When a press does nothing.** *Since 1.64* a round action that cannot run right now is **refused
with its reason**, never silently. *Win round* or *Lose round* during the results says "the round
already ended (results): start or restart a new one first"; in the menu it says "no round is
running (in the menu): start one first". From code the call answers
`{ ok: false, refused: true, reason }`; the reason also appears in the session's log — the
Debug console and an AI agent's `logs` — on every peer, including the one that pressed.

The round drives the app's shared game state, so HUD screens bound to a state and the
[pause menu](https://docs.theprototype.app/build-a-game.md#6-a-pause-menu-you-can-actually-click) keep working — and the pause menu's **Restart** restarts a kit
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

*Since 1.64* the levels come from the scene's one **Levels table** (Configure Scene ▸ Levels) — the
same list portals and Claude use; see [Levels and progress](https://docs.theprototype.app/levels-and-progress.md). New nodes:

- **Back to checkpoint** — puts *this* player back at their last checkpoint (or the level start).
  Mark the chain *Per player* so a press moves only whoever pressed it.
- **New game** — starts over for *this* player: forgets the saved progress on this device, resets
  what the game keeps across levels, and goes to the first level.
- **Last checkpoint** (value) — the name of the checkpoint (or portal) this player last passed;
  empty when none.

*Go to level* and *Next level* move **everyone** (group travel); a portal moves only the player who
walks through it.

Someone joining a session late sees the room as it is: pickups already taken stay hidden and cannot
be taken again. Loading or clearing a scene on your own before joining no longer resets the room's
game.

### Score

- **Add score** — points to the shared score and to the player who earned them; counted **once**
  however many peers saw the pulse. **Set score**, **Reset score** (a new round does this by
  itself).
- Values: **Score** (shared), **My score** (each peer reads its own), **Best score** (the best
  this device has seen for this game and level), **Leader**.

Any player key counts for **Set score** and **Leader**: a peer id, or a name of your own such as
`red-team` or `lab`. Leader is whoever holds the most points, whatever kind of key it is.
- Events: **On score**, **On new best**.

### Pickups

- **Collect pickup** — takes a pickup once for everybody: its points go to the shared score and
  to the player who took it, and it comes back after *respawn* seconds (0 = never). A second take
  before it is back is refused. The pickup is the object wired into **pickup**, else the object
  whose flow holds the node. *Since 1.64* **Collect on touch** (on by default) takes it when a
  player walks over it — no On Enter, no code; or switch it off and wire an On Click or On Enter
  into it. Its card says why it did not fire (*won't fire: touch off, nothing wired*,
  *blocked: refused…* — see [Why did this not fire?](https://docs.theprototype.app/debugger.md#why-did-this-not-fire)).
- **Reset pickups** puts every pickup back (a new round does this by itself).
- Values: **Pickup available?** (wire it into a Visibility node to hide a taken pickup),
  **Pickups taken**, **Pickups left**.
- Events: **On pickup**, **On pickup back**, **On all pickups taken** (a "collect them all" win).

A pickup a module or behaviour registers can also be taken just by **walking into it**. The
[gem arena recipe](https://docs.theprototype.app/gem-arena.md) is a whole collect-them-all game made of these nodes alone.

### Spawner

Enemies, targets and other **entities**: copies of a template object, each with its own health,
tags and data, drawn on every peer. They are not saved and do not appear in the object list.

- **Spawn entities** — make *count* entities of a *kind*, drawn as copies of the *template*
  object, at a place (unwired: where the template stands), spread out, with hit points, a speed
  (above 0 they get a mover) and how long a dead one stays before it is removed
  (**remove after death**, default 1 s). A spawned thing that dies stops counting at once
  (*Entities alive*, *On all entities dead*). From code, `removeAfter: null` (or a negative
  number) keeps the dead in place — a body that should stay on the floor.
- **Remove entity**, **Clear entities** (of a kind, or all).
- Value: **Entities alive** (of a kind, or all).
- Events: **On entity spawned**, **On entity removed**, **On all entities dead** — the wave is over.
  They pulse on every peer. *On all entities dead* pulses once, when the last one dies, not again
  as the bodies are removed.

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
on the [Module SDK](https://docs.theprototype.app/module-sdk.md#the-game-kit-apikit) page. Logic written as a
[behaviour](https://docs.theprototype.app/behaviours.md) calls the same `kit`. Since 1.23 a module can add a piece of its own with
`api.kit.provide` — the engine a game's [rules](https://docs.theprototype.app/game-rules.md) call as `kit.golf.*`, `kit.football.*`… — see
[For module and game authors](https://docs.theprototype.app/module-sdk.md#for-module-and-game-authors-123).

Game rules can be proved without a browser: the core repo's **headless logic sim**
(`tests/unit/sim`) runs several fake peers on a fake clock through the real message validation,
so "two players press Start at once" or "the host leaves mid-wave" is a unit test that runs in
milliseconds. See *The game kit* in the core repo's `MODULES.md`.
