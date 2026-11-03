# Undo, pivots and images with an agent

An agent joined to your session ([Build with an AI agent](build-with-an-agent.md)), Claude on claude.ai
([Use theprototype from claude.ai and voice](claude-connector.md)) and the in-app [Assistant](assistant.md) can take back
their own steps, set the point a thing turns about, and put images into your library.

Every call works like the agent's other tools: everyone in the session sees the change at once, one call is one undo
step (Ctrl+Z, or **Undo** on the call's line in **Agent activity**), and a viewer's agent cannot use the tools that change
things.

## Undo that (`undo_last`)

`undo_last` takes back the agent's **own** last call, or its last few with `count` (up to 20, newest first). It never
touches anybody else's work. If someone has changed the same objects since, it changes nothing and says who changed
what, so the agent can tell you instead of undoing over your edit. Selecting an object is not editing it: an object you
only have selected does not stop the undo.

On claude.ai and in voice mode, *"undo that"* or *"take that back"* calls it. In the in-app Assistant one prompt is one
step.

## The point a thing turns about (`set_pivot`)

`set_pivot` sets the point an object turns and scales about, without moving it: a head that nods at the neck, a lamp
that tilts at its joint, a door on its hinge. It is the same setting as the Inspector's **Origin** rows.

- `at`: a point in the world, in metres · `local`: a point in the object's own space · `preset`: `bottom`, `center`,
  `median`, `world` or `children` · `reset: true`: back to the object's centre.
- After it, the agent's rotate and scale, animation clips and **Spin** / **Orbit** nodes all turn the object about that
  point. The scene list shows it as `pivot`.
- Up to 100 objects in one call. A position given in the same change is taken as written.

## Several parts on one joint (`create_pivot`)

`create_pivot` makes a group at a point and puts objects in it, so turning the group swings them all about that point:
the parts of an arm about a shoulder, a shade and a bulb about the lamp's joint. `at` is a point or `center`, `bottom` or
`top` of the objects together; the objects stay where they are. Objects that share a parent group keep it (the pivot
goes inside). Up to 500 objects.

## Images into the library (`add_image`)

`add_image` puts one image into the shared library and returns its **hash**, which a texture slot takes
(`set_material`, or a material's `map`). Give exactly one source:

- `url`: an **https** address. The site must allow other origins (CORS), and addresses on your computer or your local
  network are refused, also after a redirect. It gives up after 20 seconds.
- `data`: base64, or in parts with `chunk`. This is how an agent passes an image it generated or has on its own machine.
- `canvas`: an image the agent describes: rectangles, circles, lines, text, gradients, checkers, stripes and seeded
  noise. Good for textures, signs and labels.

PNG, JPEG, WebP, GIF (the first frame) and AVIF are taken; SVG and HEIC are refused. Limits: 16 MB in, 40 megapixels,
4096 pixels on the long side (larger is scaled down), a canvas 2048 pixels and 500 steps. **Only the pixels are kept:**
the image is redrawn and saved again, so location data and anything else inside the file is gone. The same rules apply
to an https texture given to `set_material`.

## Cookbook

- **A nodding head:** set the head's pivot at the neck (`at: [0, 1.5, 0]`), then rotate it or give it a clip.
- **A tilting lamp:** `create_pivot` with the shade and the bulb at `bottom`, named *Lamp joint*; rotate that group.
- **A wood-ish floor from nothing:** `add_image` with a 512 × 512 canvas of brown noise and faint stripes, then put the
  hash on the floor's material.
- **"Undo that":** the agent calls `undo_last`; if it refuses, it tells you who changed what instead of trying again.

On claude.ai these tools are reached through the connector's [tool families](claude-connector.md#tool-families):
`edit_shape` (pivot, pivot_group), `assets` (image), and `undo_last` as itself.
