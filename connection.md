# Connection

How peers find each other, how to invite someone into your scene, and how to point the app at a signaling server you trust.

ThePrototype is peer-to-peer: once two browsers connect they talk **directly** over WebRTC, and the whole scene replicates between them. The only shared infrastructure is a small **signaling server** (PeerJS) used to introduce peers to each other — it never sees your scene data.

## The Connect panel

The Connect panel is the bar at the top of the screen. Since 1.35 it is either **pinned** — a full-width bar along the top edge, the default on a touch screen — or **floating** — the centred pill, the default with a mouse; switch with the **Pinned / Float** button in its drawer's header (see [The Connect bar](https://docs.theprototype.app/controls.md#the-connect-bar)). A floating bar with no room on the top row shrinks to a compact dot and chevron, and grows back when room returns. You can move it anywhere and hide it in [Edit positions](https://docs.theprototype.app/controls.md#the-connect-bar) or by unticking **Connect bar** in *Customize toolbar…*; on a folded phone the Connect chip stays.

It has two halves:

- **📋 Your ID** — the button on the left shows your own peer ID. Click it to **copy your invite link** (your app URL with your ID attached, e.g. `https://theprototype.app/#AB12CD`) to the clipboard. Until the connection to the signaling server is ready it reads *Generating…*.
- **Connect field** — paste a peer's ID into *Enter peer ID to connect* and press **Connect** to request a connection.

Since 1.30, once you are connected the bar **collapses to a compact chip** — the status dot, the avatars of who is here
and your mic; click it to open the full bar again (its collapse button folds it back). On a phone the bar is always the
chip — tap it for your ID, the join field, Info and Toasts. The signaling link's attempt count is in the drawer's
**Info** tab.

### The status dot

Since 1.32 the connection status is a **coloured dot**. On a computer the full bar keeps your invite ID and the peer-ID
field, with the dot at its left end. On a phone the chip at the top of the screen says the state beside the dot —
**Connected**, **Connecting…** or **Offline** — whenever the top bar has room. When the bar is crowded (people are
connected and you are in a call, so the peers button and the microphone take the space) it shrinks back to the dot and
a ▾ (and the microphone while you are in a call).

| Dot | Means |
|---|---|
| grey | not connected |
| yellow, pulsing | connecting, waiting for someone to approve, or reconnecting to the peer server |
| green | connected |
| red | the peer server cannot be reached (the app keeps retrying) |

Point at the dot — or press and hold it on a touch screen — for the full sentence, such as *Connected to 2 peers*;
while the signaling link is down it also says how long it has been trying. On a phone a tap on the chip opens the full
connection details.

![The phone's top bar when it is crowded: the logo, the connection chip with a green dot, ▾ and the microphone, then the bell and the peers](https://docs.theprototype.app/img/connection/status-dot-phone.webp)
*Figure: A phone's crowded top bar: the chip keeps the connection dot.*
### Who is here: the peers panel

The peers button in the top bar (beside the bell, with the number of people) opens the **Connected** panel. Its header
matches the notification centre's, and each person is **one row**: their avatar, their name (shortened with … — point
at it for the full name), a second line with where they are and their role, and their actions on the right — **Watch**,
**Go to** or the role list. On a computer the panel is 320–420 px wide and grows with long names, so nothing wraps or
breaks. On a phone it opens as a sheet like the notifications: a grab bar on top, and a swipe down closes it.

