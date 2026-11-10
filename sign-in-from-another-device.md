# Sign in from another device

Typing a GitHub or Google password on a headset, or in someone else's browser, is slow and risky. Instead, sign the
new device in **from a device where you are already signed in**: the new device shows a short code, you type it on
your phone or computer, check which device is asking, and approve it.

!!! info "New in 1.62"
    Sign in from another device, and **Account ▸ Devices**: every device signed in to your account, with a Sign out
    for each. Since 1.65 Devices and Sign-in methods live in **Settings ▸ Account** (the account menu's **Manage** opens
    it).

It works in every direction: a Quest from your PC or phone, a PC from your phone, a phone from your PC, one browser
from another.

## On the device that is not signed in

1. Open the **account menu** (your avatar, top right) and press **Sign in to cloud**.
2. Under the GitHub and Google buttons, press **Sign in from another device**.
3. A sheet shows an **8-character code** in two groups, like `KM4R 7XQT`, and how long it is valid (5 minutes).
   The small **QR button** next to the code shows a QR code instead: scan it with your phone's camera to skip typing.
4. Keep the sheet open. As soon as you approve on the other device, this one signs in.
5. On the last screen, choose whether to **Trust this device** (see below), then press **Done**.

**Cancel** ends the code at once. If it runs out, or the other device says no, press **Get a new code**.

## On the device where you are signed in

Go to **theprototype.app/link** and type the code. (Scanning the QR opens the same page with the code filled in.) You
can also open **Settings ▸ Account ▸ Devices ▸ Sign in another device**.

The sheet shows which device is asking: its type, browser and system (for example *Quest Browser on Meta Quest*),
roughly where it is (the country, when it can be told), and how long ago it asked.

**Approve only a device you are holding right now.** If someone sent you a code or a link and asked you to "confirm"
it, press **Deny**: approving would sign *them* in as you. Nobody from theprototype will ever ask you for a code.

When the type of device cannot be recognised, **Approve** asks once more: press **I am holding this device** to go
ahead.

A message tells you when the device has signed in. If you are not signed in on this device yet, the sheet asks you to
sign in first and then continues.

## Trust this device

A device signed in with a code is signed in **for up to 24 hours** unless you tick **Trust this device** on its last
screen. Leave it off on a shared or borrowed browser: it signs itself out the next day. Tick it on your own headset or
computer, and it stays signed in like a normal sign-in (as long as you keep using it).

You can only choose right after signing in. To change your mind later, sign the device out (below) and sign it in again.

## See and sign out your devices

**Settings ▸ Account ▸ Devices** (account menu ▸ **Manage**) lists every device signed in to your account, however it signed in (GitHub, Google or a
code), with where it was and when it was last used. *This device* is the one you are using.

- **Sign out** next to a device signs it out. It is refused the next time it talks to the server, usually within
  seconds, and shows the sign-in button again.
- **Sign out all other devices** keeps only the device you are using. Use it if you lost a phone or signed in
  somewhere you should not have.
- **Sign out** at the bottom of the account menu signs out the device you are using.

## Quest: sign in on the headset

1. In the Quest Browser, open **theprototype.app** and the account menu ▸ **Sign in to cloud** ▸ **Sign in from
   another device**. The code is shown large, so you can read it comfortably in the headset.
2. On your phone or PC, open **theprototype.app/link** and type the code. The sheet should say
   *Quest Browser on Meta Quest*.
3. Press **Approve**. The headset signs in; tick **Trust this device** if the headset is yours.

## If something goes wrong

| what you see | what it means |
|---|---|
| *That code is wrong, or it is not valid any more* | a typo, or the code ran out, was used, cancelled or denied. Get a new one on the other device. |
| *Too many wrong codes. Try again in 15 minutes.* | five wrong codes in 15 minutes lock approving for a while. This protects against guessing. |
| *Too many sign-in codes from this network* | many codes were asked for from your network. Wait a few minutes. |
| *The other device said no* | the code was denied on the signed-in device. |
| *This device was signed out from another device.* | someone signed this device out in **Devices** (maybe you). Sign in again. |

## If you lose your GitHub or Google account

There is no password to reset: your account opens with GitHub or Google. Two things keep you able to get back in:

- **Link a second way in.** **Settings ▸ Account ▸ Sign-in methods** ▸ **Link** the other provider. If you lose one, the
  other still opens the same account.
- **Keep one device signed in.** A device that is still signed in can sign in a new one with a code, even if you can no
  longer sign in with GitHub or Google. Then link a new provider from **Sign-in methods**.

If neither works, see [Can't sign in?](https://theprototype.app/cant-sign-in).

## What is recorded

For each code: the account that approved it, the device type, browser and system, the country (when it can be told) and the first part of
the IP address, and what happened (approved, denied, ran out). Never the code itself. These records are kept for 30
days. The **Devices** list keeps each device's type, browser, system, country, how it signed in and when it was last
used, until the device is signed out (then 30 more days) or has not been used for 35 days. See the
[Privacy page](https://theprototype.app/privacy).
