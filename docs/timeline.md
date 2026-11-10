# Timeline (cutscenes)

*New in 1.39.* The **Timeline** is a sequencer for cutscenes and scripted moments. A **sequence** is a set of tracks
laid out over time: camera shots, animation clips, sounds and events for your node graph.

Sequences are part of the scene: they are saved with it, shared live with everyone in the session (late joiners too),
undoable, and they play in exported and published games.

!!! info "Not the Animation timeline"
    The [Animation](animation.md) editor keys **one object's** clips. The Timeline arranges whole clips, shots and
    sounds into a scene-wide sequence.

![The Timeline docked under the viewport, in a small window: the Intro sequence with Camera, Animation, Audio and Event tracks holding a Cam A → Cam B shot, a Door clip, whoosh.wav and a boom event. 1: + Track, which adds a track of any kind. 2: the boom event item.](img/timeline/tracks.webp){ .shot width="680" height="309" loading=lazy }
/// caption
The Timeline docked under the viewport.
///

<div class="shot-key" markdown>
1. **+ Track** adds a Camera, Animation, Audio or Event track.
2. An **event** item: it pulses On Sequence Event in the game when the sequence passes it.
</div>

## Opening it

- <kbd>Alt</kbd>+<kbd>T</kbd>, or the dock's **+** menu ▸ **Timeline**.
- A toolbar button (the video icon) can be added from **Customize toolbar…** (see [The toolbar](controls.md#the-toolbar)).
- On a phone it opens as a tab of the bottom sheet: **More ▸ Timeline**.
- A [Play Sequence](nodes/playseq.md) node's **Open in Timeline** link jumps to its sequence.

## Sequences, tracks and Properties

*Since 1.65* the Timeline has three panes.

- **Sequences** (left): every cutscene in the scene. Click one to edit it; double-click renames it. The **⋯** button (or
  a right-click) duplicates it, deletes it or grows it to fit its items. **+** adds a new one. A small play mark means
  Autoplay is on, and a loop mark means Loop is on.
- **Tracks** (middle): the transport (start, play, stop, time), snapping, camera previews, **Fit** and **+ Track** sit
  above the tracks.
- **Properties** (right) has two tabs:
    - **Sequence**: Name, Length, **Frame rate** (type 1-120, or pick 24 / 25 / 30 / 60), Autoplay, Loop, and how many
      tracks and items it has. The frame rate is the grid items snap to and the time readout counts in.
    - **Item**: the picked item's fields (start, length, camera / clip / sound / event name, caption). Picking an item
      opens this tab. Clearing the pick puts it away again, unless you opened the tab yourself.

Each side pane hides with its edge tab and can be resized. Every edit is one undo step, and everyone in the session sees
it.

## Tracks

| Track | What an item does |
|---|---|
| **Camera** | A *shot*: everyone watching looks through a [camera object](camera.md#camera-objects) for the item's length. Pick a second camera in **→ glide to** and the view moves from the first camera to the second over the shot — a dolly or pan between two marks, *smooth* or *linear*. A camera driven by a [Camera Rig](nodes/camerarig.md) node follows its target during the shot. |
| **Animation** | Starts one of an object's clips — one you authored in the [Animation](animation.md) editor, or one the model was imported with. |
| **Audio** | Plays a sound from the Explorer, cut at the item's end. |
| **Event** | Fires a named event into the node graph — the [On Sequence Event](nodes/onseqevent.md) node pulses. |
| **Property** | *New in 1.58.* Keys one value over time — a camera's zoom, roll, focus or aperture. A [Film](film.md) take records these; each key shows as a diamond. |

## Building a sequence

1. **+** in the **Sequences** pane adds a sequence. Set its **Length** in **Properties ▸ Sequence**.
2. **+ Track** ▸ Camera / Animation / Audio / Event.
3. **Double-click a lane** to add an item at that time. It picks the selected camera or animated object (or the first
   one); audio takes the first sound in the Explorer. Select the item and finish it in **Properties ▸ Item**:
   time, length, camera(s), object + clip + speed, sound + gain + **caption**, event name.
   An audio clip's **Caption** (one line, up to 200 characters) shows at the bottom of the screen while the clip plays
   for anyone with captions on ([Accessibility](accessibility.md#captions)).
4. **Drag** an item to move it; drag its **right edge** to change its length. Items snap to other items' edges, the
   playhead and the frame grid (the magnet button turns snapping off; hold <kbd>Alt</kbd> to drag freely). Each drag is
   one undo step.
5. **Scrub** by clicking or dragging the ruler: the viewport looks through the shot at that moment and animated objects
   take their pose. The eye button keeps your own view instead.
6. **Preview** with ▶ or <kbd>Space</kbd>. A preview is yours alone and does **not** fire graph events — events fire
   when the sequence plays in the game.

![Scrubbing the Intro sequence at 1.15 s in a small window: the viewport looks through Cam A, half-way into the glide, with the Timeline below. 1: the playhead parked on the ruler. 2: the Previewing Cam A strip.](img/timeline/scrub-shot.webp){ .shot width="688" height="840" loading=lazy }
/// caption
Scrubbing at 1.15 s.
///

<div class="shot-key" markdown>
1. The **playhead**, parked at 1.15 s by a click on the ruler.
2. The viewport looks through the **shot camera** at that moment; Exit gives you your own view back.
</div>

| Key | Does |
|---|---|
| <kbd>Space</kbd> | Play / pause the preview |
| <kbd>←</kbd> / <kbd>→</kbd> | Nudge the selection one frame (<kbd>Shift</kbd>: 10), or step the playhead |
| <kbd>Home</kbd> / <kbd>End</kbd> | Playhead to the start / end |
| <kbd>K</kbd> | Add an item on the selected track at the playhead |
| <kbd>Delete</kbd> | Delete the selected items |
| <kbd>Esc</kbd> | Cancel a drag, or clear the selection |
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | Select all |
| Wheel / <kbd>Shift</kbd>+wheel | Zoom / pan |

A track's **…** menu renames it, moves it up or down, or deletes it; its speaker button mutes it.

### Smoothing a recorded take

A take filmed by hand wobbles. On a **Property** track, the **…** menu's **Smooth keys** evens out the wobble and keeps
every key at its time, so cuts and markers stay where they were. It is one undo step; press it again to smooth more.

![The Timeline in a small window holding a Film take: two property tracks, Field of view · Film camera and Dutch roll · Film camera, each a row of key diamonds recorded by hand. 1: a key. 2: the track menu with Smooth keys.](img/timeline/property-track.webp){ .shot width="680" height="309" loading=lazy }
/// caption
A Film take on the Timeline: the field of view and the roll, keyed.
///

<div class="shot-key" markdown>
1. A **key**: the value the take recorded at that moment.
2. The track menu (**…**) has **Smooth keys**.
</div>

From 1.58, a track made by a newer version of the app says *Made with a newer version of the app* and is kept as it
is: it is shared and saved back unchanged, but this version cannot play or edit it.

## Playing it in the game

- **[Play Sequence](nodes/playseq.md)** node (Animation group): wire a trigger in — On Click, On Enter, Key Press.
  Actions: *play*, *stop*, *toggle*, *restart*. Every player runs the sequence from the same moment, and each player's
  own view cuts to the shots.
- **Autoplay** (in **Properties ▸ Sequence**): the sequence starts when a player enters Play — and when an exported game
  opens. **Loop** repeats it.
- **[On Sequence Event](nodes/onseqevent.md)** node: pulses when a running sequence passes an event with that name
  (blank = any), or **`end`** when it finishes. Wire it to Play Animation, Set Game State, a Sound.

!!! tip "An intro cutscene"
    Turn **Autoplay** on for the intro sequence, then wire **On Sequence Event** with event `end` → **Set Game State**
    *playing*. The game starts the moment the cutscene ends.

## On a phone

The Timeline is a tab of the bottom sheet (**More ▸ Timeline**). The controls wrap onto extra rows, and the tracks
scroll under them. On a phone or a touch handheld (folded or unfolded), the Sequences and Properties panes start hidden
and the top bar keeps a sequence picker.

![The Timeline as a tab of the bottom sheet on a folded phone: the controls wrap onto two rows over the four tracks with a narrow name column. 1: the Timeline tab of the sheet.](img/timeline/phone-sheet.webp){ .shot width="390" height="670" loading=lazy }
/// caption
The Timeline as a tab of the bottom sheet on a folded phone.
///

<div class="shot-key" markdown>
1. The **Timeline** **sheet tab** in the bottom sheet (More ▸ Timeline opens it).
</div>

## Limits

- One view at a time: a sequence's shots replace what that player looks through until it ends (or a later shot cuts
  in); then the previous view comes back.
- Clips a model was imported with start from their beginning — playing from the middle of the sequence does not start
  them mid-clip.
- A preview never fires graph events, so it cannot change the game state for one player only.
- Scenes with sequences need 1.39 or later to show them; older versions open the scene without its sequences.
- Property tracks need 1.58 or later. 1.57 and older show one as an empty Event track, and saving the scene there loses
  its keys.

![The Timeline in the light theme, in a small window: the Intro sequence with its Camera, Animation, Audio and Event tracks, a Cam A → Cam B shot, a Door clip, whoosh.wav and a boom event.](img/timeline/tracks-light.webp){ .shot width="672" height="303" loading=lazy }
/// caption
The Timeline in the light theme.
///
