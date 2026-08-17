# Shader Nodes

Every node the [Shader editor](shader-graph.md) offers, grouped exactly as the palette and
the right-click menu group them. Each node's one-line description is the same text the
editor shows in its info pane when you select the node, so the two cannot disagree.

Types are `float` (one number), `vec2`/`vec3`/`vec4` (two, three or four), and
`sampler2D` (an image). Values convert automatically where it makes sense: a number
feeding a colour input becomes grey, and a colour feeding a number input gives its red
channel.

&dagger; marks an input whose type **follows whatever you wire into it** — Multiply of two
colours gives a colour, of two numbers a number.

## Input

| Node | In | Out | Parameters | What it does |
|---|---|---|---|---|
| **Float** | — | out *(float)* | value `0.5` | A single number you can dial, and drive from a Set Shader Uniform flow node. |
| **Colour** | — | out *(vec3)* | value `#ffffff` | A colour you pick. Converted sRGB -> linear, so it matches what the picker shows. |
| **Vector 2** | — | out *(vec2)* | value `[0, 0]` | Two numbers — usually a UV offset, a tiling amount or a 2D direction. |
| **Vector 3** | — | out *(vec3)* | value `[0, 0, 0]` | Three numbers — a direction, a position offset, or a colour you want as numbers. |
| **UV** | — | out *(vec2)* | — | The surface's texture coordinates: 0..1 across the mesh's UV layout. The starting point for anything that varies across a surface. |
| **Normal** | — | out *(vec3)* | — | Which way the surface faces. In the surface stage this is the shaded normal; wired into Position it is the object-space normal, which is what you displace along. |
| **View direction** | — | out *(vec3)* | — | The direction from the surface towards the camera. Surface stage only — there is no camera vector while vertices are being placed. **(surface only)** |
| **Time** | — | out *(float)* | speed `1` | Seconds from the SHARED clock, so anything animated is at the same point for every peer with no messages. Multiply by speed to go faster. |
| **Texture** | uv *(vec2)* | rgb *(vec3)*, a *(float)*, rgba *(vec4)* | hash *(none)* | Samples an image from your Explorer library. The graph stores a content hash, so the picture travels to peers once and is reused, never re-sent on every edit. |

## Math

