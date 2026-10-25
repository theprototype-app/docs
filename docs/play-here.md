# Play Here

*New in 1.44.* **Play here** starts Play where your camera is: the player stands on whatever is under the camera,
facing the way you are looking. **Stop** puts the editor camera — and your selection — back exactly where they were.
It is the quickest way to try one corner of a big level without walking there from the spawn.

## Where it is

| Where | How |
|---|---|
| Keyboard | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Enter</kbd> |
| Play button | right-click **Play** ▸ **Play here** |
| Viewport menu | right-click the empty viewport ▸ **Tools** ▸ **Play here** |
| Toolbar | an optional **Play here** button: *Customize toolbar…* ▸ tick **Play here** |
| Phone | long-press **Play**, or **More** ▸ *Tools & View* ▸ **Play here** |
| VR | the radial menu ▸ **Tools** ▸ **Play here** (and **Back to edit**) |

## Where you land

- **Across the floor:** always where the camera is, facing your view (the camera's heading; looking straight down
  still faces the way the top of the screen points).
- **Height:** on a *grounded* scene (the default) your eyes stay at the scene's eye height. With flying allowed, or a
  walk controller with physics running, the player stands on the surface under the camera.
- **Nothing under the camera** (you are looking out over the edge of the world): the scene's own spawn.
- **One round only.** The next ordinary **Play** uses the scene's spawn again.

Play is a sandbox, as always: what changes during Play is not kept.
