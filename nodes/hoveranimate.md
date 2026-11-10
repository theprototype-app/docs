# Hover Animate

Swings, wobbles or pops its object when its trigger pulses — wire an [On Hover](https://docs.theprototype.app/nodes/onhover.md) in. A bell that rings out
when you point at it, a sign that wobbles, a button that pops. Every player sees the same motion: each peer works it out
from the same shared pulses.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](https://docs.theprototype.app/nodes/objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | an On Hover (or any event: On Click, On Hit) |

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| style | swing | **swing** (rocks about an axis, like a bell), **wobble** (a quick shiver) or **pop** (grows and settles) |
| mode | energy | how repeats behave — see below |
| amount | 20 | degrees for swing and wobble, % for pop (0 – 90) |
| axis | z | the axis it swings about: z, x or y |
| swings per second | 1.2 | 0.2 – 6 |
| damping | 1.2 | how fast it dies away (0 = forever) |
| in-out seconds | 0.25 | for *inout*: how long it takes to reach the hovered pose and to come back |
| sound | none | **start** = a sound when it starts, **extremes** = at the end of each swing |
| soundName | ring | one of the built-in [game sounds](https://docs.theprototype.app/nodes/gamesound.md) |

| Mode | What a new pulse does |
|---|---|
| energy | adds a swing on top of what is moving — hover again and a bell swings higher |
| once | plays once; pulses while it moves are ignored |
| restart | starts again from rest |
| while | moves for as long as the trigger stays high (On Hover *over*) |
| stop | stops dead when the trigger ends |
| inout | holds a hovered pose while the trigger is high and goes back when it ends |

## Practical example

See [On Hover](https://docs.theprototype.app/nodes/onhover.md), or let the [Bell recipe](https://docs.theprototype.app/recipe-bell.md) wire it for you.
