# Flow Nodes

Every node the [Flow editor](node-system.md) offers, grouped exactly as the palette groups
them. Each node's one-line description is the same text the editor shows in its info pane
(and the palette's tooltip) when you select the node, so the two cannot disagree. Nodes with
their own page link to it.

Since 1.23 every node's properties are in the node editor's **ⓘ Params** tab, and a double-click on a
node with code (Script, Behaviour, a module's node) opens that code — see
[Main graph & node properties](main-graph.md).

## Input

| Node | What it does |
|---|---|
| [**Slider**](nodes/slider.md) | An interactive slider that outputs a number - the quickest way to hand-tune any numeric input live. |
| [**Color Picker**](nodes/colorpicker.md) | Outputs a color chosen with a swatch - the color source for anything that paints. |
| [**Switcher**](nodes/switcher.md) | A radio-button list that outputs the index of the selected item. Each item also has an input: the value output passes on whatever is wired into the selected item (a multi-way switch). Wire a number into index to choose by graph instead of by hand. |
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
| [**Set Game State**](nodes/setgamestate.md) | Switches the shared game state (menu, playing, paused, over) when a pulse arrives - every peer follows the same state. |
| [**On Game State**](nodes/ongamestate.md) | Fires a pulse when the shared game state becomes the one you pick - the hook for "when the round starts". |
| [**Set Active Camera**](nodes/setcamera.md) | Makes a camera object the active view for every player when a pulse arrives. |
| [**Camera Rig**](nodes/camerarig.md) | Moves a camera object: it follows the target at an offset and/or turns to look at it, with damping (seconds of lag). Wire it into an Object Selector that picks a camera. It never moves the editor view or another player's view - look through the camera (Set Active Camera) to see it. |
| [**Set Look**](nodes/setlook.md) | Switches a camera's look (its post-processing) on or off when a pulse arrives, and by default looks through that camera too. |
| [**Start camera**](nodes/gamestart.md) | Start camera: the camera every player looks through when the game state becomes playing (a late joiner too). A setting, not an event - it never pulses; use On Play start or On Game State to react. |
| [**On Play start**](nodes/onplaystart.md) | Fires once when Play begins - by default when the first player presses Play (every peer pulses), or with who: me when you press Play. The place to reset the score, spawn the gems and arm timers. |
| [**On Play stop**](nodes/onplaystop.md) | Fires once when Play ends - by default when the last player leaves Play (every peer pulses), or with who: me when you leave. |
| [**Travel to scene**](nodes/travel.md) | Loads another saved scene by name when a pulse arrives - a door to the next level, replicated to everyone. |
| [**All Players**](nodes/allplayers.md) | A group gate: every player in Play answers its condition for themselves, and it fires once when all of them say yes - travel together, start when everyone is ready. |
| [**Set Variable**](nodes/setvariable.md) | Stores a named value in the replicated scene variables when a pulse arrives - shared state without an object. |
| [**Get Variable**](nodes/getvariable.md) | Reads a named scene variable as a value - the read side of Set Variable, live on every peer. |
| [**Store Value**](nodes/storevalue.md) | Saves a value on THIS device when a pulse arrives (set, keep the max or min, or add) - a best score or a level reached that survives a reload; never sent to other players. |
| [**Stored Value**](nodes/storedvalue.md) | Reads what Store Value saved on this device, as a number or text - the read side of a best score; each player sees their own. |
| [**Announce**](nodes/announce.md) | Shows a big banner - 'Ring 2 reached', 'GOAL!' - on every screen and in VR when a pulse arrives in Play; {v} in the text shows a wired number. In Edit it draws no banner: the line goes to the Debugger's Console with its time and this node. |
| [**Game Sound**](nodes/gamesound.md) | Plays one of the built-in game sounds (coin, ring, levelup, cheer...) when a pulse arrives, at the wired object if one is wired; no sound files needed. |
| [**Effect Burst**](nodes/effectburst.md) | Fires a short sparkle, confetti, smoke or sparks burst at the wired object (or in front of the player) when a pulse arrives; pooled and local to each device. |
| [**Controller Buzz**](nodes/hapticpulse.md) | Buzzes the VR controllers with a named pattern (tap, bump, success...) when a pulse arrives - only in Interact or Play, never while editing. |
| [**Game Music**](nodes/gamemusic.md) | Plays a looping built-in music preset while you are in Interact or Play - always, or only during a round; wire 'on' to switch it by a condition. |
| [**Game Setting**](nodes/gamesetting.md) | Declares one row in the game's Settings (a toggle, a range or a choice) and outputs this player's value - saved on this device for this game, never shared. |
| [**Grabbable**](nodes/grabbable.md) | Lets players pick the connected object up in Play and carry it - no physics needed - and on release it stays where it was put, or (release return) glides back to where it was taken from after a moment: a cup on a table, a book on a shelf, a key that returns to its hook. Every peer sees it move. |
| [**Sit Spot**](nodes/sitspot.md) | Makes the connected object a seat: click it (play crosshair, VR trigger) and you sit on top of it, facing its front; a move key, jump or a stick push stands you up. Each player sits for themselves; a seat someone already sits on says so. |
| [**Point Grab**](nodes/pointgrab.md) | While 'enabled' reads off, players cannot pick objects up by pointing at them (the VR grip ray, the desktop carry); a hand touching an object still moves it. |
| [**On Clap**](nodes/onclap.md) | Fires a pulse when a VR player brings both hands together and holds them - with where they met (point) and whether it was you (byMe); wire 'enabled' to a setting to switch it. |
| [**Game Time**](nodes/gametime.md) | Seconds since the game (or the round) started, the same on every peer - a clock that pauses with the game. |
| [**Player Variable**](nodes/peervariable.md) | A value kept PER PLAYER (score, lives, team) - each peer reads its own row, or a named player's. |

## Character

| Node | What it does |
|---|---|
| [**Character Controller**](nodes/charcontroller.md) | Sets how the player moves in Play - fly or walk, speed, jump and eye height, gravity - driving the player's own view rather than an object (the newest one in the scene wins). |
| [**Move Input**](nodes/moveinput.md) | This player's WASD keys as two numbers, x (A/D) and y (W/S), each -1 to 1 - read on every device for its own player. |
| [**Possess Object**](nodes/possessnode.md) | Puts the player in control of the connected object when a pulse arrives - a vehicle, a turret, a ball. W/S (or the left stick) drive it, A/D turn it, Space (or gamepad A) jumps (Jump height; 0 = no jump), Esc hands it back. |
| [**Camera Follow**](nodes/camerafollow.md) | On a pulse, the camera flies behind the target object and follows it until stop is pulsed - for an object something else moves (the sim, a clip). |
| [**Move Speed**](nodes/movespeed.md) | On a pulse into set, writes the player's movement speed - sprint, mud, slow motion. |

## HUD

| Node | What it does |
|---|---|
| [**HUD Screen**](nodes/hudscreen.md) | Shows, hides or toggles a whole HUD screen (a named layer of elements) on each pulse. |
| [**HUD Text**](nodes/hudtext.md) | Writes a number into a HUD text element through a format such as 'Gems: {v}' - a score, a count, a readout. |
| [**HUD Bar**](nodes/hudbar.md) | Drives a HUD bar element's fill from a number - health, fuel, progress. |
| [**HUD Button**](nodes/hudbutton.md) | Fires a pulse when a HUD button is pressed - the on-screen counterpart of On Click. |
| [**HUD Timer**](nodes/hudtimer.md) | Counts down in a HUD Timer element from its duration, formatted like '{v}s' - by itself (Autostart) or from a pulse into start. |
| [**HUD List**](nodes/hudlist.md) | Names a HUD List element and sets its title and how many rows it shows; HUD Rows and Leaderboard fill it. |
| [**HUD Rows**](nodes/hudrows.md) | Sets, appends or clears the rows of a HUD List element on each pulse - a log, a chat, a scoreboard feed. |
| [**Leaderboard**](nodes/leaderboard.md) | Ranks the players by their own per-player variable (laps, score) into a HUD List element, highest or lowest first, top N rows. |
| [**HUD Input**](nodes/hudinput.md) | Reads a HUD control as a value - a slider's number, a toggle's on/off, a dropdown's or tabs' choice, a text field's text. |
| [**HUD Set Input**](nodes/hudset.md) | Writes a value into a HUD input element when a pulse arrives - to prefill, clear or correct it. |

## Logic

| Node | What it does |
|---|---|
| [**Script**](nodes/script.md) | Your own JavaScript - an effect that moves its object every frame, or (with declared typed inputs and outputs) a small pure function whose return feeds other nodes. v2 scripts also get `api`: object(uuid or name), raycast(from, dir), and in effects keys() (this device only) and spawn('/create ...') (the host spawns once for everyone). An effect runs every frame, in edit mode and in play, in a sandbox, on a view of its object: position, rotation, scale, quaternion, visible, userData, and material.color, emissive, emissiveIntensity, roughness, metalness, opacity, transparent, wireframe, visible. Change those in place (object.rotation.y = 1, object.material.color.set('#f00')); nothing else reaches the object. Every frame starts again from the base pose (position, rotation, scale and visible; material changes stay), so object.rotation.y += 0.02 lands at base + 0.02 and stays there: to keep turning write object.rotation.y = base.rot[1] + elapsed * speed (base holds pos, rot and scale as arrays). `time` is the shared clock, seconds of the day, so it is a large number that every peer agrees on. `elapsed` is seconds since Play started (shared from the round's Start in a game round, otherwise from this peer's own Play press, and in the editor from when this tab last left Play). |
| [**Behaviour**](nodes/behaviour.md) | Game logic written as a small JavaScript file (params, replicated state, event handlers, kit calls) - run once on the authority peer, with a live node view of its events, state and knobs. |
| [**Code link**](nodes/coderef.md) | Points at the module or kit file whose code runs part of this game - double-click (or Open code) to read it. It does nothing at runtime; it is how the Main graph shows where every rule lives. |
| [**Math**](nodes/math.md) | Combines numbers (+ - * / min max mod pow) or shapes one: sin/cos (b scales them, 0 = 1), abs, round, floor, clamp to 0..b, negate. + input adds sockets (up to 8) for + - * / min max. |
| [**Compare**](nodes/compare.md) | Compares two numbers and outputs true or false. |
| [**Gate**](nodes/gate.md) | Boolean logic - AND, OR, NOT, XOR. + input adds sockets (up to 8): AND = all true, OR = any true, XOR = an odd number true. |
| [**Map Range**](nodes/maprange.md) | Remaps a number from one range to another - the glue between free-range sources and bounded parameters. |
| [**Select**](nodes/select.md) | Picks one of up to four values (a, b, c, d) by a rounded index. |
| [**Latch**](nodes/latch.md) | Holds a boolean until told otherwise - set, reset and toggle pulses make it a memory bit. |
| [**Delay**](nodes/delay.md) | Passes a pulse on after a set number of seconds - the timing of a fuse, or a door that closes later. |
| [**Sequence**](nodes/sequence.md) | One pulse in, four pulses out in order - step1 to step4, each after its own wait (the waits add up from the trigger). |
| [**Once**](nodes/once.md) | Lets exactly one pulse through until it is re-armed - a checkpoint, a pickup, a first-time event. |
| [**Counter**](nodes/counter.md) | Counts trigger pulses and outputs the running total. |
| [**Loop**](nodes/loop.md) | Sweeps a number from one value to another over time, repeating - a ready-made animation ramp. |
| [**Timer**](nodes/timer.md) | A delay line: outputs its input as it was a set number of seconds ago. |
| [**Distance**](nodes/distance.md) | Measures the live distance between two things in the scene. |
| [**Proximity**](nodes/proximity.md) | True while two things are within a radius of each other - a distance sensor with the threshold built in. Set to: player to measure from object a to YOUR player (each peer reads its own player). |
| [**Look At**](nodes/lookat.md) | Keeps the connected object facing a target - another object or a fixed point - every frame. |
| [**Set Color**](nodes/setcolor.md) | Paints the connected object's material with a color, re-applied every frame. |
| [**Visibility**](nodes/visibility.md) | Shows or hides the connected object based on a boolean. |
| [**Set Shader Uniform**](nodes/setuniform.md) | Writes one number inside an object's shader graph, so a trigger, a |

## Triggers

| Node | What it does |
|---|---|
| [**On Click**](nodes/onclick.md) | Fires a short pulse when its object is clicked - the bridge from user input into the graph. |
| [**On Hover**](nodes/onhover.md) | Fires when a player's pointer goes over the object (on: enter), leaves it (leave), or stays high while it is over (over) - the mouse in Interact, the crosshair in Play, a tap on a phone, the laser in VR. who: anyone shares the pulse with every peer, me keeps it on yours; cooldown spaces repeats. |
| [**On Grab**](nodes/ongrab.md) | Fires a pulse when a player picks the object up - a carry in Play or Interact, or a VR grip in Interact; editor moves never fire it. |
| [**Key Press**](nodes/keypress.md) | Fires a pulse while a keyboard key is pressed - the bridge from your keyboard into the graph. |
| [**On Hit**](nodes/onhit.md) | Fires a pulse when a hand or a walking player knocks the object - with how hard it was hit (speed) and whether you did it (byMe). |
| [**On Rest**](nodes/onrest.md) | Fires a pulse when a physics body has finished moving - the counterpart to On Impact, which fires when it starts. |
| [**Gamepad Button**](nodes/gamepadbutton.md) | Fires a pulse (or holds a level) while a gamepad button is pressed - the pad's counterpart of Key Press. |
| [**Gamepad Axis**](nodes/gamepadaxis.md) | A gamepad stick axis (left or right stick, x or y) as a number between -1 and 1, with a dead zone (the L2/R2 triggers are Gamepad Button inputs). |

## Animation

| Node | What it does |
|---|---|
| [**Hover Animate**](nodes/hoveranimate.md) | Swings, wobbles or pops its object when its trigger pulses (wire an On Hover in). energy adds a swing per hover (a bell), once / restart / while / stop / inout pick how repeats behave; a sound can play at the start or at each swing's end. Every player sees the same motion. |
| [**Toggle Animation**](nodes/toggleanim.md) | Moves its object between poses - closed and open by default, or more named poses (ajar...). trigger toggles, open / close go there, go to takes the pose named in 'pose'. Outputs isOpen, moving, pose and the opened / closed pulses. The state is shared and saved, so late joiners see the same door. |
| [**Shake**](nodes/shake.md) | Jitters the connected object around its resting position - rumble, nervousness, impact feedback. |
| [**Spin**](nodes/spin.md) | Rotates the connected object continuously around one axis. |
| [**Rotate / Motor**](nodes/rotor.md) | Turns the connected object about its own local axis (and its origin, so a wheel turns on its hub) at a set rpm with a spin-up. Paddles and scoops it turns carry water from Fluid emitters. On a dynamic physics body during a simulation it becomes a real motor: torque-limited, so a load slows it. |
| [**Float Along Flow**](nodes/flowfloat.md) | Carries the connected object along a Flow path - a leaf, a toy boat - from where you placed it, at the path's speed, bobbing and turning with the current, looping at the end. Uses the nearest Flow path unless one is wired. |
| [**Bounce**](nodes/bounce.md) | Bounces the connected object up and down off its resting height, like a dribbled ball. |
| [**Orbit**](nodes/orbit.md) | Circles the connected object around its resting position on the horizontal plane. |
| [**Oscillate / Swing**](nodes/oscillate.md) | Swings, sways or bobs the connected object - a sine on its rotation (degrees, about a pivot face: top for a hanging sign or lamp, left for a door), position (metres) or scale - identical on every peer. Wire a trigger and it swings from that moment and dies away with damping, like a struck bell. |
| [**Move To**](nodes/moveto.md) | Moves the connected object to a goal over a duration with easing, and back: trigger goes, back returns, toggle alternates (On Click into toggle), open holds it at the goal while a boolean is true (Proximity = an automatic door). The goal is an offset (x, y, z), a world point, or a wired object. |
| [**Rotate To**](nodes/rotateto.md) | Turns the connected object to an angle over a duration with easing, and back - a door on its hinge (pivot left, axis y, angle 90, On Click into toggle), a lid, a drawbridge, a lever. Same inputs as Move To; wire an object into to and it turns to match that object's rotation. |
| [**Scale To**](nodes/scaleto.md) | Grows or shrinks the connected object to a factor of its size over a duration with easing, and back - a button that pops, a plant that grows from its foot (pivot bottom), a door that squashes shut. Same inputs as Move To. |
| [**Path patrol**](nodes/pathpatrol.md) | Walks the connected object along a Path object - stopping, speeding up, jumping and firing events where the Path's points say, looping, ping-ponging, walking once or picking random points. Pick the Path on the card (or wire one in); a trigger starts a Once walk, and an offset spreads several walkers on one Path. Old nodes with clicked waypoints keep walking them and offer Convert to a Path object. |
| [**On Path Event**](nodes/onpathevent.md) | Fires a pulse when a walker on a Path arrives at a point with an event name (set on the point in the Path's properties). Leave the path or the event blank to hear any. |
| [**Follow Path**](nodes/followpath.md) | Moves the connected object along a smooth path - a drawn Spline, a Flow path or its own waypoints - at a speed, looping, ping-ponging or once, facing along it and leaning into the turns. An offset spreads several riders out along one path. |
| [**Wander**](nodes/wander.md) | Drifts the connected object around a smooth, never-repeating target inside an area object (a water volume, a room) or a box around where it was placed - fish, birds, fireflies, idle drones. With ground on (the default for a new node) it walks across the floor only and keeps the height it was placed at - deer, a herd, a wandering NPC; switch ground off to drift up and down within ry. |
| [**Ambient Animal**](nodes/ambientanimal.md) | Brings the connected animal to life - it strolls around (inside an area object, or a box around where it stands), stops to rest, turns to look at the nearest player while it rests and, with a flee radius, shies away from players who come close; a model with idle / walk / run clips plays them. Deer, cats, chickens, fish (ground off), birds - identical on every peer. |
| [**Orient to Velocity**](nodes/orientvelocity.md) | Turns the connected object to face the way it is moving, smoothly, leaning into turns - put it after Wander, Orbit or any mover so it looks where it goes. |
| [**Body Wave**](nodes/bodywave.md) | Bends the connected object with a wave travelling along its body - a swimming fish, a snake, a flag, a tail - stronger and faster the faster it moves, curving into turns. A shader effect: physics and picking keep the rest pose. |
| [**Wind Sway**](nodes/windsway.md) | Makes the connected object sway in the wind - a plant, a tree, grass lean and shiver in gusts from their foot (anchor bottom), a flag or a banner waves from its pole (mode flag, anchor left) - identical on every peer. A shader effect: physics and picking keep the rest pose. |
| [**Flowing Water**](nodes/waterflow.md) | Makes the connected surface flow like water - its textures scroll with the current (speed, direction) and the surface swells gently - a river, a fountain basin, an aquarium top. Best with the Water material preset; a plain material gets ripples of its own. |
| [**Animation Finished**](nodes/animfinished.md) | Fires a pulse when the connected object's animation clip reaches its end. |
| [**Animation Marker**](nodes/animmarker.md) | Fires a pulse when the connected object's animation passes a named marker. |
| [**Animation State**](nodes/animstate.md) | Reads the connected object's animation transport as a number - playing, position or progress. |
| [**Play Animation**](nodes/playanim.md) | Starts, stops or restarts an animation clip on the connected object when a pulse arrives. Crossfade blends from the clip already playing instead of snapping. |
| **Set Expression** | Sets a VRM character's facial expression (happy, angry, blink, aa or one of its own) to a weight when a pulse arrives. |
| **Blend by Speed** | Blends a character's idle, walk and run clips by a speed (its own speed when nothing is wired), so it never snaps between poses. |
| **Set Animation Parameter** | Sets a parameter of the object's Animation states (on a pulse, or all the time when nothing is wired to trigger), or fires a trigger such as jump. |
| **Attach to Socket** | On a pulse, makes the wired item follow one of this model's named nodes (a hand, a hook), or lets it go. |
| **On Animation State** | Fires a pulse when the object's Animation states enter a state (leave the name empty for any state). |
| [**Play Sequence**](nodes/playseq.md) | Plays, stops, toggles or restarts a Timeline sequence (camera shots, clips, audio, events) for every player when a pulse arrives. |
| [**On Sequence Event**](nodes/onseqevent.md) | Fires a pulse when a running Timeline sequence passes a named event, or reaches its end ('end'). |

## Physics

On Impact, On Enter and On Exit sit here since 1.22. Each has an **only with** input (fire only for one other
object) and an **other** output (the body it touched) — see [Contact filters](colliders.md#contact-filters-only-with-and-other).

| Node | What it does |
|---|---|
| [**On Impact**](nodes/onimpact.md) | Fires a pulse when the connected object hits something in a physics simulation - from any side (a wall, a target), or only when it lands with From: landing only. |
| [**On Enter**](nodes/onenter.md) | Fires a pulse when something enters a trigger volume (an object with Sensor on) - the checkpoint, doorway and pressure-plate node. The player counts too: whoever walks in, on any peer, fires it (other = 'player'); set who to player or objects to narrow it. |
| [**On Exit**](nodes/onexit.md) | Fires a pulse when something leaves a trigger volume - the other half of On Enter, the player included (who: player / objects narrows it). |
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
| [**Light Switch**](nodes/lightswitch.md) | Switches the lights in the connected object (a light, or a lamp model with one inside) on and off with a fade, glowing parts included: trigger = on, back = off, toggle flips (On Click into toggle), or wire a boolean into on. |
| [**Light Intensity**](nodes/lightintensity.md) | Fades the connected object's lights to a level (1 = their own intensity, 0 = off, 2 = twice as bright) whenever the level changes - wire a variable, a Proximity or a Map Range into level. |
| [**Light Colour Cycle**](nodes/lightcycle.md) | Cycles the colour of the connected object's lights (and glowing parts) through the rainbow or a list of colours - a disco light, a warning beacon, a mood lamp - identical on every peer. |
| [**Highlight**](nodes/highlight.md) | Makes the connected object glow while you point at it (a VR laser, the play-mode crosshair, the mouse in Interact or a phone tap), or while a boolean wired into on is true. Each player sees their own; pair it with Press Button and On Click for a button that feels pressable. |
| [**Press Button**](nodes/pressbutton.md) | Pushes the connected object in along one of its own axes and springs it back each time a pulse arrives (On Click into press). Every player sees the same press at the same moment. |
| [**Sound**](nodes/sound.md) | Plays an Explorer audio clip on the connected object when a pulse arrives - spatial, replicated, by content hash. |
| [**Particles**](nodes/particle.md) | Emits a particle effect from the connected object - a preset burst, a stream, a trail. gravity is the acceleration along world Y in m/s^2: negative falls (-9.8 is real gravity), positive rises like smoke. |
| [**Jiggle**](nodes/jiggle.md) | Makes the connected object jiggle - it lags behind when moved, wobbles like jelly on impact and sways in the wind; skinned models swing their bone chains. |

## Music

| Node | What it does |
|---|---|
| [**Device Param**](nodes/deviceparam.md) | Writes a number into one parameter of the connected audio device every frame - an LFO on a cutoff, a fader on a level. |
| [**Device Level**](nodes/devicelevel.md) | The live output level of the connected audio device (or a wired one) as a number - a meter you can drive anything with. |
| [**Transport**](nodes/transportbeat.md) | The shared music transport as a number - beat, bar, phase, bpm or playing - identical on every peer. |
| [**Note Trigger**](nodes/notetrigger.md) | Plays a note on the connected audio device when a pulse arrives - a drum pad, a sampler pad, a synth key. |

## Kit

The [game kit](game-kit.md)'s nodes, one group per piece. Every node is generated from the same
description as the kit's code interface, and one peer applies each change, so a press seen by
every peer counts once. The [Game kit](game-kit.md#the-pieces) page lists them all.

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
