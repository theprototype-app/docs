# On Rest

Fires a pulse when a physics body has finished moving — the counterpart to [On Impact](onimpact.md), which fires when it *starts*.

**Output:** event (wire into a [Counter](counter.md), [Play Animation](playanim.md), [Impulse](impulse.md), or an [Object Selector](objectselector.md))

## How it works

While a simulation runs, the peer stepping the physics watches each dynamic body. When one has been still — under 0.05 m/s and 0.1 rad/s — for `seconds`, this node pulses **once** for everybody, on the same replicated stamp [On Click](onclick.md) uses. It re-arms as soon as the body moves again, so a crate that is knocked over fires again when it settles.

It deliberately does *not* use the physics engine's own "sleeping" flag: bodies never sleep in this app (a moving platform must be able to wake whatever is resting on it), so sleep would never fire.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| seconds | 0.5 | how long the body must stay still before it counts as settled |
| pulse | 0.3 | how long the output stays high |

## Practical example

**Score a landing.** Count how many crates have come to rest on a pad:

1. **On Rest** (unwired, inside the crate's own flow) → **Counter**.
2. The counter's value is a number you can wire into a [HUD](../node-system.md) readout, a [Compare](compare.md) for a win condition, or a [Play Animation](playanim.md).

**A domino chain.** On Rest → [Impulse](impulse.md) on the *next* object: each piece settles, then nudges its neighbour.

**Cleanup.** On Rest → [Set Velocity](setvelocity.md) with everything zeroed, to make sure a settled stack is really asleep before you score it.

## See also

- [On Impact](onimpact.md) — the moment of contact, not the moment of stillness
- [Velocity](velocity.md) — the live speed, if you want a threshold of your own
