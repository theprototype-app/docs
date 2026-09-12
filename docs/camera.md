# Camera & View

Everything about how the scene *looks on your screen* — the camera lens, render mode, shadows, the grid and the environment — lives in one place: **Configure Scene**.

## Opening Configure Scene

Click **🎛️ Configure Scene** in the sidebar menu. It opens a panel on the right with these sections:

- **Environment** — lighting preset, exposure, saved presets (shared).
- **Music** — the shared background track and your local volume (see [Music & Sound](audio.md)).
- **View** — render mode, camera lens, clip planes (your device only).
- **Background** and **Fog** (shared).

A dot appears next to the menu item while the panel is open; click it again to close.

!!! note "Shared vs. this device"
    The **Environment**, **Background** and **Fog** settings replicate to everyone. The **View** section — render mode, camera lens and clip planes — is **local to your device**, so you can zoom, wireframe or dim shadows without changing what your peers see.

## Render mode (View)

Three per-device render modes under **Viewport — this device**:

| Mode | Look |
|---|---|
| **Shaded** | Plain lit shading. |
| **Shaded + AO** | Adds ambient occlusion — soft contact shadows in creases and corners (the default). |
| **Wireframe** | Shows every edge. |

Ambient occlusion and wireframe are **desktop-only** and never shown to peers. AO detail follows your shadow-quality setting (below), so lowering shadow quality also lightens the AO cost.

These are SHADING modes — they are not how you see the scene's own look. A
[scene look](post-processing.md) renders for everyone in every mode except Wireframe, and
you switch it off for yourself under **Overrides — this device**. If the scene sets its own
ambient occlusion, **Shaded + AO** switches off and says so: the scene's setting is used
instead of yours.

The **Show light helpers** toggle here draws icons for lights so you can see where they are — in the editor only; see [Helpers hide in Play](#helpers-hide-in-play).

## Camera lens

The default camera is a **40° field of view** — a natural, product-viz look with real depth and little wide-angle distortion. You can change it under **Camera lens**:

**Lens presets** (labelled by their full-frame focal-length equivalent):

| Preset | Feel |
|---|---|
| **Wide** (24 mm) | Roomy, exaggerated depth. |
| **Classic** (35 mm) | Reportage, slightly wide. |
| **Natural** (50 mm) | Close to how the eye sees. |
| **Portrait** (85 mm) | Compressed, telephoto. |

Below the presets, the **Camera FOV** slider gives fine control (15°–120°).

!!! note
    Your FOV is broadcast, but a peer only *sees through* it while they're spectating your view — during normal editing everyone keeps their own camera.

## Clip planes

Also in **View**, the near/far clip planes control the depth range the camera renders (per-device):

- **Near clip** (0.01–2) — surfaces closer than this are cut away. Lower it if very close objects vanish.
- **Far clip** (from 10) — the far limit. It **grows automatically to fit the scene**, and the orbit zoom-out limit is paired to it so you can never dolly past the far plane and blank the scene.

## Shadow quality

Shadow quality is a **per-machine** performance knob in the **Settings** dialog: **Off · Low · Medium · High** (default High). It caps every light's shadow-map size on your computer — *Off* disables shadows entirely. Per-light shadow settings still replicate; this only changes what your machine renders.

## The grid

The floor grid can be toggled from the viewport right-click menu ▸ **View ▸ Show/Hide grid**, or the **Show grid** checkbox in Settings. Its fade distance scales with how far you've zoomed out, so it stays visible when you pull the camera way back. The grid hides itself in wireframe mode.

## Environment presets

The **Environment** section sets the scene's lighting and sky. Pick a preset chip:

| Preset | Look |
|---|---|
| **Studio** | Neutral grey studio (the default). |
| **Daylight** | Bright sky, strong sun, soft fog. |
| **Sunset** | Warm, low sun. |
| **Night** | Dim and cool. |
| **Classic** | The pre-lighting look with the rig **off** — bring your own lights. |

An **Exposure** slider tunes overall brightness. The lit presets add a sun that casts shadows, with a shadow-catcher disc under the scene so shadows land even on the infinite grid.

Environment is a **shared, latest-wins** setting — the most recent change wins for everyone. You can also **save**, **export** and **import** custom presets (stored locally), and adopt presets other peers have shared.

Below Environment, **Background** sets the clear color and **Fog** adds distance fog (color + near/far), both shared.

## Lights

A **directional** or **spot** light shines where it points. Turn it with the rotate gizmo — or type into the rotation rows — and the beam and its shadow follow, the way a light behaves in any 3D tool. Older scenes that aimed a spot at a saved point load aimed the same way.

**Aim at**, in the Properties panel's Light section, points the light once at a spot: type a world **X / Y / Z**, or press **Pick in viewport** and click a surface (<kbd>Esc</kbd> cancels). It writes the rotation, so the gizmo and the rows agree afterwards.

A directional light has a direction, not a distance. Its helper line reaches as far as **Settings ▸ Scene ▸ Light helper length** says — display only.

### A light with an origin

Lights have an [origin](controls.md#each-objects-origin) like any other object. Give a sun one — type it in the Transform section's Origin block, or press **World 0** — and **Rotate** swings the light around that point instead of turning it in place: a sun on an orbit, in one gesture. *Move* still moves the light and carries its origin along.

### Helpers hide in Play

Light helpers, camera frustums and camera markers are editor furniture. They disappear when Play starts, and camera previews and captures never show them, so a screenshot is the game and nothing else.

**Show helpers in Play (debug)** — on the viewport menu under **View**, and in **Settings ▸ Controls** — brings them back while you debug a scene, with an amber **DEBUG · HELPERS** chip in the corner so a capture cannot be mistaken for the real thing. It is your setting alone.
