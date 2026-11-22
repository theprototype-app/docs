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

## Where it shows

It moves the **Play camera** only, on each player's own screen. It never shakes the view in VR, and never the editor
camera. Nothing is saved or changed in the scene.

With **Settings ▸ Accessibility ▸ Movement ▸ Motion** set to *Reduce*, the shake is a quarter as strong. See
[Motion](https://docs.theprototype.app/accessibility.md#motion).

!!! note "who: me and Delay"
    *me* follows the press or the hit itself. A pulse that has gone through a [Delay](https://docs.theprototype.app/nodes/delay.md) no longer knows whose
    it was, so use *everyone* there.

## Practical example

An [On Hit](https://docs.theprototype.app/nodes/onhit.md) on a crate into **Camera Shake** (strength 0.3, seconds 0.4, who *me*): the player who knocks the
crate feels it, the others do not.

## See also

- [Screen Flash](https://docs.theprototype.app/nodes/screenflash.md) · [Hit Pause](https://docs.theprototype.app/nodes/hitpause.md) — the other two game feel nodes
- [Shake](https://docs.theprototype.app/nodes/shake.md) — shakes an object, not the camera
