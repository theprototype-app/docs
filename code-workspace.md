# Code workspace

The code workspace is one place for every piece of code in a scene: a [Script](https://docs.theprototype.app/nodes/script.md) node's code, a
[behaviour](https://docs.theprototype.app/behaviours.md), a `.js` script file from your Library, a module's own source (read-only), and the flow graph
itself as JSON. Each source is a **tab**, and your edits stay in the tab until you save.

![The code workspace docked beside the Explorer and the Node editor, with a Script node's code open](https://docs.theprototype.app/img/code-workspace/script-tab.webp)
*Figure: The code workspace docked beside the Explorer and the Node editor.*
## Where it is

It opens by itself when you ask for code:

- **Edit code** on a Script node, **Code** on a Behaviour node, or a double-click on any node that has code (see
  [Open code](https://docs.theprototype.app/main-graph.md#open-code)) — since 1.25 that includes a game's [Player](#the-players-code);
- a double-click on a `.js` file in the [Explorer](https://docs.theprototype.app/explorer.md), or right-click it ▸ **Open in code editor**;
- the dock's **＋** menu ▸ **Code**, or the optional `{}` toolbar button (add it with *Customize the toolbar*);
- **Graph JSON** in the workspace's header opens the graph the Node editor is showing.

It docks as a tab at the bottom, beside the Node editor and the Explorer, or floats as a window (the dock's **Undock** button to float,
the window's **Dock** to put it back). Everything on this page works in both. In a narrow window or on a phone the
[sidebars](#sidebars) open **over** the editor, one at a time (toggle buttons in the header); on a phone they start
hidden, and one you open stays open next time.

When the workspace has the keyboard, it keeps it: <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> never fly the camera
from here (see [Keys follow the panel you are in](https://docs.theprototype.app/controls.md#keys-follow-the-panel-you-are-in)). In the undocked
window the tabs sit in the title bar and can be clicked; the title bar around them still drags the window.

## Editing and saving

Type, then press <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Cmd</kbd>+<kbd>S</kbd> on a Mac) or **Save**. A **●** on a tab
means it has unsaved edits; **Revert** throws them away.

Saving checks the code first. If it does not parse, **nothing is applied**: the tab shows a red **!**, the banner names
the line (click it to jump there), and every node the code feeds shows an amber *edit not applied* badge while it keeps
running the last good version.

![A save refused: the banner names the line, and the nodes keep the last good version](https://docs.theprototype.app/img/code-workspace/parse-error.webp)
*Figure: A save refused.*
When the code is good, everything that runs it reloads — on every player's screen.

**Unsaved changes are guarded.** Closing a tab with unsaved edits asks first. Closing the whole workspace with unsaved
files asks **Save all / Don't save / Cancel** — a file whose code has an error is not saved, and the dialog says so.
Leaving the page with unsaved code shows the browser's warning.

**Undo and redo** (<kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Y</kbd>) step through saved code edits, on every
peer; an open tab follows them.

## Editing together

Since 1.42, when two or more people in a session open the same code — a Script node, a Behaviour node, a script file,
or a [text document](#text-documents) — they type into **one shared text**. Everyone sees the others' typing as it
happens, and two people typing in the same line both keep what they typed: nothing is overwritten.

![Editing together: another person's caret and selection in their colour, labelled Peer 8c21, line 2.](https://docs.theprototype.app/img/code-workspace/editing-together.webp)
*Figure: Editing together.*
- The other person's **caret** and **selection** show in their colour (hover the caret for their name). The strip under
  the toolbar, **Editing with you**, lists everyone in the file and the line they are on; a screen reader reads it as
  "Ana is on line 4, 12 characters selected".
- <kbd>Ctrl</kbd>+<kbd>S</kbd> **saves exactly as before**: the node (or file) gets the text as it is now, for everyone.
  A tab shows **●** while anybody's edits are unsaved; once somebody saves, every person's tab is clean.
- <kbd>Ctrl</kbd>+<kbd>Z</kbd> undoes only **your own** typing, never someone else's.
- **Revert** on a shared tab throws away the unsaved edits of everyone in that file.
- Someone who joins later and opens the file sees the **current** text, including edits nobody has saved yet.
- A **viewer** (a cloud room's read-only role) sees the text move but cannot type.

The shared text lives only while somebody has the file open; what lands in the scene or the file is always what someone
saved. It travels over the same direct peer-to-peer connection as everything else — no server.

### Text documents

Text files in the [Explorer](https://docs.theprototype.app/explorer.md) (`.txt`, `.md` …) open in the Code tab too: select one and press **Edit** in
its preview, double-click it, or right-click ▸ **Edit in the Code tab** — and they are shared the same way.

## Pop out to its own window

**Pop out** (↗) in the workspace header opens the whole code workspace in its **own browser window** — drag it to a
second monitor and keep the 3D view full-size in the app. Desktop browsers only (hidden on phones, touch screens and in
VR).

![The code workspace in its own window, with Dock back in its header](https://docs.theprototype.app/img/code-workspace/pop-out-window.webp)
*Figure: The code workspace in its own window.*
- Everything stays live both ways: typing, <kbd>Ctrl</kbd>+<kbd>S</kbd> applying the script to the scene, the error
  banner and Problems, the sidebars, quick open, menus — and [editing together](#editing-together).
- While the window is open the app's own Code panel steps aside; opening code anywhere in the app (**Edit code** on a
  node, a `.js` file in the Explorer) brings that window to the front.
- **Dock back** in the window's header — or simply closing the window — puts the editor back in the app, docked or
  floating as it was. Closing or reloading the app tab closes the code window too.
- The window follows the app's theme, **High contrast** and UI scale, and remembers its size and place for next time.
- If the browser blocks pop-ups, a notice says so with **Try again** (or allow pop-ups for the site).
- Since 1.46 every other panel can pop out the same way, and the code window takes more tabs — see
  [Windows on several monitors](https://docs.theprototype.app/interface.md#windows-on-several-monitors).

## Sidebars

![The code workspace: Open editors and the Project tree on the left, with the tab strip above the code.](https://docs.theprototype.app/img/code-workspace/sidebars.webp)
*Figure: The code workspace.*
### Left: Open editors and Project

<kbd>Ctrl</kbd>+<kbd>B</kbd> shows or hides the left sidebar. (Outside the code workspace the same keys, and
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd>, show and hide the app's own [sidebars](https://docs.theprototype.app/interface.md#sidebars).)

- **Open editors** lists every open tab, in the same order as the tab strip. Drag a row to reorder (the strip follows);
  **✕** closes it (unsaved files ask first).
- **Project** lists every script in the scene as a tree, with a search box:
    - **Graphs** — per graph (Main first, then each object's), its Script nodes, Behaviour nodes and the
      [Player's code](#the-players-code), plus `graph.json` (the whole graph as editable [JSON](#graph-json)).
    - **Files** — the text files in your Library (`.js` `.md` `.json` `.txt` `.cfg`) and their folders, with how
      many nodes run each script. You can make and manage them right here — see [Files and folders](#files-and-folders).
    - **Module sources** — the module and kit files the game uses, **read-only** (see [Module code](#module-code)).
- The search also matches folder names (*minigolf rules*).
- Drag the line between the two sections to share the height; double-click it to reset. Drag the sidebar's edge to
  resize it — the width is remembered.

### Files and folders

Since 1.46 the **Files** group of the Project tree is a real file tree: what you make here are ordinary
[Explorer](https://docs.theprototype.app/explorer.md) files, so they follow the Explorer's sharing rules and everyone in the session sees them.

![The Project tree's menu on a script: Rename, Move to, Cut, Delete, New file, New folder, Show in Explorer](https://docs.theprototype.app/img/code-workspace/files-menu.webp)
*Figure: The Project tree's menu on a script.*
- **New file** (the page-with-plus button in the Project header, or the right-click menu) offers **Script** (a
  behaviour with the lifecycle functions ready to fill in), **Note** (`.md`) and **JSON**. A new script opens in a
  tab straight away.
- **New folder** makes a folder inside the one you right-clicked (or at the top).
- **Rename** (<kbd>F2</kbd>): type a bare name and the extension is kept (*boss* stays *boss.js*). Text file names
  are unique across the library, because shared typing keys on the name.
- **Move**: drag a file or folder onto another folder, use **Move to ▸**, or <kbd>Ctrl</kbd>+<kbd>X</kbd> then
  <kbd>Ctrl</kbd>+<kbd>V</kbd> on the destination.
- **Delete** (<kbd>Del</kbd>) moves it to Deleted, where Restore brings it back.
- **Undo**: <kbd>Ctrl</kbd>+<kbd>Z</kbd> while the tree has focus (or **Undo** on the toast) undoes the last file
  operation — one step each. It never touches the scene's own undo history.
- The menu also opens with <kbd>Shift</kbd>+<kbd>F10</kbd> or the Menu key, and works in the
  [pop-out window](#pop-out-to-its-own-window) too.
- Viewers can browse and read; making, renaming, moving and deleting say why they are not available.

### Right: Outline, Problems, Bound nodes, Find

<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> shows or hides the right sidebar. It has four tool tabs:

- **Outline** — the active file's params, state, handlers, methods and functions, a script's inputs and returned
  outputs, a graph's nodes. Click one to jump to its line.
- **Problems** — syntax errors and lint advice (for example, `Math.random` breaks peer sync) for every open file *as you
  type*, plus anything a node reported while running. The tab shows a count; click a problem to jump to it.
- **Bound nodes** — which graph nodes run this file. Click one to select it in the Node editor (entering its group if
  it is inside one).
- **Find in files** (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd>) — searches every script in the project, open files'
  unsaved text first. Toggles: match case, whole word, regular expression, include module sources. Click a result to
  open it at its line.

## Tabs, quick open and the keyboard

- With many tabs the **tab strip** scrolls: the mouse wheel scrolls it sideways and a thin scrollbar shows. The active
  tab is always scrolled into view. Drag a tab to reorder it.
- <kbd>Ctrl</kbd>+<kbd>P</kbd> — **quick open**: open any script in the project by typing part of its name (letters in
  order: `plwa` finds *Player: walk*). <kbd>↑</kbd>/<kbd>↓</kbd> and <kbd>Enter</kbd>.
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> — **go to symbol**: jump to a function, handler, param or state key of
  the current file.
- The tab strip, Open editors, the Project tree and the tool tabs are each one <kbd>Tab</kbd> stop. <kbd>←</kbd>/<kbd>→</kbd>
  (strip, tools) and <kbd>↑</kbd>/<kbd>↓</kbd> (lists) move, <kbd>←</kbd>/<kbd>→</kbd> in the tree close and open
  folders, <kbd>Enter</kbd> opens, <kbd>Delete</kbd> closes a tab.

## The Player's code

Since 1.25 the **Player** card in a game's graph (a *Character Controller*, such as *Player: walk* in Mini Golf, Escape
Room, Sky Run and Towers) opens its code like any other code node: **double-click it**, or right-click ▸ **Open code**.
The code runs every frame on each player's own machine and decides how *that* player moves:

```js
// settings = the card's values { mode, speed, jumpHeight, eyeHeight, gravity }
// input    = this player's keys { x, z, jump, sprint (Shift), crouch (Ctrl) }
// time     = seconds since Play started
if (input.sprint) return { speed: settings.speed * 1.8 };   // hold Shift to run
return {};                                                  // anything left out keeps the card's value
```

- <kbd>Ctrl</kbd>+<kbd>S</kbd> saves it — checked first (broken code never applies), sent to everyone, one undo step.
- A wrong key or type in what you return shows on the node's red error badge.
- **Engine source** (toolbar) shows the built-in walker code it steers, read-only.
- With no code saved, the Player behaves exactly as before.

![Player: walk open in the code workspace, with Engine source in the toolbar and the Player code row in the Project tree](https://docs.theprototype.app/img/code-workspace/player-code.webp)
*Figure: Player: walk open in the code workspace.*
## Code and files

- **Save as file** turns a node's inline code into a script file in your Explorer and binds the node to it.
- **Use file…** binds a node to a script file you already have.
- Several nodes can run one file. Saving the file reloads every one of them, on every peer, as **one** undo step.
- **Unbind** keeps the code in the node and forgets the file.
- **Go to node** shows the node in the Node editor — or lets you pick one, when several run the same file.

If someone else changes the same code while you have unsaved edits, the tab says so: **Load theirs** takes their
version, **Keep mine** keeps yours (your next save wins).

## Module code

A module's source opens **read-only** (a lock on its tab): it runs the same for everyone. A Script or Behaviour node that
a module binds to its own file offers **Make editable copy**, which copies the code into a script the scene owns and
points the node at it — see [Make editable copy](https://docs.theprototype.app/main-graph.md#make-editable-copy).

A file opened from **Module sources** in the [Project tree](#left-open-editors-and-project) has a copy button (or
**Make editable copy** in the toolbar) that puts a copy in your Library for you to edit. The module keeps running its own
code, so use **Use file…** on a Script node to run your copy.

## Graph JSON

**Graph JSON** opens the graph as JSON. Edit the nodes and edges and press **Apply** (<kbd>Ctrl</kbd>+<kbd>S</kbd>).
Invalid JSON, two nodes with the same id or a wire to a node that does not exist are refused with the line; a good apply
is one undo step and reaches every peer. ([Flow Code](https://docs.theprototype.app/node-system.md#flow-code-the-graph-as-text) shows the same graph as
compact text.)

## Live

The **Live** checkbox on a node or behaviour tab applies inline edits as you type instead of on
<kbd>Ctrl</kbd>+<kbd>S</kbd> — how the Script panel felt before 1.23. It is a setting of this browser, off by default.

## Limits

- The Player's code can change speed, jump height, eye height, gravity and walk/fly each frame; it cannot replace the
  walker itself (collisions, steps) — that is the engine source.
- Other built-in nodes have parameters only (edited in the ⓘ panel); Script, Behaviour, Custom nodes and the Player are
  the nodes with code.
- Find in files stops at 400 results.

- A node bound to a file still carries its code, so a scene runs the same whether or not the file is in anyone's
  Library.
- Files are addressed by their content: two files with byte-identical content are the same file.
- [Editing together](#editing-together) matches files by name: two different files with the same name open on two
  machines share one text. A viewer's own cursor is not shown to the others.
- Notes, annotation pins and Inspector text fields are not shared live — they keep their usual sync.
