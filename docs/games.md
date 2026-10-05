# The Games tab

**Templates ▸ Games** lists ready-made games. Open a card, press **Test play**, then the game's own **Start**. Every game
has the same pause menu (Esc, or the menu button in VR): Resume, Restart, Levels, Settings and Main menu.

The five games added in **1.20** are built into the app — they need no module download — and play on the desktop and in
VR.

Since **1.23**, Mini Golf, VR Football, Dungeon Realms, The Alchemist's Escape, Sky Run, Target Toss and Marble Maze keep
their rules as one readable script on the game's Main graph: open the node editor to tune a number or change the code.
See [Game rules on the Main graph](game-rules.md).

**1.24** adds **Race**, built into the app.

## The Alchemist's Escape

An escape room in three rooms. Open the drawer, find the key, unlock the chest, set the dials, pull the levers in the
right order and twist the crank to raise the gate, then place three gems to open the vault. If you are stuck for a
minute in a room a hint appears (or press **H**). The Levels page lets you practise each of the three stages; your best
time is saved on this device.

## Marble Maze

Tilt the board and roll the marble through five mazes to the gold ring. On the desktop use **WASD** / the arrow keys or
drag; in VR grip both handles and twist. Holes send you back to the start; three coins and a par time per maze give
1-3 stars. The last two mazes have gates that rise and sink.

## Mini Golf

Six holes — a ramp, a windmill, a bank shot, sand and a hump. On the desktop drag back from the ball and let go to
putt; in VR swing the putter. Par for every hole, a scorecard, and your best round saved. Any hole can be played on its
own from the Levels page.

## Race

Up to four players, four cars, three laps round a valley circuit: click a car, press **Start**, drive with **WASD**
(**R** puts you back on the road). A lap counts only when you have driven all of it. Laps, speed and grip are on the
**Race rules** node in the Main graph, and the road is a spline — move its points and the race follows. Your best race
and best lap are saved on this device. See [Race](race.md).

## Sky Run

A floating obstacle course in three stages: jumps, moving platforms (they carry you), vanishing tiles and spinning
arms. Flags save your spot, coins and par times earn stars, and the best time per stage is saved. In VR the comfort
vignette is on by default.

## Target Toss

A fairground booth: tin-can pyramids, swinging targets, pop-ups and a moving cart, five stages against the clock, with
combos and 1-3 stars. In VR grab a ball and throw it; on the desktop hold to charge and release to throw.

## Towers

Twelve levels of stacking: cubes, planks, wedges, barrels, arches and balls, a limited supply dealt onto racks, and a
goal for each level. Your grab reach is limited (about 1.3 m from your body), so the high levels need steps — build
them, then **jump** (desktop **Space**, VR **A**). Pieces dropped outside the build yard are lost. Later levels add
wind, a narrow pedestal, a rocking plate, an outline to fill and a star to deliver. Par pieces and par time give 1-3
stars a level; the unlocks and stars are saved on this device. Built into the app.

## Stars Room

A zero-gravity glass room full of glowing crystal stars and two planets. Knock them with your hands in VR, or walk into
them on the desktop ([the knock](physics.md#the-knock)); clap to make a new star. The start screen offers
**Start round** — light every star within two minutes, your best round saved on this device — or **Free play**, a
sandbox with every button on the **P** menu. Built into the app.

## Waves

A VR shooter: hold the crystal against five levels of waves — grunts, then runners, then tanks — pouring out of three
portals. Pick a gun on the **Loadout** page (**Blaster** semi-auto, **Scatter** seven pellets, **Beam** that overheats)
and an ability (**Shield**, **Slow-mo**, **Pulse**) that your free hand's grip fires (desktop: **Q**). On the desktop
the gun is your view and a click fires. In a headset a **Start** board stands ahead of you — aim at it and pull the
trigger. **Options** sets the music, sound effects, gun hand and vibration; choices and your best run are saved on this
device. Needs the **health** and **waves** modules (the card offers to install them).

## Untangle

A planar-graph puzzle: drag the dots until no edges cross. Press, move and release — or click a dot, then click where it
goes. The **Globe** mode puts the same puzzle on a sphere (right-drag, two fingers or the VR stick turn it — your view
only). 30 levels per mode unlock as you solve them; progress stays on this device, and every peer sees and solves the
same board. In VR, drag with the trigger and hold the globe in one hand while the other moves dots. Needs the
**untangle** module.

## Dungeon Realms

A co-op dungeon crawl: a seeded five-floor dungeon, gems to collect, portals that unseal when enough are found, and a
dragon's hoard at the top. Press **Play**, pick **Player 1** or **Player 2**, walk with **WASD**, collect gems, stand on
the portal together to climb. Two players get the identical dungeon from the same seed. Needs the **Dungeon Kit** and
**Dungeon Realms** modules.

## Jam Room

A small studio, all cabled: a piano into a speaker, a beat lab (transport, drum machine, sampler pads) and a pedal chain
into a mixer. Press **Start**, then ▶ on the Transport, and keep the band going for eight bars; your best tempo is
saved. Play with the mouse, or in VR from the cockpit. See [Music Playground](music.md). Needs the **music-lab** and
**music-fx** modules.

## VR Football

Swing a controller through the floating ball and put it through the other gate. First to 5 or three minutes, golden
goal on a tie. See [VR Football](football.md). Needs the **football** module.

## Make your own

Start with [Build a Game Loop](build-a-game.md) and the [game kit](game-kit.md). Games that come from a module offer to
install it when you open the card.
