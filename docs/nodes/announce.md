# Announce

A big centred banner for a moment worth celebrating — "GOAL!", "Floor 3", "Ring 2 reached". On a
desktop it sits over the game; in a headset it floats in front of the player.

**Output:** none (a sink)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse shows the banner once |
| value | number | optional — replaces `{v}` in the text (a level, a score, a ring number) |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| text | `Level {v}` | the headline; `{v}` is the wired value |
| sub | — | an optional smaller second line |
| seconds | 1.8 | how long it stays (0.3 – 15) |
| color | `#ffd76a` | the headline colour |

The banner is **local**: every player's own graph fires it from the shared trigger, so everyone
sees it at the same moment without anything extra crossing the network. A new banner replaces the
one showing.

!!! tip
    Don't announce the end of a round over a results screen — the screen already carries the words.
