# Recipe: a door you click

*New in 1.64.* A door that opens with a click and closes with the next one — the same for everyone in the session, and
still open for someone who joins later.

## Make it

1. Select the door (a tall thin box, or a door model).
2. In the node editor, right-click the pane ▸ **Recipes ▸ Door (click to open)**.
3. Press Play and click the door.

## What it adds

| Node | Set to |
|---|---|
| [On Click](https://docs.theprototype.app/nodes/onclick.md) | wired into Toggle Animation's **toggle** |
| [Toggle Animation](https://docs.theprototype.app/nodes/toggleanim.md) | **closed** = where the door stands now, **open** = a quarter turn; open and close sound *door* |

All of it is one undo step. Open or closed is shared and saved with the scene.

## Make it your own

- **Swing on the hinge.** The quarter turn is about the door's **origin**. For a box door that is its middle, so move
  the origin to the hinge edge first ([Each object's origin](https://docs.theprototype.app/controls.md#each-objects-origin)) — or open the door the
  way you want by hand and press **Set** beside *open* on the Toggle Animation card.
- **Slower, or the other way**: change **duration** on the card, or Set a different open pose.
- **Closes by itself**: set **autoClose** to a few seconds.
- **Ajar**: **Add pose** on the card and name it; wire a button into **go to** with **pose** set to its name.

To open it by walking up instead, use the [walk-up door](https://docs.theprototype.app/recipe-walk-up-door.md).
