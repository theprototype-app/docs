# On Play stop

Fires once when Play ends — by default when the **last** player leaves Play (every peer pulses), or with *who: me* when
**you** leave.

*Since 1.64.*

**Output:** event

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| who | session | **session** = when the last player leaves Play (every peer pulses); **me** = when you leave Play (your device only) |
| pulse | 0.3 | how long the pulse stays high (seconds) |

## Practical example

Wire **On Play stop** into the kit's **Reset pickups** and **Reset score** ([Game kit](https://docs.theprototype.app/game-kit.md)): when everyone is
back in the editor the gems are back and the score is zero, ready for the next go. Its partner is
[On Play start](https://docs.theprototype.app/nodes/onplaystart.md).
