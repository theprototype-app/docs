# Set Look

Points the player's view at a target when a pulse arrives - a cutscene glance or a spawn orientation.

**Output:** effect

## Inputs

| Input | Type | Meaning |
|---|---|---|
| trigger | event | when to look |
| camera | object | the target to look at |
| on | boolean | hold the look while true |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| on | true | default hold |
| activate | true | also make that camera active |

## Practical example

A **Game Start** pulse into **Set Look** at the arena camera orients every player at the same thing when the round begins.
