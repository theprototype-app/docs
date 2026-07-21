# Notifications & Notes

The top-right cluster next to your avatar holds two history surfaces — the **notification center** and the **scene-notes drawer** — plus the tools for leaving notes on objects and pinging things for everyone to see.

## Notification center

A **🔔 bell** button sits in the top-right chrome. Click it to open a dropdown listing recent notifications, newest first. When it's collapsed, a red badge shows the unread count (`9+` above nine).

Every toast the app shows — connection events, simulation start/stop, imports, warnings — is recorded here with a relative timestamp (*just now*, *5m ago*, *2h ago*, *1d ago*), so a message you missed while it was on screen is never lost. The list keeps the most recent **50** entries and survives reloads. Opening the panel clears the unread badge; **Clear all** empties the history.

The center is a read-only log — connection requests are actioned from the toast itself (see below), not from here.

## Toasts

Toasts pop up briefly for feedback. Two things are worth knowing:

- **Ordinary toasts sit *below* modals**, so an open Settings or Modules dialog is never blocked by a transient message.
- **Connection requests and approvals stay on top** — a peer asking to join is always visible, even over a modal.

Plain messages auto-dismiss after a few seconds; ones with a button (like a connection request) linger longer. At most four toasts stack at once; when more arrive, a **"+N more…"** line shows how many are hidden — find them in the notification center via the bell.

## Scene notes

Notes are little pinned comments you can attach to any object — feedback, TODOs, labels — and they're visible to everyone in the session.

### Adding a note

Right-click an object ▸ **Add note**, then type in the card that appears (<kbd>Enter</kbd> saves, <kbd>Shift</kbd>+<kbd>Enter</kbd> adds a line, <kbd>Esc</kbd> closes). The note is pinned **exactly where you clicked** on the object and follows it as it moves. Notes render in the scene as small numbered amber pins that always face the camera, and they replicate to every peer with your name attached.

### The scene-notes drawer

The **📝 notes** button in the top-right chrome (just left of the bell) opens a right-docked drawer listing **every note in the scene** — the "all notes at a glance" view:

- Each row shows the note text, which object it's on, and who wrote it.
- **Click a row** to fly the camera to that note.
- The **✕** on a row deletes the note.

If there are no notes yet, the drawer tells you to select an object and add one from its context menu.

## Pinging

A ping is a momentary "look here!" pulse everyone sees at once — great for pointing during a call.

- **<kbd>Alt</kbd>+click** anywhere in the scene to ping that exact spot.
- Right-click an object ▸ **Ping this object** (or **Ping selection** for several) — this flashes a highlight box around the object as well as the pulse.
- In VR, click the right thumbstick (or **Tools ▸ Ping** in the radial menu) to ping where you're pointing.

Each ping carries a color and a chime. You can set your own **ping color** and **ping sound** (Ding, Chime, Pluck, Pop or Bell) so your pings are recognizably yours; leaving the color blank uses your peer color. The chime is spatial when spatial voice is on — it sounds like it's coming from the pinged spot.
