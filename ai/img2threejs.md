# Better models with img2threejs

*Recipe — img2threejs is a third-party agent skill (Apache-2.0, <https://github.com/img2threejs/img2threejs>). theprototype
does not bundle or run it; your agent does, on your own machine and your own model plan.*

img2threejs rebuilds an object from **one picture** as procedural three.js code: a `THREE.Group` made of primitives and
generated geometry, with a hierarchy of **pivots and sockets** (a lid that opens, a flame that flickers, a spot to hang a
pot). With the AI assistant window and the `import_model` tool, the result lands in your scene as an ordinary model that
every peer sees, saves with the scene and undoes in one step.

## 1. Install the skill beside the agent bridge
On the machine where your agent (Claude Code, Codex or OpenCode) runs:

```sh
npx --yes img2threejs@latest install   # links the skill into every agent it finds
npx --yes img2threejs@latest doctor    # "managed" = Claude Code is set up
```
Needs Node.js ≥ 18, Git and Python ≥ 3.10. Restart the agent. Connect it to your session as in [Talk to your agent](https://docs.theprototype.app/ai/talk-to-your-agent.md)
(`npx @theprototype/agent …`) and tell it to listen.

## 2. Send a picture in the chat
In the AI assistant window pick your agent, then press **+** → *From device* / *Camera* (phones) / *From Explorer*, paste,
or drop the picture on the window. It is shrunk on your device (long edge 1568 px, about 1 MB) and its **location data
is removed before it is sent**. The agent sees the picture, and the bridge also saves it to a temporary file whose path
comes with your message — that path is what the skill takes.

Write what you want, for example: *"Rebuild this lantern with img2threejs, then import it next to the campfire."*

## 3. What the agent does
1. Runs `/img2threejs Rebuild the object in <the temp path> as a procedural Three.js model.`
2. **Exports a GLB** from the generated group (three.js `GLTFExporter`, binary, everything embedded) — keep the node
   names: `Lid_Pivot`, `Flame`, `Socket_Handle` become named objects you can select, animate and wire in Flow.
3. Calls `import_model` with the file's `path` (the bridge reads it locally), a position and a `source` note
   (for example *"img2threejs from lantern.jpg"*). The app runs its own import pipeline (optimizing big textures, LOD,
   the device-budget check) and records where the model came from.

## Good to know
- **Materials:** glTF carries standard PBR materials only. img2threejs's *procedural shaders do not survive* the export —
  ask the agent to **bake** them to textures, or to use standard materials (colour, roughness, metalness, emissive).
- **Self-contained GLB only**, up to 25 MB: no external textures or buffers. Nothing in a GLB runs as code.
- **Draft or strict:** say *"low effort / draft"* for a quick blockout; the skill's strict quality gate
  (`--strict-quality`) refuses shallow specs and takes longer. Start with a draft, refine the parts that matter.
- **Cost:** a rebuild is several vision passes (blockout → structure → form → material → surface → lighting →
  interaction → optimization, each compared against your picture) on **your own** agent plan. A strict rebuild of a
  detailed object can use a lot of it.
- Editors and admins can send pictures and import; viewers see the pictures and the models.
- Undo removes the whole import in one step; the model's Properties show its source.
