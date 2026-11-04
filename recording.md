# Export a Video or GIF

Turn a [Timeline](https://docs.theprototype.app/timeline.md), a **turntable** round your model or a **flythrough** of your saved views into a file:
an **MP4** or **WebM** video, a **GIF** or **animated WebP** loop, or a **PNG sequence** with a transparent background.
The export renders the scene **frame by frame**, so a 2-second clip at 30 fps has exactly 60 frames however slow the
device is — a 4K export just takes longer.

Right-click the viewport ▸ **Tools ▸ Recording…**, or press **Export video** in [Film](https://docs.theprototype.app/film.md)'s shots sheet.

![The Export dialog in a small window, set to Turntable: what to film, the format list (MP4 video), size, frame rate, length and quality, the frames and file size it will make, and the Export button. 1: Format. 2: Export.](https://docs.theprototype.app/img/recording/export-dialog.webp)
*Figure: The Export dialog, in a small window.*

1. **Format**: MP4, WebM, GIF, animated WebP or PNG frames.
2. **Export** renders the take frame by frame.

## What to film

| Mode | What the camera does | Options |
|---|---|---|
| **Timeline** | plays a sequence from its start: its camera shots (or your view where it has none) and its clips at every frame | **Timeline** — the length follows it |
| **Turntable** | circles the selection (or the whole scene), starting from where you are looking | **Turns** (¼ – 3), **Direction**, **Frame it to fit** |
| **Flythrough** | flies through your saved camera views in order, blending the lens between them | — |

A flythrough needs at least two saved views: right-click the viewport ▸ **Camera bookmarks ▸ Save current view**.

## The file

| Format | Good for | Notes |
|---|---|---|
| **MP4 video** | phones, chat apps, video editors | H.264 where the browser has it |
| **WebM video** | the web | smaller files |
| **GIF loop** | anywhere a GIF goes | 256 colours and big files: use **Small (854 × 480)** and a few seconds; at most 50 fps |
| **Animated WebP loop** | a modern GIF | full colour, transparency, much smaller files |
| **PNG sequence (.zip)** | compositing in a video editor | one lossless PNG per frame, with transparency |

**Size**: the viewport, Phone 9:16 (1080 × 1920), Square, HD, Full HD, 4K, Small (854 × 480) or Small square.
**Frame rate**: 12 – 60 fps. **Length**: 1 – 60 seconds. **Transparent background** (WebP and PNG only) drops the sky.
**Hide editor helpers** (on by default) hides the grid, gizmo, outlines and helpers. The dialog shows the frame count
and about how big the file will be before you start.

## While it renders

The dialog closes and a bar at the bottom shows the progress: the percent, the frame, about how long is left, and
**Cancel** (which stops it and saves nothing). **Hide** shrinks the bar to a small chip in the corner so you can keep
working in the panels; **Details** brings it back. The 3D view shows the render until it is done, and your camera
comes back where it was afterwards. Nothing is sent to anyone in the session.

![The rendering bar above the toolbar while an export runs: the progress bar and percent, the frames done and the time left, Hide and Cancel.](https://docs.theprototype.app/img/recording/rendering-bar.webp)
*Figure: The rendering bar while an export runs; you can keep working.*
Hiding the browser tab pauses the export; no frames are lost. Starting VR or Play stops it.

## The result

Videos and loops are saved to **Explorer ▸ Recordings** and offered as **Download**; a PNG sequence is a .zip to
download.

![The finished export in the dialog, in a small window: the video of the turning ball, its file name, length, size, frame rate and frames, Saved to Explorer, and the Download, Show in Explorer and Export again buttons. 1: Download. 2: Export again.](https://docs.theprototype.app/img/recording/export-result.webp)
*Figure: The finished MP4, with Download, Show in Explorer and Export again.*

1. **Download** to **save file**; it is in the Explorer already.
2. **Export again** goes back to the settings for a new take.

## On a phone

A long render heats a phone and slows it down, so on a phone:

- an export is **at most 20 seconds**; a longer one is refused with the reason (shorten it, or export on a computer);
- the size is at most **1920 px** on the long side; when the phone is running hot (the app has already lowered the
  scene's quality to keep it smooth), it renders at **1280 px**, and the dialog says so.

Keep the phone plugged in and the app in front while it renders.

## Limits

- What moves on its own clock — flow-graph spins, physics — plays at its own pace during an export; the timeline, its
  shots and clips, and the turntable / flythrough camera are frame-exact.
- An imported model's own clips do not move in a timeline export (the same as scrubbing the Timeline); clips made in
  the [Animation](https://docs.theprototype.app/animation.md) editor do.
- No sound in exported videos yet.
- Browsers without WebCodecs record the video **live** as WebM instead (keep the tab in front); the dialog says so.
- GIF, WebP and PNG exports hold at most 1800 frames.

!!! note
    This page is about video. **Performance** recordings — frame time and draw calls — are in the
    [Profiler](https://docs.theprototype.app/profiler.md).
