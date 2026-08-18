# Impulse

Pushes or spins a physics body when an event fires — a jump, a kick, a cannon, a nudge.

**Inputs:** `trigger` (event) · `force` (vector3) · `target` (object)
**Output:** effect (wire into an [Object Selector](objectselector.md))

## How it works

On the **rising edge** of whatever is wired into `trigger` — [On Click](onclick.md), [Key Press](keypress.md), [On Impact](onimpact.md), [On Rest](onrest.md), a [Toggle](toggle.md) — the object gets one shove. Holding a trigger high does *not* keep pushing: it is one impulse per event.

The push is applied by the peer running the simulation and everybody sees the same result, because the trigger itself is replicated. There is no extra network traffic for this node.

!!! warning "It needs a running simulation"
    Every physics write is gated on physics actually running. Press <kbd>P</kbd> (or the ▶ button) first — with the simulation stopped the node tells you so instead of doing nothing quietly.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| mode | impulse | `impulse` shoves the body; `torque` spins it |
| space | world | `world` = the force is in world axes; `local` rotates it by the object's own rotation, so "forward" stays forward as the object turns |

The strength comes from the `force` input — wire a [Vector3](vector3.md). With nothing wired it uses (0, 5, 0), a modest hop.

## Choosing the object

Three ways, all equivalent:

- **Impulse → Object Selector** — the classic wiring: "this force is applied *to* that object".
- **Object Selector → `target`** — the selector as a value: "this force acts on *that* object". One selector can feed several nodes this way.
- **Nothing at all**, if the node lives in an object's own flow (double-click an object in the node editor's Graphs tree) — it targets that object.

## Practical example

**A jump key.**

1. Give a box a **Dynamic** body: select it, Inspector ▸ Physics ▸ Mode = *Dynamic*.
2. In the node editor: **Key Press** (`code` = `Space`) → **Impulse** `trigger`.
3. **Vector3** (0, 7, 0) → Impulse `force`.
4. **Impulse → Object Selector**, and pick the box.
5. Press <kbd>P</kbd> to start physics, then <kbd>Space</kbd>. Every peer sees the same hop.

**A spinning turntable.** Same graph with `mode` = *torque* and a Vector3 of (0, 4, 0) — each press adds spin about Y.

**A cannon that fires where it points.** Set `space` = *local* and a Vector3 of (0, 0, -12); rotate the barrel and the shot follows it.

## See also

- [Set Velocity](setvelocity.md) — replace a body's speed outright instead of adding to it
- [On Rest](onrest.md) — fire when the thing you pushed has settled again
- [Physics](../physics.md) — bodies, ground, gravity and the simulation controls
