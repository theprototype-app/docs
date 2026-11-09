# Recipe: a guard

*New in 1.64.* A guard who walks a round, and calls **"Spotted!"** when a player comes within 4 m.

## Make it

1. Select the guard (a character or any object), standing where its round should be.
2. In the node editor, right-click the pane ▸ **Recipes ▸ Guard**.
3. Press Play and walk towards it.

## What it adds

**A Path** in the scene: a closed square loop 3 m around the guard on each side, walked at 1.2 m/s, named *‹guard›
route* ([Paths](paths.md)).

**Nodes** in the guard's own flow:

| Node | Set to |
|---|---|
| [Path patrol](nodes/pathpatrol.md) | the new Path, facing along it |
| [Object Selector](nodes/objectselector.md) | the guard, wired into Proximity's **a** |
| [Proximity](nodes/proximity.md) | radius 4 m, **to** *player* |
| [Announce](nodes/announce.md) | *Spotted!* in red, for 1.5 s |
| [Game Sound](nodes/gamesound.md) | *whistle* |

All of it is one undo step, shared with everyone in the session.

**Each player hears their own warning**: Proximity with *to: player* measures from the guard to *your* player, so the
banner and the whistle are for whoever came close. The guard does not chase you (yet).

## Make it your own

- **A different round**: select the Path, press **Edit points** and move, add or delete points; give a point a **Wait**
  so the guard stops there.
- **Several guards on one round**: give the others a Path patrol on the same Path with an **offset**.
- **Sharper eyes**: raise the Proximity **radius**.
- **A real alarm for everyone**: wire the Proximity into a [Set Variable](nodes/setvariable.md) or a kit action instead,
  which every peer shares.
