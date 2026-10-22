# Build with an AI agent

You can invite an AI agent — Claude Code, Claude Desktop, or any tool that speaks
[MCP](https://modelcontextprotocol.io) — into your session and build with it. Hand it a link,
it joins like any other peer, and you watch the scene grow live. Everything it does is
replicated to everyone and undoable, exactly like a person's edits.

!!! info "New in 1.45"
    Agents join from a link, see the scene through screenshots, and get the app's full tool set
    (objects, flow nodes, physics, and mesh generation through *your* provider).

## For you, the person in the session

1. **Give the agent a way in.**
    - *Plain link:* copy your session link (the peer id in the Connect bar). The agent knocks, and
      you press **Approve** on the request card — it carries a robot badge. On theprototype.app
      with accounts, Approve may admit it **view-only**: a view-only agent cannot change anything
      (it is told so plainly). Give it **Editor** in Users ▸ role, or use an invite instead.
    - *Invite (recommended):* **Connect ▸ Request AI** makes a single-use, short-lived link that
      joins in one step with the role you pick (Edit by default) and shows you the ready-made
      command to paste into your agent.
2. **Tell the agent what to build**, in its own chat: *"Join my theprototype session and build a
   campfire with six rocks, a flickering light and a spinning sign."*
3. **Watch and steer.** Its changes appear as they happen. Undo (**Ctrl+Z**) takes back one of
   its tool calls at a time; edit alongside it — it notices your changes.

What an agent never does: move your camera, read anything outside the scene, or use API keys of
its own inside the app. If it generates a 3D model (*generate_mesh*), that runs on **your** mesh
provider (Settings ▸ AI ▸ Mesh generation) — you see who asked on the progress card and can
cancel it there.

## For the agent (setup)

```sh
claude mcp add theprototype -- npx -y @theprototype/agent mcp 'https://theprototype.app/#F0FD3'
```

Claude Desktop: add `npx -y @theprototype/agent mcp <link>` under `mcpServers`. Node 20 or
newer. The first run downloads a headless Chromium unless Chrome, Edge or Chromium is already
installed. The bridge opens the link in that browser — it *is* the app, at the app's own version
— joins, and turns the app's tools into MCP tools.

A good first exchange is three calls: **status** (am I in, can I edit?), the tool list, and one
batched **create_objects**. Then **screenshot** to check the result.

### What the agent gets

| tool / method | what it does |
|---|---|
| the app's tools | `create_objects`, `update_objects`, `delete_objects`, `group_objects`, `create_flow_nodes`, `update_flow_nodes`, `set_physics`, `create_joints`, `control_simulation`, behaviours where available, `generate_mesh` when the host has a provider — with their full JSON schemas |
| `status` | joined or waiting, its role and whether it can edit, who is connected, which tools or modules are missing and why |
| `screenshot` | a clean picture (no gizmo, grid or helpers) from a temporary camera — `iso`, `top`, `front`, `current`, or `focus` on one object — without moving anyone's view |
| `wait_for_edit` | waits until someone else changes the scene |
| `install_modules` | installs the modules the other peers run (games, tools) so the agent sees the same scene |
| `pending_offers` / `accept_offer` | answers questions the app asks (for example an admin-role offer) |

### Rules a good agent follows

- Read the scene first and edit by **uuid**.
- Put a whole request into **one** `create_objects` call (one undo step).
- Y is up, distances in metres, rotations in radians; the ground is y = 0.
- Motion is **flow nodes**: one behaviour node (spin, bounce, path patrol…) in an object's graph
  drives that object.
- Pin scenery with `set_physics` `mode: "static"` so Play does not collapse the scene.
- Never fight a person: a locked object is skipped, and the agent waits with `wait_for_edit`.

## Security notes

- An invite's token lives in the URL **hash**, which browsers never send to any server. Link
  preview bots (Slack, Discord, Telegram) cannot use it: joining needs a full WebRTC client and
  your live approval check. The risk is a link forwarded on, which single use, expiry, the "used
  by" line and **Revoke** in Users limit.
- An agent is a peer with your session's normal permissions — nothing more. Its edits go
  through the same replicated paths as yours.

## For developers: the in-page API

The bridge drives `window.tpAgent`, a supported, semver'd API that exists only when the URL
carries `&agent` (`#F0FD3&agent`) or `localStorage.agentApi = '1'`. Any driver that can evaluate
JavaScript in the page can use it: `tools()`, `systemPrompt()`, `exec(name, args)`,
`snapshot()`, `status()`, `waitForEdit(ms)`, `screenshot(opts)`, `pendingOffers()`,
`accept(id)`, `leave()`. The full contract is in the app repository's
[AGENT-SESSIONS.md](https://github.com/theprototype-app/core/blob/main/AGENT-SESSIONS.md) and
inlined in [/llms-full.txt](https://theprototype.app/llms-full.txt).

For a light peer without a browser (objects only), see the [Console Agent](console-agent.md)
(`--engine=wire`).
