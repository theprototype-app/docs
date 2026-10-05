# Node System

The Flow editor is a visual node graph that drives scene behavior — animation, logic, interactivity and sound — replicated live to every peer.

## Opening the editor

Press <kbd>N</kbd> or use the flow icon in the bottom hud. The editor docks at the bottom (tabbed with the [Explorer](explorer.md) when both are open) and can be undocked to float.

## The Flows list

The left pane carries a collapsible **Flows** section above the node palette. It lists
**Main** at the root — the scene-wide graph, called *Scene* before 1.23 (see
[Main graph & node properties](main-graph.md)) — then every object that actually has a flow graph of its own. It is a way
to get *to* a graph, not a second object list, so an object with none is not in it.

Click a row to select that object and switch the editor to its graph; click **Main** to
deselect and edit the scene-wide one. Drag the bar under the list to give it more room, and
click the section header to collapse it. An entry whose object has been deleted is shown
greyed out until the next save drops it.

## Adding nodes

- **Palette** — the left sidebar lists every node by group with a filter box; drag a node onto the canvas. The palette can be collapsed or moved to the other side with the tabs on its edge.
- **Right-click the canvas** — a grouped Add menu, plus **🔍 Search nodes…**; just start typing while the menu is open to jump into search (<kbd>Arrow</kbd> keys + <kbd>Enter</kbd> to place, <kbd>Esc</kbd> back to the menu).

Right-click a **node** for Open code, Group, Duplicate, Mute, Disconnect all, Delete and more; right-click an **edge** to disconnect it. <kbd>Delete</kbd>/<kbd>Backspace</kbd> removes the selection. Groups, notes, the node editor's own shortcuts and the full menus are on [Node editor: keyboard, groups and notes](node-editor.md).

## Mouse bindings

What the buttons do on the canvas is a choice — **Settings ▸ Input ▸ Node editor ▸ Mouse
bindings**:

| | Left drag on the canvas | Dragging a node | Pan |
|---|---|---|---|
| **Classic — left-drag pans** | pans the view; <kbd>Shift</kbd>+drag draws a selection box | moves that node | left drag |
| **Select-first — left-drag selects, right-drag pans** | draws a selection rectangle | moves the **whole selection** if that node is in it | middle or right button |

**Classic** is the default and is what every version so far has done, so nothing changes
until you switch. **Select-first** is the convention most other 3D and node tools use.
<kbd>Shift</kbd>+click adds to or removes from the selection there, and a right click that
does not travel still opens the Add menu rather than being eaten by the pan.

It is your own setting: it changes nothing for your peers and nothing in the graph.

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

- **ⓘ Params** — the *selected node's* properties: since 1.23 every node lists them all here, including a Script's input values, a Behaviour's params and a module node's options, alongside extras such as a Slider's **Min/Max**, a Switcher's **items list** (add/remove entries) and a Number's **step**. A property with a wire into it shows the incoming value instead. See [Properties panel](main-graph.md#properties-panel).
- **⚙ Settings** — with a node selected: its **Name** and a free-text **Note**. With nothing selected: graph settings — edge style (Bezier/Step/Straight), background (dots/lines/none), minimap, snap-to-grid + grid size, Fit / Reset view, and the socket color legend.

## Determinism and replication

The graph itself is shared: every node, edge, parameter tweak and position replicates to all peers. Motion is **not** streamed — every peer computes the same animation from the same node data and a **synced clock**, so a Spin or a Sound loop is at the same phase for everyone. Random nodes are seeded, and click triggers ride tiny replicated messages. You can exempt one object from all flow effects via its right-click menu (*Disable flow effects*).

## When the runtime fails

A node that throws an error does not take the scene down with it. If the whole graph keeps failing frame after frame,
the flow runtime **pauses itself** and says so: *"Flow runtime paused after repeated errors. Your scene is intact; fix
the node and resume."* Fix or delete the node, then press **Resume** on that toast.

### Safe mode

If a scene's scripts hang as soon as it loads, there is never a frame in which to fix them. Open the app with
**`#safe`** at the end of the address (`https://theprototype.app/#safe`): the scene and its graph load, but the flow
runtime starts **paused**, so no script runs. Edit or delete the culprit, then press **Resume** on the *Safe mode*
toast — or reload without `#safe`.

## Flow Code: the graph as text

**Flow Code** (the dock's **＋** menu, or <kbd>Alt</kbd>+<kbd>F</kbd>) shows the graph the editor is
showing as text you can read, edit and **Apply**. (The [code workspace](code-workspace.md#graph-json) can also open it as
JSON in a tab, beside the graph's scripts.) A **Text | JSON** toggle above it picks the
format; your choice is remembered on this device. Switching format drops edits you have not
applied.

**Text** (the default since 1.20) is the same data as the JSON, only written once instead of
repeated — about 2.1 to 2.4 times shorter, and nothing is lost:

```
// a button that plays a sound and shows a screen
click = gamesound "Button click" {sound: "click"} @520,40
lvl1 = hudbutton "Level 1 button" {element: "lvl-1"} @40,40
lvl1 -> click.trigger
s1.show -> vis.on
```

- A **node** is one line: `id = type "label" {params} @x,y`. `type+` means the node's data
  repeats its type; `class:"…"` or `noclass` appear only when a node's styling is unusual.
- A **wire** is one line: `source.output -> target.input` (the handle is left out where the
  socket has no name). A wire with a non-standard id carries `#id`.
- `//` starts a comment.
- Several graphs are sections under `@graph <key>` lines.
- Anything that fits none of these is kept as a raw JSON line (`id := {…}` for a node, `~ {…}`
  for a wire), which is why the round trip is exact.

**Apply** replaces the graph with what the text says, for everybody. A line it cannot read is
reported with its line and column, and nothing changes. A new node line without `@x,y` is placed
below the graph.

## Custom nodes

Right-click the canvas ▸ **Custom ▸ New custom node…** to open the **Node Designer**: name your node, add controls (`range` sliders with min/max/step, or `select` dropdowns), and write its code — a per-frame function of `object`, `base`, `data` (your controls + wired inputs) and `time`. **Save for everyone** replicates the definition, and instances appear in the palette's *Custom* group. See [Custom Node](nodes/customnode.md) and [Script](nodes/script.md).
