# Dialogue

A conversation in a box at the bottom of the player's screen, or a panel in VR: lines with a speaker,
choices that set a variable or jump to another part. Only the player who started it sees it.

**Output:** event (pulses when the talk ends)

## Inputs

| Input | Takes |
|---|---|
| start | a pulse (On Click, Key Press, HUD Button), or a value turning on (Proximity to the player) |
| stop | a pulse: closes the open talk without the end pulse |

## Parameters

| Parameter | Default | What it does |
|---|---|---|
| script | `Guide: Hello there!` | the lines, one per row (see below) |
| who | me | me = only the player who started it; everyone = every player gets their own copy |
| choices set | shared | shared = the game variable; player = each player's own |

## The script

| Row | Means |
|---|---|
| `Old Man: Welcome!` | a line said by Old Man |
| `The wind howls.` | a line with no speaker |
| `> Yes [set helping = 1] -> yes` | a choice for the line above: sets helping to 1, jumps to `# yes` |
| `# yes` | a part; the talk starts at the top and a part ends at the next `#` |
| `[set gold += 5]` | changes a variable when the talk gets here |
| `-> end` | finishes the talk |
| `@portrait Old Man = old-man.png` | Old Man's picture (a Library image) |
| `// note` | a comment |

## Practical example

**Proximity** (to: player, radius 2.5) on a character into **Dialogue** start, and the Dialogue's output
into **Visibility** on a hidden key: walk up, talk, and the key appears when the talk ends.
