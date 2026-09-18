# Scene Look (Post-processing)

Grade the finished frame. A **scene look** is a stack of screen-space effects — ambient
occlusion, colour grading, bloom, vignette, film grain, pixelation — applied over the
whole viewport after the scene is drawn.

The look is **part of the scene**. It replicates to everyone in the session the moment you
change it, it is saved with the file, and it undoes like any other edit. Nobody has to
switch anything on to see what you made.

## Opening it

**Configure Scene ▸ Scene look** — or right-click the viewport and choose **View ▸ Scene
look…**, which opens the panel straight at that section. (It used to be called
*Post-processing*; the old name still finds it.)

One section now holds the **whole** look, which is three layers, all of them scene data
everyone sees:

| Layer | Where |
|---|---|
| effects over the finished frame | the stack, in this section |
| the scene's **default material** | the [Shader editor](shader-graph.md) with nothing selected |
| a **material on one object** | the Shader editor with that object selected |

Under the stack, a **Shader materials** line says what the second and third layers cost
right now — whether there is a scene default, how many objects carry their own graph, how
many objects are being driven, and how many shader **programs** that comes to. Objects
sharing one graph compile one program, so the program count is the number worth watching.
**Open the shader editor** beside it is the way in.

Only the right to switch a layer off is local — that is [View ▸ Overrides](#seeing-it-or-not).

## Building a look

Press **+ Add effect** and pick one from its family:

| Family | Effects |
|---|---|
| Ambient occlusion | Ambient occlusion |
| Colour grading | Tone mapping, Hue / saturation, Brightness / contrast, LUT |
| Stylize | Dot screen |
| Shader graph | a post effect you built as a node graph — see [below](#a-post-effect-you-build-yourself) |
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

## A post effect you build yourself

The shipped effects are not the whole vocabulary. The [Shader editor](shader-graph.md) has
a **Post** domain: a graph whose inputs are the screen buffers — the frame as rendered so
far, its depth, its normals, the pixel grid — and whose output is the colour that pixel
ends up. Build one and it joins the stack as one more entry, so it replicates, saves,
undoes and reorders like any other effect.

Two ways in, and both land on something that renders:

- **+ Add effect ▸ Shader graph** offers **New: Posterise**, **New: Ordered dither**,
  **New: Edge detect (ink)**, **New: Ambient occlusion (graph)**, **New: empty graph**, and
  then any post graph this scene already has, to add a second copy of.
- In the Shader editor, switch the header from **Surface** to **Post** and press **Create
  post effect**, or pick one of the same presets from the row beneath.

The four presets are ordinary graphs, not sealed effects — that is the point of shipping
them. Open one, delete a node, see what changes:

| Preset | What it is |
|---|---|
| **Posterise** | Snaps the frame into a few brightness steps — a flat, printed look. |
| **Ordered dither** | Posterise with a 4x4 Bayer pattern mixed in first, so the bands break into dots. |
| **Edge detect (ink)** | Draws a line wherever depth or surface direction breaks — silhouettes and creases. |
| **Ambient occlusion (graph)** | A depth-only contact shading you can retune, as an alternative to the built-in AO pass. |

The stack row for one has a **Graph** picker, so you can point it at a different graph — or
the same graph twice, at two places in the stack. The node reference for the domain is
[Shader Nodes ▸ Post](shader-nodes.md#post); the editor's own half of the story is in
[Shader Graph ▸ Surface, or post](shader-graph.md#surface-or-post).

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

The look renders for everybody. What is local is your right to switch it off. **Configure
Scene ▸ View ▸ Overrides — this device** carries one checkbox per layer:

| Override | Turns off |
|---|---|
| **Scene look (post-processing)** | the stack — grading, ambient occlusion and camera effects |
| **Scene shaders** | materials driven by the scene's shader graphs: the scene default and any object with its own. Those objects show you their own material instead |
| **Scene HUD** | on-screen panels, scores and menus the scene author built |

Each one is yours alone. Nobody else's view changes, and nothing you switch off here is
saved into the scene.

- **Wireframe** skips post-processing entirely — it is a diagnostic view.
- Turning an effect off in the stack, or unticking **Scene look enabled**, changes it *for
  everyone* — that is scene data, not a personal setting.

The stack says so when one of these is hiding your own view of it: *You have switched the
scene look off on this device (View ▸ Overrides). Peers still see it.*

### Watching someone

Watching a peer now shows you the scene **through their look**, not yours: the camera they
are looking through and its grade, their view mode, and their own scene-look switches. So a
hero camera with a `replace` look, or a peer whose [Set Look](#switching-looks-from-a-node-graph)
node turned the scene look off, finally looks from outside the way it looks to them.

It lasts exactly as long as the watch — your own view mode and your own Overrides are
untouched, and come straight back when you stop.

When it cannot be done the watch banner says so beside the name:

- *showing your own look — they have not shared theirs* — they are on an older build, or you
  have not heard from them yet.
- *they have the scene look switched off* — what you are seeing through their eyes is
  deliberately ungraded.

## A look for one camera

A look does not have to belong to the whole scene. Any [camera](camera.md) can carry
its own, so switching cameras switches the grade — a hero camera with a heavy
cinematic look, a security-monitor camera that is deliberately grey and grainy.

In **Post-processing**, the **Look for** row picks which look you are editing: *The
scene (everyone)*, or any camera in the scene. Pick a camera and you get a fresh,
empty list — build it exactly the same way.

A camera look only shows **while someone is looking through that camera**. So after
you add effects to one, the viewport does not change until you look through it —
select the camera and press **Preview**, or use a **Set Active Camera** node.

### Add, or replace

The **Combine** row decides how a camera look meets the scene look:

| | |
|---|---|
| **Add to the scene look** | The scene look runs first, then this camera's. The usual choice: the house look plus a grade for this shot. |
| **Replace the scene look** | Only this camera's look runs. For a camera that is deliberately not the house look. |

Effects still merge across the join, so a scene grade plus a camera grade is usually
still one fullscreen pass.

Camera looks are scene data like everything else here: they replicate, they save with
the file, and they undo.

## Switching looks from a node graph

The **Set Look** node (Game group) switches a look when something happens — a key
press, a trigger, a game state.

- **camera** — whose look. Leave it empty to target the scene look. Wire an Object
  Selector, or pick from the list on the card.
- **look** — on or off.
- **look through it too** — on by default, and usually what you want: the node points
  your view at that camera as well, which is what makes its look visible. Turn it off
  when you only want to arm or disarm a look without moving anyone.

So *Key Press R → Set Look (camera A)* and *Key Press U → Set Look (camera B)* gives
you two grades on two keys.

The switch is **per viewer and temporary**: it never edits the saved look, so turning
one off in a game does not change what anyone has authored. Each peer acts on the
same replicated trigger, so nobody's graph moves anybody else's view.

If you turn *look through it too* off and nothing is looking through that camera, the
node has nothing visible to do — the card says so while you build, and it tells you
once if you fire it anyway.

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
