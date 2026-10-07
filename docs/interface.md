# The Interface

Since @@VER@@ every window, menu, dialog, the main HUD and the phone layout are built from one small kit of parts and
one set of colours. This page is the map: where things are and what the shapes mean. Nothing you can *do* changed —
every shortcut, setting, scrub field and panel works as before; only the look and a few placements moved.

## One accent colour

**Blue** marks what you can act on or have selected: the armed tool, a switch that is on, the chosen chip, a primary
button, the focus ring. **Orange** is kept for things that are live — **Play**, recording, streaming — so it stands out
where it matters. A **Shared** or **This device** badge beside a heading says who a setting affects, instead of a
paragraph explaining it.

The light theme and every custom `.theme.json` restyle all of it; see [Themes & Appearance](appearance.md).

## The main HUD

- **The toolbar** at the bottom is one glass bar: Move, Rotate, Scale, Interact, **Play** (the only orange button), then
  the windows you keep there (Objects, Node editor, Explorer, Animation…). The accent fill marks the armed tool or an open
  window. It is still yours to arrange — right-click any button; see [The toolbar](controls.md#the-toolbar).
- **The logo** (top-left) opens the main menu, grouped as Project · Scene · Collaborate · App.
- **The Connect bar** (top centre) shows your ID — click it to copy your invite link — the field to join someone, and
  the status as a badge. Once you are connected it **collapses to a chip**: a status dot, the session, the avatars of who
  is here and your mic. Click the chip to open the full bar again. While the link to the signaling server is down it
  says for how long ("Reconnecting · 2 min"); the attempt count is in **Connect ▸ Info**. See
  [Connection](connection.md#the-connect-panel).
- **Top right**: scene notes, the notification bell (with a count) and the peers list sit in one group beside your
  picture, which opens your profile menu (**Customize character**, **Profile settings**).
- **Toasts** are calm cards under the Connect bar, at most three at a time; more collect behind **+N more**. See
  [Toasts](notifications.md#toasts).
- Someone who is **speaking** in voice chat gets a soft green ring on their avatar.
- Buttons are 36–38 px with a mouse and grow to **44 px on a touch screen**.

## The command palette (Ctrl+K)

<kbd>Ctrl</kbd>+<kbd>K</kbd> opens one search box over everything: **tools** (Move, Scale, Interact…), **windows**
(Explorer, Objects, the Profiler…), **menu items** and **every setting**. Type a few letters, move with
<kbd>↑</kbd> <kbd>↓</kbd>, press <kbd>Enter</kbd> to run it; <kbd>Esc</kbd> or a click outside closes it. Picking a
setting opens Settings already searching for that row. The palette is listed in the shortcut sheet (<kbd>?</kbd>) and
can be rebound there like any shortcut.

## Windows and tabs

Every docked or floating window — Explorer, Objects, Chat, AI assistant, Notes, the Notification centre, the node
editor, Flow code, Animation, UV, Shader, HUD editor, Profiler, the Code workspace — has the same header: icon, title,
the window's own actions, then pin and close in the same places. Windows in one group, and the views in the bottom dock,
share **one tab strip**: pill tabs with the view's icon; a docked view no longer repeats its name under its tab.
Moving, docking, splitting and tabbing work exactly as before — see [Floating windows](controls.md#floating-windows).

Lists scroll with a thin scrollbar that appears only while you scroll or point at them; there are no chunky native
scrollbars anywhere.

## Menus

The right-click, Add (<kbd>Shift</kbd>+<kbd>A</kbd>) and viewport menus share one style: 32 px rows, an icon per row,
shortcuts right-aligned, quiet section labels.

**Right-click an object** and the everyday actions come first — **Properties**, **Rename**, **Duplicate**, **Delete** —
then **Focus**, **Ping** and **Add note**, then the editing modes. Rarer work is one level down: **Transform ▸**
(align to ground, origin, pivot…), **Mesh ▸** (convert, boolean…), **Physics & effects ▸** (joints, particles, flow
effects), **Prefab ▸** on a placed prefab copy, and **Save as… ▸**. Every action and its shortcut is still there.

## Dialogs

Modules, Sessions, Checkpoints, Templates, Storage, Publish / Export, Import and every confirmation share one dialog
style: a header with the title and close, tabs directly under it where a dialog has them, one scrolling body and the
answers bottom-right. Each view has **one** emphasised action; a destructive answer is red. Escape, a click outside and
the close button behave as before. **Customize character** is a drawer you can resize by its edge — see
[Your Character](avatars.md#customize-character).

## On a phone

Below 640 px wide the app switches to a phone layout with less on screen and nothing missing:

- **Top**: the logo (main menu) on the left, a **Connect chip** in the middle — tap it for your invite link, the join
  field, Info and Toasts — and the notification bell and your picture on the right.
- **Bottom bar**: **Add · Objects · Play · Explorer · More**. Play stays the only orange control. **More** holds the
  rest: Chat, the AI assistant, Notes, the node editor and every other window, the viewport tools and stats.
- **Make the bar yours**: **More ▸ Edit bar…**, or a long press on any tab, picks which views take the four slots
  (More always stays). The choice is kept on this device; **Reset** goes back to the default.
- **A context strip** above the bar follows what you are doing: with nothing selected it offers Undo, Redo, Select
  multiple and Interact; once something is selected, Move, Rotate, Scale, Inspect, Undo and Redo.
- **Windows and menus open as bottom sheets** with a handle: drag (or tap the handle) between peek, half and full
  height, and down to close. Each sheet reopens at the height you left it, on this device. Menus drill in place with a
  **Back** row instead of opening side panels.
- **Settings** is a list you tap into, with ‹ Back on every page; dialogs open full-screen.

Touch targets are at least 44 px, switches 51 × 31, and text fields use 16 px text so the browser never zooms.

## For module authors

Every part shown here is on the **/kit** page of the app, in every state, and module panels can use the same parts — see
[The UI kit](ui-kit.md).
