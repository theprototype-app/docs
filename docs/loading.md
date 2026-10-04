# Loading Placeholders

!!! warning "Draft for 1.21"
    Being written alongside the 1.21 release; *TODO* sections are filled in from the finished feature.

While a model or a pack item downloads, its place in the scene is held by a **placeholder**, so you can see where it will
appear — and keep working.

## Two styles

**Settings ▸ *TODO* ▸ Loading placeholders**:

- **Coloured boxes** — the default, as before.
- **Modern** — a translucent blue stand-in that fills up as the object loads, with a living animation and a UV-grid
  texture so its size and shape read at a glance.

*TODO (36-preload): screenshots of both.*

## Working while it loads

A placeholder can be **selected and moved** like the object it stands for; when the real object arrives, it takes the
placeholder's place — position, rotation and scale you set while waiting are kept.

## When a load gets stuck

A load with **no progress for 10 seconds** turns **red**. The app retries on its own (up to three times, waiting a little
longer each time); after that, **right-click** (or double-click) the red placeholder for **Retry**, or
**Replace model…** to pick a different file. *TODO (36-preload): exact menu labels, the tooltip text.*
