# Spawn

Makes copies of an object while the simulation runs — crates off a conveyor, targets, debris, ammo, waves of anything.

**Inputs:** `trigger` (event) · `at` (vector3) · `source` (object — the template)
**Output:** effect (or wire the template into `source`)

## How it works

On the **rising edge** of whatever is wired into `trigger` — [Key Press](keypress.md), [On Click](onclick.md), [Timer](timer.md), [On Enter](onenter.md) — the node copies its **template** object and drops the copy into the scene with a live physics body. The copy inherits the template's physics, material and geometry, so a dynamic template gives you something that falls.

Copies are **transient**. They live for the run and nothing else: they are never written into a saved scene, they leave nothing on the undo stack however many times you fire, and they all disappear when the simulation stops. That is the whole design — a run's debris is not scene content.

The peer running the simulation makes the copy and everybody else receives it through the ordinary object sync, so two peers never disagree about what exists. Nothing extra goes on the wire for this node.

!!! warning "It needs a running simulation"
    A copy made with physics stopped would be inert, which is exactly the problem this node exists to remove — so with nothing simulating it refuses and says so instead of quietly doing nothing. Press <kbd>P</kbd> (or the ▶ button) **in the editor** first. You cannot start a simulation from inside Play mode; if you want both, turn on *simulate on play* in the scene's physics settings.

!!! tip "Give the template a body"
    If the template has no physics, the copies just hang in the air where they appear. Select it, then Inspector ▸ Physics ▸ Mode = *Dynamic*. The node warns you once when it notices.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| copies per fire | 1 | how many appear per event (hard limit 20) |
| max alive | 32 | how many this spawner keeps alive; when it is full, the **oldest** copy disappears as each new one arrives |
| min seconds between | 0 | a floor between fires. A trigger edge is not a rate limit on its own — a *held* key re-fires several times a second |
| spread | 0.5 | metres of random scatter, so a batch does not stack in one column |

There is also a **ceiling of 200 live copies across every spawner in the scene**, whatever the individual numbers say. An unbounded spawner in a shared session is both a memory problem and a griefing vector, so the limits are enforced when the copies are made and not merely suggested on the card.

## Where the copies appear

The `at` input (and the x/y/z on the card) is an **offset from the template**, not a world position — so a node with nothing wired drops copies just above an object you can already see. Wire a [Vector3](vector3.md) into `at` to aim it, or a [Math](math.md) chain if you want the point to move.

## Choosing the template

The same three ways as every other action node:

- **Object Selector → `source`** — "copy *that* object". The usual choice.
- **Nothing at all**, if the Spawn node lives in an object's own flow (double-click the object in the node editor's Graphs tree) — it copies that object.
- Keep the template somewhere visible in the scene. It stays editable, and a scene file that ships a spawner is self-documenting because you can see what it makes.

## Practical example

**A crate dispenser on a key.**

1. `/create box`, then Inspector ▸ Physics ▸ Mode = *Dynamic*. This is the template — move it somewhere visible and off the floor.
2. In the node editor add **Scene ▸ Spawn**.
3. Add **Triggers ▸ Key Press** (`code` = `KeyG`) → Spawn `trigger`.
4. Add an **Object Selector** naming the box → Spawn `source`.
5. Press <kbd>P</kbd> to start physics, then <kbd>G</kbd>: a copy appears 3 m above the template and falls.

**A burst.** Set *copies per fire* to 5 — five at once, scattered by *spread*.

**A capped fountain.** Set *max alive* to 8 and hold <kbd>G</kbd>: the count climbs to 8 and stays there, the oldest copy vanishing as each new one lands. That is the recycling, and it is what makes a spawner safe to leave running.

**A conveyor.** Drive `trigger` from a [Timer](timer.md) and set *min seconds between* to 2 for one crate every couple of seconds.

## Things worth knowing

- **Nothing spawns until the next real press** after you wire up a fresh Spawn node to a trigger that has already fired. That is deliberate: without it, a node arriving on a peer would adopt the last stamp it sees and spawn on connect.
- **Stopping the simulation removes every copy at once**, and <kbd>Ctrl</kbd>+<kbd>Z</kbd> will not bring them back — there is nothing to undo, by design.
- **Saving mid-run saves the template only.** Reload a scene you saved with forty crates in the air and you get the one box back.
- A copy does not carry the template's animation clips, object flow or shader graph. Each of those replicates a whole document per object, and volume is a spawner's whole point.

## See also

- [Impulse](impulse.md) — shove a copy the moment it appears
- [On Rest](onrest.md) — fire when a spawned body has settled
- [Counter](counter.md) — count what you have made
- [Physics](../physics.md) — bodies, ground, gravity and the simulation controls
