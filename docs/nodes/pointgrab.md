# Point Grab

Decides whether players may pick objects up **by pointing at them** — the VR grip ray from a distance, or the desktop
crosshair carry. While its `enabled` input reads off, only a hand that actually **touches** an object moves it.

**Output:** none — it is a declaration the scene makes while it is in the graph

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| enabled | boolean | unwired = on (pointing picks things up). False turns pointing off |

## How it works

The node is read every frame; if **any** Point Grab node reads off, pointing is off. With no Point Grab node in the scene
pointing works as it always has. It is each player's own switch — wire it to a per-player [Game Setting](gamesetting.md)
and each person chooses for themselves — and the editor is never affected.

## Practical example

A zero-gravity room where things should only move when you touch them: a [Game Setting](gamesetting.md) toggle *Point to
move stars* (default off) → **Point Grab**'s `enabled`. Players who prefer the grip ray can switch it back on in the
game's Settings.
