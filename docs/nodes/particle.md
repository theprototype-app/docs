# Particles

Emits a particle effect *from* the connected object — the flow-graph version of the [Particle Effects](../particles.md) feature, so you can drive emission, colour and bursts from other nodes.

**Output:** effect (wire into an [Object Selector](objectselector.md), or drop it in an object's own graph to target that object)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| count | number | overrides the particle count when wired |
| color | color | tints the whole system (overrides the gradient) |
| trigger | event | fires a **burst**-mode emitter on each pulse |

## Parameters

Pick a **preset** on the card to seed everything, then adjust:

| Parameter | Default | Notes |
|---|---|---|
| preset | Sparkles | re-seeds every value |
| emission | continuous | *continuous* or *burst* (triggered) |
| count | 80 | particles |
| speed | preset | launch speed |
| gravity | preset | + rises, − falls |
| size | preset | particle size |
| sprite | preset | dot · streak · puff · star · confetti |
| space | local | *local* rides the object, *world* trails behind |

Full property reference (lifetime, turbulence, opacity, blending, colour gradient) is on the [Particle Effects](../particles.md) page.

## Practical examples

**Confetti when a button is clicked**

1. Add a **Particles** node, set **emission = burst**, **preset = Confetti**.
2. Add an [On Click](onclick.md) node and an [Object Selector](objectselector.md) targeting the emitter's object.
3. Wire On Click → the Particles node's **trigger** input, and the Particles node → the Object Selector.
4. Click the object in the viewport — confetti bursts for everyone.

**A dial that controls emission**

Wire a [Slider](slider.md) into **count** to let anyone in the session turn the effect up or down — the value is shared live.

!!! note
    Particles are deterministic (each peer computes the same motion from the synced clock). A burst fired from a **trigger** rides the same replicated pulse as [On Click](onclick.md) / [Key Press](keypress.md), so every peer sees it. This node is independent of an emitter set on the object from the Inspector — you can even run both.
