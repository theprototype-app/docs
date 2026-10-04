# Set Look

Switches a camera's **look** — its [post-processing](../post-processing.md) — on or off when a pulse arrives, and by
default also looks through that camera.

**Output:** effect

## Inputs

| Input | Type | Meaning |
|---|---|---|
| trigger | event | when to apply it |
| camera | object | the camera whose look to switch. Unwired = the scene's own look |
| on | boolean | true turns the look on, false turns it off |

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| on | true | the value used when `on` is not wired |
| activate | true | **look through it too** — also make that camera the active view, because a camera's look only shows while you look through it |

Each player applies it on their own screen when the (shared) trigger arrives, so every view ends up the same without a
message of its own. It changes what you see, never the scene's saved look.

If you switch **activate** off and nobody is looking through that camera, nothing changes on screen — the app says so
once, and suggests a [Set Active Camera](setcamera.md) node.

## Practical example

A dream sequence: a **Game Start** pulse into **Set Look** with the *Dream cam* wired into `camera` — every player cuts
to that camera with its soft-focus look. A second Set Look with **on** false on the round's end turns it off again.
See [Switching looks from a node graph](../post-processing.md#switching-looks-from-a-node-graph).
