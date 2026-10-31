# Console Agent

The console agent is a small Node.js tool that **joins a session as a peer** from a terminal
and builds or edits the scene — no browser needed. Use it to drive the scene from your own
LLM (REPL mode), or to expose the scene as tools an MCP host like Claude Code can call (MCP
mode).

It lives in the app repo under `tools/agent/`.

## Install

```
cd tools/agent
npm install
```

It ships a prebuilt WebRTC binary (`@roamhq/wrtc`) so peerjs can run in Node; no build step
on supported platforms (tested on Node 20, Windows x64).

## Joining a session

The agent connects by **peer id** — the id shown in the app's Connect box — and a person in
the session must **Approve** the join, exactly like any other peer:

1. In the app, copy your session peer id (Connect box).
2. Start the agent with `--peer <that id>`.
3. In the app, click **Approve** on the join request.

A stable `--id` that has already been approved rejoins **without** another prompt.

!!! tip "Public cloud rate limits"
    By default the agent uses the same public PeerJS cloud the app does, which can rate-limit
    rapid reconnects (HTTP 429). Reuse a stable `--id` to avoid re-approval churn, or run a
    local PeerServer and pass `--peer-server host:port` for development.

## REPL mode — drive with your own LLM

Point the agent at any OpenAI-compatible endpoint (Grok, Gemini, vLLM, Ollama, …):

```
node src/cli.js --repl --peer <hostId> \
  --api-url http://localhost:8000/v1 --api-key none --model my-model
```

or via environment variables:

```
AGENT_API_URL=https://api.x.ai/v1 AGENT_API_KEY=xai-... AGENT_MODEL=grok-3-mini \
  node src/cli.js --repl --peer <hostId>
```

Then type requests at the `scene>` prompt:

```
scene> build a 3x3 grid of boxes on the ground
scene> now make the middle one red and twice as tall
```

Slash commands: `/status`, `/list`, `/raw <json>`, `/quit`.

## MCP mode — drive from Claude Code or another MCP host

```
node src/cli.js --mcp --peer <hostId>
```

The server registers immediately over stdio and connects in the background; its tools report
"awaiting approval" until the join is approved, so nothing blocks on the human step. Register
it with Claude Code:

```
claude mcp add theprototype -- node /abs/path/to/tools/agent/src/cli.js --mcp --peer <hostId>
```

Tools exposed: `connect` (supply a peer id at runtime), `list_scene`, `create_objects`,
`update_objects`, `delete_objects`, `group_objects`, `get_status`.

## Smoke test

Prove the connection without an LLM — it scripts create → move → color → delete of one box:

```
node src/cli.js --smoke --peer <hostId>
```

## Flags

| Flag | Meaning |
|---|---|
| `--peer <hostId>` | session peer id to join (required for `--repl` / `--smoke`) |
| `--name <display>` | display name in the session (default `agent`) |
| `--id <id>` | stable peer id — a whitelisted id rejoins without re-approval |
| `--peer-server h:p[:insecure]` | use a local PeerServer instead of the public cloud |
| `--approval-timeout <s>` | seconds to wait for approval (default 120) |
| `--api-url / --api-key / --model` | OpenAI-compatible endpoint for `--repl` (or `AGENT_API_URL/KEY/MODEL`) |
| `--verbose` | log the connection state machine |

## What it can and can't see

The agent creates and edits objects and tracks what it has done, plus mutations it observes
from other peers. It does **not** parse full scene syncs (large GLTF transfers), so objects
that existed before it joined show up as *stubs* in `list_scene` — enough to reference by
uuid, but without full detail. For scene-building and editing from a prompt this is rarely a
limitation.
