# Recipe: a gem arena with nodes only

A whole little game — walls, three gems to collect, a score on the screen and a gate that opens when you have them all —
made only of nodes: no module, no script. Two players can play it together; each gem is taken once, for everyone.
*Since 1.64.*

## 1. The arena

1. Add a floor and four walls (boxes). Give each one physics: Inspector ▸ **Physics ▸ Static**.
2. Add a gate across the exit: another box, also **Static**.

A level made only of static objects runs its physics when Play starts, so the walls stop you without starting a
simulation ([Physics](https://docs.theprototype.app/physics.md#running-a-simulation)).

## 2. Three gems

For each gem (a small shape, or a gem from the packs):

1. Select it and open the node editor: its own flow opens.
2. Add **Kit: Pickups ▸ Collect pickup**. Leave **pickup** unwired (it means this gem) and keep **Collect on touch** on.

That is all: walking over a gem takes it, its point goes to the shared score, and it disappears for everyone. No On Enter
is needed.

## 3. The score on the screen

1. In the [HUD editor](https://docs.theprototype.app/hud-editor.md) add a text element.
2. In the Scene flow: **Kit: Score ▸ Score** into a [HUD Text](https://docs.theprototype.app/nodes/hudtext.md) on that element, format `Gems: {v}/3`.

## 4. The gate opens at three

In the Scene flow:

1. **Score** into a [Compare](https://docs.theprototype.app/nodes/compare.md) **a** (op `gte`, b = 3).
2. Compare into a [Gate](https://docs.theprototype.app/nodes/gate.md) set to **not**.
3. Gate into a [Visibility](https://docs.theprototype.app/nodes/visibility.md) **on**, wired into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md) that
   picks the gate.

While fewer than three gems are taken the gate stays; the third gem makes it disappear.

## Try it

Press Play and walk over the gems. Invite a friend: each gem can be taken once, by whoever reaches it first, and you both
see the score climb. If a gem does not go, its **Collect pickup** card says why
([Why did this not fire?](https://docs.theprototype.app/debugger.md#why-did-this-not-fire)). To play again, the kit's **Reset pickups** and
**Reset score** put everything back ([Game kit](https://docs.theprototype.app/game-kit.md#pickups)).
