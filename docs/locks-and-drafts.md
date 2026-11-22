# Locks and drafts

*New in 1.73.* When several people edit one scene, an object you are working on is yours until you let go:
nobody else can change it in the meantime, and everyone can see who has it. Objects you keep in
**Local objects** are drafts: they stay on your device until you share them.

<figure class="shot-figure">
<video class="shot vignette" autoplay loop muted playsinline preload="metadata" width="960" height="600" poster="../img/locks-and-drafts/locks.poster.webp" aria-label="A short loop from one person's screen: another person selects the box, a small avatar appears over it and the Object list row says Held by that person; this person's drag does not move it; after the other person releases it, the drag moves the box.">
<source src="../img/locks-and-drafts/locks.webm" type="video/webm">
<source src="../img/locks-and-drafts/locks.mp4" type="video/mp4">
</video>
<figcaption>Loop, 28 s: someone else holds the box, so it does not move; once they release it, it does.</figcaption>
</figure>

## What others see

- A small avatar of the person holding an object floats over it in the 3D view.
- **Properties** says **‹name› is editing this**. The fields stay visible but are read-only. Press **Request** to ask
  for the object; the holder gets an Approve / Deny prompt.
- The object's flow opens view-only in the node editor.
- In the **Object list** the row says **Held by ‹name›**; your own rows say **Held by me**. A screen reader hears
  "held by ‹name›" with the row's name.
- On a phone the Properties sheet shows the same line and the same **Request** button.

When two people take the same object at the same moment, everyone agrees on one holder and the other person is told.
Someone who joins later sees everything each person is holding.

## Letting go

- Deselect the object, or choose **Release** in its row menu (right-click the row in the Object list).
- If you hold an object for 5 minutes without changing it, you are asked **Still editing ‹name›?**. Choose
  **Keep holding** or **Release**; with no answer the object is released 30 seconds later. This never happens while
  you are alone in the session.
- Your locks survive a short network drop: if your connection to someone drops and comes back, you both still hold
  what you held, and you can keep editing. If you both took the same object while the connection was down, the one
  who took it first keeps it and the other is told.

## Lock mode

**Settings ▸ Connection ▸ Editing together ▸ Locks**:

- **While selected** (the default): selecting an object takes it.
- **Only while editing**: selecting takes nothing. Your first change takes the object, and it is free again about
  3 seconds after your last change.

Only the host changes the lock mode (and an admin, on the hosted site's rooms, where it is part of the room
settings). Everyone in the session follows it, including people who join later.

## Drafts (Local objects)

A draft is an object that is only on your device: something you moved to **Local objects** in the Object list, or
something you made while you only had view access. Nothing about a draft reaches the other people in the session:
not the object, and not your edits to it (its name, colour, position, flow, animation, or a joint to it). A copy of a
draft (Duplicate) is a draft too.

- **Where**: Object list ▸ **Local objects** (it shows as soon as you have one). Drag a shared object onto it to make
  it a draft; press **Share** on a draft, or drag it into the shared list, to give it to everyone.
- **Files leave drafts out**: a downloaded `.tpscene`, the JSON / glTF / Quest exports, Publish and cloud saves, a
  scene saved in the Explorer, prefabs and **Save as**. When drafts were left out you see
  **N drafts not included — share first?** with a **Share them** button: press it, then save again to include them.
- **Kept on your device**: the autosave, saves in the Sessions manager and checkpoints keep your drafts, so they come
  back after a reload.
- **Older scenes**: a scene saved by an older version that still holds drafts opens with them as drafts.

!!! note "One limit"
    A shared node or group that refers to a draft keeps that reference; it carries nothing else of the draft.

## See also

- [Connection](connection.md) for joining, rooms and roles.
- [Users & Moderation](people.md) for the people list.
