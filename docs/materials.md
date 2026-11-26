# Material Presets

A **material preset** is a named look for an object's surface — colour, roughness, metalness, glow, transparency and
its image maps (a colour texture and the [maps](#maps) below) — that you apply with one click. Eight come built in: **Wood**, **Metal**,
**Plastic**, **Glass**, **Stone**, **Rubber**, **Fish scales** and **Neon**. You can save your own, rename and delete them, and everyone
in your session sees your presets and can use them.

**Where:** select an object and open its properties (double-click it, or right-click ▸ **Properties**). In the
**Material** section, the **Presets** row sits at the top, above the material type.

![The Material section's Presets row: the eight built-in swatches Wood, Metal, Plastic, Glass, Stone, Rubber, Fish scales and Neon, with Wood outlined because the box wears it, and + and the pencil above. 1: Wood, applied. 2: + saves the current look.](img/materials/presets-wood.webp){ .shot width="311" height="214" loading=lazy }
/// caption
The Presets row with Wood applied.
///

<div class="shot-key" markdown>
1. The swatch of the preset the object wears is **outlined**.
2. **+** saves the current look as your own preset.
</div>

## Using presets

- **Apply** — click a swatch. With [several objects selected](controls.md#editing-a-multi-selection) it applies to all
  of them (the row says *applies to all N*), and one **Undo** puts every object's previous material back. The swatch of
  the preset an object is wearing is outlined.
- **Save the current look** — press **+**, type a name and press <kbd>Enter</kbd>. The name must be new: if it is taken,
  the preset is saved as *Name 2*.
- **Rename, delete, export** — press the **pencil**. Your own swatches grow three small buttons: rename, download as a
  `.matpreset.json` file, and delete (it asks first). **Import** loads a `.matpreset.json` file into your library. Press
  the tick to finish.
- **A friend's presets** — when someone in the session has saved presets, they appear under **From ‹name›**. Click one
  to apply it; while editing (pencil), the copy button saves it into your own library.

![Editing your presets: the pencil is pressed, your own swatch Red brick is picked and the bar under the row has its rename, download and delete buttons, with Import beside. 1: the pencil. 2: rename, download and delete.](img/materials/presets-edit.webp){ .shot width="311" height="312" loading=lazy }
/// caption
Editing your presets.
///

<div class="shot-key" markdown>
1. The **pencil** starts editing; the tick finishes.
2. **Rename**, **download** as a `.matpreset.json` file, and **delete** (it asks first).
</div>

## Maps

*New in 1.59.* Beside its colour image (**Set texture…**), a material can carry five more image maps that give a
surface real detail: worn edges that shine, grooves between planks, a glowing panel. They are in the same
**Material** section, under the texture row, headed **Maps**:

| Row | What the image says |
|---|---|
| **Normal** | small bumps and grooves that catch the light, without changing the shape |
| **Roughness** | where the surface is rough or shiny (the image's green channel) |
| **Metalness** | where the surface is metal (the blue channel) |
| **Emission** | where the surface glows |
| **AO** | ambient occlusion: darker creases and corners (the red channel) |

A row shows only when the material type has that slot: a **Standard** or **Physical** material has all five, Phong,
Lambert and Toon have Normal, Emission and AO, and Basic has only AO.

![The Material section's Maps rows under the texture row: Normal, Roughness, Metalness, Emission and AO, each with a button to pick its image.](img/materials/maps.webp){ .shot width="311" height="271" loading=lazy }
/// caption
The Maps rows in the Material section.
///

- **Set…** picks an image from your device: PNG, JPEG or WebP (an iPhone HEIC photo is converted to a JPEG first).
  You can also drop an image from the [Explorer](explorer.md) or from your computer onto a row. Large images are
  scaled to 1024 pixels on the long side.
- The **folder button** beside **Set texture…** and on every map row (*since 1.79*) picks the image from your
  Explorer instead — see [Textures from the Explorer](#textures-from-the-explorer).
- The **wand button**, **Fill with noise** (*since 1.79*), on the texture row and on every map row fills that map
  with generated noise — see [Fill with noise](#fill-with-noise).
- Once a map is set, its **thumbnail** replaces Set…: click it to choose another image, or press **Remove**. A map
  that came with an imported model says *From the model*.
- **Normal strength** (0 to 10, default 1) appears under Normal once it has a map, and **AO strength** (0 to 1) under
  AO.
- **Tiling** — **Tile U**, **Tile V**, **Offset U**, **Offset V** and **Rotation °** — appears once the material has
  any map. It applies to all of the material's maps together, the colour image included. A negative tile mirrors
  the image.

### Load a set of maps…

Texture sites and PBR tools hand you a material as several files: `wood_color.jpg`, `wood_normal.png`,
`wood_roughness.jpg` and so on. **Load a set of maps…** (under the rows) picks them all at once and puts each file in
the slot its name says. The **last** naming word in the file name decides, so `metal_plate_diff_1k.jpg` goes to the
colour image even though it says *metal* first:

| Slot | Words in the file name |
|---|---|
| Colour image | `color`, `colour`, `col`, `albedo`, `basecolor`, `diffuse`, `diff` |
| Normal | `normal`, `nor`, `nrm`, `norm`, `normalgl`, `normaldx` |
| Roughness | `roughness`, `rough`, `rgh` |
| Metalness | `metalness`, `metallic`, `metal`, `mtl` |
| Emission | `emissive`, `emission`, `emit`, `glow` |
| AO | `ao`, `occlusion`, `ambientocclusion` |

Words are separated by `_`, `-`, spaces, dots or a change of case (`woodNormal`). A file whose name says none of these
is named in a message, so you can set it on its own row. The whole set is one undo step.

### Shared, saved, undone

- With [several objects selected](controls.md#editing-a-multi-selection) the heading says *applies to all N*, and
  every change reaches all of them.
- Everyone in the session sees maps the moment you set them, each change is one **Undo** step, and they are saved in
  scenes, in your [presets](#using-presets) and in a glTF export.
- An [AI agent](ai/agent-look.md) can set them too.
- Removing a map that was loaded **compressed** (KTX2, for example from a [For Quest / web](publish-export.md#optimize-for-quest-web)
  file) cannot be undone: there is no image to put back.

## Material slots

*New in 1.79.* An object can wear several materials, one per **slot** — an imported model with several materials, or
a mesh you gave slots in the [UV editor](uv-editor.md#material-slots). When it has two or more, **Inspector ▸ Material**
starts with a **slot list**: a swatch, the slot's name, badges (*Shader*, *Off*, *Shared · used by N*), an eye and a
**⋯** menu per row.

- **Tap a row** to edit that slot: its faces flash on the model, and every row of the Material section below — type,
  colour, maps, roughness — edits that slot.
- **The eye** switches a slot **off**: it draws a plain grey, and its own material is kept (saves, undo, duplicates and
  exports keep it). The eye again shows it.
- **⋯** has **Rename**, **Switch material…**, **Select its faces**, **Assign selected faces**, **Make unique**,
  **Duplicate**, **Move up**, **Move down** and **Remove…** (it asks where the slot's faces go: *Move its N faces to*).
- **Add material slot** is in the Material section's own **⋯** menu.
- **On a touch screen** the rows are 44 px high; long-press a row for its menu, and use Move up / Move down instead of
  dragging.
- While the list is open in [Edit Mesh](mesh-editing.md), **Remove**, **Move** and **Duplicate** wait until you leave
  Edit Mesh.

The UV editor's **Materials** pane is the same list, with its image and assign buttons. Slots, their names and every
change reach everyone in the session, save with the scene and undo like any material edit.

### Switch material…

**⋯ ▸ Switch material…** opens a popover for that slot:

- **Presets** (the starters, yours and your peers') and the [CC0 library](free-assets.md) (*Apply to ‹slot›*)
  **copy** a look into the slot.
- **In this scene** **links** the slot to a material another object or slot already wears: editing either changes
  both, for everyone, and the row says *Shared · used by N*. **Make unique** gives the slot its own copy again.

A duplicated object or slot is a working copy, not a link.

### A node shader per slot

From the [Shader editor](shader-graph.md#one-slot-or-all-slots) a slot can take its own node shader, or every slot of
the object one shader. A slot that has one shows *Shader* in the list, and its Material section says so, with **Open in
Shader editor** and **Detach** (*Detach all slots* when the all-slots shader draws it).

## Textures from the Explorer

*New in 1.79.* Any image in your [Explorer](explorer.md) can become a texture without leaving the app.

- **Pick:** press the folder button (*Pick … from the Explorer*) beside **Set texture…** or on a map row (Normal,
  Roughness, Metalness, Emission, AO). The picker shows every image as a thumbnail; type to search, choose a folder (its
  subfolders count) or take one from **Recent** (your last picks, kept on this device). <kbd>Esc</kbd> closes it. The
  same picker is on each slot row of the [UV editor](uv-editor.md#material-slots), in Image to 3D (**From
  Explorer…**) and in **Settings ▸ Touch controls** for a button's images.
- **Drag:** drag an image card from the Explorer onto a **map row** (it becomes that map), the **UV editor canvas** (the
  colour map of the slot you work on), or an **object** in the 3D view (the colour map of the material under the
  pointer: on an object with several slots, only that slot changes). One **Undo** takes it back.
- **Touch:** press and hold a card, then drag it to a map row, the UV canvas or an object.

![Pick the colour map: the Explorer picker over the 3D view, with a search box, All folders and two image thumbnails, and the Material rows with their folder buttons behind it.](img/materials/explorer-picker.webp){ width="1280" height="720" loading=lazy }
/// caption
The Explorer picker, opened from the colour map's folder button.
///

Images up to 25 MB (the Explorer's own limit) work. They are stored like an uploaded image (scaled to 1024 px), so
everyone in the session, and older versions, see an ordinary texture. A file a peer shared that has not reached this
device yet says so instead of applying.

## Fill with noise

*New in 1.79.* Every map row has a wand button, **Fill with noise**. On a row that already has an image it opens the
[Image editor's Noise panel](image-editor.md#noise) on that image; on an empty row it asks for a size (**1024 px**, the
default, 512 or 2048), puts a new noise texture on the material at once (one undo step) and opens the editor on it so
you can tune it. **Save** there writes the row again. On an object with several slots it acts on the active slot.

![Fill the Roughness map with noise: a dialog over the 3D view offering 1024 px (default), 512 px and 2048 px, with the Material section's wand buttons on every map row behind it.](img/materials/fill-with-noise.webp){ width="1440" height="900" loading=lazy }
/// caption
Fill with noise on an empty Roughness row asks for the size first.
///

A material draws a texture at most 1024 px; a 2048 image keeps its full size in the Library, and the material shows it
at 1024 (it still tiles).

## Fish scales and the look tier

**Fish scales** is an iridescent look: a thin film over the surface shifts its colour with the viewing angle (the
silver-blue flash of a turning fish), over a procedural relief of overlapping scales, with a light clear coat and a hint
of see-through (transmission) so a fin reads thin. Recolour it in the Inspector for any fish, snake, dragon or beetle
shell. The Aquarium's fish wear it.

Some of that costs more than every device can pay, so each device draws a material at its own **look tier** — decided
the way water quality is (from the headset and the automatic quality level), never written into the scene:

| Device | Draws |
|---|---|
| Desktop, full quality | everything |
| Phone (or a lowered quality level) | everything but transmission — it renders the whole scene a second time |
| Headset (or the lowest levels) | no transmission, no thin film, no sheen — the plain lit surface |

The look you chose is what is saved and what your peers receive; a device drawing less keeps the full numbers beside the
material, so saving on a headset and opening on a desktop shows the full look again.

## What gets saved, and where

- Your presets live **on this device** (browser storage). They are not part of the scene file. An object that wears a
  preset keeps that look in the scene, for everyone, like any other material edit.
- Your library is shared with the people in your session while you are connected, and leaves with you. Since 1.39 that
  includes large presets — a [free CC0 material](free-assets.md) with megabytes of maps arrives in their **From ‹name›**
  row in the background a few seconds after they connect, in the same order as your own row, and is sent only once.
  Saving a preset is quicker too when your library already holds big ones.
- The [Storage breakdown](explorer.md#storage) — the disk chip in the Explorer header, the Explorer's background menu, or
  **Settings ▸ Explorer** — lists your saved presets under **Material presets**, and can delete them.

## Limits

- The Presets row applies to objects with **one material**. On an object with several
  [material slots](#material-slots), use **⋯ ▸ Switch material…** on the slot (*since 1.79*). Objects driven by a [shader graph](shader-graph.md) are skipped with a note.
- In a [glTF export](publish-export.md) every slot is a plain material: a slot's node shader is not carried, and an off
  slot exports its own material.
- Applying a preset keeps the object's **Side** (front / back / double) and **Wireframe** setting.
- **Glass** is a see-through, clear-coated surface rather than true refraction, so it stays cheap on a Quest. Raise
  **Transmission** on a Physical material for real refraction on a desktop.
- Very metallic surfaces look dark under a colour sky, because a colour sky gives them nothing to reflect; the
  **Metal** preset is tuned for that. A [sky image](camera.md#sky-images-hdri) (the Clear sky, Meadow, Sunrise,
  Starlight and Photo studio presets, or your own) lights the scene and shows in every reflection.
- [Water](water.md) objects draw their own water surface: a preset changes only the material they show before the water
  is ready. Use the **Water** section's look presets for water.
