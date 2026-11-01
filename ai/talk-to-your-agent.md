# Talk to your agent

!!! info "New in 1.50"

Once an AI agent is in your session ([Build with an AI agent](https://docs.theprototype.app/ai/build-with-an-agent.md)), you can talk to it from the
app: the **AI assistant** window lists the agents in the session next to your own assistant. Pick one and type — or
speak — and everyone in the session sees the conversation, the replies as they stream in, and every step the agent
takes in between. The agent's terminal stays a second window onto the same conversation.

## Pick the agent

Open the AI assistant window and choose the agent in the target list at the top, for example
**Claude · agent via MCP** or **grok-3-mini · agent REPL**. Your configured assistants stay in the same list; a
session can use both.

The line under the list says what the agent is doing:

- **listening** — it is waiting for you; type away.
- **working** — it is on a request. Its steps (A8 action lines) appear between the messages, each with Undo.
- **away** — it is connected but not listening. Ask it in its terminal (below).
- **muted** — the host muted it; nothing reaches it until it is unmuted.

## Make Claude Code or Claude Desktop listen

An MCP agent (Claude Code, Claude Desktop) only acts while its model is running, so it has to wait for your
messages. In its terminal, type once:

> listen to my theprototype session

It then loops by itself: wait for a message → build → reply → wait again. Whatever you type in the terminal still
works, and shows in the app tagged **via terminal**, so the conversation is complete whichever window was used.

An agent started with `npx -y @theprototype/agent repl …` (your own OpenAI-compatible model) needs no terminal at all:
app messages go straight in.

## Stop, mute, who may talk

- **Stop** (in the window while the agent works) ends its current request: its next scene change is refused as
  *cancelled*, and the next message starts fresh.
- **Editors and admins** can ask the agent to build. **Viewers** can ask questions; the agent will not change the scene
  for them — that is enforced by the agent's page, not left to the model.
- The **host** (or an admin) can right-click the agent in the Connected panel ([peer menu](https://docs.theprototype.app/people.md)) and choose
  **Mute agent** — nothing reaches it until unmuted — or remove it from the session.

## Pictures in the chat

Press **+** left of the microphone: *From device…*, *Camera* (phones), *From Explorer*, *Viewport screenshot*, or
*Selection — ask about this* (a picture of the selected object on its own, with a line naming it). You can also paste a
picture, drop files on the window, or drag a picture from the Explorer onto it. Up to 4 per message.

- Every picture is **shrunk on your device** (long edge 1568 px, about 1 MB) and its **EXIF data, including a phone's
  GPS location, is removed before it is sent**. iPhone HEIC photos work.
- The agent sees the picture, and its bridge also saves it to a private temporary file (removed when the bridge exits)
  whose path comes with your message — for a skill such as [img2threejs](https://docs.theprototype.app/ai/img2threejs.md) that wants a file.
- **Keep in Explorer** (the bookmark on a picture) turns it into an image in **Library ▸ References**, shared with the
  session and listed under **Scene ▸ references**, so it saves with the scene. *Settings ▸ Tools & connections ▸ Chat pictures ▸ Keep
  sent pictures in Explorer* keeps every picture you send (off by default).
- Editors and admins attach pictures; viewers see them.

## Models and files from the agent's machine

- **`import_model`** brings a GLB the agent made or found (img2threejs, Blender, a download): a self-contained binary
  glTF up to 25 MB, through the app's own import (optimizing, LOD, the device-budget check). Named nodes stay a
  hierarchy you can select and animate, it is **one undo step**, everyone sees it, and the model records where it came
  from (tool, source, licence, who, when, file hash) in its Properties.
- **`import_file`** brings a PNG / WebP image (up to 16 MB), a JSON file (up to 2 MB) or a `.tpanim` clip. The file
  lands in **Explorer ▸ Generated** for everyone, its type read from the bytes and its metadata stripped; a generator's
  input can ride beside it (`knight_walk.png` + `knight_walk.pixling.json`). An image is also placed as a card — crisp
  for pixel art, one frame of a sprite sheet, optionally turning to face each viewer. See
  [Pixel art with Pixling](https://docs.theprototype.app/ai/pixling.md).
- Only editors' and admins' agents import; a viewer's agent is refused.

## Chats are files

Every conversation is a **`.tpchat`** file in **Explorer ▸ Scene ▸ chats**. It saves with the scene — the scene file,
autosave, a cloud room's save — so a reload or someone joining later has it.

- The **history** icon in the window lists the scene's chats (newest first, with search, which agent, and an unread
  dot); **New chat** (+) starts an empty one. **Double-click** a chat in the Explorer, or drag it onto the window, to
  reopen it there.
- When you reopen an older chat, the agent receives its last 20 messages and a short summary, and can page further back
  itself — its own terminal does not remember the old conversation.
- Right-click a chat in the Explorer: *Open in AI assistant*, *Rename*, *Include when publishing*, *Download as
  Markdown*, *Download (.tpchat)*, *Delete chat*. A downloaded `.tpchat` dropped back in joins the scene's chats.
- **Private by default:** a chat is left out of a `.tpscene` download, Publish, an export as a game and a `.tp` project
  export unless *Include when publishing* is on for it. The export says how many chats it left out.
- Editors and admins write chats; viewers read them. A chat over about 50 MB turns its oldest pictures into thumbnails;
  the words are never dropped.

## In VR

The VR AI panel talks to the same agent: type on the VR keyboard, or hold the talk button and speak (the app's voice
typing). Replies come back as text.