| Node | In | Out | Parameters | What it does |
|---|---|---|---|---|
| **Add** | a *(float&dagger;)*, b *(float&dagger;)* | out *(float)* | — | a + b. Brightening, offsetting, layering two patterns. |
| **Subtract** | a *(float&dagger;)*, b *(float&dagger;)* | out *(float)* | — | a - b. Cutting one pattern out of another, or centring a 0..1 value on zero. |
| **Multiply** | a *(float&dagger;)*, b *(float&dagger;)* | out *(float)* | — | a * b. Tinting, masking, scaling a pattern down. |
| **Divide** | a *(float&dagger;)*, b *(float&dagger;)* | out *(float)* | — | a / b. Scaling a value down by an amount you can drive. |
| **Sin** | a *(float)* | out *(float)* | — | A smooth wave between -1 and 1. Feed it Time for a pulse, or UV for stripes. |
| **Cos** | a *(float)* | out *(float)* | — | Like Sin, a quarter-cycle ahead — the pair makes circular motion. |
| **Fract** | a *(float)* | out *(float)* | — | Keeps only the fractional part, so values wrap 0..1 repeatedly. The usual way to make something tile. |
| **Abs** | a *(float)* | out *(float)* | — | Drops the sign, mirroring a pattern about zero. |
| **One minus** | a *(float&dagger;)* | out *(float)* | — | 1 - a. Inverts a 0..1 mask. |
| **Mix** | a *(vec3&dagger;)*, b *(vec3&dagger;)*, t *(float)* | out *(vec3)* | — | Blends a and b by t: 0 gives a, 1 gives b. The workhorse for combining two looks. |
| **Clamp** | a *(float&dagger;)* | out *(float)* | min `0`, max `1` | Holds a value between min and max. |
| **Dot** | a *(vec3)*, b *(vec3)* | out *(float)* | — | How much two directions agree: 1 aligned, 0 perpendicular, -1 opposed. Lighting-style falloffs. |
| **Power** | a *(float)* | out *(float)* | exponent `2` | Raises to an exponent, which sharpens a 0..1 falloff (higher = tighter). |
| **Smoothstep** | a *(float)* | out *(float)* | edge0 `0`, edge1 `1` | An eased 0..1 ramp between two edges — a soft-edged mask. |
| **Remap** | a *(float)* | out *(float)* | inMin `0`, inMax `1`, outMin `0`, outMax `1` | Rescales a range onto another, e.g. -1..1 into 0..1. |
| **Floor** | a *(float&dagger;)* | out *(float)* | — | Rounds down. Quantises a smooth value into steps. |
| **Ceil** | a *(float&dagger;)* | out *(float)* | — | Rounds up, so anything above zero becomes at least 1 — a quick "is this non-zero" mask. |
| **Saturate** | a *(float&dagger;)* | out *(float)* | — | Clamps to 0..1 — a safety net before something is used as a mask. |
| **Normalize** | a *(vec3&dagger;)* | out *(vec3)* | — | Rescales a direction to length 1. Do this before using a vector as a direction. |
| **Min** | a *(float&dagger;)*, b *(float&dagger;)* | out *(float)* | — | The smaller of two values — an upper limit, or the intersection of two masks. |
| **Max** | a *(float&dagger;)*, b *(float&dagger;)* | out *(float)* | — | The larger of two values — a lower limit, or the union of two masks. |
| **Modulo** | a *(float&dagger;)*, b *(float&dagger;)* | out *(float)* | — | The remainder of a / b. Repeats a value every b, for bands and grids. |
| **Step** | a *(float)*, edge *(float)* | out *(float)* | — | 0 below the edge and 1 at or above it — a hard-edged mask. |
| **Length** | a *(vec3)* | out *(float)* | — | How long a vector is. Distance from the origin, for radial patterns. |
| **Distance** | a *(vec3)*, b *(vec3)* | out *(float)* | — | How far apart two points are — glows and radial falloffs. |
| **Cross product** | a *(vec3)*, b *(vec3)* | out *(vec3)* | — | A direction perpendicular to two others. Building a basis from two directions. |

## Channel

| Node | In | Out | Parameters | What it does |
|---|---|---|---|---|
| **Split** | value *(vec4)* | x *(float)*, y *(float)*, z *(float)*, w *(float)* | — | Breaks a colour or vector into its x, y, z and w parts, so one channel can drive something on its own. |
| **Combine** | x *(float)*, y *(float)*, z *(float)*, w *(float)* | xyz *(vec3)*, xyzw *(vec4)* | — | Builds a colour or vector back up from separate numbers. |

## UV

| Node | In | Out | Parameters | What it does |
|---|---|---|---|---|
| **Tiling & offset** | uv *(vec2)* | out *(vec2)* | tiling `[1, 1]`, offset `[0, 0]` | Repeats and shifts texture coordinates: tiling 3 means the image fits three times, offset slides it. |
| **Panner** | uv *(vec2)* | out *(vec2)* | speed `[0.1, 0]` | Scrolls texture coordinates over time on the shared clock — flowing water, conveyor belts, moving clouds. Every peer sees the same offset. |

## Utility

