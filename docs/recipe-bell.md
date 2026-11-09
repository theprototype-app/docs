# Recipe: a bell

*New in 1.64.* A bell — or a sign, a lantern, a wind chime — that swings and rings when someone clicks it, points at it
or knocks it. Everyone sees the same swing and hears the ring.

## Make it

1. Select the bell. For a nice swing, put its origin at the top, where it hangs
   ([Each object's origin](controls.md#each-objects-origin)).
2. In the node editor, right-click the pane ▸ **Recipes ▸ Bell**.
3. Press Play and point at it, click it, or walk into it.

## What it adds

| Node | Set to |
|---|---|
| [On Click](nodes/onclick.md) | wired into Hover Animate's **trigger** |
| [On Hover](nodes/onhover.md) | on *enter*, who *anyone*, cooldown 0.5 s — wired into **trigger** |
| [On Hit](nodes/onhit.md) | a hand or a walking player knocking it — wired into **trigger** |
| [Hover Animate](nodes/hoveranimate.md) | style *swing*, mode *energy* (each pulse swings it higher), 20°, about z, sound *ring* at the start |

All of it is one undo step, shared with everyone in the session.

## Make it your own

- **Swing the other way**: set **axis** to *x*.
- **A gentler bell**: lower **amount**; raise **damping** so it settles sooner.
- **Only when clicked**: delete the On Hover and On Hit nodes.
- **A different sound**: pick another **soundName**, or *extremes* to ring at the end of each swing.
