# Game Setting

Adds **one row to the game's Settings** — the page in the game's pause menu, on the desktop and in VR — and outputs
**this player's** value. Each player's choice is saved on their own device, for this game, and never sent to anyone.

**Output:** the value — true/false for a toggle, a number for a range, the picked option for a choice

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| id | my-setting | a name unique to this game; the saved value is kept under it, so changing it starts the setting afresh |
| label | My setting | the row's label in Settings |
| kind | toggle | `toggle`, `range` or `choice` |
| default (toggle) | on | the starting value of a toggle |
| min / max (range) | 0 / 1 | the slider's ends (step 0.1) |
| options (choice) | — | comma-separated: `easy, normal, hard` |

The row appears while the node is in the graph and goes when it is deleted. Until a player changes it, the node outputs
the default.

## Practical example

Let each player choose whether claps make stars:

1. Add **Game Setting** — id `clap-stars`, label *Make stars with a clap*, kind *toggle*, default on.
2. Wire it into an [On Clap](onclap.md) node's `enabled`.
3. Test play, open the pause menu ▸ **Settings**: the row is there, and switching it off stops your claps only.

See [Build a Game Loop](../build-a-game.md) for the pause menu and per-game settings.
