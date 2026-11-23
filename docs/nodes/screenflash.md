# Screen Flash

Flashes a colour over the screen that fades out: red when you are hit, gold for a pickup. *Since 1.74.*

**Output:** none (an action)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse flashes once |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| color | `#ffffff` | the colour of the flash |
| strength | 0.6 | 0 to 1 — how strong it starts |
| seconds | 0.25 | 0.05 to 3 — how long it takes to fade out |
| who | me | `me` = only the player whose press or hit made the pulse; `everyone` = every player |

The flash is drawn on each player's own screen and never blocks clicks. Nothing is saved or changed in the scene.

With **Settings ▸ Accessibility ▸ Movement ▸ Motion** set to *Reduce*, the flash is a third as strong. See
[Motion](../accessibility.md#motion).

!!! note "who: me and Delay"
    *me* follows the press or the hit itself. A pulse that has gone through a [Delay](delay.md) no longer knows whose
    it was, so use *everyone* there.

## Practical example

A [HUD Button](hudbutton.md) for a Buy button into **Screen Flash** (a gold colour, strength 0.5, seconds 0.3, who *me*):
the player who buys sees the flash, the others play on.

## See also

- [Camera Shake](camerashake.md) · [Hit Pause](hitpause.md) — the other two game feel nodes
- The HUD's **Damage flash** element — a tint you place in the [HUD editor](../hud-editor.md#element-kinds)
