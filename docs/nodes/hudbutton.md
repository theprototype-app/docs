# HUD Button

Fires a pulse when a HUD button is pressed - the on-screen counterpart of On Click.

**Output:** event · `value` (the pressed button's **value** field, *since 1.74*)

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| element | (none) | the HUD button element, picked on the card |
| or any button on screen | (none) | *since 1.74*: leave **element** empty and pick a screen, and the node answers every button on it |

## One node for a whole screen of buttons

*Since 1.74* each Button element in the [HUD editor](../hud-editor.md#element-kinds) has a **value** field: what the
button passes on when it is pressed. Leave the node's element empty and pick a screen under **or any button on
screen**: this one node then fires for **every** button on that screen, and its **value** output says which one was
pressed. A level grid of twenty buttons, each with its level number as its value, needs one HUD Button node.

A button's **sound** field (also in the HUD editor) plays a press sound for the player who pressed it. It is *none*
by default.

## Practical example

**HUD Button** into a **Counter** into **HUD Text**: an on-screen button that counts its own presses for everyone.
