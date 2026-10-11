# The Interface

Since 1.30 every window, menu, dialog, the main HUD and the phone layout are built from one small kit of parts and
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
  window. It is still yours to arrange — right-click any button (or press and hold it) ▸ **Edit positions** to drag the
  buttons into place; see [The toolbar](controls.md#the-toolbar). The two **corner stacks** — bottom-left (the AI
  assistant and **+**) and bottom-right (Chat and the microphone) — are arranged the same way.
- **The logo** (top-left) opens the main menu, grouped as Project · Scene · Collaborate · App. A press anywhere outside
  the menu closes it; pressing another button (a bottom-bar tab, the bell, Play) closes it and does that button's job in
  the same press, and pressing the 3D view only closes it — nothing gets selected or deselected.
- **The Connect bar** (top centre) shows your ID — click it to copy your invite link — and the field to join someone,
  with the **status dot** at its left end. Once you are connected it **collapses to a chip**: the dot, the avatars of who
  is here and your mic. Click the chip to open the full bar again. The dot has no words beside it — point at it (or
  press and hold it) to read them; see [The status dot](connection.md#the-status-dot).
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
share **one tab strip**: pill tabs with the view's icon and their own **✕** to close that view. More tabs than fit
scroll sideways (the wheel or a swipe; the strip fades where more tabs are hidden) while **+** stays in place, and the
strip **keeps its scroll** when you pick a tab. Moving, docking, splitting and tabbing are described in
[Floating windows](controls.md#floating-windows).

**Long names** — an object or file name in a window header — stay on one line and end in "…", so they never push the
window's buttons out of place. Point at the name (or press and hold it on a touch screen) to read it whole. On a narrow
phone the [Animation](animation.md) window puts the name on its own line above its controls.

### Docked windows

Since 1.32 a window in the bottom dock has no **✕** or undock button of its own:

- **Close it from its tab.** Every tab carries its **✕**.
- **Undock** sits at the right end of the dock's tab strip, just left of **Minimize the dock**. It takes the window you
  are looking at out of the dock as a floating window. To have it take **every** docked window out as one floating
  window with tabs instead, set **Settings ▸ Interface ▸ Windows & chrome ▸ Undock button** to *All as one tabbed
  group* (the default is *Active window*).
- You can also drag a tab out of the strip to undock that one window.
- **The dock's +** lists every window that can live in the dock — the [Node editor](node-editor.md) and the
  [Image editor](image-editor.md#in-the-dock) included, the same list as the phone's **Windows** sheet. Windows already
  in the dock are highlighted, and each row says what a click does: **Remove** (closes it), **Dock** (brings a floating
  window in) or **Open** (opens it as a dock tab).

**Dock a window exactly where you want it** (desktop): drag a floating window by its header — or tear a tab out of a
tabbed window, or drag a whole tabbed window by its tab bar — onto the **dock's tab bar**. The window turns
see-through, the tab bar is outlined and a **caret** shows the slot between the docked tabs where it will land; let go
and it docks exactly there. The bottom edge of the screen still docks a window at the end of the tabs (and is the target
when the dock is empty or minimized). Everywhere else a floating window simply moves — over the open dock, over the side
drawers, partly off screen — and stays under the cursor the whole way; a header that ends up under the Controls bar is
nudged above it when you let go.

### Floating windows with tabs

- **Join a window as a tab:** drag a tab out of the dock and drop it onto a floating window. It joins that window as a
  tab instead of opening a second window.
- **Dock all tabs:** a floating window with tabs has a dock button just left of **Close all tabs**. It puts every tab
  back in the dock. For a window with one tab, drag its tab to the dock, or use the window's **Dock** button.
- **Move it by touch:** drag its tab bar — or any of its tab names — and the whole window follows your finger, on a phone
  or an unfolded foldable alike. A tap on a tab still switches to it.
- **Hold a tab** (press and hold; right-click with a mouse) for its menu: **Ungroup this tab** (it floats on its own
  again, just beside the group), **Dock this tab** (only that view goes into the bottom dock — greyed out for windows
  that have no docked mode, such as Objects or Chat) and **Close** (closes that view; the rest of the group stays).

**Layouts…** (**Menu ▸ Layouts**) opens a regular dialog for your saved arrangements — see
[Workspace layouts](controls.md#workspace-layouts).

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

Since 1.32 every dialog — Settings, Modules, Sessions, Templates, confirmations — **covers the whole screen**, the logo
and its menu button included; close it with its own ✕, **Done**, <kbd>Esc</kbd> or a click outside. **What's new**
opens above everything else: the logo, undo and redo, the connection pill, notifications, your profile and the bottom
bar.

**Questions are dialogs, outcomes are toasts.** Anything that asks you to decide something destructive or blocking is a
dialog: *Delete flow*, *Restore previous session?*, deleting a group or a prefab, rebuilding a mesh or terrain that
discards your edits, leaving a session to join another, exporting everything when nothing is selected, a scene too large
for this device. Passive results — *Saved*, *Copied*, *Exported…* — stay [toasts](notifications.md#toasts) and are kept
in the notification centre. Requests from other people (to load a session, to take control, to see your private scene)
stay cards in the corner, like connection requests: a dialog would take over your screen from afar.

![Delete this flow? as a dialog over the dimmed screen: the logo and the toolbar are covered too, Delete flow in red beside Cancel](img/interface/dialog-delete-flow.png)

## On a phone

Below 640 px wide the app switches to a phone layout with less on screen and nothing missing:

- **Top**: the logo (main menu) on the left, a **Connect chip** in the middle — a [status dot](connection.md#the-status-dot)
  and ▾ (and a microphone while you are in a call); tap it for your invite link, the join field, Info and Toasts — and
  the notification bell and your picture on the right.
- **Bottom bar**: **Add · Objects · Play · Explorer · More**. Play stays the only orange control. **More** holds the
  rest: Chat, the AI assistant, Notes, the node editor and every other window, the viewport tools and stats.
- **Make the bar yours**: **More ▸ Edit bar…**, or a long press on any tab, picks which views take the four slots
  (More always stays). The choice is kept on this device; **Reset** goes back to the default.
- **The selection toolbar** appears only while something is selected — see
  [The selection toolbar](#the-selection-toolbar). With nothing selected — just looking around — there is no toolbar;
  **More ▸ Edit** has Undo, Redo, Select multiple and Interact mode.
- **Sheets sit above the bottom bar.** Menus, Objects, the Explorer and the other docked windows, the Inspector,
  Configure Scene, Add, Notifications, More, the profile menu, scene notes and Customize character all open as sheets
  from the bottom — see [Sheets on a phone](#sheets-on-a-phone). The bar with Play stays visible and tappable. Over the
  sheets that work on the selection (Objects, the Inspector, Notes, Add, the docked windows) the selection toolbar rides
  just above the sheet's top edge — never on top of it — so you can pick an object in Objects and move or undo without
  closing it. While a **menu** is open — the main menu, the profile menu, notifications, Connection, More, an object's
  or the viewport's action sheet, Customize character, Settings or any dialog — the selection toolbar hides, and it comes
  back when the menu closes.
- **Docked windows open with their sidebars hidden**: the Explorer, Node editor, UV editor, HUD editor, Profiler, Image
  editor and Code workspace give the screen to their work area (folded or unfolded). Open a side panel with its edge
  button or tab; it stays open next time, for that window.
- **The dock's +** at the end of its tab strip opens a **Windows** sheet: every window with a show/hide switch. With
  floating windows allowed on the phone (**Settings ▸ Interface ▸ Windows & chrome ▸ Allow undocking on touch
  screens**), **+** works as on a computer — a menu that adds a window to the dock.
- **Editors fit a phone**: the [Animation](animation.md#on-a-phone) window shows one pane at a time, the [Shader
  editor](shader-graph.md#on-a-phone) gives the canvas the whole screen with the palette and properties as sheets,
  and every toolbar that does not fit — UV editor tools, Profiler controls — scrolls sideways (with a fade where
  more is hidden); nothing is out of reach.
- **Settings** is a list you tap into, with ‹ Back on every page; Settings and dialogs open full-screen and cover the
  logo while they are open.

Touch targets are at least 44 px, switches 51 × 31, and text fields use 16 px text so the browser never zooms.

### Sheets on a phone

Since 1.32 every sheet works the same way:

- **One grab bar** sits at the top of each sheet. It never scrolls away with the sheet's contents.
- **Drag the bar** to make the sheet taller or shorter. It stops at a minimum and a maximum height, and each sheet
  **remembers** its height on this device.
- **Swipe the bar down to the bottom** to close the sheet; a tap on the bar steps its size.
- **No sheet covers Play** or the selection toolbar, and none rises into the top bar.

Since the 1.32 review a sheet also **moves by its body**, the way a phone's own sheets do — Objects, the Explorer and
the other docked views, Notes, Add, the Inspector and Configure Scene, the main menu, the notification centre, the
profile menu, More and Chat:

- A list inside the sheet **scrolls** as usual. When the list is at its top, **pulling down** moves the sheet, and
  letting go far enough — or **flicking** down — closes it.
- A drag that started as a scroll stays a scroll: scrolling up and back down in one movement never closes the sheet.
  Pulled down and then back up, the sheet stops at its height and the list carries on scrolling.
- A quick flick closes the sheet from any height; a gentle one steps down to the next size. Past its tallest size the
  sheet stretches with resistance and springs back.
- Sideways strips, sliders, number fields and canvases inside a sheet keep their own gestures.
- **The dock's grab bar minimizes the dock** (Explorer, node editor, Animation and the other docked windows). The bottom
  bar's buttons bring it back.
- **Your profile menu** — tap your picture — is a sheet too. **Customize character** and **Profile settings** open from
  it with a tap.

For the Explorer's long-press actions on a phone, see [Explorer: on a phone](explorer.md#on-a-phone).

### The selection toolbar

When something is selected, a toolbar floats above the bottom bar:

| Button | What it does |
|---|---|
| **Move / Rotate / Scale** | the gizmo mode (keys <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd>) |
| **Select multiple** | a toggle: while it is on, every tap adds or removes an object (there is no <kbd>Shift</kbd> on a phone) |
| **Interact** | a toggle: tap the scene to play with it instead of editing (<kbd>I</kbd>) — see [Edit and Interact](controls.md#edit-and-interact) |
| **Inspect** (the sliders icon) | opens the object's properties; tap it again to close them. It looks pressed only while the properties are open |
| **Undo / Redo** | |

Every toggle shows its state: a filled (tinted) button is on. Tapping a selected object deselects it — see
[Tapping to select](controls.md#tapping-to-select-on-a-touch-screen).

![The selection toolbar on a folded phone: Move (on), Rotate, Scale, Select multiple, Interact, then Inspect, then Undo and Redo, above the bottom bar with Play](img/interface/selection-toolbar-phone.png){ width="360" }

## For module authors

Every part shown here is on the **/kit** page of the app, in every state, and module panels can use the same parts — see
[The UI kit](ui-kit.md).
