# Film with your phone

Your phone becomes the viewfinder of a camera in the scene. Hold it up and turn it to look
around, use the stick to move, and press **●** to record. The shot is added to the
[Timeline](https://docs.theprototype.app/timeline.md) while the Timeline plays, so you can film moving scenes.

## Opening Film mode

- **Phone:** **More ▸ Film with phone**.
- **Any device:** right-click a camera ▸ **Film with this camera**, or press **Film** beside
  **Preview** in the camera's Inspector section.

Opened from **More**, Film asks which camera to film through. Pick one, or press
**New camera here** to place a camera where you are looking.

![Film's camera picker on a folded phone: Film camera, the scene's camera, and New camera here, which places a camera where you are looking.](https://docs.theprototype.app/img/film/picker.webp)
*Figure: The camera picker on a folded OPPO Find N6.*
The first time you open Film, a tip at the top says how to film. It goes away after your
first shot, or when you press its **✕** (Settings ▸ Interface ▸ **Reset tips** brings it back).

![Film mode on a folded phone, looking through the Film camera at the crate and the ball: the first-use tip at the top says how to film, the lens controls and the round record button sit at the bottom.](https://docs.theprototype.app/img/film/filming.webp)
*Figure: Filming through the Film camera, with the first-use tip.*
While you film, the rest of the editor is hidden. The 3D view is cropped to the camera's
aspect ratio, so the picture on screen is exactly what gets recorded. Press **✕** (or **Esc**
on a keyboard) to leave. Leaving does not move the camera object.

## Looking around

| Control | What it does |
|---|---|
| Turn and tilt the phone | The camera turns with it. It works in portrait and in landscape. |
| **Recentre** (⌖, or **R**) | Makes the direction the phone points right now "straight ahead" for this camera. |
| **Horizon lock** | Keeps the picture level however the phone leans. |
| Drag the picture | Turns the view. This is the only way to look on a device without motion sensors, such as a desktop. |

On an iPhone, press **Use phone motion** the first time and allow motion access. If you
decline, you can still drag to look.

## Moving

- **Stick** (bottom left): moves along the floor in the direction you are looking.
- **▲ / ▼**: rise and sink. **m/s** cycles the speed (0.5 to 8 metres per second).
- On a keyboard: **W A S D** to move, **E / Q** to rise and sink.
- **Mini-map** (🗺): a top-down map of the scene. Tap a spot to move the camera there.

### Walk with the phone (Android)

On an Android phone with Chrome and Google Play Services for AR, open the **settings**
(the sliders button) and press **Track my movement**. Your real steps now move the
camera. **Walk scale** sets how far the camera moves for each metre you walk:

- 0.1 is good for a miniature set.
- 20 lets you cross a city in a few steps.

The stick, **Recentre** and the mini-map keep working while you walk. Press the
**Walking** chip to stop.

!!! note
    While you walk, the phone's AR view shows the scene at the phone camera's own lens. Zoom
    and dutch angle are still recorded, and you see them when you play the take back.

## The lens

- **Zoom:** pinch the picture, or drag the rail on the right edge. The lens buttons
  **18 / 24 / 35 / 50 / 85 mm** jump straight to those lenses, and a pinch or drag that ends
  close to one snaps to it.
- **Settings ▸ Smoothing:** steadies a shaky hand. The recording keeps the steadied
  movement, and the raw movement is saved alongside it.
- **Settings ▸ Dutch:** tilts the picture on purpose. Double-click the slider to reset it.
- **Settings ▸ Depth of field:** turns on focus and aperture. Tap something in the picture to
  pull focus to it, and use **Aperture** to set how blurry the background gets (f/1.4 is very
  blurry, f/16 keeps almost everything sharp). If the camera's [look](https://docs.theprototype.app/post-processing.md) has
  no **Depth of field** effect yet, Film offers to add one.

## Rigs

Choose a rig in **Settings ▸ Rig**:

- **Handheld:** the default.
- **Tripod:** the camera stays in place and only turns.
- **Track:** tap an object and the camera keeps it framed the way it was when you tapped,
  even as you move.

## Guides

**Settings ▸ Guides** draws a rule-of-thirds grid, a safe area, and a level line that turns
green when the picture is level. **Mask** shows a 16:9, 9:16 or 2.39:1 frame inside the
shot. Guides are never recorded.

## Recording

1. Press **●**. With **3-2-1 countdown** turned on, the phone counts down and buzzes first.
   The Timeline plays from its playhead while you film.
2. Press **❚❚** to pause. The shot so far is added to the Timeline as a single undo step.
3. Press **●** again and choose how to continue:

    ![After a pause, Film asks how to continue: Cut (a new shot) or Move (fly there, same shot).](https://docs.theprototype.app/img/film/resume-ask.webp)

    - **Cut** (the default) starts a new shot from where you are now.
    - **Move** flies the camera from the last frame to where you are, then keeps recording
      as the same shot.
4. Press **Done** to finish. Your shots stay in the Timeline.

While recording, press **Mark** (or **M**) to drop a marker on the Timeline.

Open **N shots** to see this camera's shots:

- **Retake** records a shot again. A retake that runs long trims the start of the next shot.
- **Edit in Timeline** opens the take in the Timeline, where you can trim the shots and
  **Smooth keys** (the track menu ⋯ of a property track) to take the handheld shake out.
- **Export video** opens [Export a video or GIF](https://docs.theprototype.app/recording.md) on the take's timeline, set to MP4.

![The shots sheet: three shots with Retake, Edit in Timeline and Export video.](https://docs.theprototype.app/img/film/shots-sheet.webp)
*Figure: **N shots** lists this camera's shots.*
### What gets recorded

The camera's position and rotation are saved as Timeline keys. They are thinned out but stay
within 1 cm and 0.5° of what you filmed. Zoom, dutch angle, focus and aperture each get
their own track, but only if you changed them. The full-detail movement is kept as a hidden
file in your Library.

## Filming with others

When you film in a shared session, everyone else sees the camera move as you film. They get
a **Watch the shot** button that opens your live view in their camera preview window. Only
**editors** can record; a view-only guest can film and be watched, but the **●** button is
off for them.

Others see your camera move, but nothing is saved until you record. When you stop filming,
the camera goes back to where it stands.

## On a phone without motion sensors, and on a computer

Film works everywhere: where there is no gyroscope (or you decline motion access), drag the
picture to look. On a computer, **W A S D** and **E / Q** move the camera.

## Limits

- A phone exports at most 20 seconds of video at a time (see [Export a video or GIF](https://docs.theprototype.app/recording.md#on-a-phone)).
- Track my movement needs Android with Chrome and AR support; Quest's browser is not a target.
- Walking drifts slowly over long takes: recentre now and then.
