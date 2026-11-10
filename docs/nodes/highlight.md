# Highlight

Makes the connected object glow while **you** point at it — the mouse in Interact, a phone tap resting on it, the VR
laser or the Play crosshair — or while a boolean wired into **on** is true. Each player sees what they point at; nothing
is sent.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| on | boolean | glow while true. Unwired: while you point at it (mouse, tap, laser or crosshair) |

## Parameters

| Parameter | Default | Range |
|---|---|---|
| color | #ffd54a | the glow's colour |
| strength | 0.6 | 0 – 3, how bright |
| fade | 0.15 | seconds to light up and go out |

Works on materials that can glow (standard, physical, lambert, phong). The object's own glow comes back exactly, and a
save writes it.

Unwired, it follows the same pointer as [On Hover](onhover.md): the desktop mouse in **Interact** and a phone tap light
it too, not only the VR laser and the Play crosshair. To glow for everyone when *anyone* points at the object, wire an
On Hover (who *anyone*, on *over*) into **on** instead.

## Practical example

See [Press Button](pressbutton.md).
