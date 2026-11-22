# Paint on meshes

*New in 1.7X.* The [UV editor](uv-editor.md)'s **Paint** tool paints more than colour. Paint **roughness**,
**metalness** and **glow** (emission) too: one map each, with soft brushes, an eraser, mirror painting and image
stamps. Paint in the UV canvas, or straight onto the model in the viewport. In a headset, use a controller.

## Start painting

1. Select an object and open the **UV editor** (bottom dock).
2. Pick the **Paint** tool (the brush in the editor's tool row). The **Tool** panel opens with the brush.
3. Drag in the UV canvas, or drag over the selected object **in the viewport**. A ring on the surface shows the
   brush size.

Each stroke is one undo step, and everyone in the session sees it as you paint.

## What the brush paints (Channel)

| Channel | What it paints | Value |
| --- | --- | --- |
| **Colour** | The base colour, in the brush colour. | The colour swatch. |
| **Rough** | Roughness: white is rough, black is shiny. | The **Value** slider (0 to 1). |
| **Metal** | Metalness: white is metal, black is not. | The **Value** slider (0 to 1). |
| **Glow** | Where the surface glows, in the brush colour. | The colour swatch. |

The first stroke on a channel with no map makes one, at the **New map** size (**1k** or **2k**). The new map starts
at the material's own value, so nothing changes until you paint. If the material's Roughness or Metalness slider is
below 1, the stroke sets it to 1 so the map reads true. A black glow colour turns white the same way. Both changes are
part of the same undo step.

**Show this channel alone** shows the painted channel by itself on the model. Only you see it.

## Brush settings

| Setting | What it does |
| --- | --- |
| **Size** | The brush width in texture pixels (the ring shows it on the model). <kbd>[</kbd> and <kbd>]</kbd> change it. |
| **Pen pressure** | With a pen, pressure varies the size or the opacity. A mouse stroke is unchanged. |
| **Hardness** | 100 % is a hard edge; lower fades the edge softly. |
| **Opacity** | The most one stroke can reach, however often you go over a spot. |
| **Flow** | How much each dab adds. Low flow builds up as you go over a spot. |
| **Eraser** | Paints back to the material's own value: white for colour, roughness and metalness, black for glow. |
| **Mirror X** | A stroke on the model also paints its mirror across the object's own X axis. Not in the 2D UV canvas. |
| **Stamp** | Use an image as the brush tip. Its transparent parts (or, for an image with no transparency, its light parts) do not paint. Pick a file or drop one from the Library; clear it with the X. |

<kbd>Alt</kbd>+click on the model picks the colour (or value) under the cursor. <kbd>Esc</kbd> cancels the stroke in
progress.

## Shared materials

If other objects wear the same material, the first stroke asks: **All objects that share it**, or **This object
only**. **This object only** gives the object its own copy of the material first, for everyone in the session.
**Unlink material** in the Inspector now reaches everyone too.

## Meshes without clean UVs

A mesh with no UV map, or with faces that share UV space (a default box paints all six sides from one square), cannot
hold a map that follows the surface. On such a mesh, a viewport stroke paints **vertex colours** instead, and the panel
says why. Roughness, metalness and glow need a UV map: [unwrap](uv-editor.md#unwrapping) the mesh in the UV editor
first.

## In a headset

Select an object, open the menu and pick **Selected ▸ Paint** (controllers only).

- Point at the object: the ring shows where the brush is. Hold the **trigger** to paint.
- The pointer hand's **stick**: left and right change the size, up and down the flow.
- The menu opens on the **Paint** ring: Colour, Roughness, Metalness, Glow, Eraser, Mirror X and **Done**.
- A label on the hand shows the channel, the size and the flow.

## Export

A [GLB or glTF export](saving.md#gltf) carries the painted maps. Roughness and metalness go into one metallic-roughness image, as
glTF expects.

## See also

- [UV & Textures](uv-editor.md#painting): the UV map, unwrapping and pen pressure.
- [Decals](decals.md): put an image on a surface without painting into its texture.
