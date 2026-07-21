# Object Flows

Every object can now carry **its own node graph**, alongside the shared **Scene flow**. Object flows keep behavior with the thing it belongs to — a door knows how to open, a lamp knows how to flicker — and the Scene flow composes them.

## Scene flow vs object flows

- The **Scene flow** is the shared, world-level graph you have always had.
- An **object flow** is a private graph document owned by one object. All graphs replicate live to every peer and are saved with sessions, autosave and `.tpscene` exports.

The editor's scope **follows your selection**: select an object and the Flow editor shows *that object's* flow (the chip at the top says which); deselect and you are back in the Scene flow. Flow Code shows whichever graph the editor is showing.

## Creating and deleting a flow

Select an object that has no flow yet — the editor shows **"<name> has no flow yet"** with a one-click **Create flow** button (adding a node from the palette creates it too). To remove one, open the object's flow and press the 🗑 next to the scope chip; a confirmation lists how many nodes will be removed for everyone. Deleting a flow is undoable — <kbd>Ctrl+Z</kbd> restores the whole graph.

## No Object Selector needed

Inside an object flow, effect nodes (Spin, Bounce, Script, module nodes, Sound, physics params, On Click…) target **the owner object implicitly** — just drop a Spin node in a box's flow and the box spins. Wiring into an Object Selector still works and always wins, so an object's flow may also drive *other* objects.

## Public sockets: Flow Input / Flow Output

An object flow can declare an interface, like a function signature:

- **Flow Input** — a named, typed value source (number / boolean / vector3 / color). Inside the graph it outputs whatever the Scene feeds it (or its fallback).
- **Flow Output** — a named sink; whatever you wire into it becomes visible to the Scene. Its gray socket accepts **any value type**.

!!! warning "Outputs carry values, not effects"
    Animation/effect nodes (Spin, Pulse, Wobble… — the **orange** sockets) are not values and cannot wire into a Flow Output. Output the *driving value* instead: the Time, Slider, Math or Loop node that feeds the effect.

## Embedding a flow in the Scene graph

Once a flow declares inputs/outputs, embed it in the Scene flow as a single **Object Flow** node:

- right-click the object in the viewport → **Add flow to Scene graph**, or
- add an **Object Flow** node from the palette (Object Flow group) and pick the object — only objects that *have* flows are listed.

The embedded node shows the declared sockets: Scene values wired into it feed the flow's Flow Inputs; the flow's Flow Output values come out the other side (with one frame of latency). Renaming or deleting an interface node updates the embedded sockets everywhere and cleanly disconnects stale wires; deleting the flow removes its embedded node.

## Practical example

A breathing lamp whose intensity the Scene controls:

1. Select the lamp object → **Create flow**.
2. Add a **Flow Input** named `amount` (number) and a **Pulse** node; wire `amount → Pulse.amount`. The Pulse drives the lamp itself (no Object Selector needed).
3. Add a **Time** node (mode `sin`) and a **Flow Output** named `phase`; wire **Time → phase**. (The Time *value* is what leaves the flow — the Pulse effect itself stays inside.)
4. Deselect (back in the Scene flow), right-click the lamp → **Add flow to Scene graph**.
5. Wire a **Slider** into the embedded node's `amount` — the slider now breathes the lamp, and `phase` is available to drive anything else in the scene.

!!! tip
    Object flows travel with their object through sessions and undo: deleting an object and undoing brings its flow back intact.
