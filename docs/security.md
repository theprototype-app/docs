# Security & Self-hosting

theprototype.app lets people share scenes that carry code: Script nodes, Behaviour files, a Character Controller's
**Player** code and **Custom (code)** HUD elements. This page says where that code runs, what it can and cannot reach,
what is trusted, and what a self-hosted copy needs to send. To report a problem, see
[SECURITY.md](https://github.com/theprototype-app/core/blob/main/SECURITY.md) — please do not open a public issue.

## Scene code runs in a sandbox

*Since 1.42.1.* Code that travels with a scene runs in a **separate JavaScript engine** (QuickJS, compiled to
WebAssembly), not in the app page. It has exactly the scene API it is given — the object it drives, variables,
events, raycasts, the game kit — and nothing else:

| Scene code can | Scene code cannot |
|---|---|
| move, turn, scale, show and hide objects; change their colour and other material values | read `localStorage`, cookies or IndexedDB — so no AI keys, no sign-in, no autosaves |
| read and write variables, fire and handle events, call the game kit | reach `document`, `window` or the app's own DOM |
| raycast, look up objects, spawn objects (host only) | send anything over the network (`fetch`, WebSocket, WebRTC, images by URL) |
| draw a Custom (code) HUD element: text, boxes, styles, SVG, a 2D canvas | load other code (`import()`), use timers, or run forever — each call has a time limit |

A **Custom (code)** HUD element draws into a small document of its own. What it builds is cleaned before it is
shown: no scripts, no event handlers, no addresses except embedded `data:` images. It re-renders when its values
change; event listeners and timers are not available inside one (use a Button element for presses).

The engine loads when a scene with code starts to open, so the first script runs as soon as the scene is ready.

## What is trusted

- **Installed modules are not sandboxed.** Installing a module (a zip or a URL in the Modules manager) runs its code
  in the page with the same rights as the app. Install only modules you trust; a scene that needs a module asks
  first and only offers modules from the module gallery. See [Modules](modules.md).
- **Your keys stay on your device.** AI, mesh and speech-to-text keys live in this browser only. They are never
  written into scenes, `.tp` projects, layouts, shares or the diagnostics bundle.
- **Invite links** that name a different signaling server ask before switching to it ("Join on another server?").
  A signaling server sees your IP address and how you connect, so join only if you trust who sent the link.
- On theprototype.app, **play links and embeds open from play.theprototype.app**, a separate origin that keeps no
  sign-in. Your account stays on theprototype.app.

## Self-hosting

A build (`npm run build`) ships a **Content-Security-Policy** as a `<meta>` tag in every page: scripts only from the
app itself (plus WebAssembly), so an injected script does not run. `npm run dev` ships no policy and needs no setup.

One directive cannot travel in a `<meta>` tag: `frame-ancestors` (who may put the app in an iframe). The build writes
it to `build/_headers`, which Cloudflare Pages reads as is. On any other server, send the same header yourself, for
example in nginx:

```nginx
add_header Content-Security-Policy "frame-ancestors *" always;
add_header X-Content-Type-Options nosniff always;
```

Build-time settings (in `.env`, see `.env.example`):

| Variable | What it does |
|---|---|
| `VITE_CSP_SCRIPT_SRC` | adds origins to `script-src` (e.g. an analytics beacon your host injects) |
| `VITE_CSP_CONNECT_SRC` | **replaces** the default `connect-src` with your own list (pin your AI, mesh and content servers) |
| `VITE_CSP_EXTRA_CONNECT` | adds origins to the default `connect-src` |
| `VITE_CSP_IMG_SRC` | replaces the default `img-src` / `media-src` |
| `VITE_CSP_FRAME_ANCESTORS` | the `frame-ancestors` header value |
| `VITE_CSP=off` | no policy at all, for a deployment that sets its own at the edge |
| `VITE_PLAY_ORIGIN` | serve play links and embeds from a second origin (optional); the page there is player-only |
| `VITE_APP_ORIGIN` | the editor's origin, for the play origin's "Open in the app" link |

The default `connect-src` allows `https:`, `wss:` and local model servers on `localhost`, so custom AI endpoints,
ComfyUI and module installs from any repository keep working. Built deployments need a browser with
`'wasm-unsafe-eval'` support (Safari 16 or newer; every current Chrome, Edge, Firefox and Quest Browser).
