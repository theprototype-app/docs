# AI Assistant

Build and rearrange the scene by describing what you want. The assistant turns a prompt
into real objects — primitives, lights and groups — placed, colored and named for you.
Everything it does is a normal edit: it **replicates live to everyone in the session** and
**undoes as a single step**.

!!! note "You bring the model"
    The assistant talks to an AI provider you configure (Grok, Gemini, or any
    OpenAI-compatible / self-hosted endpoint). Nothing is sent anywhere until you add a
    provider and a key in **Settings ▸ AI**. See [AI Providers](providers.md).

## Turning it on

1. Open **Settings ▸ AI** and toggle **Enable assistant**.
2. Add a provider (Grok, Gemini or a custom endpoint) and select it as active.

Once enabled, there are two ways to talk to it.

### The quick prompt bar

Press <kbd>`</kbd> (backtick, top-left of most keyboards) to pop up a prompt bar at the
bottom of the viewport. Type a request, press <kbd>Enter</kbd>, and the assistant window
opens so you can watch it work. Press <kbd>`</kbd> again or <kbd>Esc</kbd> to dismiss the
bar. It stays hidden until you summon it, so it never gets in the way.

### The assistant window

A floating, draggable window (it tabs and docks like Chat and the Explorer). It keeps the
conversation, so you can refine across turns — "make them taller", "now paint the front
one blue". Use **Stop** to cancel a run in progress.

## What you can ask for

The assistant works with the building blocks the app already has:

- **Create** primitives (box, sphere, cylinder, cone, capsule, torus, plane, and the
  building-block shapes like wedge/stairs/arch) and lights, with positions, rotations,
  scales, colors and names.
- **Arrange** — grids, rows, rings, stacks. It knows the ground is the `y=0` plane and
  seats objects on it.
- **Modify** existing objects — move, recolor, rescale, change material, rename, hide.
- **Group** objects together, or clear the scene when you want to start over.

Good prompts are concrete: *"a small campfire — a ring of 6 grey rocks around an orange
cone flame"* works better than *"make something cozy"*.

## How edits behave

- **Replicated.** Every object the assistant creates or changes appears for all connected
  peers, exactly as if you had made the edit by hand.
- **One undo per prompt.** A whole prompt — even one that creates a dozen objects across
  several steps — collapses into a single <kbd>Ctrl</kbd>+<kbd>Z</kbd>. Redo restores it.
  The window shows an "Applied N actions" note when a prompt finishes.
- **Respects locks.** Objects another person currently has selected are skipped rather
  than fought over.

## Limits (for now)

- It composes the **existing** primitives and lights — it does not yet generate custom 3D
  meshes or textures from a prompt.
- It does not wire up node-graph behavior yet.
- Results depend on the model you point it at; smaller models place things more crudely.

## Troubleshooting

| Symptom | Fix |
|---|---|
| <kbd>`</kbd> shows a toast about Settings | Enable the assistant and add a provider first. |
| "Invalid API key" | Re-check the key in **Settings ▸ AI ▸ Edit**. |
| "Network or CORS error" | A self-hosted endpoint must allow browser origins — see [Providers](providers.md). |
| Objects look wrong / oversized | Ask a follow-up ("half the size", "move it to the origin") — it edits in place. |
