# Recipe: a door that opens when you walk up

*New in 1.64.* The door opens as a player walks up to it and closes when they walk away. This is the **"On Near"**
pattern: a sensor zone around the door, with [On Enter](https://docs.theprototype.app/nodes/onenter.md) to open and [On Exit](https://docs.theprototype.app/nodes/onexit.md) to
close. Because the zone is checked by the physics, everyone sees the same door move.

## Make it

1. Select the door.
2. In the node editor, right-click the pane ▸ **Recipes ▸ Door (opens when you walk up)**.
3. Press Play and walk to the door.

## What it adds

**A zone** in the scene: a translucent box, 3 × 2.4 × 3 m, centred on the door, named *‹door› zone*. It is a static
**sensor** (Physics ▸ Sensor): you walk through it, and it notices you.

**Nodes** in the door's own flow:

| Node | Set to |
|---|---|
| [On Enter](https://docs.theprototype.app/nodes/onenter.md) | **who** *player*, wired into an Object Selector picking the zone, and into Toggle Animation's **open** |
| [On Exit](https://docs.theprototype.app/nodes/onexit.md) | **who** *player*, wired into a second Object Selector picking the zone, and into **close** |
| [Toggle Animation](https://docs.theprototype.app/nodes/toggleanim.md) | closed = where the door stands, open = a quarter turn; sound *door* |

All of it — the zone and the nodes — is one undo step, shared with everyone in the session.

## Make it your own

- **A bigger or smaller reach**: scale the zone. Hide it (Inspector ▸ visibility) if you do not want it seen; it still
  works.
- **Let objects open it too** (a cart, a ball): set **who** to *any* on both triggers.
- **Swing on the hinge**: see [the click door](https://docs.theprototype.app/recipe-door.md#make-it-your-own).
- **It does not open?** The On Enter card says why: *won't fire: physics is not running* or *blocked: not the player*
  ([Why did this not fire?](https://docs.theprototype.app/debugger.md#why-did-this-not-fire)).

A [Proximity](https://docs.theprototype.app/nodes/proximity.md) with **to: player** also tells you a player is near, but each player measures their
own distance, so it suits a sign that lights for whoever is close rather than a door everyone shares.
