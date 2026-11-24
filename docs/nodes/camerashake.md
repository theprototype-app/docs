# Camera Shake

Shakes the Play camera for a moment: a hit, a landing, an explosion. *Since 1.74.*

**Output:** none (an action)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse shakes once |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| strength | 0.15 | 0 to 1 — how far the view moves |
| seconds | 0.35 | 0.05 to 3 — how long it lasts |
| frequency | 18 | 2 to 40 — how fast it shakes |
| who | me | `me` = only the player whose press or hit made the pulse; `everyone` = every player |
| vibrate | on | *since 1.79*: also gives a short [vibration](vibrate.md) on a gamepad or an Android phone (and the VR controllers), for the same players; switch it off for no buzz |

## Where it shows

It moves the **Play camera** only, on each player's own screen. It never shakes the view in VR, and never the editor
camera. Nothing is saved or changed in the scene.

With **Settings ▸ Accessibility ▸ Movement ▸ Motion** set to *Reduce*, the shake is a quarter as strong. See
[Motion](../accessibility.md#motion).

!!! note "who: me and Delay"
    *me* follows the press or the hit itself. A pulse that has gone through a [Delay](delay.md) no longer knows whose
    it was, so use *everyone* there.

## Practical example

An [On Hit](onhit.md) on a crate into **Camera Shake** (strength 0.3, seconds 0.4, who *me*): the player who knocks the
crate feels it, the others do not.

## See also

- [Screen Flash](screenflash.md) · [Hit Pause](hitpause.md) — the other two game feel nodes
- [Shake](shake.md) — shakes an object, not the camera
