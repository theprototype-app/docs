# Cinematic View

*New in 1.69.* **Preview**, at the top right of the 3D view, switches the viewport to the **Cinematic view**: the
same live scene, drawn with light that bounces between surfaces, reflections on shiny surfaces, softer shadows and
a gentle glow. You keep working while it is on: select, move things with the gizmo, undo, run flows and physics,
press Play, and the people in your session keep editing with you.

![The Product shot template in the standard view: a red knot, a gold cube and a glass ball on a white pedestal.](https://docs.theprototype.app/img/cinematic-view/standard-view.webp)

![The same scene in the Cinematic view (Standard): the knot bounces red light onto the pedestal and shows in its top, and the shadows are softer.](https://docs.theprototype.app/img/cinematic-view/cinematic-standard.webp)

The standard view (top) and the Cinematic view at Standard quality (bottom).

## Turn it on and off

| Where | How |
|---|---|
| Viewport | press **Preview** at the top right |
| Keyboard | <kbd>Shift</kbd>+<kbd>Z</kbd> in the 3D view (rebind it in **Settings ▸ Shortcuts**) |

It is a setting of **this computer**. Other people in the session keep their own view, nothing is sent to them, and
the scene file does not change. If you leave it on, it comes back on by itself a few seconds after the app loads.

## Quality

The arrow beside **Preview** opens the quality menu:

![The Preview switch with its quality menu open: Basic, Standard, High.](https://docs.theprototype.app/img/cinematic-view/switch-menu.webp)

| Step | What it adds |
|---|---|
| **Basic** | soft contact shadows (ambient occlusion), smoothing and glow, no bounced light |
| **Standard** (the default) | bounced light and reflections at half resolution, on top of Basic |
| **High** | bounced light and reflections at full resolution; offered up to a 1440p-sized window |

When frames get slow (below about 30 frames a second for two seconds), the view **steps down by itself** one step and
a small note says so. It does not step back up on its own: pick the step in the menu again to try it.

## What it does not show yet

This is the first version. A few things are drawn as **plain stand-ins** while the view is on, and a note under the
switch names the ones in your scene:

- [shader graph](https://docs.theprototype.app/shader-graph.md) materials and hand-written shaders (they show their base colour),
- [water](https://docs.theprototype.app/water.md) surfaces and fluid tanks,
- particle effects,
- 3D text,
- painted terrain layers,
- jiggle (the object shows, without the wobble).

The grid also fades less with distance than in the standard view.

Switch the view off to see them as usual. Nothing in the scene is changed.

## Photo, video and VR

- **Photo mode** and **video takes** are made through the Cinematic view while it is on. A path-traced photo needs
  the standard view: Photo mode says so, so switch the view off first.
- **Entering VR** turns the view off first; VR always uses the standard view.

## Which devices get it

The switch appears only where it can work:

- a **desktop or laptop** computer,
- **Chrome or Edge** with WebGPU on a hardware graphics card (not a software one).

Phones, tablets and VR headsets do not get the switch and **download nothing extra** for it. If the graphics card
fails while the view is on (a shader that does not compile, a lost device), it switches back to the standard view by
itself, tells you why, and stays off for the rest of the session.

## What it costs

Measured on 2026-11-20 in real Chrome 156 on a desktop PC with an RTX 4090 (the same window as the standard view,
no vsync), median frame time:

| Scene | Standard view | Basic | Standard | High |
|---|---|---|---|---|
| Tavern interior | 4.2 ms | 5.6 ms (1.3x) | 5.8 ms (1.4x) | 5.9 ms (1.4x) |
| Castle courtyard | 2.8 ms | 3.3 ms (1.2x) | 3.7 ms (1.3x) | 3.6 ms (1.3x) |
| Product shot | 1.1 ms | 1.5 ms (1.4x) | 1.9 ms (1.7x) | 2.4 ms (2.2x) |

On a Steam Deck (a 1920x1080 window), Standard holds in the Castle courtyard and the Product shot; in the Tavern it
steps down to Basic by itself, and High steps down in every scene. On a handheld, pick **Basic**.

## See also

- [Camera & View](https://docs.theprototype.app/camera.md#render-mode-view): the Shaded / Shaded + AO / Wireframe render modes
- [Pro Look](https://docs.theprototype.app/pro-look.md) and [Scene Look](https://docs.theprototype.app/post-processing.md): the look every viewer sees, saved with the scene
- [Photo Mode](https://docs.theprototype.app/photo-mode.md)
