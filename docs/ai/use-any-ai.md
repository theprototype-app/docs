# Use any AI

theprototype works with AI in two different ways, and both live in one place: **Settings ▸ AI**.
This page tells you which one you need, then how to set each one up.

## Which one do I need?

| I want… | You need | Where |
|---|---|---|
| an AI app I already use (Claude, ChatGPT, Gemini CLI, VS Code, Cursor) to **build in my scene** | the **connector**: no key, you sign in with your theprototype account | **Settings ▸ AI ▸ AI apps that work in your scene** |
| the app's **own assistant** (the AI window, the quick prompt bar, voice typing, Generate 3D model) to use **my key** | a **provider**: your API key for Grok, Gemini, an OpenAI-compatible server, Meshy or ComfyUI | **Settings ▸ AI ▸ AI inside the app (your key)** |
| an agent in **my session** from the open-source app or Claude Code | the **agent bridge** (an invite link) | **Settings ▸ AI ▸ Coding agents**, see [Build with an agent](build-with-an-agent.md) |

You can use both at once: the connector does not need a key, and a key does not need the connector.

## AI apps that work in your scene (the connector)

One server for every app: **`https://theprototype.app/mcp`**. The app signs in to your theprototype
account, and its tools run **in your own open tab, with your access**. Everything it does shows up
for everyone in your session and can be undone, like your own edits.

What every app needs:

- a theprototype account, signed in on theprototype.app;
- a theprototype tab that **stays open and in front** while the app works — the tools run there;
- **Connect Claude** pressed in that tab once (in the AI window, or **Settings ▸ AI ▸ AI apps that
  work in your scene**). The button is called Connect Claude, and it connects every app you allowed:
  the chip then names the app that is working, for example **ChatGPT connected · this tab**.

When an app signs in, theprototype's approval page names **where it returns**. A badge (Claude,
ChatGPT) appears only for that app's own exact address. Any other app shows the name it gave itself
with *"theprototype has not checked it"*, and an app on your computer (Claude Code, Gemini CLI) gets a
warning to allow it only if you started it yourself. Untick **Allow changes** for a look-only connection.

### Claude (claude.ai, the desktop and phone apps, voice)

The full guide is [Use theprototype from claude.ai and voice](claude-connector.md). In short: press
**Add to Claude** in the AI window, or in claude.ai open **Settings ▸ Connectors ▸ Add custom
connector** and enter `https://theprototype.app/mcp`; approve it; switch it on for your chat.

### ChatGPT (developer mode)

1. In ChatGPT open **Settings ▸ Apps** (called Connectors on some plans) **▸ Advanced settings** and
   turn on **Developer mode**. ChatGPT warns that custom apps are not checked by OpenAI.
2. Press **Create**, name it **theprototype**, enter `https://theprototype.app/mcp`, choose
   **OAuth**, tick the trust box and press **Create**.
3. ChatGPT sends you to theprototype's approval page, which shows the **ChatGPT** badge. Press **Allow**.
4. In a chat, add theprototype from the **+** menu (Developer mode), then ask: *"What can you do here?"*

Which ChatGPT plans may use write tools in developer mode changes over time; with a plan that only
allows reading, ChatGPT can look at your scene and take screenshots but not build.

### Gemini CLI

Add the server to `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "theprototype": { "httpUrl": "https://theprototype.app/mcp" }
  }
}
```

Start `gemini`, run `/mcp auth theprototype`, and approve in the browser page that opens (it is an
app on your computer, so the page warns you; allow it if you just started it). `/mcp` lists the tools.

### VS Code (Copilot agent mode)

Run **MCP: Add Server** from the Command Palette, pick **HTTP**, enter `https://theprototype.app/mcp`
and the name **theprototype**. Or add it to `.vscode/mcp.json`:

```json
{
  "servers": {
    "theprototype": { "type": "http", "url": "https://theprototype.app/mcp" }
  }
}
```

VS Code opens the approval page when the server first starts. Use the tools from the Chat view in
**Agent** mode.

### Cursor

Add it to `~/.cursor/mcp.json` (or **Settings ▸ MCP ▸ Add new MCP server**):

```json
{
  "mcpServers": {
    "theprototype": { "url": "https://theprototype.app/mcp" }
  }
}
```

Cursor opens the approval page the first time you use it. **Tool limit:** Cursor has limited the
tools across **all** your servers to about 40. theprototype lists 35; with several other servers
switched on, turn some of their tools off so theprototype's fit.

### LM Studio, Open WebUI and other local apps

These need an app version that can add a **remote** MCP server with **OAuth sign-in**. If yours only
runs local (stdio) servers or takes an API key, it cannot use the connector yet; use a
[provider](providers.md) for the app's own assistant instead.

### What works where

| App | Add the server | Sign in | Build (edit tools) | Screenshots come through | Follows theprototype's instructions | Checked |
|---|---|---|---|---|---|---|
| Claude (claude.ai, apps, voice) | Settings ▸ Connectors | yes | yes | as images | yes | 2026-11-01, in the directory |
| ChatGPT (developer mode) | Settings ▸ Apps ▸ Developer mode | OAuth | per plan | as images | not yet checked | steps from OpenAI's docs, 2026-11-23 |
| Gemini CLI | `settings.json` | `/mcp auth` | yes | not yet checked; `screenshot` also returns a `frame` text | not yet checked | steps from the Gemini CLI docs, 2026-11-23 |
| VS Code (Copilot agent) | `mcp.json` | on start | yes | not yet checked | not yet checked | steps from the VS Code docs, 2026-11-23 |
| Cursor | `mcp.json` | on first use | yes | not yet checked | not yet checked | steps from the Cursor docs, 2026-11-23; ~40-tool limit |
| LM Studio / Open WebUI | — | — | — | — | — | needs remote MCP + OAuth |

"Checked" is the date someone last tried that app end to end, or where the steps come from until
then. Apps change their menus often: if a step does not match, the app's own MCP help is right.

An app that cannot show pictures still gets something useful from `screenshot`: its result carries a
short **`frame`** text describing what the camera sees.

### Revoke an app

**Settings ▸ AI ▸ AI apps that work in your scene ▸ Connected apps** lists every app you allowed,
named by the app it belongs to, with what it may do (*can build* or *can look*), where it returns
and when it was last used. **Revoke** on a row removes that app only; **Disconnect all** removes every
one and ends this tab's link. **Settings ▸ Account ▸ Connected apps** leads to the same list.
**Disconnect** beside the chip stops whichever app is working right now without revoking anything.

## AI inside the app (your key)

The app's own assistant, voice typing and Generate 3D model run with **your** key or server, set up in
**Settings ▸ AI ▸ AI inside the app (your key)**:

- **Chat providers**: Grok, Gemini or any OpenAI-compatible server — see [Providers](providers.md)
  and [Local & small models](local-models.md);
- **Voice typing**: a speech-to-text server for the assistant's mic;
- **Mesh providers**: Meshy or a self-hosted ComfyUI — see [3D generation](generation.md).

Keys are stored in this browser only and sent only to the provider you set up.

<!-- roadmap 84 (connect any AI) adds its presets and "Test connection" here, in this section and in the
     same Settings card. Nothing of it is described yet. -->

## Related

- [Settings ▸ AI](../tools-and-connections.md): every row on the page
- [Use theprototype from claude.ai and voice](claude-connector.md)
- [Build with an AI agent](build-with-an-agent.md)
