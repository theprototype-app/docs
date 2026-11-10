# Recipe: A Furnished Room

A room that feels alive, built from nodes — a door you open, a lamp you switch, a doorbell you press, a sofa you sit on,
a cat that wanders, plants in a breeze and a little pond. Every piece is the same for everyone in the session, and an
agent can build all of it for you (see [Ask an agent](#ask-an-agent) at the end). *Since 1.64.*

Each step gives the object its own flow: select the object, open the node editor, add the nodes there (an effect node
in an object's own flow drives that object; no Object Selector needed).

## A door that swings on its hinge

1. A tall thin box for the door. Add **On Click** and **[Rotate To](https://docs.theprototype.app/nodes/rotateto.md)**: angle 90, axis y,
   **pivot left**, duration 1.
2. Wire On Click into Rotate To's **toggle**.

Press Play and click it: it swings open on its left edge, and shut on the next click.

**Opens by itself:** wire any boolean into **open** instead of the click — a [Proximity](https://docs.theprototype.app/nodes/proximity.md) between
the door and a character or a cart, or a Toggle on a wall switch — and the door opens while it is true and closes again
after.

**Opens when a player walks up ("On Near"):** use the [walk-up door recipe](https://docs.theprototype.app/recipe-walk-up-door.md) — right-click the
node editor ▸ **Recipes ▸ Door (opens when you walk up)**. It adds a sensor zone round the door, with
[On Enter](https://docs.theprototype.app/nodes/onenter.md) (who: *player*) to open and [On Exit](https://docs.theprototype.app/nodes/onexit.md) to close, so every player sees the
same door. (A Proximity with **to: player** measures each player's own distance, so it suits a light for whoever is
near rather than a shared door.) For a door that opens with a click in one step, there is the
[click door recipe](https://docs.theprototype.app/recipe-door.md).

## A lamp you switch

A lamp model with a Point light inside (or just a Point light). **On Click** into **[Light Switch](https://docs.theprototype.app/nodes/lightswitch.md)**
**toggle**, fade 0.4. Its glowing shade dims with the light. For a party, add a
**[Light Colour Cycle](https://docs.theprototype.app/nodes/lightcycle.md)** to a second light.

## A doorbell you can press

A small box on the wall by the door:

1. **[Highlight](https://docs.theprototype.app/nodes/highlight.md)** (leave **on** unwired) — it lights up while you point at it: the VR laser, the
   Play crosshair, the mouse in Interact, or a finger resting on it on a phone.
2. **On Click** into **[Press Button](https://docs.theprototype.app/nodes/pressbutton.md)** (axis -z for a button facing +z out of the wall) and
   into a **[Sound](https://docs.theprototype.app/nodes/sound.md)** node's trigger with a chime from the Explorer.

Every player hears the chime and sees the button go in.

## A sofa to sit on

Put a flat box on each cushion, make it invisible, and give each a **[Sit Spot](https://docs.theprototype.app/nodes/sitspot.md)** facing the room.
Click a cushion to sit; any move key (or the stick) stands you up.

## A cat that lives there

A cat model (or any animal from the packs) with **[Ambient Animal](https://docs.theprototype.app/nodes/ambientanimal.md)**: rx 3, rz 2, rest 0.6,
restTime 5, lookRadius 3. It strolls, sits, and turns to watch whoever comes near. Raise **fleeRadius** to 1.5 for a
shy one.

## Plants in a breeze, a flag outside

**[Wind Sway](https://docs.theprototype.app/nodes/windsway.md)** on each plant (plant, anchor bottom, strength 0.2) and on the flag (flag, anchor
left). The gusts are the same for everyone.

## A little pond

A flat box with the **Water** material preset and **[Flowing Water](https://docs.theprototype.app/nodes/waterflow.md)** (speed 0.15, swell 0.02).

## A mug you can pick up

**[Grabbable](https://docs.theprototype.app/nodes/grabbable.md)** on the mug, release **stay** — players carry it in Play without a physics
simulation. On a remote control that should always go back to the coffee table: release **return**.

## Ask an agent

Through the [Claude connector](https://docs.theprototype.app/ai/claude-connector.md) or the in-app assistant, describe the room: *"Make the door swing
open when clicked, a lamp I can switch, a button that rings a bell, a sofa I can sit on and a cat that wanders around."*
The agent places the same nodes with `create_flow_nodes` — it finds them by name or by everyday words (door, lamp,
button, seat, sofa, cat, pet, flag, river) and `describe_node_types` tells it every input and setting.
