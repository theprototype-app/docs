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

![The Chat window on its Session tab: Mia's line and your answer, the message field and Send below, and in the header the History clock and the close button. 1: the Session and Assistant tabs. 2: the History button.](img/menus-and-panels/chat-session.webp){ .shot width="500" height="460" loading=lazy }
/// caption
Chat and the AI assistant share one window, here on its Session tab.
///

<div class="shot-key" markdown>
1. **Session** is the chat with the people in this session, **Assistant** your AI provider or an agent that joined. The Chat button (or <kbd>C</kbd>) opens Session, the AI button Assistant.
2. The clock opens **History**: every chat of both kinds, kept on this device.
</div>

![The same Chat window on its Assistant tab: your request for a campfire ring and the assistant's answer, the Talk to picker set to Mock, the field Ask the assistant…, and Send. 1: the Assistant tab. 2: the provider picker.](img/menus-and-panels/chat-assistant.webp){ .shot width="500" height="460" loading=lazy }
/// caption
The Assistant tab of the Chat window.
///

<div class="shot-key" markdown>
1. The **Assistant** tab: the window the AI button opens.
2. **Talk to**: your own **provider**, or an AI agent in the session.
</div>

![History open over the Chat window: Search chats and New chat at the top, the All, People and AI filter, then the rows: this scene's session, a chat with the Mock provider, and the session log of the scene Campfire meadow with Mia and Theo. 1: the All, People and AI filter. 2: a past scene's chat.](img/menus-and-panels/chat-history.webp){ .shot width="500" height="460" loading=lazy }
/// caption
One History for both kinds of chat.
///

<div class="shot-key" markdown>
1. **All**, **People** or **AI**; the search above looks through every chat.
2. The chat of a **past scene**: it opens read-only on the Session tab.
</div>

## People

### The Person card

Press anyone in the People list for their **Person card**: who they are (role, status, device, how long they have
been here), what they are doing now, their connection over the last minute, and every action of the peer menu as
buttons. The **People** arrow goes back to the list. See [The Person card](people.md#the-person-card).

![Mia's Person card in the Connected popover: the People back arrow, her avatar, name, role and how long she has been here, Now with where she is, her Connection over the last minute, and the peer menu's actions as buttons in groups. 1: back to the list. 2: Now and Connection.](img/menus-and-panels/person-card.webp){ .shot width="398" height="618" loading=lazy }
/// caption
A Person card in the People popover.
///

<div class="shot-key" markdown>
1. The **People** arrow goes back to the list.
2. **Now** (what they hold, or where they are) and their **Connection** over the last minute; the action buttons follow.
</div>

### Invite and Join…

The Connect bar leads with **Invite** and **Join…**. **Invite** opens the invite sheet on **Person**, with **AI agent**
as its second tab (it replaces the *Request AI* button). **Join…** opens the field that takes a pasted invite link or
a peer id. Someone who joins with your invite is announced by name (*Guest 2 joined with your invite*), not by an id.
See [The Connect panel](connection.md#the-connect-panel) and [Invite people and agents](invites.md).

![The idle Connect bar: Ready and your peer id with its copy button, then the Invite and Join… buttons, Browse public rooms and the drawer arrow. 1: Invite. 2: Join….](img/menus-and-panels/connect-invite-join.webp){ .shot width="435" height="104" loading=lazy }
/// caption
The Connect bar leads with Invite and Join….
///

<div class="shot-key" markdown>
1. **Invite** opens the invite sheet: **Person** or **AI agent**.
2. **Join…** opens the field for an invite link or a peer id.
</div>

### Show my status

Let others see whether you are **Available**, **Busy** or **Away**: switch on **Settings ▸ Interface ▸ Show my
status** (off by default), then pick your status on your own card. See [Show my status](people.md#show-my-status).

![Your own Person card with Show my status on: Alex (you) with the Admin badge and Busy, Your status with Available, Busy and Away, Now in Untitled scene, and the buttons Edit profile, Change character and Copy peer id. 1: Your status.](img/menus-and-panels/my-status.webp){ .shot width="398" height="424" loading=lazy }
/// caption
Your own card, with Show my status switched on.
///

<div class="shot-key" markdown>
1. **Your status**: **Available**, **Busy** or **Away**, shown beside your name for everyone.
</div>

## Preview and the image editor

The file preview can pin to the dock: the **pin** in its header makes it the **Preview** tab, which shows whatever you
select in the Explorer. **View | Edit** in the header switches an image in your Library into the image editor, in the
same window, with a filmstrip of the folder's images on the left. The separate Image editor window and its dock tab
are gone. Unsaved edits are never dropped without asking. See [The preview window](explorer.md#the-preview-window)
and [Image Editor](image-editor.md).

![The bottom dock split in a small window: the Explorer on the left with sunset.png, noon.png and night.png in the Library, and the pinned Preview on the right showing noon.png, the file picked in the Explorer. 1: the Preview tab. 2: the picked file. 3: the pin, now on.](img/menus-and-panels/preview-docked.webp){ .shot width="688" height="381" loading=lazy }
/// caption
The Preview pinned to the dock beside the Explorer, in a small window.
///

<div class="shot-key" markdown>
1. Pinned, the preview is the **Preview** tab; with the Explorer docked too, the dock splits.
2. It **follows** the file you select in the Explorer.
3. The pin again unpins it.
</div>

![The Preview window on Edit for sunset.png: View and Edit and the pin in its header, the filmstrip of the folder's images on the left, the picture with Save in the middle, and the Edit page with Rotate and flip, Crop and Resize on the right. 1: View and Edit. 2: the filmstrip. 3: Pin to dock.](img/menus-and-panels/preview-edit.webp){ .shot width="680" height="600" loading=lazy }
/// caption
The Preview on Edit.
///

<div class="shot-key" markdown>
1. **View | Edit**: on an image in your Library, **Edit** turns the preview into the image editor.
2. The filmstrip: the images in **this folder**; press one to edit it.
3. **Pin to dock** makes it the **Preview** tab.
</div>

## Timeline and Generate 3D

The [Timeline](timeline.md#sequences-tracks-and-properties) has three panes: **Sequences** on the left, the tracks in
the middle, and **Properties** on the right with a **Sequence** tab (with its frame rate) and an **Item** tab. Each
side pane hides with its edge tab.

![The Timeline docked in a small window, in three panes: Sequences on the left with Intro, the tracks in the middle, and Properties on the right on its Sequence tab with the name, length, frame rate, Autoplay and Loop. 1: Sequences. 2: the Sequence and Item tabs.](img/menus-and-panels/timeline-panes.webp){ .shot width="680" height="303" loading=lazy }
/// caption
The Timeline's three panes, in a small window.
///

<div class="shot-key" markdown>
1. The **Sequences** pane: pick, add, rename, duplicate or delete one.
2. **Properties**: **Sequence** (with its frame rate) and **Item**, the selected item's fields. Each side pane hides with its edge tab.
</div>

**Generate 3D model** is a window now, not a dialog: dock it like any other. Its **Jobs** and **History** survive a
reload, and a running job carries on after a reload without being sent again, so it is not charged twice. See
[The Generate window](ai/generation.md#the-generate-window).

![The Generate 3D model window: the provider, the Prompt and Name fields and Generate, then the Jobs tab with a running job, a mossy stone lantern at 42 percent with Cancel, and a done one, a weathered wooden treasure chest, with Reopen. 1: Jobs and History. 2: the running job.](img/menus-and-panels/generate-jobs.webp){ .shot width="420" height="738" loading=lazy }
/// caption
The Generate window, with a job running in Jobs.
///

<div class="shot-key" markdown>
1. **Jobs** and **History** (the prompts you asked for) survive a reload.
2. A running job **carries on** after a reload without being sent again, so it is not charged twice.
</div>

## Settings ▸ Account

On theprototype.app, **Sign-in methods**, **Devices** and **Connected apps** moved into **Settings ▸ Account**, beside
**Email**. The profile menu keeps the email-updates question and **Sign out**, with a **Manage** link to the new page.
Settings search finds every row. **Revoke** for an AI app you connected now lives in **Settings ▸ Account ▸ Connected
apps**. See [Settings ▸ Account](settings.md#account).

![Settings ▸ Account while signed out: Email with Product updates, Sign-in methods, Devices and Connected apps, each saying what signing in from the profile menu adds. 1: Sign-in methods, Devices and Connected apps.](img/menus-and-panels/settings-account.webp){ .shot width="684" height="597" loading=lazy }
/// caption
Settings ▸ Account, signed out.
///

<div class="shot-key" markdown>
1. **Sign-in methods**, **Devices** and **Connected apps** **moved here** from the profile menu; signed in, each lists yours.
</div>

