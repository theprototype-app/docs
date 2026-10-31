# Flow Nodes

Every node the [Flow editor](https://docs.theprototype.app/node-system.md) offers, grouped exactly as the palette groups
them. Each node's one-line description is the same text the editor shows in its info pane
(and the palette's tooltip) when you select the node, so the two cannot disagree. Nodes with
their own page link to it.

Since 1.23 every node's properties are in the node editor's **ⓘ Params** tab, and a double-click on a
node with code (Script, Behaviour, a module's node) opens that code — see
[Main graph & node properties](https://docs.theprototype.app/main-graph.md).

## Input

| Node | What it does |
|---|---|
| [**Slider**](https://docs.theprototype.app/nodes/slider.md) | An interactive slider that outputs a number - the quickest way to hand-tune any numeric input live. |
| [**Color Picker**](https://docs.theprototype.app/nodes/colorpicker.md) | Outputs a color chosen with a swatch - the color source for anything that paints. |
| [**Switcher**](https://docs.theprototype.app/nodes/switcher.md) | A radio-button list that outputs the index of the selected item. Each item also has an input: the value output passes on whatever is wired into the selected item (a multi-way switch). Wire a number into index to choose by graph instead of by hand. |
| [**Number**](https://docs.theprototype.app/nodes/number.md) | A constant numeric value - the simplest source node. |
| [**Vector3**](https://docs.theprototype.app/nodes/vector3.md) | An x/y/z triple - used as a direction, an offset, or most often a fixed point in the world. |
| [**Toggle**](https://docs.theprototype.app/nodes/toggle.md) | A checkbox that outputs true or false - a hand-operated on/off switch. |
| [**Random**](https://docs.theprototype.app/nodes/random.md) | A random number in a range - deterministic, so every peer sees the same "random" value. |
| [**Time**](https://docs.theprototype.app/nodes/time.md) | The synced clock as a value - the heartbeat behind almost every animation recipe. |

## Scene

| Node | What it does |
|---|---|
| [**Object Selector**](https://docs.theprototype.app/nodes/objectselector.md) | Binds the graph to a scene object - the sink every effect must reach, and an object reference for sensor nodes. |
| [**Velocity**](https://docs.theprototype.app/nodes/velocity.md) | Outputs how fast the connected object is moving right now, in metres per second. |
| [**Measure**](https://docs.theprototype.app/nodes/measure.md) | Reads a number off an object: how tall it is, where its top is, how fast it is going. |
| [**Spawn**](https://docs.theprototype.app/nodes/spawn.md) | Makes copies of an object while the simulation runs - crates off a conveyor, targets, debris, ammo, waves of anything. |

## Object Flow

| Node | What it does |
|---|---|
| [**Flow Input**](https://docs.theprototype.app/nodes/flowinput.md) | Declares a public input socket for an object flow - the way the Scene flow feeds a value into an object's own graph. |
| [**Flow Output**](https://docs.theprototype.app/nodes/flowoutput.md) | Declares a public output socket for an object flow - the way an object publishes a value back to the Scene flow. |
| [**Object Flow**](https://docs.theprototype.app/nodes/objectflow.md) | Embeds an object's own graph into the Scene flow as a single card - the way to compose object flows into a bigger machine without opening each one. |

## Game

| Node | What it does |
|---|---|
| [**Set Game State**](https://docs.theprototype.app/nodes/setgamestate.md) | Switches the shared game state (menu, playing, paused, over) when a pulse arrives - every peer follows the same state. |
| [**On Game State**](https://docs.theprototype.app/nodes/ongamestate.md) | Fires a pulse when the shared game state becomes the one you pick - the hook for "when the round starts". |
| [**Set Active Camera**](https://docs.theprototype.app/nodes/setcamera.md) | Makes a camera object the active view for every player when a pulse arrives. |
| [**Camera Rig**](https://docs.theprototype.app/nodes/camerarig.md) | Moves a camera object: it follows the target at an offset and/or turns to look at it, with damping (seconds of lag). Wire it into an Object Selector that picks a camera. It never moves the editor view or another player's view - look through the camera (Set Active Camera) to see it. |
| [**Set Look**](https://docs.theprototype.app/nodes/setlook.md) | Switches a camera's look (its post-processing) on or off when a pulse arrives, and by default looks through that camera too. |
| [**Game Start**](https://docs.theprototype.app/nodes/gamestart.md) | Fires once when the game starts (Play, or a round reset) - the place to spawn, reset counters and arm timers. |
| [**Travel to scene**](https://docs.theprototype.app/nodes/travel.md) | Loads another saved scene by name when a pulse arrives - a door to the next level, replicated to everyone. |
| [**All Players**](https://docs.theprototype.app/nodes/allplayers.md) | Iterates the connected players so a per-player value can be read, or a HUD row shown, for each of them. |
| [**Set Variable**](https://docs.theprototype.app/nodes/setvariable.md) | Stores a named value in the replicated scene variables when a pulse arrives - shared state without an object. |
| [**Get Variable**](https://docs.theprototype.app/nodes/getvariable.md) | Reads a named scene variable as a value - the read side of Set Variable, live on every peer. |
| [**Store Value**](https://docs.theprototype.app/nodes/storevalue.md) | Saves a value on THIS device when a pulse arrives (set, keep the max or min, or add) - a best score or a level reached that survives a reload; never sent to other players. |
| [**Stored Value**](https://docs.theprototype.app/nodes/storedvalue.md) | Reads what Store Value saved on this device, as a number or text - the read side of a best score; each player sees their own. |
| [**Announce**](https://docs.theprototype.app/nodes/announce.md) | Shows a big banner - 'Ring 2 reached', 'GOAL!' - on every screen and in VR when a pulse arrives; {v} in the text shows a wired number. |
| [**Game Sound**](https://docs.theprototype.app/nodes/gamesound.md) | Plays one of the built-in game sounds (coin, ring, levelup, cheer...) when a pulse arrives, at the wired object if one is wired; no sound files needed. |
| [**Effect Burst**](https://docs.theprototype.app/nodes/effectburst.md) | Fires a short sparkle, confetti, smoke or sparks burst at the wired object (or in front of the player) when a pulse arrives; pooled and local to each device. |
| [**Controller Buzz**](https://docs.theprototype.app/nodes/hapticpulse.md) | Buzzes the VR controllers with a named pattern (tap, bump, success...) when a pulse arrives - only in Interact or Play, never while editing. |
| [**Game Music**](https://docs.theprototype.app/nodes/gamemusic.md) | Plays a looping built-in music preset while you are in Interact or Play - always, or only during a round; wire 'on' to switch it by a condition. |
| [**Game Setting**](https://docs.theprototype.app/nodes/gamesetting.md) | Declares one row in the game's Settings (a toggle, a range or a choice) and outputs this player's value - saved on this device for this game, never shared. |
| [**Point Grab**](https://docs.theprototype.app/nodes/pointgrab.md) | While 'enabled' reads off, players cannot pick objects up by pointing at them (the VR grip ray, the desktop carry); a hand touching an object still moves it. |
| [**On Clap**](https://docs.theprototype.app/nodes/onclap.md) | Fires a pulse when a VR player brings both hands together and holds them - with where they met (point) and whether it was you (byMe); wire 'enabled' to a setting to switch it. |
| [**Game Time**](https://docs.theprototype.app/nodes/gametime.md) | Seconds since the game (or the round) started, the same on every peer - a clock that pauses with the game. |
| [**Player Variable**](https://docs.theprototype.app/nodes/peervariable.md) | A value kept PER PLAYER (score, lives, team) - each peer reads its own row, or a named player's. |

## Character

| Node | What it does |
|---|---|
| [**Character Controller**](https://docs.theprototype.app/nodes/charcontroller.md) | Turns the connected object into a walking, jumping character driven by the player's movement input. |
| [**Move Input**](https://docs.theprototype.app/nodes/moveinput.md) | The player's movement input as numbers - stick or WASD axes and the jump button - for driving things by hand. |
| [**Possess Object**](https://docs.theprototype.app/nodes/possessnode.md) | Puts the player in control of the connected object when a pulse arrives - a vehicle, a turret, a ball. |
| [**Camera Follow**](https://docs.theprototype.app/nodes/camerafollow.md) | Makes the camera follow the connected object at a set distance and height - a third-person or chase view. |
| [**Move Speed**](https://docs.theprototype.app/nodes/movespeed.md) | Overrides the character's walking speed while a value is wired - sprint, mud, slow motion. |

## HUD

| Node | What it does |
|---|---|
| [**HUD Screen**](https://docs.theprototype.app/nodes/hudscreen.md) | Shows or hides a whole HUD screen (a named layer of elements) while its condition holds. |
| [**HUD Text**](https://docs.theprototype.app/nodes/hudtext.md) | Writes a number into a HUD text element through a format such as 'Gems: {v}' - a score, a count, a readout. |
| [**HUD Bar**](https://docs.theprototype.app/nodes/hudbar.md) | Drives a HUD bar element's fill from a number - health, fuel, progress. |
| [**HUD Button**](https://docs.theprototype.app/nodes/hudbutton.md) | Fires a pulse when a HUD button is pressed - the on-screen counterpart of On Click. |
| [**HUD Timer**](https://docs.theprototype.app/nodes/hudtimer.md) | Runs a countdown in a HUD text element from its duration, formatted like '{v}s' - starts by itself or on a pulse. |
| [**HUD List**](https://docs.theprototype.app/nodes/hudlist.md) | Fills a HUD list element with the items a value provides - an inventory, objectives, players. |
| [**HUD Rows**](https://docs.theprototype.app/nodes/hudrows.md) | Appends or replaces rows in a HUD rows element from a pulse - a log, a chat, a scoreboard feed. |
| [**Leaderboard**](https://docs.theprototype.app/nodes/leaderboard.md) | Ranks the players by their own per-player variable (laps, score) into a HUD element, highest or lowest first, top N rows. |
| [**HUD Input**](https://docs.theprototype.app/nodes/hudinput.md) | Reads what the player typed into a HUD input element as a value. |
| [**HUD Set Input**](https://docs.theprototype.app/nodes/hudset.md) | Writes a value into a HUD input element when a pulse arrives - to prefill, clear or correct it. |

## Logic

| Node | What it does |
|---|---|
| [**Script**](https://docs.theprototype.app/nodes/script.md) | Your own JavaScript - an effect that moves its object every frame, or (with declared typed inputs and outputs) a small pure function whose return feeds other nodes. v2 scripts also get `api`: object(uuid or name), raycast(from, dir), and in effects keys() (this device only) and spawn('/create ...') (the host spawns once for everyone). |
| [**Behaviour**](https://docs.theprototype.app/nodes/behaviour.md) | Game logic written as a small JavaScript file (params, replicated state, event handlers, kit calls) - run once on the authority peer, with a live node view of its events, state and knobs. |
| [**Code link**](https://docs.theprototype.app/nodes/coderef.md) | Points at the module or kit file whose code runs part of this game - double-click (or Open code) to read it. It does nothing at runtime; it is how the Main graph shows where every rule lives. |
| [**Math**](https://docs.theprototype.app/nodes/math.md) | Combines numbers (+ - * / min max mod pow) or shapes one: sin/cos (b scales them, 0 = 1), abs, round, floor, clamp to 0..b, negate. + input adds sockets (up to 8) for + - * / min max. |
| [**Compare**](https://docs.theprototype.app/nodes/compare.md) | Compares two numbers and outputs true or false. |
| [**Gate**](https://docs.theprototype.app/nodes/gate.md) | Boolean logic - AND, OR, NOT, XOR. + input adds sockets (up to 8): AND = all true, OR = any true, XOR = an odd number true. |
| [**Map Range**](https://docs.theprototype.app/nodes/maprange.md) | Remaps a number from one range to another - the glue between free-range sources and bounded parameters. |
| [**Select**](https://docs.theprototype.app/nodes/select.md) | Picks one of up to four values (a, b, c, d) by a rounded index. |
| [**Latch**](https://docs.theprototype.app/nodes/latch.md) | Holds a boolean until told otherwise - set, reset and toggle pulses make it a memory bit. |
| [**Delay**](https://docs.theprototype.app/nodes/delay.md) | Passes a pulse on after a set number of seconds - the timing of a fuse, or a door that closes later. |
| [**Sequence**](https://docs.theprototype.app/nodes/sequence.md) | Fires its outputs one after another, one per pulse, then wraps around - a step-by-step trigger. |
| [**Once**](https://docs.theprototype.app/nodes/once.md) | Lets exactly one pulse through until it is re-armed - a checkpoint, a pickup, a first-time event. |
| [**Counter**](https://docs.theprototype.app/nodes/counter.md) | Counts trigger pulses and outputs the running total. |
| [**Loop**](https://docs.theprototype.app/nodes/loop.md) | Sweeps a number from one value to another over time, repeating - a ready-made animation ramp. |
| [**Timer**](https://docs.theprototype.app/nodes/timer.md) | A delay line: outputs its input as it was a set number of seconds ago. |
| [**Distance**](https://docs.theprototype.app/nodes/distance.md) | Measures the live distance between two things in the scene. |
| [**Proximity**](https://docs.theprototype.app/nodes/proximity.md) | True while two things are within a radius of each other - a distance sensor with the threshold built in. |
| [**Look At**](https://docs.theprototype.app/nodes/lookat.md) | Keeps the connected object facing a target - another object or a fixed point - every frame. |
| [**Set Color**](https://docs.theprototype.app/nodes/setcolor.md) | Paints the connected object's material with a color, re-applied every frame. |
| [**Visibility**](https://docs.theprototype.app/nodes/visibility.md) | Shows or hides the connected object based on a boolean. |
| [**Set Shader Uniform**](https://docs.theprototype.app/nodes/setuniform.md) | Writes one number inside an object's shader graph, so a trigger, a |

## Triggers

| Node | What it does |
|---|---|
| [**On Click**](https://docs.theprototype.app/nodes/onclick.md) | Fires a short pulse when its object is clicked - the bridge from user input into the graph. |
| [**On Grab**](https://docs.theprototype.app/nodes/ongrab.md) | Fires a pulse when a player picks the object up - a carry in Play or Interact, or a VR grip in Interact; editor moves never fire it. |
| [**Key Press**](https://docs.theprototype.app/nodes/keypress.md) | Fires a pulse while a keyboard key is pressed - the bridge from your keyboard into the graph. |
| [**On Hit**](https://docs.theprototype.app/nodes/onhit.md) | Fires a pulse when a hand or a walking player knocks the object - with how hard it was hit (speed) and whether you did it (byMe). |
| [**On Rest**](https://docs.theprototype.app/nodes/onrest.md) | Fires a pulse when a physics body has finished moving - the counterpart to On Impact, which fires when it starts. |
| [**Gamepad Button**](https://docs.theprototype.app/nodes/gamepadbutton.md) | Fires a pulse (or holds a level) while a gamepad button is pressed - the pad's counterpart of Key Press. |
| [**Gamepad Axis**](https://docs.theprototype.app/nodes/gamepadaxis.md) | A gamepad stick or trigger axis as a number between -1 and 1, with a dead zone. |

## Animation

| Node | What it does |
|---|---|
| [**Shake**](https://docs.theprototype.app/nodes/shake.md) | Jitters the connected object around its resting position - rumble, nervousness, impact feedback. |
| [**Spin**](https://docs.theprototype.app/nodes/spin.md) | Rotates the connected object continuously around one axis. |
| [**Rotate / Motor**](https://docs.theprototype.app/nodes/rotor.md) | Turns the connected object about its own local axis (and its origin, so a wheel turns on its hub) at a set rpm with a spin-up. Paddles and scoops it turns carry water from Fluid emitters. On a dynamic physics body during a simulation it becomes a real motor: torque-limited, so a load slows it. |
| [**Float Along Flow**](https://docs.theprototype.app/nodes/flowfloat.md) | Carries the connected object along a Flow path - a leaf, a toy boat - from where you placed it, at the path's speed, bobbing and turning with the current, looping at the end. Uses the nearest Flow path unless one is wired. |
| [**Bounce**](https://docs.theprototype.app/nodes/bounce.md) | Bounces the connected object up and down off its resting height, like a dribbled ball. |
| [**Orbit**](https://docs.theprototype.app/nodes/orbit.md) | Circles the connected object around its resting position on the horizontal plane. |
| [**Path patrol**](https://docs.theprototype.app/nodes/pathpatrol.md) | Walks the connected object along a series of waypoints you click into the scene, facing along the path. |
| [**Follow Path**](https://docs.theprototype.app/nodes/followpath.md) | Moves the connected object along a smooth path - a drawn Spline, a Flow path or its own waypoints - at a speed, looping, ping-ponging or once, facing along it and leaning into the turns. An offset spreads several riders out along one path. |
| [**Wander**](https://docs.theprototype.app/nodes/wander.md) | Drifts the connected object around a smooth, never-repeating target inside an area object (a water volume, a room) or a box around where it was placed - fish, birds, fireflies, idle drones. |
| [**Orient to Velocity**](https://docs.theprototype.app/nodes/orientvelocity.md) | Turns the connected object to face the way it is moving, smoothly, leaning into turns - put it after Wander, Orbit or any mover so it looks where it goes. |
| [**Body Wave**](https://docs.theprototype.app/nodes/bodywave.md) | Bends the connected object with a wave travelling along its body - a swimming fish, a snake, a flag, a tail - stronger and faster the faster it moves, curving into turns. A shader effect: physics and picking keep the rest pose. |
| [**Animation Finished**](https://docs.theprototype.app/nodes/animfinished.md) | Fires a pulse when the connected object's animation clip reaches its end. |
| [**Animation Marker**](https://docs.theprototype.app/nodes/animmarker.md) | Fires a pulse when the connected object's animation passes a named marker. |
| [**Animation State**](https://docs.theprototype.app/nodes/animstate.md) | Reads the connected object's animation transport as a number - playing, position or progress. |
| [**Play Animation**](https://docs.theprototype.app/nodes/playanim.md) | Starts, stops or restarts an animation clip on the connected object when a pulse arrives. |
| [**Play Sequence**](https://docs.theprototype.app/nodes/playseq.md) | Plays, stops, toggles or restarts a Timeline sequence (camera shots, clips, audio, events) for every player when a pulse arrives. |
| [**On Sequence Event**](https://docs.theprototype.app/nodes/onseqevent.md) | Fires a pulse when a running Timeline sequence passes a named event, or reaches its end ('end'). |

## Physics

On Impact, On Enter and On Exit sit here since 1.22. Each has an **only with** input (fire only for one other
object) and an **other** output (the body it touched) — see [Contact filters](https://docs.theprototype.app/colliders.md#contact-filters-only-with-and-other).

| Node | What it does |
|---|---|
| [**On Impact**](https://docs.theprototype.app/nodes/onimpact.md) | Fires a pulse when a physics simulation lands the connected object on the ground or another object. |
| [**On Enter**](https://docs.theprototype.app/nodes/onenter.md) | Fires a pulse when something enters a trigger volume - the checkpoint, doorway and pressure-plate node. |
| [**On Exit**](https://docs.theprototype.app/nodes/onexit.md) | Fires a pulse when something leaves a trigger volume - the other half of On Enter. |
| [**Mass**](https://docs.theprototype.app/nodes/mass.md) | Gives the connected object weight for the physics simulation - objects with a Mass fall and collide. |
| [**Bounciness**](https://docs.theprototype.app/nodes/bounciness.md) | Sets how much the connected object rebounds in the physics simulation (restitution). |
| [**Friction**](https://docs.theprototype.app/nodes/friction.md) | Sets how much the connected object grips surfaces in the physics simulation. |
| [**Angular Velocity**](https://docs.theprototype.app/nodes/angularvelocity.md) | Gives the connected object a constant spin under physics - a rolling barrel, a spinning hazard, a rotating platform other objects can stand on. |
| [**Collider**](https://docs.theprototype.app/nodes/collider.md) | Overrides the collision shape the physics simulation uses for the connected object - the flow equivalent of the Inspector's Physics > Collider pick, and it wins over it. |
| [**Motor**](https://docs.theprototype.app/nodes/motor.md) | Drives every hinge joint attached to the connected object - the flow way to make wheels turn, turntables spin and doors swing under power. |
| [**Impulse**](https://docs.theprototype.app/nodes/impulse.md) | Pushes or spins a physics body when an event fires - a jump, a kick, a cannon, a nudge. |
| [**Set Velocity**](https://docs.theprototype.app/nodes/setvelocity.md) | Sets a physics body's speed outright - to launch it at an exact velocity, to hold it at a constant one, or to stop it dead. |
| [**Joint**](https://docs.theprototype.app/nodes/joint.md) | Attaches two objects to each other when an event fires - a hinge, or a rigid weld. |

## Effects

| Node | What it does |
|---|---|
| [**Pulse**](https://docs.theprototype.app/nodes/pulse.md) | Throbs the connected object's scale in and out around its resting size. |
| [**Blink**](https://docs.theprototype.app/nodes/blink.md) | Flashes the connected object on and off at a steady rate. |
| [**Sound**](https://docs.theprototype.app/nodes/sound.md) | Plays an Explorer audio clip on the connected object when a pulse arrives - spatial, replicated, by content hash. |
| [**Particles**](https://docs.theprototype.app/nodes/particle.md) | Emits a particle effect from the connected object - a preset burst, a stream, a trail. |
| [**Jiggle**](https://docs.theprototype.app/nodes/jiggle.md) | Makes the connected object jiggle - it lags behind when moved, wobbles like jelly on impact and sways in the wind; skinned models swing their bone chains. |

## Music

| Node | What it does |
|---|---|
| [**Device Param**](https://docs.theprototype.app/nodes/deviceparam.md) | Writes a number into one parameter of the connected audio device every frame - an LFO on a cutoff, a fader on a level. |
| [**Device Level**](https://docs.theprototype.app/nodes/devicelevel.md) | The live output level of the connected audio device (or a wired one) as a number - a meter you can drive anything with. |
| [**Transport**](https://docs.theprototype.app/nodes/transportbeat.md) | The shared music transport as a number - beat, bar, phase, bpm or playing - identical on every peer. |
| [**Note Trigger**](https://docs.theprototype.app/nodes/notetrigger.md) | Plays a note on the connected audio device when a pulse arrives - a drum pad, a sampler pad, a synth key. |

## Kit

The [game kit](https://docs.theprototype.app/game-kit.md)'s nodes, one group per piece. Every node is generated from the same
description as the kit's code interface, and one peer applies each change, so a press seen by
every peer counts once. The [Game kit](https://docs.theprototype.app/game-kit.md#the-pieces) page lists them all.

| Group | What it covers |
|---|---|
| **Kit: Rules** | Grab reach, jump height and play bounds that every grab path obeys; a pulse when a grab is refused. |
| **Kit: Round** | Round setup, start, restart, pause, win, lose and add time; the phase, time left and countdown; an event for each step. |
| **Kit: Levels** | Go to a level, next level, finish a level, game mode; stars, unlocks and progress saved per device. |
| **Kit: Score** | Add, set and reset the score, counted once; my score, best score and the leader. |
| **Kit: Pickups** | Collect a pickup once for everybody, with respawn; how many are left; a "collect them all" event. |
| **Kit: Spawner** | Spawn entities as copies of a template, remove or clear them, count the living; an event when the wave is over. |
| **Kit: Health** | Damage, area damage, heal and revive entities; their hit points; damaged, healed, died and revived events. |
| **Kit: Mover** | Make entities chase a target round walls and each other, stop them, knock them back; an event when one is stuck. |
