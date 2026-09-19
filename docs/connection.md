# Connection

How peers find each other, how to invite someone into your scene, and how to point the app at a signaling server you trust.

ThePrototype is peer-to-peer: once two browsers connect they talk **directly** over WebRTC, and the whole scene replicates between them. The only shared infrastructure is a small **signaling server** (PeerJS) used to introduce peers to each other — it never sees your scene data.

## The Connect panel

The Connect panel is the pill at the top of the screen. On a wide window it is a centered pill; on a narrow/touch screen it becomes a full-width bar pinned to the top edge.

It has two halves:

- **📋 Your ID** — the button on the left shows your own peer ID. Click it to **copy your invite link** (your app URL with your ID attached, e.g. `https://theprototype.app/#AB12CD`) to the clipboard. Until the connection to the signaling server is ready it reads *Generating…*.
- **Connect field** — paste a peer's ID into *Enter peer ID to connect* and press **Connect** to request a connection.

### Inviting someone

1. **Copy your invite link** (the 📋 button) and send it to a friend.
2. When they open the link, their app automatically sends **you** a connection request.
3. You get a **Connection request** toast — press **Approve** and you are connected.

Or do it by ID: they paste your ID into their Connect field and press Connect; the same approval toast appears on your side.

### A link in a tab that is already open

You do not have to reload to follow an invite. Paste the link into the **address bar** of the tab that is already running the app and press <kbd>Enter</kbd>: the app dials that session on the spot, with your scene and your session id intact. (The Connect field takes a bare ID, not a link.)

A few cases ask first, or refuse with a message:

- **Already in a session** — *You're in a session with Ada (75F41). Leave it and join 3B0C2?* with **Leave & join** and **Stay**.
- **Your own link** — *That's your own invite link — send it to somebody else to have them join you.*
- **Someone you are already with** — *Already connected to Ada (75F41).*
- **A link that names another signaling server** — *Join 3B0C2 on peerjs.example.com?* with **Join** and **Cancel**; joining switches server without a reload, exactly like **Apply** below.

### The request, and how it ends

A connection request waits for the host. Three things can end it, and each one says so on both sides:

- **Approve** — you are connected. The card offers **View only** and **Editor access** where roles are in use, and a plain **Approve** where they are not.
- **Reject** — the request ends and the person is told: *AB12CD declined your connection request.* At the session's ceiling the card also offers **Tell them it's full**, which answers with *AB12CD's session is full (16 people). Try again when someone leaves.* and a **Try again** button.
- **Nobody answers** — after **90 seconds** the request cancels itself on both sides and offers **Try again**, instead of sitting on *Requesting* for ever.

While it is open the requester sees a countdown beside *Requesting*, and your card says how long that person has been waiting (*asked 34s ago*). An expired card can still be approved — approving simply dials them back. Dialling somebody who is not online ends the request too, rather than leaving it up beside a toast saying they are unreachable. If a connection is stuck, the panel offers a **Retry** that closes the stale link and reconnects.

!!! note "Waiting requests are capped"
    A rush of joiners folds into the Connect drawer rather than burying the screen, and when the queue is full the expired cards are dropped before the live ones.

Once connected, everything replicates automatically — objects, transforms, materials, the node graph, chat, pings, notes and voice.

## Selection locks

Selecting an object **locks it** so two people can't fight over the same thing:

- Your current selection *is* your lock — one lock per person, and picking a new object releases the old one.
- A locked object shows who holds it, tinted with that peer's color.
- To take over, open the object's right-click menu and choose **Request control**; the holder gets an Approve/Deny prompt.

If a peer disconnects, their locks are released and their avatar, cursor and hands are cleaned up automatically — only *their* locks; everyone else keeps theirs.

## Rooms: one session, several scenes

A **session** is the connection — the people you are linked to, and the project you
share. A **room** is simply everyone standing in the same scene, and the peer list
shows which scene each person is in.

Because a peer in another scene is looking at a different world:

- you will not see their avatar in your viewport,
- **Watch** is disabled for them, with the reason on the button ("In Arena — open
  that scene to watch them"),
- and if they travel away while you are watching them, watching stops and says so.

Open the same scene and all of it comes back. Nothing is lost by being apart — their
work is in the project, and travelling to their scene picks it up.

!!! note "Before anyone names a scene"
    A fresh session has no named scene, so everybody is in one **Untitled scene** and
    none of the above applies. The same goes for someone who has just joined: they
    are standing in your content without knowing its name yet, so they are never
    hidden on a guess.

## Bigger sessions

Everyone in a session connects to everyone else, directly. A room of ten is the tested target: joining takes roughly a third of a second, and every peer really does end up linked to every other peer.

A momentary network blip no longer throws you out, either. A peer that drops for a few seconds is given a window to come back and rejoin the same session; only when that window closes are they treated as gone.

### Session size

**Settings ▸ Connection ▸ Session size** is how many people you expect. It is a number you type; the default is **8**, and **16** is the ceiling you cannot type past.

- Below your number, nothing changes.
- Past it, an approval still works but the card warns you first.
- At 16 the **Approve** buttons are disabled and the card reads *this session is full (16)* — beyond that point the mesh degrades for everyone rather than only for whoever joined last.

!!! note
    How many peers work for you depends on your uplink, since each one sends to every other. Voice chat and live gestures are the bandwidth-hungry parts — a large scene is sent once per joiner, not continuously.

## When the signaling link drops

The link to the signaling server is not the link to your peers — losing it does not end a session you are already in, it only stops new people finding you. When it drops the app reconnects on its own, backing off a little further between tries and **never giving up**, and the Connect pill carries a chip while it is retrying so a dead link does not read as a dead app. Coming back online, or returning to the tab, retries immediately instead of waiting out the backoff. A peer connection that closed is rebuilt rather than abandoned.

## Diagnostics you can copy

**Settings ▸ About ▸ Copy diagnostics** puts a bundle on your clipboard: the version, this session's peer and scene counts, the scene's [budget numbers](performance.md), the last uncaught error and the last 300 log lines. A toast confirms *Diagnostics copied to the clipboard*.

It goes to your clipboard and nowhere else — paste it into a bug report, so a problem arrives with something in it.

## Choosing a signaling server

Which signaling server you use decides *which world you can meet people in* — two people must be on the same server for their invite links to connect. Set this in **Settings ▸ Connection**.

| Mode | What it does |
|---|---|
| **Default** | Uses the server the app was built with, and **falls back to the public PeerJS cloud** if that server is unreachable. If no server was baked in, Default simply *is* the public cloud. |
| **Public PeerJS cloud** | Always the free public PeerJS cloud. No fallback. Fine for quick tests; not recommended for real sessions. |
| **Custom server** | Pin your own PeerJS server. No fallback. |

**Custom server** reveals these fields:

- **Host** — your PeerJS host, no `https://` and no path (e.g. `peer.example.com`).
- **Port** and **Path** — TLS defaults are `443` and `/peerjs`.
- **Secure (wss)** — leave on unless you're testing a plain-`ws` server.
- **TURN URLs / username / credential** — a TURN relay for peers behind strict NATs. Blank means STUN-only (direct connections only).
- **STUN URLs** — optional extra STUN servers.

Press **Apply** (the **Apply changes** row) to switch now: the app leaves any open session, reconnects to the server you chose and **keeps your session id**, so an invite link you already sent stays valid. A toast confirms *Connected to … — your session id is unchanged.* If the new server cannot be reached within a few seconds you are put back on the previous one and told so; the **Reload** link beside the button is the fallback if anything looks stuck.

!!! tip "The fallback"
    In Default mode, if your self-hosted server can't be reached the app switches to the public cloud on its own and tells you: *"Your peer server is unreachable — switching to the public PeerJS server."* Custom and Public modes never fall back.

## Running a local build

If you run a local or self-built copy of the app, the first time you open it you'll see a one-time notice:

> It looks like you are running a local build of theprototype. Configure a peer signaling server in Settings for reliable connections — the public PeerJS cloud is not recommended for real use.

It carries an **Open Settings** button that jumps straight to **Settings ▸ Connection**, and it appears only once per browser. The default public cloud keeps a fresh install working with zero configuration, but for anything real you'll want your own server — the app repository ships Terraform + a PeerJS + Caddy + coturn setup for exactly this.

## When things go wrong

| Symptom | Meaning |
|---|---|
| *Peer is unreachable* | The ID is wrong or that person is offline — check the ID and ask them to stay open. |
| *Your session ID is already in use* | Reload the page to claim a fresh ID. |
| *AB12 did not answer in 90s* | Nobody approved your request in time, so it ended itself — press **Try again** to ask again. |
| *AB12 declined your connection request* | The host pressed **Reject**. Ask them before dialling again. |
| *AB12's session is full (16 people)* | Everyone connects to everyone, so a session has a ceiling. Someone has to leave before another person can join — **Try again** on the toast re-asks. |
| *Could not reach … — back on your previous peer server.* | **Apply** could not open the server you picked, so nothing changed — check the host, port and path. |
| *Lost connection to the peer server, reconnecting…* | The link to the signaling server dropped; the app retries automatically. |
| *Could not reach the peer server. Please reload.* | Reconnection gave up — reload, or switch servers in Settings ▸ Connection. |
