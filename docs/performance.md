# Performance & Budgets

How big a scene can get, how to see where it stands, and what the app does on its own when a
scene is more than your machine can draw.

Everything on this page is **local**. A budget is a fact about *your* graphics card and *your*
tab: nothing here is saved with the scene, replicated to a peer or undoable, and two people on
different hardware are allowed to disagree about all of it.

To see *what happened* over time rather than where the scene stands now — which objects draw
most, what a stall was doing, how a headset copes — record it with the
[Profiler](profiler.md).

## The meter

The object count in the status line carries a coloured dot:

| Dot | Meaning |
|---|---|
| 🟢 Green | Within budget. Nothing to do. |
| 🟡 Amber | Over the comfortable ceiling on at least one measure. Still fine, but worth knowing. |
| 🔴 Red | Over the second ceiling. This is what the gateway and the auto-stops below read. |

Hover it and it names what is over (*Scene budget: over on draw calls / frame, triangles /
frame*). Click it and the **Statistics** window opens — the same window as the burger
menu ▸ **Statistics**.

## What the Statistics window counts

Seven budgets, each with its own dot, its value, and its two ceilings beside it:

| Budget | Why it is a budget |
|---|---|
| **Objects** | Every object is at least one draw call, one wire message per joiner, one row in the object tree and one node in every traversal. |
| **Triangles / frame** | Vertex and fill cost, counted across every render call in a display frame — the shadow pass draws each mesh a second time, so the number is about twice a naive count. |
| **Draw calls / frame** | CPU time per call. In a many-object scene this, not triangle count, is what binds. |
| **Textures** | A stand-in for graphics-card bytes. The tab is *killed* on mobile, and the 3D context is lost on desktop, when it runs out. |
| **Geometries** | Buffers held on the card. A leak shows here first — a delete that never gave its memory back. |
| **Frame time p95** | An FPS average smooths a stutter away; p95 is the frame you actually feel. |
| **Long tasks / min** | The direct measure of "the window froze" — a task over 50 ms blocks input. |

Hovering a row's name says why that budget exists.

Below the table: frame times as **p50 / p95 / p99**, long tasks in the last minute with the
worst one, the JS heap where the browser reports it, meshes and how many are hidden, how many
objects are still arriving, and a **Wire** table of per-message-type counts in and out over the
last few seconds. The refresh button re-reads everything and resets the wire counters.

!!! note "Two profiles"
    The same scene is comfortable on a desktop and fatal on a headset, so the ceilings come in
    two sets. The line at the top of the window says which you are being judged against —
    **desktop** or **VR / mobile**.

