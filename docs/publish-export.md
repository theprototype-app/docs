# Publish & Export

!!! warning "Draft for 1.21"
    This page is being written alongside the 1.21 release. Sections marked *TODO* are filled in from the
    finished feature before the release.

**Menu ▸ Publish / Export** (it was *Publish*) puts a scene somewhere other people can play it. There are two ways out:

- **Publish** — put it on theprototype.app's community, with its own page and a **play link** that opens straight into
  the game. See [Community](community.md) for pages, remixes and contests.
- **Export** — download the game as a **zip of plain HTML** you can host anywhere: itch.io, your own site, a static host,
  or an `<iframe>` on a blog.

## The play link

*TODO (36-export): where the link is shown, what it looks like, autoplay behaviour (desktop: first click takes the
pointer; phone: touch controls), QR code if any.*

A play link opens the app with the scene loaded and Play already running — the person you send it to lands in the game,
not the editor.

## The "Made with TP" badge

Every exported or embedded game shows a small, semi-transparent **TP** logo in the bottom-right corner. Clicking it opens
theprototype.app in a new tab. *TODO: whether it can be hidden (it cannot in the plan), size, behaviour in VR.*

## Exporting a zip

*TODO (36-export): the Export tab, its presets and options.*

| Preset | Use it for |
|---|---|
| **itch.io** | an HTML5 game page on itch.io (guide below) |
| **Static host** | any web host that serves files — GitHub Pages, Netlify, Cloudflare Pages, your own server |
| **Embed (iframe)** | a snippet to paste into a blog or site |

The zip holds an `index.html`, the scene and its assets, and the player — every path inside it is relative, so it works
from any folder of any host.

## Publishing on itch.io

1. In the app: **Menu ▸ Publish / Export ▸ Export**, preset **itch.io**, and download the zip.
2. On [itch.io](https://itch.io), choose **Upload new project** (from the menu under your name, *Dashboard*).
3. Give it a title, and set **Kind of project** to **HTML**.
4. Under **Uploads**, upload the zip, and tick **This file will be played in the browser**.
5. Under **Embed options**, set the viewport size (for example 1280 × 720), and tick **Fullscreen button** — and
   **Mobile friendly** if your game has [touch controls](touch-controls.md).
6. Save as a **Draft**, open the page and play it once; then set **Visibility** to *Public*.

!!! tip "Updating the game"
    Upload the new zip and delete the old one (or use itch.io's `butler push` from the command line, which uploads only
    what changed). Keep the same project page, so the link people have keeps working.

## Embedding on your own site

*TODO (36-export): the iframe snippet from the Embed preset; how it relates to the community page's Embed button
(see [Embedding a scene](community.md#embedding-a-scene)).*
