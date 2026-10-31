# Flow Output

Declares a **public output socket** for an [object flow](https://docs.theprototype.app/object-flows.md) — the way an object publishes a value back to the Scene flow.

**Input:** any value type (the socket is gray = accepts anything)

Only meaningful **inside an object flow**.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| name | out | the socket label shown on the embedded [Object Flow](https://docs.theprototype.app/nodes/objectflow.md) node |
| fallback | 0 | published while nothing is wired in |

## Values, not effects

Animation and effect nodes (Spin, Pulse, Sound… — the **orange** sockets) cannot wire into a Flow Output: they *do* something, they don't *carry* a value. Publish the value that drives them instead — the [Time](https://docs.theprototype.app/nodes/time.md), [Math](https://docs.theprototype.app/nodes/math.md), [Slider](https://docs.theprototype.app/nodes/slider.md) or [Loop](https://docs.theprototype.app/nodes/loop.md) node feeding the effect.

## One frame of latency

Outputs are collected at the end of a tick and delivered to the Scene on the **next** one. That single frame is invisible in practice and is what makes flows safe to compose without infinite loops.

## Practical example

A pressure plate that reports its state:

1. In the plate's flow, wire an [On Enter](https://docs.theprototype.app/nodes/onenter.md) → [Counter](https://docs.theprototype.app/nodes/counter.md) chain into a **Flow Output** named *presses*.
2. Embed the plate in the Scene flow (right-click ▸ **Add flow to Scene graph**).
3. In the Scene, wire the card's *presses* socket into a [Compare](https://docs.theprototype.app/nodes/compare.md) node (`>= 3`) and on into a door's [Object Flow](https://docs.theprototype.app/nodes/objectflow.md) input — three presses, the door opens.