| Node | In | Out | Parameters | What it does |
|---|---|---|---|---|
| **Fresnel** | — | out *(float)* | power `3` | Bright at grazing angles, dark face-on — the rim light that reads as glass, water or a force field. Power tightens the rim. **(surface only)** |
| **Noise** | uv *(vec2)* | out *(float)* | scale `8` | A smooth random pattern from UV, identical on every peer (no texture needed). Clouds, grime, variation. |
| **Posterise** | a *(vec3&dagger;)* | out *(vec3)* | steps `4` | Snaps values into a number of steps, for a banded or cel-shaded look. |
| **Gradient** | t *(float)* | out *(vec3)* | colorA `#000000`, colorB `#808080`, colorC `#ffffff`, mid `0.5` | A three-colour ramp driven by one number. Feed it Noise, UV or Fresnel to colour-map anything; the midpoint biases where the middle colour sits. |
| **Normal map** | map *(vec3)*, uv *(vec2)*, normal *(vec3)* | out *(vec3)* | strength `1` | Reads a normal map image and applies it as surface detail, building the tangent frame from screen-space derivatives so it works on meshes with no tangents. **(surface only)** |
| **GLSL expression** | a *(float)*, b *(float)*, c *(float)* | out *(float)* | expression `a`, type `float` | The escape hatch: write a GLSL expression using a, b and c as the wired inputs, and declare what type it returns. |

## Output

| Node | In | Out | Parameters | What it does |
|---|---|---|---|---|
| **Surface** | albedo *(vec3)*, emissive *(vec3)*, roughness *(float)*, metalness *(float)*, normal *(vec3)*, opacity *(float)*, ao *(float)*, position *(vec3)* | — | — | The graph's output. Each input replaces one part of the material and anything left unconnected keeps the material's own value: albedo (base colour), emissive (glow), roughness, metalness, normal (surface detail), opacity (needs blending), ao (shades indirect light) and position (moves vertices — note it does not recompute normals or move the shadow). |

## Notes on the ones worth a second look

### Texture

Stores the image's **content hash**, so the picture reaches peers once and is never
re-sent as you edit. Assign it by clicking the swatch or dropping an
[Explorer](explorer.md) image on it; hover for a preview with dimensions and file size.

With no image chosen it is opaque **white**, which changes nothing when multiplied into
albedo — so a fresh Texture node never blacks an object out. While an image is still
arriving from a peer, the same neutral white stands in.

Its three outputs share one sample: `rgb` for colour, `a` for the alpha channel (useful
straight into *opacity*), and `rgba` for all four at once.

### Split and Combine

Together they let one channel do its own job: **Split** a texture and drive *roughness*
from its red channel while *albedo* uses the whole colour. Split always gives you `w`
even for a three-component input, where it reads 1.

### Tiling & offset, and Panner

Both rewrite texture coordinates, so wire them **into** a Texture node's `uv` input
rather than into Surface. Chain them — Tiling then Panner — for a scrolling, repeating
pattern.

Panner uses the **shared clock**, so every peer sees the same offset without any network
traffic. The same is true of anything driven by **Time**.

### Gradient

A three-colour ramp driven by one number: feed it **Noise** for organic colour variation,
**UV** (via Split) for a linear ramp, or **Fresnel** for a rim that shifts hue. `mid`
biases where the middle colour sits.

### Normal map

Applies a normal-map image as surface detail. It builds the tangent frame from
screen-space derivatives, so it works on primitives and imported meshes that carry no
tangent data. Wire the Texture node's `rgb` into `map`, and the result into Surface's
`normal`. Surface stage only.

### Fresnel

Bright at grazing angles, dark face-on: the rim that reads as glass, water or a shield.
Into *emissive* it glows; into *albedo* it tints; as the `t` of a **Mix** it blends two
whole looks by viewing angle. Surface stage only.

### Noise

A smooth random pattern computed from UV, with no texture needed and **identical on every
peer**. Scale controls how fine it is. Good for grime, clouds, and — wired into *position*
— a rippling surface.

### GLSL expression

The escape hatch when the curated set will not do it. Write an expression using `a`, `b`
and `c` for the wired inputs and say which type it returns. It is inserted as written, so
a mistake here shows up as a compile error in the tab's error strip.

### Surface

The output. Every input replaces one part of the material and anything unconnected keeps
the material's own value. See [the Surface node](shader-graph.md#the-surface-node) for what
each tap does, and [vertex displacement](shader-graph.md#vertex-displacement) for the one
that moves geometry rather than shading it.
