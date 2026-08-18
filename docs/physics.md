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
| **Material** | Custom · Ice · Rubber · Wood · Metal | Custom |
| **Bounciness** | 0 – 1 | 0.3 |
| **Friction** | 0 – 2 | 0.5 |
| **Collider** | Box · Sphere · Capsule · Cylinder · Cone · Convex hull · Custom | inferred from the shape |
| **Sensor** | on / off | off |
| **Lock rotation / position** (Dynamic only) | per axis X · Y · Z | off |
| **Show collider** | on / off (**this device only**) | off |

- **Auto (scenery)** objects act as static obstacles the simulation can land on.
- **Dynamic** objects fall and collide.
- **Static** never moves.
- **Collider shapes** fit the object's own extents and **follow its rotation** — a tilted box collides as a tilted box, a rotated ramp is really a ramp. Pick **Sphere** for balls (they roll), **Capsule**/**Cylinder**/**Cone** for posts and characters, **Convex hull** for irregular shapes (very dense meshes fall back to a box automatically). The default is inferred from the object's own shape, so a sphere gets a sphere.

### Materials

The **Material** dropdown sets bounciness and friction together, so you can pick a feel instead of two numbers: **Ice** (slippery, dead), **Rubber** (grippy, bouncy), **Wood**, **Metal**. Move either slider afterwards and the dropdown reads *Custom*.

### Sensors — trigger volumes

Tick **Sensor** and the object stops colliding: things pass straight through it. Instead, overlaps fire [On Enter](nodes/onenter.md) and [On Exit](nodes/onexit.md) in the flow graph — a doorway that opens as you approach, a lava pit, a scoring zone, a checkpoint.

A sensor is still a visible mesh, so give it a transparent material (or hide it) once it works.

### Locking axes

A dynamic body can be pinned per axis: **Lock rotation** X/Y/Z stops it tipping (a character capsule that should stay upright), **Lock position** X/Y/Z keeps it on rails (a lift that only goes up and down).

### Seeing the collider

**Show collider** draws the collision shape as a wireframe over the object — green, or amber for a sensor. It is **local to you**; peers don't see your debug wireframes. Turn it on when something rests oddly or falls through the floor: the collider is nearly always the answer. There's also a **Show colliders** switch in the scene settings for all of them at once.

### Custom colliders

For a shape none of the presets fit, pick **Collider ▸ Custom (edit…)**. That opens the [mesh editor](mesh-editing.md) on a stand-in copy of the object, where you build the collision shape by hand with the real mesh tools; **Done** stores it.

A custom collider is **compound** — each disconnected piece becomes its own convex hull — so you can build an L-shape, a hollow frame or a chair out of several blocks, which a single convex hull can never represent. The toolbox has **add box** / **add sphere** buttons to merge a primitive piece straight in, and prints how many pieces you have.

!!! tip
    You are editing a stand-in, not the model: cancelling the collider edit leaves the visible mesh untouched.

### Changing shapes mid-run

Collider settings apply **live**. Change a shape, a material, a sensor flag or a locked axis while the simulation is running and it swaps in place — joints, velocity and momentum survive — so you can tune a contraption without restarting it.

## Scene settings

Everything in **Configure Scene ▸ Physics** is shared with your peers, saved with the scene and applied live — you can change any of it mid-run.

### World

**Gravity** slides from −20 to 5 (**Reset gravity** puts it back). Drop the world into moon gravity mid-run, or invert it: positive values make things fall *up*.

**Time scale** (0.1–2) runs the whole simulation in slow motion or fast forward. Slow-mo on a collapsing tower is the point of it. Above 1.5 the panel suggests turning on continuous collision, because faster bodies travel further between steps.

### Ground & bounds

A **ground plane** is on by default at height 0. You can move it, give it **grip** (friction) and **bounce** (restitution) — a slick floor and a rubber floor are one slider apart — or switch it off entirely to build a pit. With colliders shown (Configure Scene ▸ View ▸ *Show colliders*) it draws as a translucent sheet so you can see where it is.

