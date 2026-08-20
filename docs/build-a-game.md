# Build a game loop

This walkthrough exercises every piece of the game shell end to end: a menu with a
camera, a Start button with real actions, a walking character, collectible objects that
count into the HUD, a hold-to-peek map, an in-game pause menu you click with the mouse,
and a clean return to the menu. It doubles as the acceptance script for the 21-E
hardening round — if a step doesn't behave as written, that's a bug report waiting.

Everything here is authored with **nodes and the HUD editor**. No modules, no code.

## 1. The menu, on its own camera

1. Add a camera: **Add ▸ Camera**, frame it at your scene from a nice angle. Rename it
   `Menu cam`.
2. Open the **HUD editor** (the dock's **＋** ▸ *HUD editor*). In the doc picker choose
   **Menu cam** — this HUD now shows *only while looking through that camera*.
3. In the left palette, click **Button**. It lands in the middle of the artboard —
   drag it where you want; the dashed outline shows your real window's shape on the
   reference stage. Name it `Start` in the properties pane.
4. On the screen row, set **while** to `menu` — the screen follows the game state with
   no wiring, including for someone who joins later.

## 2. Start does three things

Select the Start button, open **Actions ▸ ＋ Add action**, and add:

- **Start the game** (Game) — flips every peer's state to `playing`.
- **Look through a camera** (Camera) — pick your play camera. Each peer moves its *own*
  view; nothing forces anyone.
- **Show a HUD screen** (HUD) — pick your in-game screen (create one from the picker's
  *New screen…* if you haven't).

All three share one press node — the Actions pane lists them in words, and the artboard
badges the button as wired.

## 3. A character that walks

1. In the node editor (scene graph), add **Character ▸ Character Controller**. Set
   `mode: walk`, jump height to taste.
2. Press **Play**: WASD walks, **Space** jumps, gravity is real (a running physics sim
   gives you true walls and slopes; without one you walk on the ground plane). A gamepad
   works out of the box — left stick moves, right stick looks, adjustable under
   **Settings ▸ Input**.
3. Scroll adjusts speed — and because a controller is declared, a **Move Speed** node
   can now read or set it from the graph.

Delete the controller node and movement is *exactly* the built-in fly again — that
parity is asserted by the test suite, not just promised.

## 4. Collectibles that count

1. Select a few objects, right-click ▸ **Game ▸ Make collectible**.
2. That builds, per object: click → latch (collected once, stays collected) →
   visibility off, plus *add 1 to the variable `gems`* — one undo entry each.
3. On the in-game HUD screen, add a **Text** element, then **Actions ▸ Show a
   variable**, name `gems`.
4. Play, walk up, click a gem (the reticle tap): it vanishes for **everyone**, the
   counter climbs on every screen, and clicking where it was does nothing — the latch
   holds.

## 5. Hold a key for the map

1. Add a `Map` screen with a **Minimap** element (it plots the scene top-down; dungeon
   markers appear automatically).
2. In the node editor: **Key Press** (`Tab`, edge `down`) → **HUD Screen** (`show`,
   Map), and **Key Press** (`Tab`, edge `up`) → **HUD Screen** (`hide`, Map).
3. Play: hold Tab, the map is up; release, it's gone. `edge` is the whole trick — `up`
   is the falling edge that didn't exist before.

## 6. The pause menu — pointer freed, game running

1. Add a `Pause` screen: a **Resume** button, a volume **Slider**, a difficulty
   **Dropdown**. On the screen row set **input: menu**.
2. Wire **Key Press** (`KeyP`, edge `down`) → **HUD Screen** (`toggle`, Pause).
3. Play, press P: the pointer is **freed** — the character stops, the mouse clicks the
   menu, sliders drag. The game keeps running behind you (that's multiplayer-correct:
   your menu is yours alone).
4. Resume = a button with **Hide a HUD screen** (Pause). The pointer re-locks and the
   held W from before does *not* lurch you forward.
5. Want a real pause? Add **Pause** (Game) to a button — `paused` now actually freezes
   physics, animations and the round clock for **everyone**, and Resume continues with
   no jump. Esc always exits play entirely — that's the guaranteed way out.

Keyboard/gamepad players navigate any menu with arrows / D-pad and Enter / A — sliders
and dropdowns take Left/Right when focused.

## 7. Ending, and the loop closing

1. A **Game Over** action on any button (or an `ongamestate` chain) sets `over` with an
   outcome; **Back to the menu** returns to `menu`.
2. The menu screen (step 1, `while: menu`) comes back by itself — and the **Game
   Start** node's camera puts a late joiner on the right view even though they saw no
   transition.

## What to feel for (the human half)

The test suite proves the mechanics; these need eyes and hands: the drag-drop and
right-drag feel on the artboard and in the viewport, re-lock behavior in Chromium *and*
Firefox after closing a menu, a real gamepad (deadzone, look speed), the pack elements
and style presets in non-dark themes, and jump-vs-menu precedence under a real pointer
lock.
