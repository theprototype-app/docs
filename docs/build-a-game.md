# Example: build a game loop

A complete worked example — a start menu, a walking character, collectibles that count
into the HUD, a hold-to-peek map, a pause menu you can click, and a second level to
travel to. Everything is authored in the app with the HUD editor and flow nodes. No
code, no modules.

Allow about twenty minutes. Each step works on its own, so you can stop anywhere and
still have something playable, and every piece is visible to the people connected with
you as you build it.

!!! tip "What you'll need"
    A scene with some ground to walk on and a few objects to collect. A gamepad is
    optional — it works out of the box if you have one.

---

## 1. A menu on its own camera

A menu belongs to a viewpoint, so give it one.

1. **Add ▸ Camera**, and frame your scene from an angle that looks good as a title shot.
   Rename it `Menu cam` in the object list.
2. Open the HUD editor: in the bottom dock's tab strip, press **＋** and choose
   **HUD editor**.
3. In the topbar's document picker, choose **Menu cam**. This HUD now appears *only*
   while you are looking through that camera — attach a HUD to a camera and it travels
   with the shot.
4. From the left palette, click **Button**. Drag it where you want it. In the properties
   pane on the right, set its label to `Start`.
5. On the screen row, set **while** to `menu`. That binds the screen to the game state:
   it shows whenever the game is in its menu, including for someone who joins later and
   never saw it appear.

!!! info "The dashed outline"
    The artboard is a fixed reference size; the dashed rectangle shows the shape of
    *your* window on it. Anything outside that outline is outside the frame you are
    actually looking at.

---

## 2. Make Start do something

Select the Start button and open **Actions ▸ ＋ Add action** in the properties pane. Add
three:

| Action | Group | What it does |
| --- | --- | --- |
| **Start the game** | Game | Moves every player's game state to *playing* |
| **Look through a camera** | Camera | Pick your gameplay camera |
| **Show a HUD screen** | HUD | Pick your in-game screen (make one with *New screen…*) |

All three hang off a single press, and the Actions pane lists them back to you in plain
language. The artboard marks the button as wired, so a button that does nothing is
obvious at a glance.

Press **Play** and click Start: everyone connected moves to the gameplay camera and the
menu gives way to your in-game HUD.

---

## 3. A character that walks

By default play mode flies. To walk instead:

1. In the node editor, add **Character ▸ Character Controller**.
2. Set **mode** to `walk`. Adjust jump height and eye height to taste.

Now **WASD** walks, **Space** jumps, and gravity is real. If your scene has physics
running you get proper collision against walls and slopes; without it you walk along the
ground plane. A gamepad drives it too — left stick moves, right stick looks — and you can
tune deadzone, sensitivity and invert-Y under **Settings ▸ Input**.

Scrolling changes your speed, and because a controller node is present a **Move Speed**
node can read or set that same value — so a sprint key is just a key press wired into it.

!!! note
    Delete the Character Controller node and movement is exactly the default fly again.
    The controller adds capability without taking the default away.

---

## 4. Collectibles that count

1. Select the objects you want to collect, right-click and choose
   **Game ▸ Make collectible**.
2. Each object gets a small graph: clicking it hides it, remembers that it was
   collected, and adds `1` to a variable called `gems`.
3. On your in-game HUD screen, add a **Text** element, then **Actions ▸ Show a
   variable** and enter `gems`.

Press Play, walk up to one and click it with the crosshair. It disappears for
**everyone**, the counter goes up on every screen, and clicking the empty space where it
was does nothing — it stays collected.

A few dials, all optional:

- **Make collectible into…** asks which variable it counts into (existing names are
  offered as chips, or type a new one) and whether it **respawns** after a few seconds.
  The respawn is built into the graph — a Delay off the click resets the Latch and
  re-arms the Once — so you can see it and change it in the node editor.
- Run it on a **Group** and every mesh inside becomes a collectible sharing the group's
  variable, as one undo step. Add a new member later and run it again: the ones that are
  already collectible are skipped ("2 added, 3 skipped").
