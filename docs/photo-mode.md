# Photo Mode

A **photo** is a path-traced still of your current view: soft shadows, real reflections, glass
that bends light, and glowing surfaces that light the room around them. It comes out as a PNG.

## Taking a photo

1. Frame the view you want.
2. Open **Configure Scene ▸ Scene look** and press **Photo…**.
3. Press **Render photo**.

The still sharpens while it renders. You can keep working: your view never moves, and nobody
else in the session is affected. Press **Stop** at any time to keep the still so far.

When it is done:

- **Download PNG** saves the file.
- **Save to scene shots** files it in the [Explorer](explorer.md) under *Scene shots ▸ the
  scene's name*. It is an ordinary Library file: it is shared with the session like your
  other files, and Undo removes it again.

## Settings

| Setting | What it does |
|---|---|
| Samples | 1 to 2048 (default 256). More samples, less noise. |
| Time limit | 2 to 600 seconds (default 60). The render stops at whichever comes first. |
| Denoise | Smooths the noise that is left (on by default). |
| Size | **Half**, **View** (the size of your 3D view) or **2x** (at most 4096 pixels). |

## Headsets and phones

Path tracing is too heavy for a headset or a phone.

- **With a PC in the same session**, the PC renders your view and sends the PNG back. The person
  on the PC sees *Rendering a photo for you… Stop*. A photo asked of someone else is capped at
  512 samples, 90 seconds and 2048 pixels.
- **With no PC**, you get the best normal still of the view and a plain *not on this device*.
- On a phone you can switch on **Try here anyway**. It is slow and warms the phone.

## What a photo cannot show

A photo draws the scene's objects and lights, not everything the editor draws. The window lists
this too, under **What photos cannot show**.

| In the scene | In a photo |
|---|---|
| PBR materials, glass, emissive surfaces, 3D text, scattered objects | Yes |
| Basic, Lambert, Phong and Toon materials | A matte material with the same colour and texture. Basic counts as self-lit. |
| [Shader-graph](shader-graph.md) materials | The object's base material. The graph's colours, patterns and movement are not drawn. |
| Your own GLSL shaders | Left out |
| Flat text, particles, lines, sprites | Left out |
| [Scene look](post-processing.md) effects (bloom, grade, vignette …) | Not applied: the photo is the clean render with the scene's tone mapping and exposure |
| Water | A still, glassy surface |
| Hemisphere and ambient light | Replaced by sky light in the same colours |

## For AI apps

An AI app takes a photo with `run {action: "photo"}` (samples, seconds, denoise, and
`save: true` to file it under Scene shots). It sees the result like a screenshot.
