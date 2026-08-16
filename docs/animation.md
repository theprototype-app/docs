# Animation

Give any object a **clip**: a named animation made of keyframes. Open a door, run a lift, spin a turntable, blink a light. Clips are stored with the object, replicate to everyone in the session, play on a shared clock, and export with your glTF.

!!! info "Two different things called animation"
    This page is about animation **you author** — keys you place on a timeline. A model you *import* can also arrive with its own baked clips (a walk cycle from a rigged character); those play from the **Animation** section of the object's properties, and the [Play Animation](nodes/playanim.md) node drives either kind.

## Opening the timeline

Select an object, then open the **＋ Animation** tab — it sits with Flow and the UV editor in the bottom dock, and undocks into a floating window with the ⧉ button.

The window has three parts:

| Part | What it is |
|---|---|
| **Clip list** (left) | Every clip on the selected object. **Add** creates one; the ✎ renames; drag the divider to resize the list. |
| **Timeline** (centre) | The keys themselves — a *dope sheet* of channel rows, or a *graph* of curves. |
| **Navigator** (above the timeline) | The whole clip at a glance, with the visible window as a thumb — drag it to pan. |

## Clips, channels and keys

A **clip** owns a length, a loop mode (*once*, *loop* or *ping-pong*) and any number of **channels**. A channel is one animatable property; **Add channel** lists the ones that apply to the object you picked:

| Group | Channels |
|---|---|
| **Transform** | `pos.x/y/z`, `rot.x/y/z`, `scale` (uniform) or `scale.x/y/z` |
| **Visibility** | `visible` — a *stepped* channel: it holds its value until the next key instead of fading |
| **Look** | `opacity`, `color.r/g/b`, `metalness`, `roughness`, `emissive` |
| **Lights** | `light.intensity` |

A **key** is a value at a time. Click a channel row at the playhead to add one; drag it to move it; <kbd>Del</kbd> removes the selection.

!!! tip "Rotation turns around the object's origin"
    A door swings on its hinge only if its **origin** sits on the hinge. Set it from the object's properties (*Transform ▸ Origin*) before you key the rotation — the animation follows it.

## The transport

| Control | Does |
|---|---|
| ▶ / ⏸ | Play or pause **on every peer** |
| ◀ | Play backwards from the playhead |
| ⏹ | Stop and return to where playback started |
| ⏮ / ⏭ | Jump to the start / end of the clip |
| **A** / **B** | Set the loop start / end — playback stays inside that window while you work on one part |
| **Speed** | Playback rate. It changes nothing in the data |
| **Fit** | Frame the whole clip |

## Timing: three separate things

These are deliberately not the same control, because collapsing them means giving a door more room silently makes it slower:

| You want | Use |
|---|---|
| The clip to be **longer or shorter** (keys stay where they are) | the clip **length** field |
| The movement itself **stretched or squashed** | **Retime** — scales every key time |
| It to **play** faster or slower, changing no data | the **speed** control |

Each clip also has its **fps** — what its key times mean, and the grid the arrow keys step on — and an optional **step**, which samples the clip on a coarser grid for a deliberately stepped, "on twos" look.

## The dope sheet and the graph

Switch with the sheet / graph toggle:

- **Dope sheet** — one row per channel, keys as diamonds. Best for timing.
- **Graph** — the actual curves. Best for *how* a movement feels.

In the graph, each key carries the **easing** of the segment that follows it. Drag its tangent handles right on the curve, or type the numbers in the pad. Handles are allowed to overshoot past the value — that overshoot is what makes a bounce read as a bounce.

## Selecting and editing keys

| Action | How |
|---|---|
| Select | Click a key; **Shift+click** adds |
| Box / lasso select | Drag on an empty part of the plot (the toolbar switches which) |
| Add the key under the playhead | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |
| Drop the selection | <kbd>Esc</kbd> |
| Move / scale the selection | <kbd>1</kbd> / <kbd>2</kbd>, then <kbd>Shift</kbd>+arrows (X = time, Y = value) |
| Grab with the pointer | **Middle-click** — the keys follow the cursor, click or <kbd>Enter</kbd> commits, <kbd>Esc</kbd> puts them back |
| Copy / paste / duplicate | <kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>V</kbd> / <kbd>D</kbd> |
| Mirror in time | <kbd>M</kbd> |
| Delete | <kbd>Del</kbd> |

The clipboard is held **by channel** and relative to the earliest key copied, so a paste works across clips and across objects, creating any channel the target is missing.

## Navigating

| Action | How |
|---|---|
| Step the playhead by a frame | ← / → (<kbd>Ctrl</kbd> ×10, <kbd>Shift</kbd> ×100) |
| Jump key to key | <kbd>Alt</kbd>+← / → |
| Zoom | Wheel (up = in), or the ± buttons |
| Pan | Right- or middle-drag, <kbd>Shift</kbd>+wheel, or the navigator thumb |

## Auto-key

Switch **Auto-key** on and posing the object records it: drag the gizmo or type a number in the properties panel and a key lands at the playhead, creating the channel if it does not exist yet. Switch it off and the object goes back to being just an object.

## Presets

**Door**, **Drawer**, **Elevator**, **Turntable**, **Pulse** and **Blink out** drop a finished clip onto the selected object — a starting point you then retime and re-ease. Door and Drawer expect a sensible **origin** (see the tip above).

## Markers

Name a moment inside a clip — *"footstep"*, *"latch"*, *"dust"* — and the [Animation Marker](nodes/animmarker.md) node fires as the playhead crosses it, on every peer. Add one at the playhead from the marker row; double-click to rename; ✕ removes it.

Markers ride with the clip, so they save, replicate and undo with it.

## Onion skin

Switch **Onion skin** on to see faint ghosts of the object at the keys either side of the playhead — the classic way to judge spacing. It is a local view setting: your peers do not see your ghosts.

## Everyone sees the same thing

Both halves replicate. The **data** (clips, keys, markers) syncs latest-wins, and the **transport** (which clip is playing, from when, at what speed, inside which A/B window) rides the session's synced clock, so every peer evaluates the same pose at the same moment. Someone joining late receives all of it.

Every gesture is **one undo step** — a drag of twelve keys undoes as one, not twelve.

## Driving clips from the flow graph

| Node | Does |
|---|---|
| [Play Animation](nodes/playanim.md) | Play, stop, restart or toggle a clip — wire *On Click* to it and a door opens for everyone who sees it clicked |
| [Animation Finished](nodes/animfinished.md) | Pulses when a *once* clip reaches its end — hand off to a sound, a counter, or the next door |
| [Animation Marker](nodes/animmarker.md) | Pulses as a named marker passes |
| [Animation State](nodes/animstate.md) | Reads progress, playing, position, duration or remaining as a number |

## Saving and export

Clips are part of the object, so they travel in your `.tpscene` files and autosaves. Saving a **glTF** samples every clip into real keyframe tracks, so other tools play them back — with one exception: the **look** channels (opacity, colour, metalness, roughness, glow, light intensity) are not part of what glTF animation can carry, so they stay in the app.
