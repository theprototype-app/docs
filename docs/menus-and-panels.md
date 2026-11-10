# New menus and panels

*New in 1.65.* Several windows and menus were rebuilt so that related things sit together: Chat and the AI assistant
share one window, everyone in the session has a card, the file preview docks and edits images, the Timeline has panes,
Generate 3D is a window, and your account has one page in Settings.

Layouts and window positions saved by an earlier version open the new windows: a docked or placed AI assistant opens
Chat on its **Assistant** tab, and an Image editor tab opens the **Preview**.

## Chat and the AI assistant

Chat and the AI assistant are one window with two tabs: **Session** for the people in this session, and **Assistant**
for your own AI provider or an AI agent that joined. The Chat button (or <kbd>C</kbd>) opens it on **Session**, the AI
button on **Assistant**. If the window is on the other tab, the button switches tabs; if its own tab is showing, it
closes the window. A dot on a tab means something new arrived there. The clock button opens one **History** for both
kinds of chat (**All | People | AI**, and a search), and chats come back after a reload. Your own provider's chats stay
on this device. More: [Chat](notifications.md#chat) and [AI Assistant](ai/assistant.md#the-assistant-tab-of-the-chat-window).

<!-- shot: menus-and-panels/chat-session — the Chat window on its Session tab, the Session | Assistant tabs and the clock (History) button marked -->
<!-- shot: menus-and-panels/chat-assistant — the same window on its Assistant tab, with the provider picker -->
<!-- shot: menus-and-panels/chat-history — History open: the All | People | AI filter and a past scene's chat -->

## People

### The Person card

Press anyone in the People list for their **Person card**: who they are (role, status, device, how long they have
been here), what they are doing now, their connection over the last minute, and every action of the peer menu as
buttons. The **People** arrow goes back to the list. See [The Person card](people.md#the-person-card).

### Invite and Join…

The Connect bar leads with **Invite** and **Join…**. **Invite** opens the invite sheet on **Person**, with **AI agent**
as its second tab (it replaces the *Request AI* button). **Join…** opens the field that takes a pasted invite link or
a peer id. Someone who joins with your invite is announced by name (*Guest 2 joined with your invite*), not by an id.
See [The Connect panel](connection.md#the-connect-panel) and [Invite people and agents](invites.md).

### Show my status

Let others see whether you are **Available**, **Busy** or **Away**: switch on **Settings ▸ Interface ▸ Show my
status** (off by default), then pick your status on your own card. See [Show my status](people.md#show-my-status).

<!-- shot: menus-and-panels/person-card — a Person card in the People popover: Now, Connection and the action groups -->
<!-- shot: menus-and-panels/connect-invite-join — the idle Connect bar: Ready, Invite and Join… -->
<!-- shot: menus-and-panels/my-status — your own card with Available | Busy | Away -->

## Preview and the image editor

The file preview can pin to the dock: the **pin** in its header makes it the **Preview** tab, which shows whatever you
select in the Explorer. **View | Edit** in the header switches an image in your Library into the image editor, in the
same window, with a filmstrip of the folder's images on the left. The separate Image editor window and its dock tab
are gone. Unsaved edits are never dropped without asking. See [The preview window](explorer.md#the-preview-window)
and [Image Editor](image-editor.md).

<!-- shot: menus-and-panels/preview-docked — the Preview pinned to the dock, following the Explorer selection -->
<!-- shot: menus-and-panels/preview-edit — the Preview on Edit: the images filmstrip, the canvas and the Edit page -->
<!-- shot: menus-and-panels/preview-split — the dock split: the Explorer and the Preview side by side -->

## Timeline and Generate 3D

The [Timeline](timeline.md#sequences-tracks-and-properties) has three panes: **Sequences** on the left, the tracks in
the middle, and **Properties** on the right with a **Sequence** tab (with its frame rate) and an **Item** tab. Each
side pane hides with its edge tab.

**Generate 3D model** is a window now, not a dialog: dock it like any other. Its **Jobs** and **History** survive a
reload, and a running job carries on after a reload without being sent again, so it is not charged twice. See
[The Generate window](ai/generation.md#the-generate-window).

<!-- shot: menus-and-panels/timeline-panes — the Timeline with Sequences, tracks and Properties ▸ Sequence -->
<!-- shot: menus-and-panels/generate-jobs — the Generate window docked, a job running in Jobs -->
<!-- shot: menus-and-panels/generate-history — the Generate window floating, on History -->

## Settings ▸ Account

On theprototype.app, **Sign-in methods**, **Devices** and **Connected apps** moved into **Settings ▸ Account**, beside
**Email**. The profile menu keeps the email-updates question and **Sign out**, with a **Manage** link to the new page.
Settings search finds every row. **Revoke** for an AI app you connected now lives in **Settings ▸ Account ▸ Connected
apps**. See [Settings ▸ Account](settings.md#account).

<!-- shot: menus-and-panels/settings-account — Settings ▸ Account: Email, Sign-in methods, Devices, Connected apps -->
<!-- shot: menus-and-panels/profile-manage — the profile menu's Account group with Manage -->
