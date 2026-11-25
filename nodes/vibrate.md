# Vibrate

Vibrates the player's **gamepad**, **Android phone** or **VR controllers** when a pulse arrives: a hit, a landing, a
pickup. *Since 1.79.*

**Output:** none (an action)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse vibrates once |
| strength | number | 0 to 1; wired, it sizes the vibration (a harder hit, a bigger buzz) |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| pattern | `bump` | `tap` `bump` `hit` `success` `fail` `rumble` `heartbeat`, or `custom` |
| strength | 1 | 0 to 1 |
| length ms (custom) | 120 | 10 to 1000 — how long a `custom` pulse lasts |
| hand | `both` | `both`, `left`, `right` |
| who | me | `me` = only the player whose press or hit made the pulse; `everyone` = every player |

The patterns are the ones [Controller Buzz](https://docs.theprototype.app/nodes/hapticpulse.md) plays. `custom` is one pulse of your own strength and
length. **hand** picks one side: a controller in VR, or that side's motor on a gamepad (left = the strong motor, right
= the weak one).

## Where it vibrates

It plays on the device of the player it is aimed at, through whatever that device has:

| Device | What vibrates |
|---|---|
| A gamepad in Chrome, Edge or Firefox | its two motors (dual rumble) |
| An Xbox pad in Chrome or Edge | the trigger motors too, on firm pulses |
| An Android phone in Chrome | the phone's motor (it has no strength, so a weaker pulse is a shorter one) |
| A VR headset | the controllers, as before |
| An iPhone or iPad | nothing: their browsers cannot vibrate |

It vibrates only in **Interact** and **Play**, never while you edit, and stops when the game pauses, the tab is hidden,
you leave the scene or the game ends. Nothing is sent over the network and nothing is saved in the scene.

**Players choose.** The game's settings have **Vibration** (on / off) and **Vibration strength** (0 to 100 %). Vibration
starts off when the device asks for reduced motion and the player never set it. See
[Make it feel like a real game](https://docs.theprototype.app/make-it-feel-like-a-real-game.md#vibration).

!!! note "who: me and Delay"
    *me* follows the press or the hit itself. A pulse that has gone through a [Delay](https://docs.theprototype.app/nodes/delay.md) no longer knows whose
    it was, so use *everyone* there.

## Practical example

An [On Hit](https://docs.theprototype.app/nodes/onhit.md) on a crate into **Vibrate** (pattern `hit`, who *me*): the player who knocks the crate feels it in
their pad or phone, the others do not.

**Camera Shake**, **Screen Flash** and **Hit Pause** already vibrate a little by themselves (their *vibrate* switch, on
by default), so add **Vibrate** for the moments those do not cover, or for a stronger or longer buzz.

## Older versions

A player on a version before 1.79 keeps the node in the scene but it does nothing for them.

## See also

- [Controller Buzz](https://docs.theprototype.app/nodes/hapticpulse.md) — the named patterns on the VR controllers
- [Camera Shake](https://docs.theprototype.app/nodes/camerashake.md) · [Screen Flash](https://docs.theprototype.app/nodes/screenflash.md) · [Hit Pause](https://docs.theprototype.app/nodes/hitpause.md) — the game feel nodes
- [Module SDK](https://docs.theprototype.app/module-sdk.md#vibration): `api.feel.vibrate` from code