- Collectibles **reset when a new round starts** and when the game returns to its menu —
  that is the "reset each round" checkbox the recipe sets on its Latch and Once, derived
  from the shared round, so a Restart needs no extra wiring. And when you leave play
  mode, collected objects come straight back on your own screen ("only while playing"
  on the Visibility node), so the editor never loses an object to a running game.
- **Collect Count** is the node that answers "how many are left" — it reads the
  collectible chains in the graph, not the score, so it is right after a respawn and
  after a round reset. **Actions ▸ Show collectibles left** wires it to a Text for you.

---

## 5. Hold a key to peek at a map

1. Add a screen called `Map` with a **Minimap** element on it.
2. In the node editor, wire two key presses:
    - **Key Press** (`Tab`, edge `down`) → **HUD Screen** (`show`, Map)
    - **Key Press** (`Tab`, edge `up`) → **HUD Screen** (`hide`, Map)

Hold Tab in play mode and the map appears; let go and it's gone. The `edge` setting is
what makes this work — `down` fires when you press, `up` when you release, and `held`
gives you a value that stays on for as long as the key is down.

---

## 6. A pause menu you can actually click

Under pointer lock there is no mouse cursor, so a menu has to ask for one.

1. Add a screen called `Pause` with a **Resume** button, a volume **Slider** and a
   difficulty **Dropdown**.
2. On the screen row, set **input** to `menu`.
3. Wire **Key Press** (`KeyP`, edge `down`) → **HUD Screen** (`toggle`, Pause).

Press P in play mode: the pointer is released, your character stops moving, and you can
click and drag the controls. The world keeps running behind you — in a shared session
your menu is yours alone. Give Resume the **Hide a HUD screen** action and the pointer
locks again where you left off.

Want the world to stop for everybody? Add the **Pause** action to a button. That freezes
physics, animations and the round timer for the whole session, and Resume continues with
no jump.

!!! info "Keyboard and gamepad"
    Any menu is navigable without a mouse: arrows or D-pad move the highlight, Enter or
    **A** activates, and a highlighted slider or dropdown takes left/right. **Esc** always
    leaves play mode entirely — it is the guaranteed way out.

---

## 7. Ending, and going round again

Add **End the game** to a button (or drive it from your own logic) to finish with an
outcome, and **Back to the menu** to return. Because the menu screen is bound to
`while: menu` it comes back by itself — and a **Game Start** node naming your gameplay
camera puts a late arrival on the right view even though they never saw the transition.

That's the loop: menu → play → score → pause → end → menu.

---

## 8. A second level

One scene is one level; a game can have many.

1. Build your first level, then in the **Explorer** right-click the file grid and
   choose **Save scene as level…**. It lands in a `Levels` folder as an ordinary
   `.tpscene` file. **New scene…** gives you an empty one to build the next level in.
2. Where the first level should end — a door, a portal, a Finish button — add a
   **Travel** node (Game group) and pick the destination level on its card. Wire any
   trigger into it, or use **Actions ▸ Level complete — travel to a level** on a button.
3. Press it and **everyone travels together**: each player loads the level themselves,
   and anyone missing the file pulls it from whoever has it first. The game — state,
   round, score variables — **carries across the hop**; the new level's own collectibles
   start fresh, because their little graphs live in the level file.

Two helpers that come with it:

- **All Players** (Game group) is the group-travel gate: wire in a condition each player
  answers for themselves ("I am standing at the portal") and it fires once **every**
  player in play mode says yes — spectators in the editor don't count. Feed it into the
  Travel node and nobody gets left behind.
- The **Debug** HUD element (Display group) is a little pill for building: game state,
  round, elapsed time, your variables, collectibles left, who is playing and fps. Click
  it in-game to expand. Take it off the screen when you ship.

---

## Where to go next

- **[Node System](node-system.md)** — the logic nodes this example leans on: Latch,
  Delay, Sequence, Counter and the Game group.
- **[Physics & Simulation](physics.md)** — grabbing, throwing and colliders for the
  objects you just made collectible.
- **[Saving & Sessions](saving.md)** — save the whole thing as a `.tpscene` and share it.
- **[Module SDK](module-sdk.md)** — when a game outgrows nodes, a module can register its
  own HUD elements and nodes.
