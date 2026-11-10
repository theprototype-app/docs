# On Play start

Fires once when Play begins — by default when the **first** player presses Play (every peer pulses), or with *who: me*
when **you** press Play. The place to reset the score, spawn the gems and arm timers.

*Since 1.64.* Before 1.64 people reached for *Game Start* here; that node is now called
[Start camera](https://docs.theprototype.app/nodes/gamestart.md), because it is a camera setting and never pulses.

**Output:** event

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| who | session | **session** = when the first player presses Play (every peer pulses); **me** = when you press Play (your device only) |
| pulse | 0.3 | how long the pulse stays high (seconds) |

## Practical example

Wire **On Play start** into a [Spawn](https://docs.theprototype.app/nodes/spawn.md) node's trigger and into a [Set Variable](https://docs.theprototype.app/nodes/setvariable.md) that zeroes the
score: every session of play begins from the same clean slate. Its partner is [On Play stop](https://docs.theprototype.app/nodes/onplaystop.md).
