# Your account and data

Your account on theprototype.app is yours to look after: download everything it holds, see where you are signed in,
get an email when a new device signs in, block people, and delete the account when you want to.

!!! info "On theprototype.app"
    Everything on this page is part of the hosted theprototype.app, where you can sign in. The open-source build has
    no accounts, so it has none of it. The site's [privacy page](https://theprototype.app/privacy) says what is kept
    and for how long.

!!! info "New in 1.76"
    Download my data, deleting your account with 30 days to change your mind, Sign out everywhere, new sign-in
    emails and the Blocked people list.

## Download my data

**Download my data** gives you one zip with everything your account holds. It is in two places:

- the **profile menu** (your picture at the top right), in the **Account** group;
- **Settings ▸ Account ▸ Your data ▸ Download my data**, which is also step 1 of [deleting your account](#delete-your-account).

Before the download starts you see what it will hold and roughly how big it is, for example *4 cloud saves
(12 versions), 3 published templates, 20 comments, 41 likes, 1 contest entry. About 4.2 MB.*

The zip is made in your browser. It holds:

- every version of every cloud save you own;
- your published scenes and games, as `.tpscene` files, with their details (`templates.json`);
- your profile and your picture (`profile.json`);
- your comments, your likes and your contest entries (`comments.json`, `likes.json`, `contest-entries.json`);
- `metadata.json`, which lists any file that could not be read.

If a file cannot be read, the zip still downloads and says so: *Downloaded, but 1 file could not be read. They are
listed in metadata.json.* The saves in the zip are the same files you saved, and they open like any other scene.

## Delete your account

**Settings ▸ Account ▸ Your data ▸ Delete account** opens three steps:

1. **Download your data.** Press **Download my data** to keep a copy, or **Skip, I have a copy**.
2. **What happens.** A short list of what is hidden now and what is deleted later, and a choice for your published
   scenes and games: **Delete them with my account** (the default), or **Keep them for others, credited to "a deleted
   creator"** (your name removed).
3. **Type your email.** Type the email address of your account to confirm. The button names the day:
   **Delete my account on ‹date›**.

### What happens at once

- Your profile and your published scenes and games are hidden from everyone.
- Your rooms are removed.
- You are signed out on every device.

While the deletion is scheduled, nothing new can be published under your account.

### 30 days to change your mind

Sign in again within 30 days and a sheet says *Your account is scheduled for deletion*, with the day. Press **Keep my
account** and everything the request hid shows again. (A scene our moderators had hidden stays hidden.) **Sign out**
leaves the deletion as it is.

### After 30 days

Your account is deleted, with:

- your cloud saves and every version of them;
- your comments, likes, kept rooms and the reports you made;
- your connected apps, which are disconnected.

Entries in contests that are still running are withdrawn. Your published scenes and games are deleted, or kept for
others credited to "a deleted creator", as you chose in step 2.

### What is kept, and for how long

- Results of contests that had already finished stay, credited to "a deleted creator".
- Reports other people made about your scenes are kept for **90 days** after the deletion, as a short label with no
  link, so our moderators can finish handling them.
- Your handle is held for **30 days**, so nobody can take it over at once.
- Copies in our daily backups are gone within **14 days**.
- A scene someone else already downloaded or remixed stays with them.

## Where you are signed in

**Settings ▸ Account ▸ Devices** lists every device signed in to your account, this one first. Each row shows the
browser and the device (*Chrome on Windows*), how it signed in (GitHub, Google or a code), the country when it can be
told, when it was last active and when it first signed in. A device signed in with a code that you did not trust says
*signs out within 24 h*.

- **Sign out** beside a device signs out that device only.
- **Sign out others** (*Sign out all other devices*) keeps this device signed in and signs out the rest.
- **Sign out everywhere** signs out every device and browser where your account is signed in, this one too.

To sign in a headset or a borrowed browser with a code, see [Sign in from another device](https://docs.theprototype.app/sign-in-from-another-device.md).

## New sign-in emails

When your account signs in on a device it has not used before, you get one email. It says which browser and device,
and the country when it can be told.

- It is sent once for each new device.
- It is never sent when a device you already use stays signed in, and not for the very first sign-in of a new account.
- **Not you?** The email says what to do: open theprototype.app and go to **Settings ▸ Account ▸ Devices ▸ Sign out
  everywhere**, disconnect any app you do not recognise in **Settings ▸ Account ▸ Connected apps**, then check the
  GitHub or Google account you sign in with.

The emails are on unless you switch off **Settings ▸ Account ▸ Email ▸ New sign-in alerts**.

## Blocked people

You can block a signed-in account so it cannot join the sessions you host, on any of your devices.

- **Block:** open the person's menu in People (right-click their row, or long-press on touch) and choose **Block this
  account…**. They are removed, and the block stays until you lift it. You need to be signed in to keep a block list.
- **See and lift blocks:** **profile menu ▸ Blocked people…** lists everyone you blocked. **Unblock** lifts a block.

A block holds in sessions you host. If a blocked account tries to join, it is removed and you see *Someone you blocked
tried to join, and was removed.*

A signed-out guest is not an account, so there is nothing to block: **Block this account** says so. Use **Remove and
block** for that session instead, and see [Blocking a guest](https://docs.theprototype.app/connection.md#blocking-a-guest) for how to keep them out.
Someone signed out joins under your room's guest rules.

Only you can see your list. Unblocking deletes the entry, and deleting either account deletes it too.
