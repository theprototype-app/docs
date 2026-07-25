# Particle Effects

Add dust, smoke, fire, sparkles, confetti and sparks to your scene. Emitters attach to any object (or stand on their own), follow it around, and — because everything replicates — everyone in the session sees the same effect.

Particles are **deterministic**: each particle's motion is computed from a shared clock, so peers see identical results without streaming anything. They're also cheap — one draw call per emitter, simulated on the GPU.

## Adding an emitter

There are three ways in, and they all end up as the same emitter.

### From the object menu

Right-click an object ▸ **Effects ▸** and pick a preset. It attaches immediately and starts playing (burst presets fire once so you see them right away). If you have several objects selected, the emitter is added to all of them.

### From the Inspector

Select an object and open its **Particles** section:

- With no emitter yet: the **Add emitter…** dropdown attaches a preset.
- With one attached: tweak every property (below), swap the preset, **💥 Burst now**, or **Remove emitter**.

### As a standalone object

Right-click empty space ▸ **Add ▸ Effects ▸** places a small marker object that carries the emitter — perfect for a campfire in the middle of the room with nothing to attach to. It moves, saves and replicates like any other object.

## The presets

| Preset | What it looks like | Emission |
|---|---|---|
| **Sparkles** | glinting stars that drift and twinkle | continuous |
| **Fire** | rising orange flames + embers | continuous |
| **Smoke** | soft grey plume that trails and fades | continuous |
| **Dust puff** | a low brown scatter | burst |
| **Confetti** | tumbling coloured squares | burst |
| **Sparks** | fast bright streaks that arc and die | burst |

A preset is just a starting point — every value below is editable afterwards.

## Continuous vs burst

- **Continuous** emitters (Sparkles, Fire, Smoke) emit forever.
- **Burst** emitters (Dust puff, Confetti, Sparks) fire all their particles at once, then wait for the next trigger. They auto-fire once when you attach them so you get instant feedback; after that, replay them with **💥 Burst now**, wire an event into the [Particles node](nodes/particle.md), or — coming soon — let them fire automatically when an object hits the ground.

## Properties

Open the Inspector's **Particles** section on an object with an emitter:

| Property | Range | Meaning |
|---|---|---|
| **Preset** | — | re-seeds every value from a preset |
| **Emission** | continuous · burst | one-shot vs endless |
| **Count** | 1 – 500 | how many particles |
| **Lifetime** | 0.1 – 6 s | how long each particle lives |
| **Speed** | 0 – 8 | launch speed |
| **Gravity** | −10 – 10 | positive rises, negative falls |
| **Turbulence** | 0 – 1 | how much the paths wobble |
| **Size start / end** | 0 – 1 | grows or shrinks over life |
| **Opacity** | 0 – 1 | peak transparency |
| **Color** | two swatches | start → end gradient over life |
| **Sprite** | dot · streak · puff · star · confetti | the particle shape |
| **Blending** | additive · normal | *additive* glows (fire, sparks); *normal* for smoke/confetti |
| **Space** | local · world | see below |

### Local vs world space

- **Local** — particles ride along with the object. Best for auras, fire on a moving torch, sparkles on a pickup.
- **World** — particles keep the spot they were born and the object trails away from them. Best for smoke plumes and debris.

## Caps

To keep framerates high, up to **8 emitters** render at once (500 particles each; fewer in VR). Extra emitters beyond the cap are skipped with a toast. Particles are hidden in **Wireframe** view mode.

!!! tip
    For fully flow-driven effects — emission wired to a slider, colour from a picker, or a burst fired by a click or key — use the [Particles node](nodes/particle.md) in the node editor instead of the Inspector.