The whole set rides along in the [diagnostics bundle](connection.md#diagnostics-you-can-copy).

## The overload gateway

Four stages, in the order a heavy scene meets them. Nothing here is silent, and every stop is
reversible.

### 1. A big scene arriving does not freeze you

Objects are created in slices rather than all at once, the viewport is refreshed once a frame
instead of once per object, and an object list of thousands of rows draws only the rows you can
actually see. A scene that used to take minutes to land while the tab sat frozen now arrives
while you watch it.

### 2. Something oversized asks before it lands

Opening a file big enough to hurt is held at the door:

> **This scene is large** — "Arena" has 4,812 objects — above the 3,000 recommended for this
> device. It may be slow, and on a phone or headset the tab can be closed by the browser.

with **Open anyway** and **Cancel**. An imported *model* gets the same ask with a third way out;
see [Importing files](explorer.md#when-a-model-is-too-heavy).

This asks only where a **person** opened something. Travelling to a scene, a peer's proposal and
an autosave restore never stop at a dialog nobody is standing at.

### 3. A simulation that cannot keep up stops

When a physics step takes longer than a frame lasts — over **24 ms**, for half a second of steps
in a row — the simulation stops once and says so:

> **Physics stopped** — the simulation was too slow for this device (over 24ms a step). The
> scene is intact.

with **Resume**. Consecutive, not cumulative: one hitch while a texture uploads is not a scene
that is too heavy.

### 4. A window that cannot draw pauses instead of freezing

When frames each take longer than a quarter of a second, for ten frames in a row, drawing stops
and a panel explains it rather than leaving you looking at a tab that appears to have crashed.
**Nothing is lost**, and autosave keeps running while the panel is open. It offers:

- **Save now** — the scene is intact, because it lives in the page rather than on the graphics card.
- **Reduce** — stop drawing the newest objects **on this device** until the scene fits the
  budget. Peers are unaffected and nothing is deleted; **Show them again** puts them back.
- **Resume** — carry on. The next few frames are expected to be slow, so a grace window stops it
  from immediately re-pausing.

!!! note "A lost graphics context is a different panel"
    If the browser takes the 3D context away — a driver update, a graphics reset, a phone under
    memory pressure — you get its own panel instead, with a button to save the scene. The view
    restores itself when the browser hands the context back.

## The quality governor

Before any of the stops above, the app tries to keep the frames. **Settings ▸ Scene ▸ Reduce
quality when the scene is heavy** (on by default): when a heavy scene cannot hold 30 frames a
second on this machine, quality comes down one step at a time, and each step is given back as
soon as frames recover.

**Shadows go first**, then resolution, then effects — measured rather than guessed, because the
shadow pass draws every mesh a second time and so is where the cost actually is:

1. Shadows off
2. Resolution 85%
3. Resolution 72%
4. Ambient occlusion off
5. Resolution 61%
6. Scene look (post-processing) off
7. Resolution 50%
8. Fewer particles
9. Your camera updates to peers halved

While it is acting, a **Reduced quality (scene is heavy)** chip sits beside the object count, and
its tooltip names exactly which steps are in force. Click the chip to **hold** it there — useful
when you would rather have steady frames than watch quality breathe in and out — and click it
again to give full quality back. The first time it ever acts in a session it also says so in a
toast, because the chip lives in the object list's footer and that window can be closed.

**On a phone** the governor judges frames against the phone's own refresh rate (60, 90 or 120 Hz), and never lowers
quality on a scene that is trivially light — a menu, an empty room.

**A phone starts lighter.** A phone or small tablet is limited by how many pixels it can fill, not by how many objects
it draws, so with automatic quality on it starts the app at step 4 — shadows off, resolution 72 %, ambient occlusion off — and climbs back up
by the ordinary rule when it holds its frames. A toast offers **Use full quality** if you would rather start at full
detail (no automatic step for a minute after that).

**In a headset** the governor judges by the headset's own refresh rate (72, 90 or 120 Hz) instead of 30 fps. With automatic quality on, a VR
session starts with **shadows off** and keeps them off for the session — the Quest budget — and never lowers the eye
resolution, which would blur every panel's text; the quality you had on the desktop comes back when you leave VR. A
game whose Settings pin a **Quality** preset (Low, Medium, High) overrides all of this.

Nothing the governor does changes the scene for anybody else, and nothing it does is written to
a preference: it is a fact about this device right now.

## Budgets in CI

For contributors to the core repo: every Games-tab game and every General-tab level is held to
the Quest budget on every pull request and before every release.

| Measure | Budget |
|---|---|
| Draw calls per frame | 150 |
| Triangles per frame | 300,000 |
| Real-time lights | 2 |
| Texture memory | 64 MB (an uncompressed estimate of the visible textures) |

The budgets live in `perf/budgets.json` and `node scripts/perf-games.cjs --check` is the gate. It
measures **counts only** — draw calls, triangles, lights and texture size, taken in a
headset-like view with the post stack, shadows and the quality governor off — because counts come
out the same on a CI runner without a graphics card as on a desk. Frame time is deliberately *not*
gated: no runner reproduces it. Measure milliseconds on the device, with the
[Profiler](profiler.md) or [performance reports](profiler.md#send-performance-reports).

A scene that is over budget *today* ships on an **allow-list** in the same file: each entry names
the scene and measure, a ceiling close to what was measured, the date it was added, a review date,
an owner and a note on what would fix it. Anything above its ceiling is red like any other
regression. The core repo's `perf/README.md` explains how to run the check locally and add an
entry.

Alongside it, `scripts/scene-lint.cjs` checks saved scenes for what a scene can get silently
wrong — unknown node types or environment presets, a spawn inside a wall or outside the bounds,
nondeterministic scripts, pack items with behaviour or LOD issues. The template authoring
scripts run it, and so does CI.

