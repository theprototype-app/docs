# Hit Pause

Holds the picture still for a split second when something hits hard, so the hit lands. *Since 1.74.*

**Output:** none (an action)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse holds the picture once |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| ms | 80 | 20 to 500 — how long the picture holds, in milliseconds |
| who | me | `me` = only the player whose press or hit made the pulse; `everyone` = every player |
| vibrate | on | *since 1.79*: also gives a short [vibration](https://docs.theprototype.app/nodes/vibrate.md) on a gamepad or an Android phone (and the VR controllers), for the same players; switch it off for no buzz |

Only the picture holds, on each player's own screen. The game, the clock and physics keep running, so nothing gets out
of step with the other players. It never holds the picture in a VR headset.

!!! note "who: me and Delay"
    *me* follows the press or the hit itself. A pulse that has gone through a [Delay](https://docs.theprototype.app/nodes/delay.md) no longer knows whose
    it was, so use *everyone* there.

## Practical example

An [On Impact](https://docs.theprototype.app/nodes/onimpact.md) on a ball (a high **minStrength**, so only hard hits count) into **Hit Pause** (ms 60, who
*everyone*): every player sees the hit stop for a beat. Use *everyone* here: an impact is found by the device that runs
the physics, not made by a player's press.

## See also

- [Camera Shake](https://docs.theprototype.app/nodes/camerashake.md) · [Screen Flash](https://docs.theprototype.app/nodes/screenflash.md) — the other two game feel nodes
