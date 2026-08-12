# Object Flow

Embeds an object's own graph into the **Scene flow** as a single card — the way to compose [object flows](../object-flows.md) into a bigger machine without opening each one.

**Sockets:** whatever the embedded flow declares with [Flow Input](flowinput.md) / [Flow Output](flowoutput.md)

## Adding one

- right-click the object in the viewport ▸ **Add flow to Scene graph**, or
- add an **Object Flow** node from the palette (*Object Flow* group) and pick the object.

Only objects that already **have** a flow are listed, and a flow can't embed itself.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| flowUuid | — | which object's flow this card represents (pick from the card) |

Double-click the card to open that object's flow in the editor.

## How it behaves

Values you wire **into** the card reach the flow's Flow Inputs on the same tick. Values the flow publishes through its Flow Outputs come out of the card on the **next** tick (one frame of latency — see [Flow Output](flowoutput.md)).

The card's sockets track the flow's interface: rename, retype or delete a Flow Input/Output and every embedded card updates, dropping wires that no longer have a home. Delete the object's flow and its cards disappear with it.

## Practical example

One lamp design, three lamps:

1. Build the behaviour once in a lamp's flow, with a **Flow Input** *brightness* and a **Flow Output** *isOn*.
2. In the Scene flow, embed all three lamps as Object Flow cards.
3. Wire one [Slider](slider.md) into all three *brightness* sockets — one control, three lamps, in sync for every peer.

!!! tip
    Prefer small object flows with a clear interface over one huge Scene graph: they travel with the object into [prefabs](../prefabs.md) and saved scenes, and the Scene flow stays readable.
