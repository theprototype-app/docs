# Node System

The Flow editor is a visual node graph that drives scene behavior — animation, logic, interactivity and sound — replicated live to every peer.

## Opening the editor

Press <kbd>N</kbd> or use the flow icon in the bottom hud. The editor docks at the bottom (tabbed with the [Explorer](explorer.md) when both are open) and can be undocked to float.

## Adding nodes

- **Palette** — the left sidebar lists every node by group with a filter box; drag a node onto the canvas. The palette can be collapsed or moved to the other side with the tabs on its edge.
- **Right-click the canvas** — a grouped Add menu, plus **🔍 Search nodes…**; just start typing while the menu is open to jump into search (<kbd>Arrow</kbd> keys + <kbd>Enter</kbd> to place, <kbd>Esc</kbd> back to the menu).

Right-click a **node** for Duplicate / Disconnect all / Delete; right-click an **edge** to disconnect it. <kbd>Delete</kbd>/<kbd>Backspace</kbd> removes the selection.

## Connecting: typed sockets

Drag from a node's output (right side) to another node's input (left side). Every socket is **color-coded by its value type**, and only compatible types connect — an incompatible pair shows **red** while you drag.

| Type | Color | Carries |
|---|---|---|
| number | <span style="color:#38bdf8">●</span> `#38bdf8` | a numeric value |
| vector3 | <span style="color:#a78bfa">●</span> `#a78bfa` | an x/y/z triple (also usable as a world point) |
| boolean | <span style="color:#f472b6">●</span> `#f472b6` | true/false |
| color | <span style="color:#fbbf24">●</span> `#fbbf24` | a color |
| object | <span style="color:#4ade80">●</span> `#4ade80` | a reference to a scene object |
| event | <span style="color:#facc15">●</span> `#facc15` | a short trigger pulse |
| effect | <span style="color:#fb923c">●</span> `#fb923c` | a per-frame scene effect |

Sensible conversions are allowed automatically: numbers ↔ booleans, numbers → vectors, events → numbers/booleans, and vector3 ↔ object (so a Vector3 literal can stand in for an object as a world point). **Effect** sockets only connect to other effect sockets.

## How values flow

```
sources (Input) → logic → effect nodes → Object Selector
```

- **Source nodes** (Slider, Number, Time, Random, Toggle…) produce values.
- **Logic nodes** (Math, Compare, Map Range, Select…) transform them; unwired inputs fall back to the value typed on the card.
- **Effect nodes** (Spin, Bounce, Pulse, Set Color, Visibility, Sound, Script…) turn values into scene behavior — but they act on nothing by themselves.
- The **[Object Selector](nodes/objectselector.md)** is the sink: an effect only touches the scene when its output is wired into an Object Selector that has a scene object picked. Anything not ending in an Object Selector is silently inert.

Cards show live value readouts, updated several times a second.

## The right panel: ⓘ and ⚙

The **⚙** tab button on the right edge opens the properties panel, which has two tabs:

- **ⓘ Params** — the *selected node's* extra parameters: a Slider's **Min/Max**, a Switcher's **items list** (add/remove entries), a Number's **step**. Most nodes keep their parameters directly on the card.
- **⚙ Settings** — with a node selected: its **Name** and a free-text **Note**. With nothing selected: graph settings — edge style (Bezier/Step/Straight), background (dots/lines/none), minimap, snap-to-grid + grid size, Fit / Reset view, and the socket color legend.

## Determinism and replication

The graph itself is shared: every node, edge, parameter tweak and position replicates to all peers. Motion is **not** streamed — every peer computes the same animation from the same node data and a **synced clock**, so a Spin or a Sound loop is at the same phase for everyone. Random nodes are seeded, and click triggers ride tiny replicated messages. You can exempt one object from all flow effects via its right-click menu (*Disable flow effects*).

## Custom nodes

Right-click the canvas ▸ **Custom ▸ New custom node…** to open the **Node Designer**: name your node, add controls (`range` sliders with min/max/step, or `select` dropdowns), and write its code — a per-frame function of `object`, `base`, `data` (your controls + wired inputs) and `time`. **Save for everyone** replicates the definition, and instances appear in the palette's *Custom* group. See [Custom Node](nodes/customnode.md) and [Script](nodes/script.md).
