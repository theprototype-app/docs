# Scene Look (Post-processing)

Grade the finished frame. A **scene look** is a stack of screen-space effects — ambient
occlusion, colour grading, bloom, vignette, film grain, pixelation — applied over the
whole viewport after the scene is drawn.

The look is **part of the scene**. It replicates to everyone in the session the moment you
change it, it is saved with the file, and it undoes like any other edit. Nobody has to
switch anything on to see what you made.

## Opening it

**Configure Scene ▸ Post-processing** — or right-click the viewport and choose
**View ▸ Post-processing…**, which opens the panel straight at that section.

## Building a look

Press **+ Add effect** and pick one from its family:

| Family | Effects |
|---|---|
| Ambient occlusion | Ambient occlusion |
| Colour grading | Tone mapping, Hue / saturation, Brightness / contrast, LUT |
| Stylize | Dot screen |
| Camera FX | Bloom, Vignette, Film grain, Chromatic aberration, Pixelation, Scanlines |
| Anti-aliasing | SMAA |

Each row has a grip to **drag it up or down**, a checkbox to switch it off without losing
its settings, and a **✕** to remove it. Click a row's name to open its parameters.

**The order matters.** The stack runs top to bottom over the frame, so grading placed
before a vignette darkens differently than grading placed after it. Drag to rearrange, or
use the ↑ ↓ buttons.

### What the "passes" line means

Under the enable checkbox you will see something like:

> Effects: 4, passes: 2 (2 merged into a shared pass)

Most effects are combined into a **single fullscreen shader**, so eight of them usually
cost far less than eight times one. Ambient occlusion is the exception — it needs a pass of
its own, and it splits the run wherever you place it. That line is there so you can see the
cost of what you are building; if you care about performance, keep the AO entry at one end
of the stack rather than the middle.

## Ambient occlusion

Soft contact shadows where surfaces meet. Its parameters had no controls at all before this
release:

- **Radius** — how far a surface looks for things that occlude it, in world units.
- **Intensity** — how dark the occlusion gets.
- **Falloff** — how quickly the effect fades with distance.
- **Quality** and **Half resolution** — both default to **Auto**, which follows each
  viewer's own shadow-quality setting, so everyone keeps their own performance trade-off.
  Pin them when the look matters more than the frame rate.

If your scene sets its own ambient occlusion, the personal **Shaded + AO** button in
**View** switches off and says so — the scene's setting is used instead. Two AO passes would
double every contact shadow and cost twice as much.

## Colour grading with a LUT

A **LUT** (lookup table) is the standard way to move a grade between tools. Put a `.cube`
file — or a LUT strip image — in the [Explorer](explorer.md), then pick it in the LUT
effect's **LUT file** row.

The file is shared with your peers automatically. Anyone who does not have it asks for it,
so people who join later get the grade too, and it travels inside a saved
[`.tpscene`](saving.md).

**Smooth interpolation** (tetrahedral sampling) is slower but avoids banding on small LUTs.

## Tone mapping

Tone mapping decides how bright values are compressed into what your screen can show.
While a **Tone mapping** effect is in the stack it takes over from the renderer's own
curve, so the image is never mapped twice — pick the curve you want (AgX, ACES Filmic,
Neutral, Reinhard, Cineon, Uncharted 2) and set its white point and middle grey.

## Seeing it, or not

The look renders for everybody. What is local is your right to switch it off:

- **View ▸ Overrides — this device** has a **Scene look (post-processing)** checkbox. Turn
  it off if your machine struggles, or if an effect is uncomfortable to look at. Your peers
  still see the scene as its author made it.
- **Wireframe** skips post-processing entirely — it is a diagnostic view.
- Turning an effect off in the stack, or unticking **Scene look enabled**, changes it *for
  everyone* — that is scene data, not a personal setting.

## Limits worth knowing

- **Post-processing does not run in VR.** The effects are skipped in a headset; objects
  still look the same, and materials made with the [Shader Graph](shader-graph.md) are
  unaffected.
- **The camera preview inset (PiP) shows the plain image**, without the look.
- **Sprites, billboarded avatar photo cards and particles** do not write depth, so effects
  that read depth do not affect them. A strong stylize effect makes that more visible than
  ambient occlusion ever did.
- **A GLTF export does not carry the look** — glTF has nowhere to put screen-space effects.
  The app tells you when you export. Save a **Scene (`.tpscene`)** to keep it.
- On some mobile GPUs fullscreen effects are mis-rendered by the driver: the viewport can
  freeze on a stale frame while you move. If that happens, switch the scene look off in
  **View ▸ Overrides**.
- Very old browser builds have a shader bug with fullscreen effects; the app detects them,
  skips the look and explains once.

## Effects that come from a newer version

If someone using a newer build adds an effect this one does not know, it is shown in the
list as **unsupported** and left completely alone — it is still saved, still shared, and
still there for people whose version does understand it. Nothing you do to the rest of the
stack deletes it.
