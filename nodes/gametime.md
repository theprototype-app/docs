# Game Time

The round clock: seconds since the round started, the same on every player's screen. It stops
while the game is paused. It can also read the time left, the round number, or whether the game
is playing.

**Output:** number (shown live on the card)

## Parameters

| Parameter | Default | Options |
|---|---|---|
| read | elapsed | `elapsed` (seconds into the round), `remaining` (length − elapsed, never below 0), `round` (how many rounds have started), `playing` (1 while the state is `playing`, else 0) |
| length | 60 | 1–3600 s — the round length `remaining` counts down from |

Set **length** with the slider on the card; `remaining` is the only reading that uses it.

## How the clock works

Game Time has no clock of its own. It is worked out from the moment the round started, which is
part of the shared game state, so two players mid-round read the same time, and a player who
joins later reads the right time as soon as they arrive.

- A new round (`playing` entered from `menu` or `over`, see [Set Game State](https://docs.theprototype.app/nodes/setgamestate.md))
  starts it from 0 and adds 1 to `round`.
- `paused` freezes it, and resuming carries on with no jump: paused time never counts.
- `over` and `menu` do **not** stop it — `elapsed` keeps rising until the next round starts.
  A **full reset** on Set Game State zeroes it; the round count is kept.
- Before any round has started it reads 0.

## Practical example

A bridge that appears 30 seconds into the round:

1. Add a **Game Time** (read `elapsed`).
2. Add a **Compare** (op `gte`, b = 30); wire Game Time → its **a**.
3. Add a **Visibility** node; wire Compare → its **on**.
4. Add an **Object Selector** picking the `Bridge`; wire Visibility → Object Selector. Start the
   game: the bridge shows up for everyone at the same moment, and is hidden again when the next
   round starts.

![Game Time (elapsed) into a Compare (at least 30), driving a Visibility node on the Bridge's Object Selector](https://docs.theprototype.app/img/nodes-gametime/gametime.webp)
*Figure: Game Time (elapsed) into a Compare (at least 30).*
!!! tip
    **Actions ▸ Show the round time** in the HUD editor wires a Game Time (`remaining`, 60 s)
    into a HUD Text for you. For a time limit that actually ends the round, use **Kit: Round**
    from the [game kit](https://docs.theprototype.app/game-kit.md).
