# Share a Moment

*New in 1.68.* While you play, the app keeps the **last 10 seconds** of the game view. When something worth
showing happens — the jump you finally made, the tower falling over — press **F8** and turn those seconds into a
**GIF** or an **MP4** you can download, share or keep.

Nothing has to be started beforehand, and nothing is sent anywhere: the moment stays in your browser tab until you
make a file of it.

## Share a moment

| Where | How |
|---|---|
| Keyboard | <kbd>F8</kbd> while playing |
| Play bar | the **clapperboard** button beside *Playing* at the top of the screen |
| Game controller | the **View / Select** button (the small button left of the centre) |
| Phone | tap the clapperboard button in the Play bar |

The game keeps running underneath while the preview is open; the pointer is free so you can use the controls.
**Esc** closes the preview and takes you straight back into the game.

## Trim and make the file

1. The preview loops the part you have picked. It starts on the **last 10 seconds** (or all of it, if you have played
   for less).
2. Drag **Start** and **End** to pick the moment: anything from **3 to 10 seconds**. Dragging one handle pushes the
   other along when the moment would get too short or too long.
3. Pick **GIF** (loops anywhere: chats, forums, docs) or **MP4** (smaller, sharper, plays everywhere).
4. Press **Make GIF** / **Make MP4**. The progress bar shows how far it is; **Cancel** stops it.

When the file is ready:

- **Download** saves it.
- **Share…** opens your device's share sheet (phones and some desktop browsers; the button only appears where the
  browser offers one).
- **Copy picture** puts the frame on screen on the clipboard as a picture. Clipboards take pictures, not GIFs or
  videos, so use Download or Share for the moving version.
- **Trim again** goes back to the trim to make another one from the same moment.

In the editor the file is also kept in **Explorer ▸ Recordings**, like a [video export](recording.md).

The file is 15 frames per second at up to 640 pixels on its long side (480 on a phone): small enough to send, and
exactly as long as the part you picked. Moments use the same encoders as
[Export a Video or GIF](recording.md); for a longer or sharper clip of a scene, use that instead.

## What is recorded, and when

- **Only the game view**: the 3D picture. Not the editor, the chat, the HUD, other people's voices or your
  microphone (there is no sound in a moment).
- **Only while you play.** Leaving Play forgets everything. Opening the preview pauses the recording, so the moment
  does not roll away while you trim it.
- **Not in VR**, and not on a device with little memory (under 4 GB). If keeping the last 10 seconds would slow a
  game down on your device, it switches itself off for the visit.

**Settings ▸ Privacy ▸ Share a moment ▸ Recording the last 10 s** turns it off on this device. With it off, nothing
is kept and **F8** does nothing.

## Published games

Players of a **published game** — a play link, an embed on another site, or an exported game — can share moments
only when the game's author allows it. It is **off** by default.

To allow it: open **Configure Scene ▸ Play** and tick
**Players of the published game can share moments (the last 10 s)**. In the editor, everyone who plays the scene can
always share moments.

The **Topple tower** starter (*New* ▸ templates) comes with it on, so a game made from it can be shared, moments
included, straight away.

## Limits

- Ten seconds at most, three at least.
- A slow game is recorded as it was drawn: if the game ran at 20 frames per second, the moment shows those frames,
  each held a little longer, so it still plays at the game's real speed.
- MP4 needs a browser that encodes video frame by frame (WebCodecs: current Chrome, Edge, Firefox and Safari);
  elsewhere the MP4 choice is greyed out with the reason, and GIF still works.
- A game that uses the controller's View / Select button for itself still opens the preview with it; use **F8** or
  the Play bar button in such games.
