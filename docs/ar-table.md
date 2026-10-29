# Play on a Table (AR)

On an Android phone with Chrome, the editor can put the whole scene on a real table in front of you, through the
camera — and you can play it there while everyone else in the room keeps playing on their desktop or headset. New in
1.42.

## Start it

1. Open **More ▸ Tools & View ▸ AR table** (you can drag it onto the bottom bar), or long-press **Play** and choose
   **Play on a table (AR)** (on an unfolded phone, right-click or long-press Play in the toolbar).
2. Allow the camera. Point the phone at a table and move it slowly until a white ring sits on the surface.
3. **Tap** (or press **Place here**) to stand the scene there. It is sized to fit the table — the readout at the top
   shows the scale, for example `1:80`.

## Size, turn, move

- **Pinch** with two fingers to make it bigger or smaller, **twist** them to turn it.
- **Move** picks a new spot; the size and the turn are kept.

## Play

Press **Play**. Taps now press things in the scene — [On Click](nodes/onclick.md) nodes, module buttons, game pieces —
and a game's [HUD](hud-editor.md) shows on screen. **Stop** returns taps to looking.

**Exit AR** (or the phone's Back) returns to the editor exactly as it was.

Where you placed your table is only on your phone: the others see the scene at its normal size, and your edits and
theirs travel as always.

## What it needs

- **Chrome on Android** with Google Play Services for AR (ARCore). On an iPhone, or in a desktop browser, the item says
  *AR needs Android Chrome* and does nothing.
- In a room where headsets are [colocated](colocation.md#join-from-a-phone), **Join room** (or **More ▸ Join room
  (AR)**) puts the phone in that room at full size instead of on a table.
- A Quest's passthrough (**Play ▸ Enter AR passthrough**, see the [VR Guide](vr.md)) is a different mode and is
  unchanged.

## Limits

- While playing on the table, taps **click**; you cannot drag-carry a physics body across the table yet.
- At table scale, other players' avatars float above the scene (they are where they stand in the full-size world).
- A browser that refuses the on-screen overlay still places and clicks, but shows no buttons.
