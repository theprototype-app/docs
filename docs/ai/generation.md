# 3D Model Generation

Generate custom 3D meshes from a text prompt and drop them straight into the scene —
replicated to everyone, undoable like any other object. You bring the generator: a
**self-hosted ComfyUI** running a TRELLIS workflow, or a **hosted API** (Meshy).

!!! note "This is opt-in"
    Nothing is generated until you enable **Mesh generation** in **Settings → AI** and add
    a provider. Turning it on reveals **“✨ Generate 3D model…”** in the Add menu and lets
    the AI assistant call a `generate_mesh` tool.

## What to expect

- **Input:** a short text description (“a weathered wooden treasure chest with iron bands”).
- **Output:** a textured GLB placed at the origin (or the point you invoked it from),
  selected, and shared with peers. A progress card (top-right) shows status and lets you
  cancel.
- **Time:** roughly **1–3 minutes** depending on your GPU / the hosted plan. Generation is
  asynchronous — you keep working while it runs.
- **Provenance:** each generated object stores the prompt/provider/seed in its
  `userData.aiGen`, which survives scene saves.

Generation is best for organic or detailed props no primitive can approximate. For simple
blocky shapes, primitives are faster and cleaner.

---

## Option A — Self-hosted ComfyUI + TRELLIS (recommended)

This is the flexible, no-per-generation-cost path. **TRELLIS is image-conditioned** (it
turns an image into 3D), so a *text* prompt needs a text→image step first. ComfyUI chains
both in one graph, so the whole `text → image → 3D → GLB` pipeline is a single request.

### 1. Install ComfyUI + a TRELLIS node pack

- Install [ComfyUI](https://github.com/comfyanonymous/ComfyUI).
- Add a TRELLIS wrapper via ComfyUI-Manager or by cloning into `custom_nodes/`, e.g.
  [visualbruno/ComfyUI-Trellis2](https://github.com/visualbruno/ComfyUI-Trellis2) or
  [PozzettiAndrea/ComfyUI-TRELLIS2](https://github.com/PozzettiAndrea/ComfyUI-TRELLIS2).
  Let it download the TRELLIS models on first run.
- Add a text→image model (Flux or SDXL) and a **SaveGLB / export-GLB** node (the TRELLIS
  packs include one).
- **GPU:** TRELLIS 2 is comfortable at **≥16 GB VRAM**. With less, prefer a hosted provider.

### 2. Build and export the workflow

In ComfyUI, wire a graph roughly:

```
[CLIP Text Encode: prompt] → [Flux/SDXL sampler] → image
        image → [TRELLIS image-to-3D] → mesh → [SaveGLB]
```

Get it working once by hand (a real prompt → a real GLB in the output folder). Then export
it in **API format**:

- ComfyUI settings (gear) → enable **Dev mode**, then **Save (API Format)**. You get a JSON
  file describing the graph as a map of node-id → `{inputs, class_type}`.

### 3. Add the two placeholders

Open that JSON and replace the values you want driven by the app with tokens:

- **`{{PROMPT}}`** — in the text node's `text` input, e.g. `"text": "{{PROMPT}}"`.
- **`{{SEED}}`** — in the sampler's `seed` input, e.g. `"seed": "{{SEED}}"`.
  (A value that is exactly `"{{SEED}}"` is substituted with a random number each run.)

That's the whole contract. The app treats the rest of the graph as an opaque template — you
can retune steps, texture resolution, remesh, guidance, etc. entirely inside ComfyUI and
re-export; the app doesn't need to change. Everything the model does is decided by *your*
workflow.

### 4. Expose ComfyUI to the browser

The app calls ComfyUI directly from the browser, so it needs CORS, and (for anything but
localhost) TLS + auth.

- **Local (same machine):** launch with CORS enabled and point the app at
  `http://localhost:8188`:

    ```
    python main.py --enable-cors-header '*'
    ```

- **Remote:** front ComfyUI with a reverse proxy for TLS + a bearer token — the **same
  pattern you already use for the self-hosted PeerJS server** (e.g. a Caddy site
  `comfy.example.com` that adds TLS and checks `Authorization: Bearer …`, proxying to
  `127.0.0.1:8188`). Set that token as the provider's API key.

    ```caddy
    comfy.example.com {
        @auth header Authorization "Bearer YOUR_LONG_SECRET"
        handle @auth { reverse_proxy 127.0.0.1:8188 }
        respond 401
    }
    ```

    (ComfyUI still needs `--enable-cors-header '*'` behind the proxy, or have Caddy add the
    CORS headers.)

### 5. Configure it in the app

**Settings → AI → Mesh generation → + Add mesh provider:**

| Field | Value |
|---|---|
| Kind | ComfyUI (self-hosted TRELLIS) |
| Base URL | `http://localhost:8188` (or `https://comfy.example.com`) |
| Bearer token | blank on LAN; your proxy secret if remote |
| Workflow JSON | paste the API-format JSON with `{{PROMPT}}`/`{{SEED}}` |
| Output node id | optional — leave blank to auto-detect the SaveGLB node; set the node id if you have several |

Enable **Mesh generation**, pick the provider as active, and you're ready.

### How the app talks to ComfyUI

For reference (you don't need to do this manually):

1. `POST {baseUrl}/prompt` with `{prompt: <your graph, placeholders filled>, client_id}` →
   returns a `prompt_id`.
2. Poll `GET {baseUrl}/history/{prompt_id}` until the graph completes and a node output
   lists a `.glb`/`.gltf` file.
3. Download it: `GET {baseUrl}/view?filename=…&subfolder=…&type=output`.

If the workflow finishes but emits no GLB, the app reports it — check that your SaveGLB node
actually writes to the output and (if you have multiple outputs) set the output node id.

---

## Option B — Hosted API (Meshy)

No GPU required. Uses your provider account credits per generation.

**Settings → AI → Mesh generation → + Add mesh provider:**

| Field | Value |
|---|---|
| Kind | Meshy (hosted) |
| Base URL | `https://api.meshy.ai` |
| API key | your Meshy key |
| Mode | `preview` (geometry only, faster/cheaper) or `refine` (adds textures, more credits) |

The adapter submits a text-to-3D task, polls it to completion, and downloads the resulting
GLB. (Other hosted providers with the same task-based REST shape can be added as adapters.)

!!! warning "Hosted GLB download / CORS"
    Hosted providers return the GLB as a signed CDN link. If your browser blocks that
    cross-origin download, the generation will finish but the import fails with a network
    error. If you hit this, prefer the self-hosted ComfyUI path (same-origin via your proxy).

---

## Using it

- **Add menu → ✨ Generate 3D model…** — a small dialog: pick a provider, type a prompt,
  optional name, **Generate**. The mesh lands where you opened the menu.
- **AI assistant** — just ask (“add a treasure chest by the wall”). The assistant calls
  `generate_mesh` when no primitive fits; it returns immediately and the mesh appears when
  ready. It won't block the conversation.
- **Console agent** — pass `--mesh-kind comfyui --mesh-url … --mesh-workflow path/to.json`
  (or `AGENT_MESH_*` env vars) and the agent's `generate_mesh` tool works the same way,
  pushing the GLB into the session. See [Console Agent](console-agent.md).

## Limits

- Generated meshes replicate as full GLB data — very heavy meshes (>40 MB) are rejected, and
  a large one may exceed the 5 MB undo-snapshot cap (still placed, just not undoable). Keep
  prompts to single objects.
- Quality is entirely your generator's — a better TRELLIS workflow or a higher hosted tier
  gives better meshes.
- Generated meshes are also cached into the Explorer **“Generated”** folder so you can
  re-place them without regenerating.
