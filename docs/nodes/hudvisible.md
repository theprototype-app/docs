# Show / Hide Element

Shows, hides or toggles **one** HUD element: a key icon that appears once the key is found, a hint that goes away.
*Since 1.74.*

**Output:** none (it writes into its element)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | each pulse does the **action** once |
| visible | number | wired, the element follows it instead: above 0 = shown, 0 or less = hidden |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| element | (none) | the HUD element, picked on the card |
| action | hide | `show`, `hide`, `toggle` |

## Per player

Like a [HUD Screen](hudscreen.md), this works on each player's own HUD. A shared pulse (an ordinary On Click) shows or
hides it for everyone; a pulse only one player makes acts for that player alone.

A hidden element keeps its place on the screen. It draws nothing and takes no press.

## Practical example

A key icon that shows once you pick the key up:

1. In the [HUD editor](../hud-editor.md), add an **Icon row** or an **Image** for the key, and leave it on the Playing
   screen.
2. Add a **Show / Hide Element** for that element with action *hide*, and drive it from an
   [On Play start](onplaystart.md): the icon starts hidden.
3. Add a second **Show / Hide Element** for the same element with action *show*, driven by an
   [On Click](onclick.md) on the key.

## See also

- [HUD Screen](hudscreen.md) — show or hide a whole screen
- [HUD Editor](../hud-editor.md#driving-the-hud-from-the-graph)
