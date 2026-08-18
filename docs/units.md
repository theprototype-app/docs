# Units

The scene is metres and radians underneath, always. Units change how numbers are **shown to you and typed by you** — nothing else. That makes them a **local preference**: you can work in inches while a peer works in centimetres, and you are both editing the same scene.

## Choosing your units

*Settings ▸ Scene ▸ Units*:

| Setting | Choices | Applies to |
|---|---|---|
| **Length** | m, cm, mm, in, ft | positions, the object origin, snapping steps, bevel width, merge distance |
| **Angle** | degrees, radians | rotations and the rotation snap step |

Fields that are not a distance or an angle are deliberately left alone — a roughness of 0.4, a duration in seconds, a texture pixel and a subdivision count are not measurements, and a unit picker on them would be noise.

## Typing a unit

You do not have to change the setting to enter a value in another unit. Any of these fields accepts a **suffix**, whatever is currently on display, and converts it as you type:

| You type | You get |
|---|---|
| `12cm` | 0.12 m |
| `250mm` | 0.25 m |
| `4in` | 0.1016 m |
| `1.5ft` | 0.4572 m |
| `2'` | 0.6096 m |
| `6"` | 0.1524 m |
| `90deg` | a quarter turn |
| `1.57rad` | the same quarter turn |

A **bare number** means the unit on display. So in a centimetre field, `250` is 2.5 m; in a metre field, `250` is 250 m.

## What does not change

- **Stored values.** Switching from metres to centimetres re-renders the fields and moves nothing. A box at 1.5 m reads `150` in cm and is still at 1.5 m.
- **The feel of a drag.** Scrubbing a field covers the same real distance in every unit — only the number under your cursor is written differently.
- **What your peers see.** Units are never replicated and never saved into a scene, so opening someone's file does not change your setup, and yours does not change theirs.

## Precision

The number of decimals follows the unit, so the field keeps roughly the precision it had. A position showing `1.50` m shows `150` in centimetres — the same centimetre of control, just written without a fractional part. Inches and feet keep a decimal place for the same reason: a whole inch is a coarser step than a centimetre, so the field does not round that far.

The arrow keys always step the **last visible digit**, with <kbd>Ctrl</kbd> for ten times that and <kbd>Shift</kbd> for a hundred — see [Numeric fields](controls.md#numeric-fields).
