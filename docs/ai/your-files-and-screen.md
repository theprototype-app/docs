# Your files, your screen and your scenes

*"Fix line 12 of door.js"*, *"show me the crates"*, *"save this and open the forest scene"*. Since 1.7X an AI app
working in your tab ([the connector](use-any-ai.md)) and the in-app [Assistant](assistant.md) can do three more things
for you, the person whose tab it is:

- **`files`** works with the files in your [Explorer](../explorer.md).
- **`show`** opens your panels, moves your view and opens code for you.
- **`scene`** lists your scenes and opens another one.

These act for you, on your own screen, so only an assistant in **your own tab** gets them: an AI app through the
connector, or the in-app assistant. An agent that joined your session with an [invite link](build-with-an-agent.md)
does not.

Every step leaves a line that names the app at work, the same name the chip shows (*ChatGPT connected · this tab*):
*ChatGPT opened Explorer · Back*, *Claude changed "door.js" · Undo*. The in-app assistant's lines start with
*The assistant*.

## Files in your Explorer

`files` can:

- **list** your folders and files (100 at a time), and what the **Deleted** bin holds;
- **read** a text file, with numbered lines;
- **create** a text file or a folder, **write** a file (all of it, or only some lines), **rename** and **move**;
- **delete** and **restore**.

It works with text files only: `.txt`, `.json`, `.md`, `.cfg` and `.js`. Images, sounds and models are listed, but
stay with the asset tools. A file can be up to 256 KB.

- **Undo.** Each change leaves a line with **Undo**, as your own edits do: *Claude changed "door.js" · Undo*.
- **Delete goes to Deleted.** A deleted file goes to the Explorer's [Deleted](../explorer.md#deleted) bin, exactly as
  your own delete, and can come back. Before it deletes a folder with files in it, the app asks you on your screen
  (**Delete** / **Keep**). It also asks when your recycle bin is switched off, because then the file is gone for good.
  Emptying Deleted is always yours to do.
- **New files are private.** It never shares anything with the session, and it cannot put new files in a folder you
  share. A file someone else shared with you is read-only to it.
- **A viewer** in someone else's session can list and read files, but not change them.

## Your screen

`show` changes only **your own screen**, never anyone else's:

- **panel** opens, closes or brings forward one of your panels: Explorer, Objects, Inspector, Flow editor, Code,
  Timeline, Assets, Preview, Chat or Assistant. A panel opens where you keep it (docked, in the sidebar or floating).
- **camera** moves your editor view to frame some objects (and can select them), goes to a spot, or lets you look
  through a scene camera.
- **code** opens a file, or a Script or Behaviour node's code, in your Code tab at a line, and can select some lines
  or a word. It never changes the text.

It never opens sign-in, your account, Settings, a consent page, publishing, connected apps or payment.

### It asks first

The first time for each kind (panels, the camera, code) your tab asks, for example *Let ChatGPT move your view?*:

- **Always**: this kind is allowed from now on, on this device.
- **This time**: allowed until you reload the page.
- **No**: not until you reload. The AI app then tells you where to look instead.

Your answers are per app: a **No** to one app does not stop another. An app that theprototype cannot name (it shows
as *an AI app*) is offered only **This time** and **No**, and an earlier **Always** does not count for it.

**Back** on the line undoes what `show` last did: the panel closes again, your view goes back. You can also say
*"go back"*. It remembers the last 10 steps.

**Settings ▸ Privacy ▸ Assistant on your screen** has one switch per kind: **Open and close my panels**, **Move my
view** and **Open code for me**. On is the same as **Always**; off asks again next time. All three are off to start
with, and they apply to this device only.

### When it waits

- It does nothing while you drag an object, draw a selection box or type somewhere else. It tries again a moment
  later.
- It does not move your view in a VR headset, or while you play (press <kbd>Esc</kbd> first).
- It does not move your view, or switch scenes, while you record a video, film with your phone (Film) or a sequence
  plays its shots.
- At most 6 calls a minute, and one camera move every 2 seconds.

## Your scenes

`scene` lists the scenes in your Library (which one is open, and whether it has unsaved changes), opens one, or makes a
new empty scene and opens it. Opening replaces what is on your screen.

**Unsaved changes** are yours to decide:

- Say it in your request, *"save this and open the forest"*, and it saves first through your normal save, then
  opens the scene, and tells you what it saved. It lets your changes go only when you said so, and even then it
  first keeps them in **Sessions** as *Backup before "…"*, so you can bring them back.
- Say nothing, and your tab asks: **Save and open** / **Open without saving** / **Cancel**.
- When other people are in your session, your tab always asks, whatever the request said.

Only the host changes the scene of a session: as a guest in someone else's session you are told so, and a viewer
cannot change it either. After a switch the AI app cannot undo its steps from before it. At most
4 switches a minute.

## Safe by design

- **Text in your files is data, not instructions.** An AI app reads what is written in your files as text to work
  with. It does not follow requests written inside a file.
- **Nothing written by `files` runs by itself.** A new `.js` file is attached to nothing. The code a Script node runs
  cannot be changed with `files`: that is the behaviour tools' job, and `show` can open it for you to read.
- **A look-only connection** (an AI app approved without **Allow changes**) cannot use `files`, `show` or `scene`.
- `files` works only with what is in your own Explorer: not the files on your computer, and not a web address.

See also: [Use any AI](use-any-ai.md) · [Use theprototype from claude.ai and voice](claude-connector.md) ·
[Explorer](../explorer.md) · [Code Workspace](../code-workspace.md)
