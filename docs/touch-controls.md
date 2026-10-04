# Touch Controls

On a phone or tablet, games show **on-screen controls**: a stick to move, a drag to look around, and **action buttons**
for the game's own actions — jump, throw, use, grab.

<!-- 36-docs: written from the 36-touch lane's handover + code; reconcile with its docs-fragment.md when it lands. Images are the lane's emulated-phone captures. -->

<div style="display:flex;gap:16px;flex-wrap:wrap" markdown>
![Sky Run on a phone: the move stick bottom-left and the Jump button bottom-right](img/touch/sky-run-phone.png)
![The touch controls layout editor, with the Jump button selected](img/touch/layout-editor.png)
</div>

## When they show

**Settings ▸ Touch controls ▸ Show touch controls**:

- **Auto** (default) — in Play on a touch screen, or as soon as you touch the screen.
- **Always** — on, whatever the device.
- **Never** — off.

**Show in edit** also draws the action buttons while you edit (they press their keys there too); the stick and the look
drag only exist in Play.

## The buttons

A game's buttons come from what it needs, with no setup:

- A game (or module) can declare its actions and a preset — platformer, shooter, toss, golf, fly, explore.
- Otherwise the scene decides: a walking [Character Controller](build-a-game.md#3-a-character-that-walks) gets **Jump**,
  a flying one **Up** / **Down**, and every key a [Key Press](nodes/keypress.md) node listens for gets a button for that key.

The built-in games come set up: **Sky Run** has Jump; **Target Toss** has Throw (hold to charge, release to throw);
**Mini Golf** uses the stick and look, and you putt by dragging back from the ball; **Marble Maze** has no stick — you
drag to tilt the board; **Towers** has Grab (hold it to carry); **The Alchemist's Escape** has Use and Hint.

Several fingers work at once — walk with the stick while you jump. **Haptic tick** gives a short vibration on each press,
on phones that support it. The play-mode ✕ moves to the top-left in a game, out of the way of the game's Menu button.

## Arranging them

Open the layout editor from **Settings ▸ Touch controls ▸ Layout ▸ Edit layout**, or from the game's pause menu
(**Touch controls**, shown where touch controls are in use):

- **Drag** a control to move it. Select one to change its **Size** and **Opacity** (or pinch it with a second finger),
  **Hide** it, or put it back with **Default place**.
- Choose whether the layout is for **This game** or **All games**.
- **Save** keeps it, **Cancel** throws the changes away, **Reset** goes back to the defaults.

Layouts are saved on this device. **Settings ▸ Touch controls ▸ Layout ▸ Reset** clears them all.

## How they look

**Settings ▸ Touch controls ▸ Button looks** lists every button with a preview of its **Released** and **Pressed** state.
For each state, **Upload** a PNG or SVG, or pick an image from your [Explorer](explorer.md); set a **Tint** and the icon
size. Looks are saved on this device.

## Other settings

| Setting | Default | What it does |
|---|---|---|
| Show touch controls | Auto | Auto / Always / Never |
| Show in edit | off | action buttons while editing too |
| Haptic tick | on | a short vibration on each press, where supported |
| Look speed | 1× (0.25–3) | how far a drag on the right half of the screen turns the view |

Search Settings for *touch*, *joystick*, *buttons* or *layout* to find this section.

## For module authors

A module declares its touch actions with `api.input.actions(list, {preset, stick, look})`, which returns an `off`
function and is torn down with the module. See the [Module SDK](module-sdk.md).

## Trackpads

*TODO (36-touch, add-on A4): two-finger pan and pinch zoom on a laptop trackpad (Safari gestures included) — see also
[The mouse wheel](controls.md#the-mouse-wheel).*
