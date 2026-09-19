# VR Football

Two floating gates at the ends of a small pitch, one ball between them, red against blue,
played with your hands. You hit the ball with [the knock](physics.md#the-knock): it leaves at
the speed you hit it, bounces off the invisible walls and slows a little. A ball through a
gate is a goal for the team of whoever touched it last.

Football is a **module**, not a built-in: everyone playing needs it — a peer without it sees
the pitch and the ball, because those are ordinary scene objects, but none of the rules. There
are two ways in:

- **Templates ▸ Games ▸ Football** — a ready-made pitch with the physics already set (gravity
  0, ground off, Knock on). Loading it offers to install the module if you do not have it.
- **Menu ▸ Modules ▸ Browse ▸ Football**, then the toolbox's **Build pitch** (below) — lays a
  pitch out in the scene you already have.

The Games tab lists Football beside Towers and the Stars Room. A game there is a scene *plus* a
module, so its card names what it needs — *Each player needs this module; loading will offer to
install it*, and *Installed — every player needs their own copy* once you have it. The row is
generated from the module's own definition rather than written out separately, so the scene and
the module cannot drift apart between releases.

!!! note "Zero gravity, and the knock"
    The pitch is a zero-g scene: **Configure Scene ▸ Physics** with gravity 0, **Ground**
    off and **Knock** on, and the simulation started when play opens. The **Build pitch**
    button below sets that for you where it can; if it cannot, a toast says to set those
    three by hand.

## Getting a pitch

The quickest pitch is the **Football** template in **Templates ▸ Games** — a whole scene, with
the pitch, the gates, the ball, the pads and the graph that wires them together already in it.

To build one into a scene of your own instead: with the module installed, its own window is
listed under **Modules** in the menu and under
**Module tools** in the viewport's right-click menu, as **Football**. Open it from either. The
bottom half builds the ground:

| Button | What it does |
|---|---|
| **Build pitch** | Creates the whole pitch in the current scene: the floor, four see-through walls and a ceiling, two gates with their posts and lamps, a **Football** ball, two join pads, a **Start match** pad and a **New match** pad — plus the node graph that wires them together. Everything is replicated, so one person builds and everybody has it. |
| **Fit pitch** | Re-lays the pitch you built to the **Length / Width / Gate height** boxes above, in metres. |
| **Fit to room** | Sizes it from your headset's own room bounds, where the headset reports them; otherwise it says so and leaves you the boxes. |
| **Centre on room** | Moves it onto the shared room anchor — for a [colocated](colocation.md) pair standing in the same physical room. |

The defaults are a living room: 5 m long, 3 m wide, gates centred at chest height.

## Playing

1. Touch (or click) a **Join red** / **Join blue** pad — or press the toolbox's **Join red**,
   **Join blue** or **Spectate**.
2. Press the **Start match** pad, or **Start** in the toolbox.
3. Hit the ball. The gate lamps fill up as a team scores, so the score reads from across the
   room without a screen.

The ball is served automatically a couple of seconds after each goal; set **Serve** to
*button* if you would rather serve deliberately, then use the **Serve** button or a
[Serve node](#the-football-nodes).

Desktop players join the same match: the camera you walk with is your probe, so you shoulder
the ball rather than heading it, and grab-and-throw works as it does anywhere else.

## The rules

They live in the toolbox — **and** on the **Match Rules** node, which wins while it is in the
graph, so a pitch you author keeps its own rules:

| Row | Options | Default |
|---|---|---|
| **Mode** | `duel`, `teams`, `freeforall`, `practice` | `teams` |
| **Win by** | `goals`, `time`, `either` | `goals` |
| **Goals to win** | 1 – 20 | 5 |
| **Match seconds** | 30 – 1800 | 180 |
| **Serve** | `auto`, `button` | `auto` |
| **Own goals** | `count`, `ignore` | `count` |

An own goal — your own last touch, into your own gate — lands on the right sheet rather than
being handed to the other side as a goal of theirs.

## What is recorded

- **Per player, for the session** — `goals`, `touches` and `owngoals`, each written by the one
  peer they belong to. A new match does not clear them: a session record is a session record.
  A player's row goes when they disconnect.
- **The match log** — at the end of a match the winner, both scores and the scorers are
  appended to the game's own variables (the last 50 matches). That travels inside a saved
  [`.tpscene`](saving.md), so reopening a scene shows the matches played in it.

## The Football nodes

Every rule is a node in the **Football** group, so a scene can be re-authored without touching
the module's code. A node that is alive in the graph owns its rule on every peer; delete it and
the defaults come back within a second.

| Node | Wire it to | What it does |
|---|---|---|
| **Match Rules** | the pitch | Owns the table above, and names the ball through its `ball` input (wire an [Object Selector](nodes/objectselector.md)). |
| **Team Gate** | a gate's sensor box | A ball entering *this* gate scores for the **other** team. |
| **Match Button** | a pad or button object | `action`: join red / join blue / spectate / start / new match / swap sides / serve. Clicking the object — desktop or VR trigger — runs it for the clicker. |
| **Serve** | any static object | Serves the ball when its `trigger` pulses. |
| **Score Lamp** | one lamp | Lit while that team's score reaches its `index` — the lamps that make a gate readable. |
| **Records** | any static object | Feeds the HUD: the per-player sheet, the score and clock line, and the saved match log. |
| **Football Value** | — | A number out: `red`, `blue`, `goals`, `myteam`, `lastteam`, `started`, `left`, `players`, `serves`, `mygoals`, `matches`. |
| **Football Event** | — | A pulse out: `goal`, `redgoal`, `bluegoal`, `serve`, `start`, `over`, `reset`, `touch`. Wire `start` and `over` into **Set Game State** so a HUD follows the match. |

!!! warning "Never target the ball"
    No Football node may be wired at the ball through an Object Selector: a targeted object
    has its pose re-seated every frame, which fights the physics body. Match Rules targets the
    pitch and *names* the ball on its `ball` input instead.

## In a shared room

Two people in the same physical room can play it [colocated](colocation.md) — calibrate as
usual, then **Centre on room** puts the pitch on the shared anchor so you are both standing on
the same 5 × 3 metres.

Last touch is worked out on every peer from the same knock feed, so nobody has to be the
referee; goals, serves and the end of a match are decided by the peer running the simulation
and broadcast. A late joiner is handed the whole match state, mid-match included.
