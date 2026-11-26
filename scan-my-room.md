# Scan my room (Quest)

On a Quest, **Scan my room** turns your headset's room setup into the scene: your walls, floor, ceiling and furniture
become named, see-through boxes at their real size, in a group called **My room**. Build on your real table, hang a
picture on your real wall, or ask an AI app to furnish the room around them. New in 1.81.

No camera image is used or stored. The room comes only from the shapes you traced in the headset's room setup.

## Start it

- **From the Play button:** right-click or long-press **Play** and choose **Scan my room (passthrough)**. The headset
  goes into passthrough and the scan starts by itself.
- **In the headset**, already in passthrough: radial menu ▸ **Add ▸ Scan my room**.

If you are in VR without passthrough, the scan tells you so: leave VR, then use **Scan my room (passthrough)** from
the Play button menu.

A few seconds later a line confirms what it made, for example *My room: 4 walls, floor, ceiling, shelf, 2 tables. From
your headset's room setup; no camera image used or stored.*

## What you get

- One box per piece, named after what the room setup calls it: **Floor**, **Ceiling**, **Wall 1** to **Wall 4**,
  **Table**, **Table 2**, **Couch**, **Shelf** and so on. Doors, windows, screens and wall art are thin boxes on their
  wall.
- Each kind has its own plain colour, and every box is see-through, so you can check the fit against the real room in
  passthrough.
- They are ordinary objects: everyone in the session sees them, they save with the scene, and you can move, recolour
  or delete them. The whole scan is **one undo step**.

!!! tip "Furnish it with an AI app"
    With the room in the scene, an [AI app](https://docs.theprototype.app/ai/use-any-ai.md) or the in-app [Assistant](https://docs.theprototype.app/ai/assistant.md) can build
    around the **My room** group: *"furnish my room"*, *"put a lamp on the table"*, *"a shelf on Wall 2"*.

## How it works and what it reads

Your Quest keeps a room setup (Space Setup): the outline of your walls and floor, and boxes for your furniture, that you
traced once. Scan my room asks the browser for those shapes, in a passthrough session, and builds a box for each one.
The big scanned mesh of the whole room is left out.

It reads no camera image, and none is stored or sent. What is stored is what you see: the boxes, saved in your scene
like any other objects.

## Run it again

Scan again, in the same session or a new one, and it **updates the same room** instead of adding a second one. The line
then reads *My room (updated): …*

- **Each wall keeps its name.** A new session can face another way, so walls are matched by their shape: a wall's
  length (within 3 cm) and its neighbours. So **Wall 2** stays the same real wall, with the colour or material you gave
  it, and only its size and place are brought up to date.
- **A new wall** gets the next free number.
- **A wall missing from this scan is never deleted.** It keeps its name and the line tells you, for example
  *Wall 3 not found in this scan.* If you really removed that wall from your room setup, delete the box yourself.
- **Furniture** that is no longer in your room setup is removed; new furniture is added.
- **Things you added yourself** to the My room group, by hand or with an AI app, are left alone. So is a piece you
  renamed: **renaming a wall stops it being matched**, and the next scan adds that real wall again as a new Wall with
  the next number.

## No room setup yet

If your headset has no room setup, nothing is built. The first time, the page opens the headset's Space Setup for you:
trace your walls and furniture, then choose **Scan my room** again. If it cannot open it, the line tells you where it
is: on the Quest, **Settings ▸ Physical space ▸ Space setup**.

## Limits

- **The first time, Quest Browser asks to allow the site.** Press **Allow** and the scan starts.
- It is offered only in a headset browser that can do passthrough. Phones do not show it; to put a scene on a real
  table with a phone, see [Play on a Table](https://docs.theprototype.app/ar-table.md).
- A **viewer** cannot scan: ask the host for editor access first.
- The boxes are as exact as your room setup. If a wall looks off, fix it in the headset's Space Setup and scan again.

See also: [VR Guide](https://docs.theprototype.app/vr.md) · [Building in VR](https://docs.theprototype.app/building-in-vr.md) · [Colocation](https://docs.theprototype.app/colocation.md)
