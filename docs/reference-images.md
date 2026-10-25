# Reference Images

*New in 1.44.* Trace over a floor plan, a sketch or a photo: a **reference image** is a see-through picture laid on
the ground or standing in front of you, which you build over. It cannot be clicked or selected, so it never gets in
the way of the objects you are placing.

## Add one

- **Drop an image on the viewport** and pick **Use as reference — on the ground** or **Use as reference — facing the
  view**. (**Add to the Explorer** keeps it in your library instead, as before.)
- Or **Tools ▸ Reference images…** (viewport menu) ▸ **Add image…**.
- An image [shared into the app](sharing-into-the-app.md) shows a toast with **Use as reference**.

*On the ground* lies flat under the camera's view; *facing the view* stands square to the camera, in front of you.

## Change it

**Tools ▸ Reference images…** lists every reference image in the scene. For each one:

- **Opacity** — how see-through it is (50 % to start).
- **Size** (its width in metres) and **Height** over the ground.
- **On the ground / Facing the view**, and **Move here** (or **Face the view**) to re-place it from where you look now.
- **Share with session** — see below.
- **Remove** (the bin).

## What it is not

- **Hidden in Play**, and in Interact mode.
- **Never exported or published:** not in a `.tpscene`, a glTF, a published scene, a thumbnail or a screenshot of the
  scene.
- **Yours by default.** Reference images are kept on this device, per scene (they come back after a reload). Tick
  **Share with session** and everyone in the session sees it — read-only, following your opacity — until you untick it
  or remove it; someone who joins later gets it too.
