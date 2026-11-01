# Use theprototype from claude.ai and voice

Add **theprototype** as a connector in claude.ai, press **Connect Claude** in your open
theprototype tab, and talk Claude through building — in a chat on the web or desktop, in the
Claude phone app, or out loud in voice mode. Claude works **in your own tab, with your own
access**: everything it does shows up for everyone in your session and can be undone, exactly
like your own edits.

!!! info "New"
    The Claude connector needs a theprototype account and works on theprototype.app (the hosted
    app). Running the open-source app yourself? Use the [agent bridge](build-with-an-agent.md)
    instead — it gives Claude Code or Claude Desktop the same tools over a session link.

## What you need

- A theprototype account, signed in on theprototype.app.
- A Claude plan that lets you add custom connectors in claude.ai.
- A theprototype tab that **stays open** while Claude works (a computer is easiest; your phone can
  be the one you talk to).

## Set it up (once)

1. In claude.ai open **Settings ▸ Connectors ▸ Add custom connector** and enter
   `https://theprototype.app/mcp`. The **AI assistant** window shows this link with a **Copy link**
   button while no AI provider is set up.
2. claude.ai sends you to theprototype to approve it. The page names the app asking and where it
   will return (claude.ai). Leave **Allow changes** ticked to let Claude build, or untick it for a
   **look-only** connection that can only read the scene and take pictures. Press **Allow**.
   Not signed in? Use **Sign in on theprototype.app**, then **I signed in — retry**.
3. Back in claude.ai, switch the connector on for your chat (the tools menu under the message box).

## Connect your tab (each time you build)

1. Open theprototype.app, sign in, and open or join the scene you want to work on.
2. Press the **AI** button and press **Connect Claude** (also in **Settings ▸ Connected apps**).
   A chip reads **Claude connected · this tab**. The AI button always opens the window; signed out,
   the same card offers **Sign in to connect** first. With no AI provider set up, the window also
   offers **Use your own AI provider** (**Open settings**).
3. Ask Claude something: *"Build a campfire with five logs and a warm light"*, *"Make the flame
   flicker"*, *"What can you do here?"*

One tab at a time: pressing Connect Claude in a second tab asks first, then moves the connection
there. If your network blips, the tab reconnects by itself.

!!! warning "Keep the tab open — and in front"
    Claude's tools run in that tab. If you close it, Claude answers *"No theprototype tab is
    connected — open theprototype.app, sign in and press Connect Claude"*. A tab left in the
    background is slowed down by the browser and cannot take pictures; after a few minutes the tab
    warns you. On a phone, talk to Claude in the Claude app and keep theprototype open on a
    computer or tablet beside you.

## Voice mode

In voice mode Claude keeps its answers short and says what changed in plain words (*"Added three
trees by the fire"*) — it never reads out ids or numbers. Good things to say:

- *"What can you do here?"* — a short spoken summary of what it can build in this tab.
- *"Put a table in the middle and four chairs around it."*
- *"Make the box spin slowly"*, *"Open the door when I click it."*
- *"Make it bigger"*, *"Paint the walls light blue"*, *"Undo that"* (or press **Ctrl+Z** yourself).

## What Claude can and cannot do

| Claude can | Claude cannot |
|---|---|
| Add shapes, lights and groups; move, resize, recolour, rename, hide and delete them | Open files or import them from your computer, or change your settings |
| Make things move and react with flow nodes (spin, bounce, follow a path, open on click) and look up how each node wires | Install modules, approve people who knock, or answer the app's questions for you |
| Add physics and run the simulation in your tab at its full frame rate, whether you host or joined (your own assistant's **Physics tools** setting is not changed) | See anything outside the theprototype tab, or move your camera |
| Animate a model's named parts, and see where everyone stands and looks, so *"put a tree in front of me"* lands in front of you, in VR too (a look-only connection sees only your own position) | |
| Ask your tab to join a session from a link you give it: nothing happens until you press **Join** on the card in the tab (see below) | |
| Write small code behaviours, and generate 3D models with **your** mesh provider when you have one | Do more than you can: a **viewer's** Claude can look but not build, and locked objects stay locked |
| Take a picture of the scene to check its work, and save the open scene as a new version in your Library (see below) | Keep working after you close the tab |

### Joining a session from a link

Give Claude a session or invite link and ask it to join. Your tab shows **Join a session?**, naming the
session and who asks (*Claude (connector)*). **Cancel**, or 90 seconds with no answer, refuses. After **Join**
the app's usual questions still apply: leaving your current session, another signaling server, the host's
Approve, and what to do with work you have open. One question at a time: if another is open in the tab, Claude
is told to try later. A look-only connection cannot ask to join.

Claude only says it joined once the connection is really up. If the session cannot be reached, the host refuses
or you cancel, it tells you what happened, and **status** shows the last result and whether the host is still
deciding.

### Saving the scene

*"Save this"* is the same save as **Ctrl+S**: a new version, and **Version history** can bring back older ones.
In someone else's session it saves on the host. A viewer cannot save, a private scene cannot be saved this way,
and Claude cannot write over a different scene: if the name it picks is taken, it is told to choose another or
to ask you to open that scene first.

### Importing files

Claude cannot import a model or file through the connector: it has no file on your computer to send. Drop the
file into the tab yourself, then ask Claude to place or change it.

### Scripts, spin and particles

- **Scripts** run every frame in a sandbox, on a view of their object, starting again from the base pose. Write
  the pose from the time, as in `object.rotation.y = base.rot[1] + time * speed`. Something like `+= 0.01` will
  not build up. Claude gets a warning when a script cannot work as written, and errors from running scripts
  appear in **status**.
- **Animated objects:** on an object that is being animated, Claude reads and edits the pose you authored, and is
  told it is animated and where it is right now.
- **Particles** on a rotated parent: in world space, an emitter can follow the object (*a rocket's exhaust*) or
  keep world axes (*a fire that burns straight up*). Gravity always points world down.

## See and undo what it did

Every step Claude takes is a line labelled **Claude (connector)** in **Agent activity**, with its
own **Undo**. Anyone in the session sees the changes as they happen, and anyone with edit access
can undo them from their own screen.

## Stop it

- **Disconnect** (next to the chip, or in Settings ▸ Connected apps) stops Claude at once, including
  a step it is in the middle of. Press Connect Claude again to continue.
- **Revoke** in **Settings ▸ Connected apps** removes the connector's access to your account
  completely; claude.ai has to be approved again before it can work in any tab. You can also
  remove the connector in claude.ai's settings.

## Privacy and limits

- Nothing runs on our servers except a relay: Claude's request goes to your tab, your tab does the
  work, and the answer goes back. Your scene is never stored by the connector, and we do not log
  what Claude asks or what your tab answers — only counts (how many calls, how long they took).
- Pictures come from the theprototype canvas only, downscaled, and never while the tab is hidden.
- There is a fair-use limit on calls per minute. If Claude goes too fast it is told to wait a few
  seconds; ask again and it continues.
- Generating 3D models has its own limit per hour, because each one costs you credits with your mesh provider.
  A request your tab refuses does not count.

See also: [Build with an AI agent](build-with-an-agent.md) · [Assistant](assistant.md) ·
[Security](../security.md)
