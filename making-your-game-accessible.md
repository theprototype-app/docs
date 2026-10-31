# Making your game accessible

Every game made here has an **Accessibility** page built in — in Play, on a play link, in an
embed and in an exported game. Players open it from the pause menu (**Esc** or the corner
**Menu** button, **X** on the left controller in VR) or from the **Accessibility** button on the
start card before they press Play. What they choose is saved on *their* device, for *your* game
only, and is never sent to the other people in the session.

This page is about the few things you can do as the creator so those options work well.

| What the player gets | What makes it work in your game |
|---|---|
| **Captions** — a line of text for the game's sounds | Give your sounds a caption (below) |
| **Colour filter** — None / Protanopia / Deuteranopia / Tritanopia | Nothing — it filters the whole view. Still: never let colour be the *only* clue |
| **HUD text size** — 100 / 125 / 150 / 200 % | Leave room around HUD text; keep the important things away from the edges |
| **Controls** — move any key or gamepad button | Name your Key Press and Gamepad Button nodes' **action** |
| **VR comfort** — vignette, seated mode, one-handed | Nothing — it works in every scene. Prefer teleport-friendly floors |

!!! tip "Try it yourself"
    Press **Play**, open the menu, choose **Accessibility** and turn everything on. Play a
    round with captions on and the sound off, then with the colour filter on. Anything you
    could not follow is something to fix.

---

## Captions

A player who cannot hear the game — deaf or hard of hearing, sound off on a train — reads a
caption instead. Captions appear at the bottom of the screen (and low in the view in a
headset) at the size the player picked, on a solid backing.

- **Sound node** — type a caption in the node's **caption** field: `[rain on the roof]`,
  `[engine starts]`. It shows each time the sound starts.
- **Game Sound node** — leave **caption** blank and the player sees the sound's name
  (`[coin]`, `[explosion]`); type your own words to say more (`The gate creaks open`), or `-`
  to never caption it. Very frequent sounds (step, click, pop) have no default caption.
- **Timeline audio clip** — select the clip and fill in **Caption** next to Gain. It shows for
  the length of the clip — use it for spoken lines too, even before you have recorded them.
- **Modules** — `api.captions.show('A voice: "Over here!"', { seconds: 4 })`, and
  `api.playSound('coin', at, { caption: 'Coin collected' })`. `api.captions.shown()` tells you
  whether this player has captions on.

Write captions for what matters to the *game*: a door opening behind the player, an enemy you
can hear before you see it, a timer that starts beeping. Square brackets for sounds and quotes
for speech is the convention players know.

## Colour

The colour filter shifts colours so the ones a player finds hard to tell apart stand out. It
helps, but it cannot rescue a game where red-versus-green is the only difference between a
safe tile and a deadly one. Pair colour with something else: a shape, an icon, a pattern, a
label or a sound. The editor's own status colours already follow this rule in every theme.

The filter applies to the 3D view and your HUD on flat screens (desktop, phone, exports). In a
headset the row says *2D only*.

## HUD text

At 150 % or 200 % every text-carrying HUD element grows — its box and its type together —
from the corner it is anchored to. To keep a bigger HUD readable:

- anchor elements to the corner or edge they belong to, rather than placing them mid-screen;
- leave space between neighbouring elements so a grown box does not cover the next one;
- prefer a few large, short lines over many small ones.

Images, the minimap and the crosshair keep their size.

## Controls

Players can move any of your game's keys and gamepad buttons to ones that suit them — a
left-handed layout, a single-switch setup, a key that is easier to reach. The **Controls** list
shows the walker's keys (W A S D, Space) and every **Key Press** and **Gamepad Button** node in
your scene. Each node has an **action (for players)** field: fill it in (`Jump`, `Open the
door`) so the list says what a key *does* instead of just `Key R`. Two nodes on the same key are
one row — they always fire together.

Everything that reads input follows the player's layout: Key Press, Gamepad Button, Move Input,
the Character Controller's code and modules reading `api.onInput` / `api.input`. Esc always opens
the pause menu and cannot be moved. On-screen touch buttons send your game's own keys, so they
keep working whatever the player remaps.

## VR comfort

These are the player's own headset settings (**Settings ▸ VR**, and repeated on the
Accessibility page in a headset); they work in every scene:

- **Comfort vignette** — Off / Low / High: the edges darken while the stick moves or turns the
  player smoothly. Your game's own **Comfort vignette** setting can pick a level for your game
  (Default follows the player's).
- **Seated** stance lifts a seated player's view to standing eye height; **Height** fine-tunes
  it; **Recenter** measures again from where they sit now and turns them to face your spawn.
- **One-handed** (Left only / Right only) puts everything on one controller: the stick walks
  forward and back and turns sideways, holding the stick press aims a teleport, B/Y opens the
  radial menu (which then offers Edit / Interact and the game menu), A/X talks or jumps.

What helps: allow teleport in your game (the play block's `locomotion.teleport: true` — see
[Module SDK](https://docs.theprototype.app/module-sdk.md)) on floors players can reach,
avoid moving the player without their input, and give your game a spawn so Recenter has
somewhere to face.

---

**Related:** [Accessibility (the editor)](https://docs.theprototype.app/accessibility.md) · [VR](https://docs.theprototype.app/vr.md) · [Audio](https://docs.theprototype.app/audio.md) · [Example: build a game loop](https://docs.theprototype.app/build-a-game.md)
