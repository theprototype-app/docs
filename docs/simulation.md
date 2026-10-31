# Fluid Tank & Jiggle

Two kinds of motion that are about the look more than the rules: a **fluid tank** of particle liquid you can slosh,
pour and drain, and the **Jiggle** node, which makes any object lag, wobble and sway. For water you can swim through and
things that float, see [Water](water.md) and [Things float](physics.md#things-float); for particle water poured into
the open scene, rivers and pipes, see [Fluids](fluids.md).

## Fluid tank

A glass tank of particle fluid. Move or tilt the tank and the fluid sloshes; pour more in, drain it out; toys dropped in
float and are pushed around.

![A fluid tank with the smooth surface look](img/simulation/fluid-tank.webp){ .shot .vignette width="1126" height="569" loading=lazy }
/// caption
A fluid tank with the smooth surface look.
///

### Where it is

- **Add ▸ Simulation ▸ Fluid tank** (right-click the viewport, the **+** button, or <kbd>Shift</kbd>+<kbd>A</kbd> if you
  switched quick add on).
- Its settings are in **Properties ▸ Fluid tank**.

### Settings

| Setting | What it does |
|---|---|
| **Particles** | how many particles make up the fluid, 200 – 8000 |
| **Fill** | how full the tank is, 0 – 0.95 |
| **Viscosity** | 0 – 1: thin like water, or thick like honey |
| **Surface tension** | 0 – 2: how much the fluid holds together |
| **Gravity ×** | −2 – 4: how strongly the fluid falls; below 0 it rises |
| **Colour** · **Clarity** | the fluid's colour, and how see-through it is |
| **Look** | *Auto* (smooth surface on a desktop, drops on a Quest), *Smooth surface*, or *Drops* (the cheapest) |
| **Pour (emitter)** | tick it to pour fluid in, with a **Pour rate** and **Pour speed** |
| **Drain** | tick it to let fluid out, at a **Drain rate** |
| **Spill when tipped** | on by default: tip the tank and the fluid pours out over the rim (see below) |
| **Max spilled drops** · **Drop lifetime** | the limits on spilled fluid, so it never builds up |
| **Refill** | starts the tank again, filled to its **Fill** level |

![The Drops look, with a ball pushed around by the fluid](img/simulation/fluid-tank-drops.webp){ .shot .vignette width="1126" height="569" loading=lazy }
/// caption
The Drops look.
///

### Spilling

Since 1.25 a tank **spills when tipped**: rotate it (the Water or Honey tank in *Fluid tank toy*) and the fluid pours out
over the rim, falls, splashes into any water below and settles. The tank holds less afterwards — **Refill** fills it
again. The simulation transport's **Pause** holds the tank and its spilled drops still, and **Reset** refills it (see
[The simulation controls HUD](physics.md#the-simulation-controls-hud)).

![Fluid tank toy: the Honey tank tipped, its honey spilled onto the table](img/simulation/tank-spill.webp){ .shot .fade-r .fade-t .fade-b width="688" height="640" loading=lazy }
/// caption
Fluid tank toy.
///

### Pouring into a pool

*New in 1.40.* A tank's water reaches the pool it pours into. When a tank stands in a pool, or a pool's surface runs
through the tank, a pour inside the tank that falls onto that surface **joins the pool**: it leaves the tank, the pool
ripples where it lands and a couple of droplets kick back up as a splash. Nothing to switch on — it works for any fluid
tank and any [water object](water.md) (tank, pool, round pool, ocean) whose surface crosses the tank.

- Fluid the tank already holds below the pool's surface **stays**: a tank standing in a pool keeps its water, the
  glass is still there.
- A calm surface bobbing across the pool's level is not a landing; only water falling onto the surface (faster than a
  wade, about 0.6 m/s) joins the pool.
- Everyone's tank pours the same water from the same settings, so everyone sees the pour land and ripple in the same
  place. Nothing extra is sent over the network. The ripples and droplets are a local picture, like every water ripple.

![A pour inside a tank landing on the pool's surface and rippling it](img/simulation/tank-pours-into-pool.webp){ .shot .vignette width="968" height="553" loading=lazy }
/// caption
A pour inside a tank landing on the pool's surface and rippling it.
///

### GPU fluid

*New in 1.40.* Fluid tanks can run their particle solver on the **graphics card** (WebGPU compute) instead of the
processor. The fluid behaves the same either way: same particle count, same tank, same pour, the same push on toys
floating in it, the same pour into a pool.

**Where:** **Settings ▸ Scene ▸ Performance ▸ GPU fluid** — **Auto** (the default) or **Off**, this device only.

**How Auto decides.** The first time a fluid tank runs, the app measures this device once: one 8000-particle tank
stepped on the graphics card and on the processor. It uses the graphics card only if that step is clearly faster (at
most 75 % of the processor's time) and remembers the answer for this browser. The row says what Auto chose and the two
times; **Measure again** forgets the answer and measures on the next tank. A tank already pouring when you change the
setting starts again from its fill (like **Refill**).

**It falls back to the processor** when the browser has no WebGPU (many Linux browsers, a headset browser without
compute), when the graphics card is not faster, or when it stops (a lost device or a driver error): the tanks restart
on the processor and the row says why.

Measured on the development machine (Chromium, an AMD GPU): 8000 particles step in 2.5–2.9 ms on the graphics card
against 35–37 ms on the processor, including sending the particles to the card and reading them back.

### Limits

- Each player simulates their own fluid; only the settings are shared. Splashes differ slightly between players. The push
  on floating toys comes from the player running the [physics simulation](physics.md#how-it-stays-in-sync).
- A tank pauses while it is off-screen.
- On a Quest, and on slow devices, the fluid draws as drops, with at most 1500 particles. On a phone the tank follows
  the device's quality level live: a phone that keeps its frames steps up to the smooth surface after the scene has
  loaded (see [Water ▸ Quality](water.md#quality)).
- Spilled drops settle on the ground and on the tops of objects' bounding boxes, not on slopes.
- Scaling the tank resizes the fluid box.
- [Fluid emitters](fluids.md) still run on the processor whatever **GPU fluid** says.

## Jiggle

**Secondary motion** for any object: it lags behind when you move it, overshoots when it stops, wobbles like jelly when it
lands or is hit, and sags and sways in the wind. A rigged (skinned) model swings its bone chains instead: tails, hair,
antennae.

![A block leaning and wobbling under Jiggle](img/simulation/jiggle.webp){ .shot .vignette width="1126" height="569" loading=lazy }
/// caption
A block leaning and wobbling under Jiggle.
///

Add it from the node editor: **Effects ▸ Jiggle**. Put it in an object's own graph, or wire it to an
[Object Selector](nodes/objectselector.md). Every setting is on the [Jiggle node page](nodes/jiggle.md).

Jiggle is a **look only**. It never changes the object's real position, so physics, saving and the other players are
unaffected. The settings are shared, and each player sees their own jiggle from the motion they see.

## Examples

**Menu ▸ Templates ▸ Examples** has **Jelly room** (Jiggle on a room of jelly blocks) and **Fluid tank toy** (a tank to
pour into and drop toys in). **Pool party** shows floating toys in a pool. Since 1.25 Jelly room renders its jellies again
(they were black), and all three start moving as soon as they open
([Start simulation on load](physics.md#start-simulation-on-load)).
