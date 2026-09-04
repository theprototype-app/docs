# Flow Nodes

Every node the [Flow editor](node-system.md) offers, grouped exactly as the palette groups
them. Each node's one-line description is the same text the editor shows in its info pane
(and the palette's tooltip) when you select the node, so the two cannot disagree. Nodes with
their own page link to it.

## Input

| Node | What it does |
|---|---|
| [**Slider**](nodes/slider.md) | An interactive slider that outputs a number - the quickest way to hand-tune any numeric input live. |
| [**Color Picker**](nodes/colorpicker.md) | Outputs a color chosen with a swatch - the color source for anything that paints. |
| [**Switcher**](nodes/switcher.md) | A radio-button list that outputs the index of the selected item - a hand-operated multi-way switch. |
| [**Number**](nodes/number.md) | A constant numeric value - the simplest source node. |
| [**Vector3**](nodes/vector3.md) | An x/y/z triple - used as a direction, an offset, or most often a fixed point in the world. |
| [**Toggle**](nodes/toggle.md) | A checkbox that outputs true or false - a hand-operated on/off switch. |
| [**Random**](nodes/random.md) | A random number in a range - deterministic, so every peer sees the same "random" value. |
| [**Time**](nodes/time.md) | The synced clock as a value - the heartbeat behind almost every animation recipe. |

## Scene

| Node | What it does |
|---|---|
| [**Object Selector**](nodes/objectselector.md) | Binds the graph to a scene object - the sink every effect must reach, and an object reference for sensor nodes. |
| [**Velocity**](nodes/velocity.md) | Outputs how fast the connected object is moving right now, in metres per second. |
| [**Measure**](nodes/measure.md) | Reads a number off an object: how tall it is, where its top is, how fast it is going. |
| [**Spawn**](nodes/spawn.md) | Makes copies of an object while the simulation runs - crates off a conveyor, targets, debris, ammo, waves of anything. |

## Object Flow

| Node | What it does |
|---|---|
| [**Flow Input**](nodes/flowinput.md) | Declares a public input socket for an object flow - the way the Scene flow feeds a value into an object's own graph. |
| [**Flow Output**](nodes/flowoutput.md) | Declares a public output socket for an object flow - the way an object publishes a value back to the Scene flow. |
| [**Object Flow**](nodes/objectflow.md) | Embeds an object's own graph into the Scene flow as a single card - the way to compose object flows into a bigger machine without opening each one. |

## Game

| Node | What it does |
|---|---|
| **Set Game State** | Switches the shared game state (menu, playing, paused, over) when a pulse arrives - every peer follows the same state. |
| **On Game State** | Fires a pulse when the shared game state becomes the one you pick - the hook for "when the round starts". |
| **Set Active Camera** | Makes a camera object the active view for every player when a pulse arrives. |
| **Set Look** | Points the player's view at a target when a pulse arrives - a cutscene glance or a spawn orientation. |
| **Game Start** | Fires once when the game starts (Play, or a round reset) - the place to spawn, reset counters and arm timers. |
| **Travel to scene** | Loads another saved scene by name when a pulse arrives - a door to the next level, replicated to everyone. |
| **All Players** | Iterates the connected players so a per-player value can be read, or a HUD row shown, for each of them. |
| **Set Variable** | Stores a named value in the replicated scene variables when a pulse arrives - shared state without an object. |
| **Get Variable** | Reads a named scene variable as a value - the read side of Set Variable, live on every peer. |
| **Game Time** | Seconds since the game (or the round) started, the same on every peer - a clock that pauses with the game. |
| **Player Variable** | A value kept PER PLAYER (score, lives, team) - each peer reads its own row, or a named player's. |

## Character

| Node | What it does |
|---|---|
| **Character Controller** | Turns the connected object into a walking, jumping character driven by the player's movement input. |
| **Move Input** | The player's movement input as numbers - stick or WASD axes and the jump button - for driving things by hand. |
| **Possess Object** | Puts the player in control of the connected object when a pulse arrives - a vehicle, a turret, a ball. |
| **Camera Follow** | Makes the camera follow the connected object at a set distance and height - a third-person or chase view. |
| **Move Speed** | Overrides the character's walking speed while a value is wired - sprint, mud, slow motion. |

## HUD

| Node | What it does |
|---|---|
| **HUD Screen** | Shows or hides a whole HUD screen (a named layer of elements) while its condition holds. |
| **HUD Bar** | Drives a HUD bar element's fill from a number - health, fuel, progress. |
| **HUD Button** | Fires a pulse when a HUD button is pressed - the on-screen counterpart of On Click. |
| **HUD List** | Fills a HUD list element with the items a value provides - an inventory, objectives, players. |
| **HUD Rows** | Appends or replaces rows in a HUD rows element from a pulse - a log, a chat, a scoreboard feed. |
| **HUD Input** | Reads what the player typed into a HUD input element as a value. |
| **HUD Set Input** | Writes a value into a HUD input element when a pulse arrives - to prefill, clear or correct it. |

## Logic

| Node | What it does |
|---|---|
| [**Math**](nodes/math.md) | Combines two numbers with an arithmetic operation. |
| [**Compare**](nodes/compare.md) | Compares two numbers and outputs true or false. |
| [**Gate**](nodes/gate.md) | Boolean logic on two inputs - AND, OR, NOT, XOR. |
| [**Map Range**](nodes/maprange.md) | Remaps a number from one range to another - the glue between free-range sources and bounded parameters. |
| [**Select**](nodes/select.md) | Chooses between two values: outputs a when the index is low, b when it's high. |
| **Latch** | Holds a boolean until told otherwise - set, reset and toggle pulses make it a memory bit. |
| **Delay** | Passes a pulse on after a set number of seconds - the timing of a fuse, or a door that closes later. |
| **Sequence** | Fires its outputs one after another, one per pulse, then wraps around - a step-by-step trigger. |
| **Once** | Lets exactly one pulse through until it is re-armed - a checkpoint, a pickup, a first-time event. |
| [**Counter**](nodes/counter.md) | Counts trigger pulses and outputs the running total. |
| [**Loop**](nodes/loop.md) | Sweeps a number from one value to another over time, repeating - a ready-made animation ramp. |
| [**Timer**](nodes/timer.md) | A delay line: outputs its input as it was a set number of seconds ago. |
| [**Distance**](nodes/distance.md) | Measures the live distance between two things in the scene. |
| [**Proximity**](nodes/proximity.md) | True while two things are within a radius of each other - a distance sensor with the threshold built in. |
| [**Look At**](nodes/lookat.md) | Keeps the connected object facing a target - another object or a fixed point - every frame. |
| [**Set Color**](nodes/setcolor.md) | Paints the connected object's material with a color, re-applied every frame. |
| [**Visibility**](nodes/visibility.md) | Shows or hides the connected object based on a boolean. |
| [**Set Shader Uniform**](nodes/setuniform.md) | Writes one number inside an object's shader graph, so a trigger, a |

## Triggers

| Node | What it does |
|---|---|
| [**On Click**](nodes/onclick.md) | Fires a short pulse when its object is clicked - the bridge from user input into the graph. |
| [**Key Press**](nodes/keypress.md) | Fires a pulse while a keyboard key is pressed - the bridge from your keyboard into the graph. |
| [**On Impact**](nodes/onimpact.md) | Fires a pulse when a physics simulation lands the connected object on the ground or another object. |
| [**On Enter**](nodes/onenter.md) | Fires a pulse when something enters a trigger volume - the checkpoint, doorway and pressure-plate node. |
| [**On Exit**](nodes/onexit.md) | Fires a pulse when something leaves a trigger volume - the other half of On Enter. |
| [**On Rest**](nodes/onrest.md) | Fires a pulse when a physics body has finished moving - the counterpart to On Impact, which fires when it starts. |
| **Gamepad Button** | Fires a pulse (or holds a level) while a gamepad button is pressed - the pad's counterpart of Key Press. |
| **Gamepad Axis** | A gamepad stick or trigger axis as a number between -1 and 1, with a dead zone. |

## Animation

| Node | What it does |
|---|---|
| [**Shake**](nodes/shake.md) | Jitters the connected object around its resting position - rumble, nervousness, impact feedback. |
| [**Spin**](nodes/spin.md) | Rotates the connected object continuously around one axis. |
| [**Bounce**](nodes/bounce.md) | Bounces the connected object up and down off its resting height, like a dribbled ball. |
| [**Orbit**](nodes/orbit.md) | Circles the connected object around its resting position on the horizontal plane. |
| [**Path patrol**](nodes/pathpatrol.md) | Walks the connected object along a series of waypoints you click into the scene, facing along the path. |
| [**Animation Finished**](nodes/animfinished.md) | Fires a pulse when the connected object's animation clip reaches its end. |
| [**Animation Marker**](nodes/animmarker.md) | Fires a pulse when the connected object's animation passes a named marker. |
| [**Animation State**](nodes/animstate.md) | Reads the connected object's animation transport as a number - playing, position or progress. |
| [**Play Animation**](nodes/playanim.md) | Starts, stops or restarts an animation clip on the connected object when a pulse arrives. |

## Physics

| Node | What it does |
|---|---|
| [**Mass**](nodes/mass.md) | Gives the connected object weight for the physics simulation - objects with a Mass fall and collide. |
| [**Bounciness**](nodes/bounciness.md) | Sets how much the connected object rebounds in the physics simulation (restitution). |
| [**Friction**](nodes/friction.md) | Sets how much the connected object grips surfaces in the physics simulation. |
| [**Angular Velocity**](nodes/angularvelocity.md) | Gives the connected object a constant spin under physics - a rolling barrel, a spinning hazard, a rotating platform other objects can stand on. |
| [**Collider**](nodes/collider.md) | Overrides the collision shape the physics simulation uses for the connected object - the flow equivalent of the Inspector's Physics > Collider pick, and it wins over it. |
| [**Motor**](nodes/motor.md) | Drives every hinge joint attached to the connected object - the flow way to make wheels turn, turntables spin and doors swing under power. |
| [**Impulse**](nodes/impulse.md) | Pushes or spins a physics body when an event fires - a jump, a kick, a cannon, a nudge. |
| [**Set Velocity**](nodes/setvelocity.md) | Sets a physics body's speed outright - to launch it at an exact velocity, to hold it at a constant one, or to stop it dead. |
| [**Joint**](nodes/joint.md) | Attaches two objects to each other when an event fires - a hinge, or a rigid weld. |

## Effects

| Node | What it does |
|---|---|
| [**Pulse**](nodes/pulse.md) | Throbs the connected object's scale in and out around its resting size. |
| [**Blink**](nodes/blink.md) | Flashes the connected object on and off at a steady rate. |
| [**Sound**](nodes/sound.md) | Plays an Explorer audio clip on the connected object when a pulse arrives - spatial, replicated, by content hash. |
| [**Particles**](nodes/particle.md) | Emits a particle effect from the connected object - a preset burst, a stream, a trail. |

## Music

| Node | What it does |
|---|---|
| **Device Param** | Writes a number into one parameter of the connected audio device every frame - an LFO on a cutoff, a fader on a level. |
| **Device Level** | The live output level of the connected audio device (or a wired one) as a number - a meter you can drive anything with. |
| **Transport** | The shared music transport as a number - beat, bar, phase, bpm or playing - identical on every peer. |
| **Note Trigger** | Plays a note on the connected audio device when a pulse arrives - a drum pad, a sampler pad, a synth key. |