![The Connected panel on a computer: five people, one row each — avatar, name, the scene they are in and their p-number underneath, and Editor or Viewer with Go to or Watch on the right](https://docs.theprototype.app/img/connection/peers-panel-desktop.webp)
*Figure: The Connected panel on a computer.*
Right-click a person (long-press on touch, <kbd>Shift</kbd>+<kbd>F10</kbd> from the keyboard) for the **peer menu**:
their profile, Go to, Watch, Mute, Hide — and, for the host or an admin, **Remove from session** and **Remove and
block**. See [Users and moderation](https://docs.theprototype.app/people.md). An AI agent shows a robot and "AI" instead of a character.

### Inviting someone

1. **Copy your invite link** (the 📋 button) and send it to a friend.
2. When they open the link, their app automatically sends **you** a connection request.
3. You get a **Connection request** toast — press **Approve** and you are connected.

Or do it by ID: they paste your ID into their Connect field and press Connect; the same approval toast appears on your side.

To skip the approval card, send an **invite link** instead (**Connect ▸ Request AI**, a *Person* or an *AI agent*
tab): it joins in one step with the role you chose, for a limited time. See [Invite people and agents](https://docs.theprototype.app/invites.md).

### What guests see

![Connect ▸ Info ▸ Guests see](https://docs.theprototype.app/img/connection/guests-see.png)

The host decides how much of their library a guest sees: **Connect ▸ ▾ (Info) ▸ Guests see**.

| Setting | Guests see |
| --- | --- |
| **Current scene's files** (default) | the open scene's file and the files it uses |
| **Every scene on this device, and shared files** | the above, plus every scene file on this device and every file already shared in the session |
| **Whole library** | every file and folder in your Library |
| **None** | nothing |

Changing it updates every guest's view straight away. The host's device answers a download only for files it is
currently showing that guest, so narrowing the setting also stops downloads of files no longer shown.

### Saving as a guest

Your edits land in the host's scene. **Save on host** (Explorer, on the session's row) saves it into the host's
library; **Copy to my library** brings a file to yours. A view-only guest can copy, not save on host.

### Reloading while joined

*Since 1.48.1.* A guest who reloads the page — or whose phone reloads it — goes straight back into the session it was
in, on the same seat and with no new approval card, instead of being asked *Restore previous session?*. The restore
offer still appears when there is no live session to go back to. A phone whose screen turns off, or that switches to
another app, keeps its link for up to a minute.

### A link in a tab that is already open

You do not have to reload to follow an invite. Paste the link into the **address bar** of the tab that is already running the app and press <kbd>Enter</kbd>: the app dials that session on the spot, with your scene and your session id intact. (The Connect field takes a bare ID, not a link.)

A few cases ask first, or refuse with a message:

- **Already in a session** — *You're in a session with Ada (75F41). Leave it and join 3B0C2?* with **Leave & join** and **Stay**.
- **Your own link** — *That's your own invite link — send it to somebody else to have them join you.*
- **Someone you are already with** — *Already connected to Ada (75F41).*
- **A link that names another signaling server** — *Join 3B0C2 on peerjs.example.com?* with **Join** and **Cancel**; joining switches server without a reload, exactly like **Apply** below. If that server cannot be reached you are back online on your previous server within a second, with the same session id, so the invite link you shared keeps working.

### The request, and how it ends

A connection request waits for the host. Three things can end it, and each one says so on both sides:

- **Approve** — you are connected. The card offers **View only** and **Editor access** where roles are in use, and a plain **Approve** where they are not. Since 1.40 a **View only** joiner gets the room's HUD, HUD values, shader graphs, animation, look and room anchor straight away, and an **Editor access** joiner is an editor on their own screen as soon as the connection opens.
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

## Public rooms (theprototype.app)

On theprototype.app, the **Rooms** button in the top bar lists **public rooms** — sessions their hosts chose to list —
and lets you list your own. Browsing is open to everyone; listing a room needs you to be signed in (profile menu).

Your room's panel has a **Room name**, a **Short description** and these switches:

| Switch | What it does |
|---|---|
| **List this room publicly** | shows the room in everyone's Rooms list while you are online (a room whose host goes away drops off within about a minute and a half) |
| **Require approval to join** | **Join** becomes **Request to join**: the request lands on your approval card as *"‹name› wants to join ‹room›"*, and you approve or reject it as usual |
| **Allow guests to join automatically (view-only)** | people who are not signed in may come in to watch. Off while approval is required or the room has a code |
| **Enable room screenshot** | the list card shows a picture of your scene instead of a coloured initial |
| **Room code** | list the room first, then type a code and **Set** it: someone who knows it gets in as a viewer **without** waiting for approval. A listed room with a code shows 🔒 |

**When someone joins automatically** (*new in 1.44*) — a guest through *Allow guests to join automatically*, or
anyone with the room code — you get a notice saying who came in, with **Turn off** (stops automatic joining) and
**Remove**, and the same notice stays in the notification centre. While a listed room lets guests in, the Connect bar
reads **Public · guests join**. **Remove** takes them out and keeps them out while your tab stays open.

**AI agents ask first** (*new in 1.48*). A dial that says it is an AI agent never rides *Allow guests to join
automatically*: it gets the approval card, with a robot on it, unless you also turn on **Settings ▸ Connection ▸ Let
AI agents join as guests** (off by default). An [invite link](https://docs.theprototype.app/invites.md) always lets an agent in with the role it
carries. "AI agent" is what the joining app says about itself, so this is about seeing who knocks, not security: an
agent that hides it is just a guest, view-only like any other.

Joining a coded room asks for the code (*"🔒 ‹room› needs a code"*). The right code goes straight in; a wrong one is
refused, and five wrong codes lock that person out for ten minutes. If the room also requires approval, **Ask the host
instead** sends an ordinary request. The code itself is never stored on the server or sent in the clear — only your
device can check it, so a code set on another device of yours has to be set again here.

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

## Smoother movement on a bad connection

*New in 1.44.* Avatars, VR hands, objects being dragged or held, possessed rides and physics bodies travel on a
second, **fast** connection between each pair of players. It never waits for a lost packet to be sent again — the
next position, a twentieth of a second later, simply replaces it. Scene edits (adding, deleting, renaming, finishing
a move — every change you make) stay on the **reliable** connection, so they still arrive complete and in order.

Nothing to switch on: it opens by itself when both players run 1.44 or newer, and with someone on an older version
the session uses the reliable connection for everything, as before. Measured on a simulated lossy link (two peers,
20 updates a second), 95 % of the gaps between updates were at most:

| packet loss | before | 1.44 |
|---|---|---|
| none | 57 ms | 57 ms |
| 5 % | 249 ms | 74 ms |
| 10 % | 249 ms (worst 1.3 s) | 99 ms (worst 154 ms) |

A message bigger than about 12 KB (rare for a pose) goes on the reliable connection, and when a movement stops its
last position is re-sent reliably a quarter of a second later, so nothing is left a few centimetres off.

**People who drop out leave the list** (*1.44*): someone whose app crashed or lost its connection now leaves the
Users list on their own within about half a minute (it used to keep a "ghost"), and leaving a session no longer shows
*Connection error*.

## When the signaling link drops

The link to the signaling server is not the link to your peers — losing it does not end a session you are already in, it only stops new people finding you. When it drops the app reconnects on its own, backing off a little further between tries and **never giving up**, and the [status dot](#the-status-dot) pulses yellow while it is retrying so a dead link does not read as a dead app. Coming back online, or returning to the tab, retries immediately instead of waiting out the backoff — and since 1.32 it does so **silently**: switching apps on a phone and coming back no longer toasts. If the server stays unreachable for about a minute, the dot turns red and **one** entry appears in the notification centre; the retries carry on. A peer connection that closed is rebuilt rather than abandoned.

### When the connection drops

After a short network drop (a Wi-Fi hop, a closed lid) or a signaling-server blip heals, a person who joined your room
keeps the role you gave them: the role in **Users** stays as it was and their edits keep arriving. Before 1.45, on the
hosted site, an Editor came back from such a drop as View-only — their edits stayed on their own screen and you never
saw them. There is nothing to set.

A drop longer than the reconnect window (about 15 seconds, plus a dial already in flight) still ends the session for
that person; they rejoin with the invite link.

## Diagnostics you can copy

**Settings ▸ About ▸ Copy diagnostics** puts a bundle on your clipboard: the version, this session's peer and scene counts, the scene's [budget numbers](https://docs.theprototype.app/performance.md), the last uncaught error and the last 300 log lines. A toast confirms *Diagnostics copied to the clipboard*.

Since 1.35 a line that repeats back-to-back is written **once with a count** — `WARN [console] … (×180, last 10:42:07.311)` — so a burst of one warning can no longer push the useful lines out of the log.

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
| *Could not reach … — back on your previous peer server.* | **Apply** (or an invite link that names another server) could not open that server, so nothing changed: you are back online on your previous server with the same session id, and your invite link still works — check the host, port and path. |
| A **red** status dot, and one *Can't reach the peer server — still retrying.* entry in the notification centre | The link to the signaling server has been down for about a minute; the app keeps retrying on its own and never gives up, and the dot turns green or grey again once it is back. Shorter drops — a tab switch, a moment offline — reconnect silently. Your open session keeps going meanwhile. |
| *Cannot reach the signaling server - the connection request was not sent.* | You pressed **Connect** while the signaling link is down. Wait for the status dot to stop pulsing, or switch servers in Settings ▸ Connection. |

## The status page

**[status.theprototype.app](https://status.theprototype.app)** answers *is the service up?* It is checked from outside
every five minutes:

| Check | What it covers |
|---|---|
| **The app** | theprototype.app itself |
| **Accounts, saves and community** | sign-in, cloud saves, community scenes |
| **Signaling** | connecting people to each other |
| **TURN relay** | the relay used on networks that block direct connections |
| **Community pages and error reports** | the community pages and the [error reports](https://docs.theprototype.app/privacy.md#anonymous-error-reports) (since 1.39) |

Most of the app is peer-to-peer and keeps working while a service is down — a session you are in carries on. Sign-in,
cloud saves and the community need the service. An outage opens an issue in
[github.com/theprototype-app/status](https://github.com/theprototype-app/status) and closes it on recovery. The checks
never count as visits or errors.
