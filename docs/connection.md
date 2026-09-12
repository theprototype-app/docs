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

!!! note "Approving is one-directional"
    A connection request waits for the host to **approve** it — there is no separate "deny" button; simply not approving leaves the peer unconnected. The requester sees a countdown beside *Requesting*, and your card shows how long that person has been waiting. A request nobody answers within 90 seconds ends by itself and offers **Try again**, so neither side is left waiting on something that will never happen; an expired card can still be approved, and approving simply dials them back. If a connection is stuck, the panel offers a **Retry** that closes the stale link and reconnects.

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

**Settings ▸ Connection ▸ Session size** is how many people you expect. Past that number an approval still works but warns you; at 16 the approve buttons say the session is full, because beyond that point the mesh degrades for everyone rather than only for whoever joined last.

!!! note
    How many peers work for you depends on your uplink, since each one sends to every other. Voice chat and live gestures are the bandwidth-hungry parts — a large scene is sent once per joiner, not continuously.

## Choosing a signaling server

Which signaling server you use decides *which world you can meet people in* — two people must be on the same server for their invite links to connect. Set this in **Settings ▸ Connection**.

| Mode | What it does |
|---|---|
| **Default** | Uses the server the app was built with, and **falls back to the public PeerJS cloud** if that server is unreachable. If no server was baked in, Default simply *is* the public cloud. |
| **Public PeerJS cloud** | Always the free public PeerJS cloud. No fallback. Fine for quick tests; not recommended for real sessions. |
| **Custom server** | Pin your own PeerJS server. No fallback. Takes effect on reload. |

**Custom server** reveals these fields:

- **Host** — your PeerJS host, no `https://` and no path (e.g. `peer.example.com`).
- **Port** and **Path** — TLS defaults are `443` and `/peerjs`.
- **Secure (wss)** — leave on unless you're testing a plain-`ws` server.
- **TURN URLs / username / credential** — a TURN relay for peers behind strict NATs. Blank means STUN-only (direct connections only).
- **STUN URLs** — optional extra STUN servers.

Press **Apply & reload** — the peer connection is created at startup, so switching servers reloads the page.

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
| *This session is full (16 people)* | Everyone connects to everyone, so a session has a ceiling. Someone has to leave before another person can join. |
| *Lost connection to the peer server, reconnecting…* | The link to the signaling server dropped; the app retries automatically. |
| *Could not reach the peer server. Please reload.* | Reconnection gave up — reload, or switch servers in Settings ▸ Connection. |
