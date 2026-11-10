# Recipe: a guard

*New in 1.64.* A guard who walks a round, and calls **"Spotted!"** when a player steps into its sight.

## Make it

1. Select the guard (a character or any object), standing where its round should be.
2. In the node editor, right-click the pane ▸ **Recipes ▸ Guard**.
3. Press Play and walk towards it.

## What it adds

**A Path** in the scene: a closed square loop 3 m around the guard on each side, walked at 1.2 m/s, named *‹guard›
route* ([Paths](https://docs.theprototype.app/paths.md)).

**A sight**: a faint sensor box, 8 x 8 m and 2.4 m tall, named *‹guard› sight*. It walks the same Path in step with
the guard, so it is always around it.

**Nodes** in the guard's own flow:

| Node | Set to |
|---|---|
| [Path patrol](https://docs.theprototype.app/nodes/pathpatrol.md) | the new Path, facing along it (moves the guard) |
| [Path patrol](https://docs.theprototype.app/nodes/pathpatrol.md) + [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) | the same Path, wired to the sight, so it walks with the guard |
| [On Enter](https://docs.theprototype.app/nodes/onenter.md) + [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) | **who** *player*, watching the sight |
| [Announce](https://docs.theprototype.app/nodes/announce.md) | *Spotted!* in red, for 1.5 s |
| [Game Sound](https://docs.theprototype.app/nodes/gamesound.md) | *whistle* |

All of it is one undo step, shared with everyone in the session.

**Everyone sees the warning**: when a player steps into the sight, the On Enter pulse is shared, so the banner and the
whistle reach every player in the session, not only the one who was spotted. The guard does not chase you (yet).

Why not [Proximity](https://docs.theprototype.app/nodes/proximity.md)? Proximity gives a *value* (near or not) for as long as it is true, and an
Announce acts on a *pulse*. On Enter gives the one pulse at the moment a player steps in, which is what a warning
needs.

## Make it your own

- **A different round**: select the Path, press **Edit points** and move, add or delete points; give a point a **Wait**
  so the guard stops there.
- **Several guards on one round**: give the others a Path patrol on the same Path with an **offset**.
- **Sharper eyes**: select the sight and scale it up. Make it longer than it is wide and the guard looks ahead.
- **A real alarm**: wire the On Enter into a [Set Variable](https://docs.theprototype.app/nodes/setvariable.md) or a kit action as well.
- **Hide the sight**: set its opacity to 0 in the Inspector. It still works, because a sensor needs no visible surface.
