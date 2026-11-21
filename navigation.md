# Navigation

*New in 1.72.* The **Navigation** module lets things walk round your scene on their own: enemies that patrol and
chase, a pet that follows you, a crowd that wanders. It works out where the floor is (a *navmesh*) from your scene's
colliders and finds a way round walls, crates and steps.

A scene with no navigation nodes downloads none of it. The first time you add an enemy or a navigation node, the
module installs from the module gallery (about 660 KB) and every player who opens the scene is asked to install it too.

## The quickest way in

- Right-click any object ▸ **Make this an enemy…** sets up a guard in one sheet. See [Make an enemy](https://docs.theprototype.app/make-an-enemy.md).
- **Templates ▸ A guard on patrol**: a walled yard with a guard that walks its round, spots you and chases you.

## Nodes

Find them in the node editor under **Navigation**.

| Node | What it does |
|---|---|
| **Enemy (NPC)** | The whole guard: patrol or stand guard, see, hear, chase, attack, give up and walk back. The sheet builds this one. |
| **Move To** | Walk the object to another object, the shortest way round; `arrived` fires when it is there. |
| **Chase** | Follow an object, or the nearest player, and stop a set distance away. |
| **Flee** | Run from an object, or the nearest player, until it is far enough away. |
| **Wander** | Stroll to random walkable spots around its home, pausing between. |
| **Patrol (Path)** | Walk a [Path](https://docs.theprototype.app/paths.md)'s points, in a loop or back and forth. Edit the Path and it follows the new line. |
| **Make Noise** | A pulse makes a noise at a spot (or at the player); enemies in hearing range come to look. Louder noises carry further. |
| **On NPC Event** | Fires on `spotted`, `heard`, `attack`, `lost`, `gaveup`, `returned`, `unreachable` or `arrived`, for one enemy or any. |
| **NPC State** | Reads an enemy's state (idle, patrol, alert, chase, attack, return), or 1/0 for chasing, alert and reachable. |
| **Navmesh** | The bake settings: cell size, agent radius and height, climb and slope. One in the scene graph; without it the defaults bake. |

Every moving node has an **enabled** input: wire a Latch or a Gate into it to switch it on and off. An object may
carry several; the highest one in the table above wins while it is enabled.

## The navmesh

The walkable area is baked from the static colliders and the terrain. You do not press anything:

- Move a wall and the navmesh bakes again after a short pause.
- A dynamic body (a crate you can push) is a **moving obstacle**: push it out of a doorway and the way is free again
  within a second, with no rebake.
- **View ▸ Navmesh overlay** draws the walkable area (green) and the moving obstacles (red) on your screen.

## When a place cannot be reached

Nothing jitters at a wall. When the place it wants is unreachable (a cage, a ledge, the far side of a closed door),
the walker goes to the closest point it can reach and stops. **View ▸ NPC debug view** shows the reason on its label:
**off mesh**, **blocked** or **too far**, and **On NPC Event** fires `unreachable` so a game can react.

## Multiplayer

One player's browser runs the walkers (the lowest id among the players in Play) and everyone else sees them move
smoothly from about 10 updates a second. If that player leaves, the next one takes over.

## Limits (per device)

| Device | Walkers moving at once | Triangles read into one bake | Rebake on edit |
|---|---|---|---|
| Computer | 64 | 600 k | up to 2.5 s |
| Phone | 24 | 200 k | up to 4 s |
| Headset | 24 | 200 k | up to 4 s |

Over the limit, the extra walkers stand still and a message says so once. A bigger scene bakes its first part and
says which meshes to hide or simplify. Phone and headset limits are first estimates; they will be updated once they
are measured on the devices.

## Agents

An agent can make an enemy too: `game_setup` with `npc` builds the same guard as the sheet.
