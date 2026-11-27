# Your files, your screen and your scenes

*"Fix line 12 of door.js"*, *"show me the crates"*, *"save this and open the forest scene"*. Since 1.81 an AI app
working in your tab ([the connector](https://docs.theprototype.app/ai/use-any-ai.md)) and the in-app [Assistant](https://docs.theprototype.app/ai/assistant.md) can do three more things
for you, the person whose tab it is:

- **`files`** works with the files in your [Explorer](https://docs.theprototype.app/explorer.md).
- **`show`** opens your panels, moves your view and opens code for you.
- **`scene`** lists your scenes and opens another one.

These act for you, on your own screen, so only an assistant in **your own tab** gets them: an AI app through the
connector, or the in-app assistant. An agent that joined your session with an [invite link](https://docs.theprototype.app/ai/build-with-an-agent.md)
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

Reading, writing and making files works with text files only: `.txt`, `.json`, `.md`, `.cfg` and `.js` (new images,
sounds and models come in with the asset tools). A file can be up to 256 KB.

**Rename** and **move** work for every file: scenes, animations, sounds, videos, pictures and models. A scene renames
as a scene, the way **Rename scene…** does: its saved versions follow, and so does every Travel node that goes there.
Anything else that uses the file (a sound node, a texture) finds it by its content, so it keeps working. A node that
names the file only by its name would lose it, so then the rename is refused and the answer lists those nodes. It never
renames or moves onto a name that is already taken, and the answer says the old and the new place
(*Sounds/boom.ogg → Sounds/bang.ogg*). **Undo** on the line puts it back.

- **Undo.** Each change leaves a line with **Undo**, as your own edits do: *Claude changed "door.js" · Undo*.
- **Delete goes to Deleted.** A deleted file goes to the Explorer's [Deleted](https://docs.theprototype.app/explorer.md#deleted) bin, exactly as
  your own delete, and can come back. Before it deletes a folder with files in it, the app asks you on your screen
  (**Delete** / **Keep**). It also asks when your recycle bin is switched off, because then the file is gone for good.
  Emptying Deleted is always yours to do.
- **New files are private.** It never shares anything with the session, and it cannot put new files in a folder you
  share. A file someone else shared with you is read-only to it.
- **A viewer** in someone else's session can list and read files, but not change them.

## Your screen

`show` changes only **your own screen**, never anyone else's:

- **panels** lists every panel by its title, with a line on what it holds, and where each one is: open or closed,
  docked, in a sidebar, floating or in its own window, visible, in front. It only reads and never asks.
- **panel** opens, closes or brings forward one of your panels, by its title: Explorer, Objects, Inspector, Configure
  Scene, Flow editor, Animation, Timeline, UV editor, Shader editor, HUD editor, Code, Profiler, Statistics, Free
  assets, Preview, Debugger, Chat or Assistant, or the Dock and the two sidebars. It can also focus a panel, move it
  (to the dock, a sidebar or floating), maximize and restore it (<kbd>Esc</kbd> restores), and collapse or expand one
  of its own side panes. A panel opens where you keep it. Closing the dock or a sidebar hides it: every tab in it stays
  open.
- **layout** applies one of your named layouts (**Windows ▸ Layouts**), or saves the current one under a new name. It
  never overwrites a layout, and a file open in Code keeps its unsaved changes.
- **camera** moves your editor view to frame some objects (and can select them), goes to a spot, or lets you look
  through a scene camera.
- **code** opens a file, or a Script or Behaviour node's code, in your Code tab at a line, and can select some lines
  or a word. It *highlights* the lines without putting the cursor in your editor, so no on-screen keyboard comes up
  on a phone (an app can still ask to put the cursor there). It never changes the text.
- **reveal** shows a file or folder in your Explorer: the folders open down to it, it is selected and scrolled into
  view. It can also open a folder.
- **select** selects objects, adds to or takes from your selection, or clears it, without moving your view. When it
  clears, the Inspector and the Flow editor show the scene.
- **flow** opens the Flow editor on the scene flow, on an object's flow, or on one node (selected and framed).

It never opens sign-in, your account, Settings, a consent page, publishing or export, connected apps (Generate 3D
too), payment, or who may join your session. The Profiler and Statistics only show numbers, so they do open.

### It asks first

The first time an app wants to change your screen, your tab asks **one** question for everything it has not asked yet,
for example *Let ChatGPT open and close your panels and select things in them, move your view and open code for you?*
Reveal, select, flow and layouts count as panels. The question says what it never includes (sign-in, account,
settings, consent, publishing, connected apps or payment):

- **Always**: allowed from now on, on this device.
- **This time**: allowed until you reload the page.
- **Only this**: allows just the one thing it asked for (shown when the question covers more than one).
- **No**: not until you reload. The AI app then tells you where to look instead.

Only your press answers: nothing an app sends can answer the question for you. Your answers are per app: each app is
asked for itself, and a **No** to one does not stop another. An app that theprototype cannot name (it shows as *an AI
app*) is offered no **Always**, and an earlier **Always** does not count for it.

**Back** on the line undoes what `show` last did: the panel closes again, your view goes back. You can also say
*"go back"*. It remembers the last 10 steps.

**Settings ▸ Privacy ▸ Assistant on your screen** has one switch per kind for Claude: **Open and close my panels**,
**Move my view** and **Open code for me**. On is the same as **Always**; off asks again next time. All three are off to
start with, and they apply to this device only. Below them, every other permission you gave (another app's, or a
**This time**) has its own line with **Revoke**, and **Revoke all** takes everything back: every app asks again.

### When it waits

- It does nothing while you drag an object, draw a selection box or type somewhere else. It tries again a moment
  later.
- It does not move your view in a VR headset, or while you play (press <kbd>Esc</kbd> first).
- It does not move your view, or switch scenes, while you record a video, film with your phone (Film) or a sequence
  plays its shots.
- At most 6 calls a minute, and one camera move every 2 seconds.

## What Claude can read from your screen

`run` `ui` reads what your tab shows and changes nothing (no question, no line): your selection, the object in the
Inspector, the graph in the Flow editor, what the Shader editor shows, the open Timeline sequence, your camera, which
device you are on, Quality and what it lowered by itself, which panels are open and where, and what you allowed it to
do on your screen. `run` `stats` reads the Statistics and Profiler numbers. Its `target` switches which device your
Statistics judges for (Quest, phone or desktop) on this device only, and you get a line with **Back**.

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
- **A look-only connection** (an AI app approved without **Allow changes**) cannot use `files`, `show`, `scene` or
  `run` `stats`. It can use `run` `ui`, which only reads.
- `files` works only with what is in your own Explorer: not the files on your computer, and not a web address.

See also: [Use any AI](https://docs.theprototype.app/ai/use-any-ai.md) · [Use theprototype from claude.ai and voice](https://docs.theprototype.app/ai/claude-connector.md) ·
[Explorer](https://docs.theprototype.app/explorer.md) · [Code Workspace](https://docs.theprototype.app/code-workspace.md)
