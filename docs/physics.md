# Physics & Simulation

Drop, stack, collide, weld and throw. ThePrototype has a real-time rigid-body simulation (Rapier) you can start at any moment — objects fall, pile up and knock each other over, and everyone in the session watches the same run.

The simulation is **not always on**: you set up which objects have physics, then press play. Stopping leaves the result in place as a single undoable step.

## Giving an object physics

There are two ways to make an object participate, and they combine.

### From the Inspector

Select an object and open its **Physics** section in the Inspector:

| Control | Options / range | Default |
|---|---|---|
| **Body** | Auto (scenery) · Static · Dynamic | Auto (scenery) |
| **Mass** (Dynamic only) | 0.1 – 100 | 1 |
| **Bounciness** | 0 – 1 | 0.3 |
| **Friction** | 0 – 2 | 0.5 |
| **Collider** | Box · Convex hull | Box |

- **Auto (scenery)** objects act as static obstacles the simulation can land on.
- **Dynamic** objects fall and collide.
- **Static** never moves.
- **Convex hull** wraps the mesh more tightly than a box (useful for ramps and irregular shapes); very dense meshes fall back to a box automatically.

### With Mass / Bounciness / Friction nodes

The flow graph can drive the same properties: wire a [Mass](nodes/mass.md), [Bounciness](nodes/bounciness.md) or [Friction](nodes/friction.md) node into an [Object Selector](nodes/objectselector.md). A wired **Mass** node makes its object dynamic. Node values **override** the Inspector settings for that object.

!!! note
    Physics properties are read **once, when the simulation starts** — they don't animate per-frame like Spin or Bounce. Set them up first, then press play.

## Running a simulation

You can start and stop the sim three ways:

- **Press <kbd>P</kbd>** — toggles the simulation.
- **Right-click the viewport ▸ Tools ▸ ▶ Simulate physics** (the same entry becomes *⏹ Stop simulation*, and *Pause* / *Reset* appear while it runs).
- **The Simulation controls HUD** — a small transport at the bottom-right, if you've enabled it (see below).

While running, dynamic objects fall under gravity and collide; **Reset** restores the initial layout without an undo entry, **Pause/Resume** freezes the sim, and **Stop** ends it — after which <kbd>Ctrl</kbd>+<kbd>Z</kbd> restores the layout you started from.

If nothing has physics when you press play, the app helps you out: with an object selected it simulates just that object at mass 1 and tells you *"No Mass nodes wired — simulating the selected object with mass 1"*; with nothing selected it prompts you to wire a Mass node or select something first.

### The simulation controls HUD

The bottom-right transport (▶ / ⏸ / ⏹ / ↺) is **off by default** so it isn't confused with the main play button. Turn it on in **Settings ▸ Scene ▸ Show simulation controls**. The <kbd>P</kbd> shortcut works whether or not the HUD is visible; the first time you use <kbd>P</kbd> while it's hidden, a toast reminds you where to enable it.

## Grab and throw mid-simulation

While a simulation is running you can grab a dynamic object and throw it:

- **Desktop** — drag it with the move gizmo. Releasing hands it back to the physics engine with the velocity of your throw.
- **VR** — grip-grab it and let go; the release imparts the throw.

Grab velocity is capped so a fast flick can't fling an object across the scene at absurd speed.

## Joints

Joints tie two objects together so they move as one, or hinge around an axis. Select **exactly two objects**, then use their right-click menu ▸ **Physics**:

| Entry | Joint |
|---|---|
| **Weld together** | A fixed joint — the two move as one rigid body during simulations. |
| **Hinge (X / Y / Z axis)** | A revolute joint about the first object's local axis, anchored at the second object — a door, a lever, a wheel. |
| **Detach joints (N)** | Removes joints touching the selection. |

Joints replicate to everyone, undo as a single step, persist in saved scenes and `.tpscene` files, and are removed automatically if one of their objects is deleted. Hinges can also be motorized programmatically (for example by the drivable-car module) to spin under power.

## How it stays in sync

Physics uses an **authoritative** model: the peer who starts the run is the only one stepping the simulation, and it broadcasts the resulting motion. Everyone else just watches.

- **One run at a time** — if someone else is simulating, your play button is disabled and a toast names who's running it.
- The sim uses a fixed timestep, so it runs at the same speed for everyone even when a browser tab is throttled in the background.
- Kinematic platforms that are themselves animated by the flow graph need no extra traffic — every peer computes their motion identically.

!!! tip
    Build a Rube-Goldberg contraption: weld a few blocks into a paddle, hinge it to a post, give a ball [Mass](nodes/mass.md) and [Bounciness](nodes/bounciness.md), then press <kbd>P</kbd> and watch it play out the same on every screen.
