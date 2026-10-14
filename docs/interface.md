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
- **The logo** (top-left) opens the main menu, grouped as Project · Scene · Collaborate · App — see
  [The main menu's Project actions](#the-main-menus-project-actions). A press anywhere outside the menu closes it;
  pressing another button (a bottom-bar tab, the bell, Play) closes it and does that button's job in the same press,
  and pressing the 3D view only closes it — nothing gets selected or deselected.
- **The Connect bar** (top centre) shows your ID — click it to copy your invite link — and the field to join someone,
  with the **status dot** at its left end. Once you are connected it **collapses to a chip**: the dot, the avatars of who
  is here and your mic. Click the chip to open the full bar again. On a computer the dot has no words beside it — point
  at it to read them; see [The status dot](connection.md#the-status-dot).
- **Top right**: scene notes, the notification bell (with a count) and the [peers panel](connection.md#who-is-here-the-peers-panel)
  sit in one group beside your picture, which opens your profile menu (**Customize character**, **Profile settings**).
  Since 1.33 that group is arranged with [Edit positions](controls.md#edit-positions) too.
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
strip **keeps its scroll** when you pick a tab. Moving, docking and tabbing are described in
[Floating windows](controls.md#floating-windows).

**Long names** — an object or file name in a window header — stay on one line and end in "…", so they never push the
window's buttons out of place. Point at the name (or press and hold it on a touch screen) to read it whole. On a narrow
phone the [Animation](animation.md) window puts the name on its own line above its controls.

### Sidebars

On a computer or a tablet-width window, each side of the screen holds **one sidebar**. Every panel docked to that side
is a **tab** of it: Configure Scene / Properties, the Objects list and any window you dock to the edge (the Node editor,
the Explorer…). Only the tab in front is shown, so opening a panel on a side that already has a sidebar brings its tab
forward instead of opening a second column. The sidebar's header strip holds one tab per panel and, at its far end,
the **Full height** button (↕).

- **Switch** by clicking a tab (or <kbd>←</kbd> / <kbd>→</kbd> with a tab focused).
- **Move a panel to the other side**: drag its tab to the other half of the screen. The column it will land in lights
  up (*Move to the left side*); let go to dock it there. Configure Scene and Properties can live on the left this way.
- **Dock a floating window**: drag its header to a screen edge, or onto a sidebar (*Add as tab* lights up) — it becomes a
  tab of that side. Drag a docked window's header away from the edge to float it again.
- **Resize** by dragging the sidebar's inner edge; a double-click resets it. All tabs of a side share the width.
- **Full height**: press **↕** and the sidebar runs from the top edge to the bottom edge. The buttons in that top corner
  (the logo and menu on the left; notes, notifications and your profile on the right) slide inward, and the bottom dock
  gets narrower so it sits beside the sidebar, never under it. Press it again to fit the sidebar under the top buttons.
  The main menu always opens above sidebars. On a narrow window the Connect bar becomes a full-width strip and a
  full-height sidebar starts just under it.
- **A pinned Properties** (the pin in its header) follows your selection without pulling its tab over the Objects list
  when the two share a side; double-click an object (or pick **Properties** in its menu) to bring it forward.

![A sidebar on the right with two tabs, Objects and Configure Scene (in front), and the Full height button at the end of its tab strip](img/interface/sidebar-tabs.png)

![The same sidebar at full height: it runs from the top edge to the bottom, the notes, bell and profile buttons slid left of it, and the docked Node editor ends beside it](img/interface/sidebar-full-height.png)

Which side Configure Scene and Properties dock to, each side's width and Full height, the tab order and the tab in front
are kept on this device and saved in [workspace layouts](controls.md#workspace-layouts). A phone keeps its
[bottom dock](#the-dock-on-a-phone) instead.

![Light theme: the Objects list as a sidebar on the left and Configure Scene as a sidebar on the right](img/interface/sidebars-both-sides-light.png)

#### Panel headers

The Properties and Configure Scene headers — the panel's name and the **Filter properties** box — have a **lock**
button beside the pin:

- **Locked** (the default): the header stays on top while you scroll the properties.
- **Unlocked**: the header scrolls away with the properties, giving the whole panel to them — handy on a phone.

Each of the two panels remembers its own choice on this device, in a sidebar and in the phone's dock alike.
**Settings ▸ Interface ▸ Windows & chrome ▸ Sticky panel headers** sets both at once (it shows a mixed state while they
differ); searching Settings for *sticky header* finds it.

### Docked windows

Since 1.32 a window in the bottom dock has no **✕** or undock button of its own:

- **Close it from its tab.** Every tab carries its **✕**.
- **Undock** sits at the right end of the dock's tab strip, just left of **Minimize the dock**. It takes the window you
  are looking at out of the dock as a floating window. To have it take **every** docked window out as one floating
  window with tabs instead, set **Settings ▸ Interface ▸ Windows & chrome ▸ Undock button** to *All as one tabbed
  group* (the default is *Active window*).
- You can also drag a tab out of the strip — or right-click it ▸ **Undock into a floating window** — to undock that one
  window. A docked window moves by its tab, not by its header.
- **The dock's +** lists every window that can live in the dock — the [Node editor](node-editor.md) and the
  [Image editor](image-editor.md#in-the-dock) included, and since 1.33 also **Objects**, **Statistics**, the **Live
  profiler**, **Chat** and the **AI assistant** — the same list as the phone's **Windows** sheet. Windows already in the
  dock are highlighted, and each row says what a click does: **Remove** (closes it), **Dock** (brings a floating window
  in) or **Open** (opens it as a dock tab).

**Dock any window exactly where you want it** (desktop): drag a floating window by its header — or tear a tab out of a
tabbed window, or drag a whole tabbed window by its tab bar — onto the **dock's tab bar**. The window turns
see-through, the tab bar is outlined and a **caret** shows the slot between the docked tabs where it will land; let go
and it docks exactly there. This works for every editor and for Objects, Statistics, the Live profiler, Chat and the AI
assistant; file and model previews, the text viewer, What's new and the tool palettes stay floating. The bottom edge of
the screen still docks a window at the end of the tabs (and is the only target while the dock is empty or minimized).
Everywhere else a floating window simply moves — over the open dock, over the sidebars, partly off screen — and stays
under the cursor the whole way; a header that ends up under the Controls bar is nudged above it when you let go.

![The Objects window dragged over the dock's tab bar: it is see-through, the tab bar is outlined and a caret marks the slot after the Node editor tab](img/interface/dock-drop-objects.png)

**Floating windows can overlap the dock**: move them over it and resize them past its top edge — only the screen edge
stops the resize corner. The Objects list remembers whether you last had it docked, and the toolbar button and
<kbd>O</kbd> open it there.

### Floating windows with tabs

- **Join a window as a tab:** drag a tab out of the dock and drop it onto a floating window. It joins that window as a
  tab instead of opening a second window.
- **Dock all tabs:** a floating window with tabs has a dock button just left of **Close all tabs**. It puts every tab
  back in the dock. For a window with one tab, drag its tab to the dock, or use the window's **Dock** button.
- **Move it by touch:** drag its tab bar — or any of its tab names — and the whole window follows your finger, on a phone
  or an unfolded foldable alike. A tap on a tab still switches to it.
- **Hold a tab** (press and hold; right-click with a mouse) for its menu: **Ungroup this tab** (it floats on its own
  again, just beside the group), **Dock this tab** (only that view goes into the bottom dock — greyed out for windows
  that always float, such as a file preview) and **Close** (closes that view; the rest of the group stays).

**Layouts…** (**Menu ▸ Layouts**) opens a regular dialog for your saved arrangements — on a folded phone, a
[tab of the bottom dock](#the-dock-on-a-phone) — see [Workspace layouts](controls.md#workspace-layouts).

Lists scroll with a thin scrollbar that appears only while you scroll or point at them; there are no chunky native
scrollbars anywhere.

## Focus mode

Press <kbd>Ctrl</kbd>+<kbd>Space</kbd> to maximize the area under the mouse pointer:

- over the **3D view** (or a toolbar or a floating window): every panel, window and dock is hidden and the 3D view fills
  the screen;
- over a **docked window**: that window fills the screen. Its tab row stays, so you can still switch tabs.

Press <kbd>Esc</kbd> or <kbd>Ctrl</kbd>+<kbd>Space</kbd> again — or click **Exit focus** at the top — and everything
comes back exactly as it was; nothing is closed. Focus mode also ends when a dialog opens or you press Play.

Without a keyboard: **View ▸ Focus mode** in the 3D view's right-click menu, right-click a dock tab ▸ **Maximize (focus
mode)**, or on a phone **More ▸ Tools & View ▸ Focus mode** (which you can also drag onto the
[phone bar](#the-phone-bar-and-more)).

Inside the UV editor and the Animation timeline <kbd>Ctrl</kbd>+<kbd>Space</kbd> keeps its own meaning (keyboard
selection) while you work there; use the menu entries, or rebind focus mode in **Settings ▸ Shortcuts**.

![Focus mode over the dock: the Explorer tab fills the screen with its tab row (Node editor, Explorer) at the top and Exit focus above it](img/interface/focus-mode-docked.png)

## Menus

The right-click, Add (<kbd>Shift</kbd>+<kbd>A</kbd>) and viewport menus share one style: 32 px rows, an icon per row,
shortcuts right-aligned, quiet section labels.

**Right-click an object** and the everyday actions come first — **Properties**, **Rename**, **Duplicate**, **Delete** —
then **Focus**, **Ping** and **Add note**, then the editing modes. Rarer work is one level down: **Transform ▸**
(align to ground, origin, pivot…), **Mesh ▸** (convert, boolean…), **Physics & effects ▸** (joints, particles, flow
effects), **Prefab ▸** on a placed prefab copy, and **Save as… ▸**. Every action and its shortcut is still there.

### The main menu's Project actions

The **Project** section at the top of the main menu has two layouts, picked in **Settings ▸ Interface ▸ Lists & menus ▸
Project actions**:

- **Compact** (the default on a computer and an unfolded phone) is a two-column grid: **New from template…** across the
  top, then **Load** | **Save ▾**, then **Import** | **Export…**. **Save** saves straight away with your last-used
  options; its **▾** opens [Save options](saving.md#save-options) — what to save and what the file includes.
  **Export…** opens Publish / Export.
- **List** (the default on a folded phone) is one row per action — Templates, Import, Load, Save, Publish / Export —
  with the **Project | Scene | ⚙** switch under Save; the **⚙** opens the same Save options.
- **Auto** is List on a phone and Compact everywhere else. Searching the settings for *burger* or *compact* finds it.

![The main menu's Project section in the Compact layout: New from template… across the top, then Load beside Save with its ▾, then Import beside Export…](img/interface/menu-project-compact.png){ width="290" }

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

Below 640 px wide — a folded phone — the app switches to a phone layout with less on screen and nothing missing. An
unfolded phone and a computer share the desktop layout.

- **Top**: the logo (main menu) on the left, a **Connect chip** in the middle and, on the right, the notification bell,
  the peers button (while someone is connected) and your picture. The chip shows the
  [status dot](connection.md#the-status-dot) with the state beside it — **Connected**, **Connecting…** or **Offline** —
  whenever the top bar has room; when the bar is crowded (people are connected and you are in a call, so the peers
  button and the microphone take the space) it shrinks to the dot and ▾. Tap it for your invite link, the join field,
  Info and Toasts.
- **Bottom bar**: **Add · Objects · Play · Explorer · More** by default. Play stays the only orange control. **More**
  holds the rest: Chat, the AI assistant, Notes, Scene, the node editor and every other window, the edit tools,
  Statistics and Tools & View. You arrange the bar from More — see [The phone bar and More](#the-phone-bar-and-more).
- **A bar button toggles its view.** Tapping Objects, Explorer or any view you put on the bar while its tab is on
  screen **minimizes** the dock — every tab stays open and the 3D view clears; tap it again to bring it back. With
  **Settings ▸ Interface ▸ Windows & chrome ▸ Allow undocking on touch screens** on and that window floating, the button
  opens and closes the floating window instead.
- **Play plays on the screen** on a phone or tablet until you choose otherwise (a headset still enters VR). **Press and
  hold Play** for its menu: *Play as* (Play, Enter VR, Enter AR passthrough), *Test play* in a game scene, **Move left /
  Move right** (Play moves along the bar, and this device remembers where) and **Arrange the bar…**. Choosing *Enter VR*
  or *Enter AR passthrough* turns Play's icon into the headset (with *A R* for passthrough), as on a computer;
  **Settings ▸ VR ▸ Play on the screen, even in a headset** is the same choice.
- **The selection toolbar** appears only while something is selected — see
  [The selection toolbar](#the-selection-toolbar). With nothing selected — just looking around — there is no toolbar;
  **More ▸ Edit** has Inspect, Move, Rotate, Scale, Undo, Redo, Select multiple and Interact mode, and any of them can go
  on the bar.
- **Panels are tabs of the bottom dock.** Properties, Objects, Notes, Configure Scene and Layouts sit in the dock beside
  the Explorer and the node editor — see [The dock on a phone](#the-dock-on-a-phone).
- **Menus are sheets** that open over the dock from the bottom: the main menu, More, the profile menu, notifications, the
  peers panel, the Connection sheet, Add and the press-and-hold action sheets, Chat, the AI assistant, the tool palettes
  (mesh edit, sculpt, spline) and Customize character — see [Sheets on a phone](#sheets-on-a-phone). The bar with Play
  stays visible and tappable. Above the dock, the Add list and the other sheets that work on the selection, the
  selection toolbar rides just above the top edge — never on top of it — and follows that edge in the same frame while
  you drag a grab bar, so you can pick an object in Objects and move or undo without closing it. While a **menu** is
  open — the main menu, the profile menu, notifications, Connection, More, an object's or the viewport's action sheet,
  Customize character, Settings or any dialog — the selection toolbar hides, and it comes back when the menu closes.
- **Docked windows open with their sidebars hidden**: the Explorer, Node editor, UV editor, HUD editor, Profiler, Image
  editor and Code workspace give the screen to their work area (folded or unfolded). Open a side panel with its edge
  button or tab; it stays open next time, for that window.
- **The dock's +** at the end of its tab strip opens a **Windows** sheet: every window — the five dock panels included —
  with a show/hide switch. With floating windows allowed on the phone (**Settings ▸ Interface ▸ Windows & chrome ▸ Allow
  undocking on touch screens**), **+** works as on a computer — a menu that adds a window to the dock.
- **Editors fit a phone**: the [Animation](animation.md#on-a-phone) window shows one pane at a time, the [Shader
  editor](shader-graph.md#on-a-phone) gives the canvas the whole screen with the palette and properties as sheets,
  and every toolbar that does not fit — UV editor tools, Profiler controls — scrolls sideways (with a fade where
  more is hidden); nothing is out of reach.
- **Settings** is a list you tap into, with ‹ Back on every page; Settings and dialogs open full-screen and cover the
  logo while they are open.

Touch targets are at least 44 px, switches 51 × 31, and text fields use 16 px text so the browser never zooms.

### The phone bar and More

You choose what is on the bottom bar, and in what order, from **More** itself — there is no separate editor:

- **Press and hold** any item in More, then **drag it onto the bar**; it lands where you let go.
- Press and hold an item **on the bar** and drag it **along the bar** to move it, or **up into More** to take it off.
- **Play** works the same way: drag it anywhere on the bar, or into More. While Play is off the bar it waits at the
  start of **More ▸ Windows**, ready to be dragged back.

The line at the bottom of More says it: *Hold and drag items to or from the bar.* A dot on an item in More means it is
already on the bar, and **Reset bar** (at the end of More) brings back the default. With More closed nothing moves by
accident: a long press on a bar item opens More and picks that item up in one gesture.

![More open on a folded phone, with Move being dragged from More ▸ Edit down onto the bottom bar; a blue line marks where it will land between Add and Objects](img/interface/phone-bar-drag-in.png){ width="320" }

**What can go on the bar** — everything in More:

- **Windows**: Add, More, Objects, Statistics, Chat, Explorer, Node editor, Animation, Scene, AI assistant, Notes, Flow
  Code, Shader editor, UV editor, HUD editor, Profiler, Code;
- **Edit**: Inspect, Move, Rotate, Scale, Undo, Redo, Select multiple, Interact mode. Move, Rotate, Scale and Inspect work
  on the selection and look pressed while active;
- **Tools & View**: snapping, view and camera, and **Focus mode** (see [Focus mode](#focus-mode)).

**How many**: up to **seven**, Play included. Up to five items show their names; with six or seven on a narrow phone the
bar shows icons only (each still at least 44 px wide, with its name as the tooltip and for screen readers). An eighth is
refused, and the last item cannot leave — the bar is how you get back to More. If you take **More** itself off the bar,
the app tells you once: press and hold any item on the bar to get More back.

**Show switches** sit at the bottom of More (and in **Settings ▸ Interface**). All are on by default:

| Switch | Off means |
|---|---|
| **Selection toolbar** | no floating Move / Rotate / Scale / Inspect strip over a selection — handy once those tools are on your bar |
| **Dock tab row** | the row of tabs above docked windows is hidden; the bar and More still switch views |
| **Grab handle** | no grab bar on docked windows and sheets (and no tap to step the size); drag the top edge to resize |

![Light theme: the bottom of More — Edit, Tools & View, then the Show switches (Selection toolbar, Dock tab row, Grab handle) and Reset bar](img/interface/phone-more-show-switches-light.png){ width="320" }

The bar and the switches are kept on this device; they are never shared with peers or saved in scenes, but a
[workspace layout](controls.md#workspace-layouts) saved on the phone keeps the bar. On a wider screen — an unfolded
phone, a tablet, a computer — the desktop toolbar is used instead, and your phone bar is waiting for the next fold. A bar
you customised in 1.32 carries over.

### The dock on a phone

On a folded phone the panels you work in are **tabs of the bottom dock**, in the same strip as the Explorer, the node
editor and the other editors:

| Tab | What it shows | Opens from |
|---|---|---|
| **Properties** | the selected object's properties | **Inspect** in the selection toolbar |
| **Objects** | the object list | the bar's **Objects** |
| **Notes** | the scene's notes; opening a note shows it as a page of the tab, closing it returns to the list | **More ▸ Notes** |
| **Configure Scene** | the scene's settings | **More ▸ Scene**, or the main menu's **Configure Scene** |
| **Layouts** | save and switch [workspace layouts](controls.md#workspace-layouts) | the main menu's **Layouts**, or the dock's **+** |

- **All tabs share one height.** Drag the dock's grab bar to resize it; swipe it down to minimize the dock.
- **A tab's ✕** closes that panel. The dock's **+** lists every window, these five included, with a show/hide switch.
- **Several can be open at once** — the properties no longer close when you open the notes.
- **Play stays on top** of whatever is open.
- **The main menu closes** as Configure Scene opens, since its tab is underneath the menu. On a computer the menu stays
  open, above the sidebar.

![On a folded phone: the selection toolbar above the dock, whose tab strip holds Explorer and Properties (in front) with + beside them; the Properties tab shows the selected Box, and the bottom bar with Play sits underneath](img/interface/dock-tabs-properties-phone.png){ width="360" }

**Folding and unfolding.** Unfold the phone (or widen the window past 640 px) and each tab goes back to its place on the
bigger screen: Properties and Configure Scene to their [sidebar](#sidebars) (the right side unless you moved them),
Objects to its window or sidebar, Notes to the notes drawer, Layouts to the Layouts dialog. Fold it again and the same
tabs come back, with the one you were looking at in front. What you open or close on the bigger screen carries over. A
reload starts with a clean slate.

### Sheets on a phone

Since 1.32 every sheet works the same way:

- **One grab bar** sits at the top of each sheet. It never scrolls away with the sheet's contents. (The **Grab handle**
  switch at the bottom of [More](#the-phone-bar-and-more) hides it; the sheet's top edge still resizes it.)
- **Drag the bar** to make the sheet taller or shorter. It stops at a minimum and a maximum height, and each sheet
  **remembers** its height on this device.
- **Swipe the bar down to the bottom** to close the sheet; a tap on the bar steps its size.
- **No sheet covers Play** or the selection toolbar, and none rises into the top bar.

Since the 1.32 review a sheet also **moves by its body**, the way a phone's own sheets do — Add, the main menu, the
notification centre, the profile menu, More and Chat:

- A list inside the sheet **scrolls** as usual. When the list is at its top, **pulling down** moves the sheet, and
  letting go far enough — or **flicking** down — closes it.
- A drag that started as a scroll stays a scroll: scrolling up and back down in one movement never closes the sheet.
  Pulled down and then back up, the sheet stops at its height and the list carries on scrolling.
- A quick flick closes the sheet from any height; a gentle one steps down to the next size. Past its tallest size the
  sheet stretches with resistance and springs back.
- Sideways strips, sliders, number fields and canvases inside a sheet keep their own gestures.
- **The dock minimizes instead of closing.** Its grab bar — or a pull down from the top of a tab's list — minimizes the
  dock with every tab still open (Properties, Objects, Notes, the Explorer, the node editor and the rest). The bottom
  bar's buttons bring it back.
- **Your profile menu** — tap your picture — is a sheet too, without a second copy of your picture in its header (it is
  already at the top right). **Customize character** and **Profile settings** open from it with a tap.
- **The peers panel** — the peers button in the top bar — opens as a sheet like the notifications: grab bar, swipe down
  to close. See [Who is here](connection.md#who-is-here-the-peers-panel).

For the Explorer's long-press actions on a phone, see [Explorer: on a phone](explorer.md#on-a-phone).

### The selection toolbar

When something is selected, a toolbar floats above the bottom bar — or above the dock or sheet that is open, moving
with its top edge in the same frame while you resize it:

| Button | What it does |
|---|---|
| **Move / Rotate / Scale** | the gizmo mode (keys <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd>) |
| **Select multiple** | a toggle: while it is on, every tap adds or removes an object (there is no <kbd>Shift</kbd> on a phone) |
| **Interact** | a toggle: tap the scene to play with it instead of editing (<kbd>I</kbd>) — see [Edit and Interact](controls.md#edit-and-interact) |
| **Inspect** (the sliders icon) | opens the object's properties as the dock's **Properties** tab, or brings that tab to the front when another tab is in front; tap it again to close it. It looks pressed only while Properties is the tab on screen |
| **Undo / Redo** | |

Every toggle shows its state: a filled (tinted) button is on. Tapping a selected object deselects it — see
[Tapping to select](controls.md#tapping-to-select-on-a-touch-screen).

![The selection toolbar on a folded phone: Move (on), Rotate, Scale, Select multiple, Interact, then Inspect, then Undo and Redo, above the bottom bar with Play](img/interface/selection-toolbar-phone.png){ width="360" }

## For module authors

Every part shown here is on the **/kit** page of the app, in every state, and module panels can use the same parts — see
[The UI kit](ui-kit.md).
