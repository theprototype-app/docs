# On Hit

Fires a pulse when a hand or a player **knocks** the connected object — the trigger half of
[the knock](../physics.md#the-knock).

**Outputs:** event (wire into a [Particles](particle.md) trigger, a [Counter](counter.md),
or an [Object Selector](objectselector.md)), plus two named value outputs — `speed` *(number)*
and `by me` *(boolean)*.

## How it works

While a simulation runs and the scene's **Knock** block is on, an open VR hand or the desktop
camera hitting a dynamic body sends one `hit` message. Every peer pulses this node from that
message's own timestamp, so the pulse happens at the same moment on every screen.

The card shows *hit!* while it is pulsing and *idle* the rest of the time, with the last
accepted hit's `speed` and `by me` beside it. Those two hold their value until the next hit —
a burst scaled by `speed` reads the speed of the hit that fired it.

The scene needs the knock switched on: **Configure Scene ▸ Physics ▸ Knock**. Without it
nothing knocks anything and this node never fires. See [the knock](../physics.md#the-knock).

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| min m/s (`minSpeed`) | 0 | ignore hits slower than this, so a brush past an object does not count |
| who | anyone | *anyone* fires for every hit, *me* only for hits your own hand made, *others* only for everybody else's |

**who** is read separately on each peer, against whoever sent the hit. So *me* pulses on one
screen only — the hitter's — which is what makes a per-player count work: wire it into a
**Set Variable** with **scope** *player*, and each person counts their own touches with no
second writer.

## Targeting

Like [On Click](onclick.md), the node acts on the object it *reaches* in the graph: wire it
into an [Object Selector](objectselector.md), or drop it unwired inside an object's own flow
to target that object.

## Practical example

Sparks in proportion to the hit:

1. Give the object a **Dynamic** body (Inspector ▸ Physics) and switch **Configure Scene ▸
   Physics ▸ Knock** on.
2. In its flow: **On Hit → Particles** (`trigger` input, emission *burst*), and **On Hit**'s
   `speed` output → a [Map Range](maprange.md) → the emitter's count, so a hard hit throws
   more sparks than a nudge.
3. Press <kbd>P</kbd>, enter play mode, and walk into it — or put a hand through it in VR.

Score only your own touches: **On Hit** with *who* set to **me** → [Counter](counter.md).

## See also

- [On Impact](onimpact.md) — the object hitting *something else*, rather than being hit by a person
- [Physics & Simulation](../physics.md#the-knock) — the scene block that arms all of this
- [Module SDK](../module-sdk.md#the-knock) — `api.onHit` and `api.hitLog`, the same feed for a module