**Out of bounds below Y** catches anything that falls past a limit, and you choose what happens:

| Action | What it does |
|---|---|
| Return to its start | teleports the object back to where it was when the simulation started — right for a crate knocked off a table |
| Freeze in place | stops it dead where it is |
| Delete the object | removes it, replicated and undoable |

One toast reports a whole burst ("3 objects fell out of bounds — returned to spawn") rather than one per object.

### Defaults (advanced)

**Material** fills in friction and bounce for every object that does not set its own — the fastest way to make a whole scene icy, rubbery, wooden or metallic. **Drag** and **spin drag** (linear and angular damping) are what turn a jittery tower stable and stop crates sliding forever. **Continuous collision** is off by default and costs a little speed; thrown objects switch it on for themselves regardless, because a 20 m/s throw travels 0.33 m per step and would otherwise pass through a thin wall.

!!! tip "Primitives are ready to play"
    Newly added primitives (cube, sphere, stairs…) come with a **Dynamic** body (mass 1) out of the box — add a few, press <kbd>P</kbd>, and they fall, stack and throw immediately. Building scenery instead? Set **Body** back to *Auto* or *Static* in the Inspector. Terrain always spawns as scenery.

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

- **Play mode** — enter play mode, put the crosshair on the object and hold the left button. It comes to you and follows the camera; **scroll** to push it further away or pull it closer; let go to throw. See below.
- **Desktop editor** — drag it with the move gizmo. Releasing hands it back to the physics engine with the velocity of your throw.
- **VR** — grip-grab it and let go; the release imparts the throw.

Throw speed is capped at 20 m/s, and the cap applies to the *magnitude*, so a hard diagonal throw goes where you aimed it rather than being bent toward an axis.

## Play mode is interact mode

In play mode the crosshair grows into a ring over anything you can pick up.

- **Hold the left button** to carry. The object follows a smoothed target in front of the camera, so a heavy crate lags behind a light one — mass you can feel.
- **Scroll** while carrying to push it out or pull it in (0.8–6 m). Your walking speed is untouched while you hold something.
- **Let go** to throw it with the speed you were actually moving it at.
- **A quick tap** — press and release without dragging — *clicks* the object instead, which fires [On Click](nodes/onclick.md) nodes and module buttons. Before this, play mode had no clicking at all.

Only dynamic objects can be picked up, objects another peer has locked are refused, and nothing is grabbable unless a simulation is running — so scenery and level geometry can never be dragged out of place.

**Configure Scene ▸ Physics ▸ Play mode** sets this for everyone in the scene:

| Setting | Meaning |
|---|---|
| Pointer: *Grab and throw* | the full behaviour above (default) |
| Pointer: *Click only* | taps fire On Click nodes, nothing can be picked up |
| Pointer: *Look only* | neither |
| Keep players on the ground | no <kbd>Q</kbd>/<kbd>E</kbd> flying; the camera stays at eye height |
| Start the simulation when play mode opens | for scenes that are games rather than models |

A module can override these for its own world by publishing them on its scene group.

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
- **Watching peers interpolate.** The simulating peer sends about ten poses a second per moving body; everyone else eases between them instead of snapping, so a fast throw looks smooth rather than stepped. It costs nothing on the wire and never changes *where* an object ends up — only how it gets there.
- **A throw you make is applied exactly.** When you are not the peer running the simulation, releasing an object sends the release velocity itself, so the object leaves your hand immediately and in the direction you threw it rather than being reconstructed from position updates.
- The sim uses a fixed timestep, so it runs at the same speed for everyone even when a browser tab is throttled in the background.
- Kinematic platforms that are themselves animated by the flow graph need no extra traffic — every peer computes their motion identically.

!!! tip
    Build a Rube-Goldberg contraption: weld a few blocks into a paddle, hinge it to a post, give a ball [Mass](nodes/mass.md) and [Bounciness](nodes/bounciness.md), then press <kbd>P</kbd> and watch it play out the same on every screen.
