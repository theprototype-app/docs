# Privacy & Error Reports

In a session your scene goes from your browser straight to the people you connect to (peer-to-peer); our servers
introduce you, relay the encrypted traffic when a direct link is impossible, and serve accounts, cloud saves, assets
and community pages ([how it works](https://docs.theprototype.app/index.md#how-it-works)). This page covers what the app sends about itself —
**anonymous error reports**, and how to switch them off — and the anonymous counters. For accounts,
cloud saves and the community, see the site's [privacy page](https://theprototype.app/privacy).

## Anonymous error reports

*New in 1.39.* When something in the app breaks — an error, a crash, the 3D view losing its graphics context, running
out of memory — the app sends a short **anonymous report** so the team can find and fix it. It is **on by default**, and
one switch turns it off.

**Where:** **Settings ▸ Privacy ▸ Send anonymous error reports** (in the *Devices & services* group). The settings
search finds it under *privacy*, *crash*, *telemetry* or *error reports*.

### What a report holds

- The **kind** of failure: error, rejected promise, WebGL context lost, out of memory, or crash.
- The **error message** — with anything that could name you or your work removed **on your device first**: web
  addresses, server names, IP addresses, file paths, emails, ids and quoted names become placeholders (server names
  and IP addresses since 1.40).
- The lines of the **app's own code** where it happened.
- The **app version**, the **device type** (desktop / phone / tablet / headset), the **browser and OS** family and major
  version, **WebGL / WebGPU**, the **app area** (editing / playing / VR) and whether it was the live site or a preview (a preview reports under its own label, such as `1.40.0-preview`).

### What it never holds

No account, no IP address, no scene content, no names, no cookie — and nothing that links two reports to one person.

- At most **five reports per visit**.
- Reports **expire** after about three months.
- A crash that kills the tab — common when a phone or headset runs out of memory — is reported on the tab's **next
  load**, as kind *crash*.

## Anonymous counters

theprototype.app also counts things in aggregate — page visits and plays of a published scene. These are totals:
no cookie, no account, nothing that links one visit to another or to you.

**Performance reports** are separate and **off** unless you switch them on (**Settings ▸ Interface ▸ Send
performance reports**): frame-time numbers and versions, no account and no scene content.

!!! note "Other builds send nothing"
    The engine is [open source](https://github.com/theprototype-app/core). A build of it that is not ours has no report
    address, sends nothing, and the Privacy row says so.
