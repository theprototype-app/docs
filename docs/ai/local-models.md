# Local & Small Models

The assistant runs fine against a self-hosted endpoint — that's the point of the
**Custom** provider preset. But local setups have two recurring failure modes worth
knowing about: a **mismatched tool-call parser** on the server, and a **model too small**
for the multi-step work you're asking of it. This page covers both, plus what the
**Physics tools** checkbox actually gates.

## vLLM: use the right tool-call parser

A tool-capable model served with the wrong `--tool-call-parser` produces mangled tool
calls. The worked example is **vLLM + Qwen3.5**: Qwen3.5 emits its calls as
`<function=X><parameter=k>` XML, while the commonly-copied `hermes` parser expects JSON
inside `<tool_call>` tags.

What that mismatch looks like from the app:

- **Unstreamed**, the call arrives as plain *text* (`<tool_call><function=…`) with no
  `tool_calls` field — the assistant recovers these itself.
- **Streamed**, the server swallows the call and emits a single delta with an **invented
  tool name** (often the object's own name — "Cube") and **empty arguments**. Symptom:
  *"Applied N action(s)"* with an empty viewport.

Fix it server-side for Qwen3.5:

```bash
vllm serve Qwen/Qwen3.5-4B \
  --allowed-origins '["*"]' \
  --enable-auto-tool-choice \
  --tool-call-parser qwen3_xml \
  --reasoning-parser qwen3
```

If your vLLM build rejects `qwen3_xml`, try `qwen3_coder`. Verify with a streamed
`curl` request that includes `tools`: you should see incremental `tool_calls` deltas
with real names and arguments.

Optional, to use a 24 GB card fully: `--kv-cache-memory=12185112064` (vLLM logs its own
suggested value at startup).

!!! tip "The app defends itself either way"
    The client detects an unusable streamed turn, retries it **unstreamed**, and stops
    streaming for the rest of the session. You can also turn **Stream responses** off
    permanently for a provider in **Settings ▸ AI** — recommended for any server whose
    tool calls only work unstreamed. Fixing the parser is still better: streaming feels
    much more responsive.

## How big a model do you need?

Tool use is the bottleneck, not prose quality. Rough guide:

| Model class | What works |
|---|---|
| **~4B** (e.g. Qwen3.5-4B) | Creating and arranging primitives; single behavior nodes ("make it spin"). The floor — below this, tool calls get unreliable. |
| **8–14B** | Multi-node behaviors, path patrols, basic physics tuning. |
| **14B–32B quantized / hosted** | Joints, motors, multi-step assemblies ("a moving spider", "a door that swings"). Materially better at chaining tools and reading their results. |

A quantized 14B–32B Qwen (AWQ or FP8) fits a single 24 GB card and is the sweet spot for
physics work. Example:

```bash
vllm serve Qwen/Qwen3.5-32B-AWQ \
  --allowed-origins '["*"]' \
  --enable-auto-tool-choice \
  --tool-call-parser qwen3_xml \
  --reasoning-parser qwen3 \
  --max-model-len 32768 \
  --gpu-memory-utilization 0.92
```

## The "Physics tools" checkbox

Behavior (flow-node) tools are always available to the assistant. **Physics tools are a
per-provider opt-in** — the *Physics tools (advanced)* checkbox in **Settings ▸ AI**,
next to *Stream responses*. It gates:

- `set_physics` — body params (dynamic mass / static scenery / bounciness / friction /
  collider shape),
- `create_joints` — welds and hinges (with motors),
- `control_simulation` — the assistant **may start the simulation on its own** after a
  physics build, so the result comes alive without you pressing Play,
- the physics *node* types (mass, bounciness, friction, angular velocity, motor) inside
  its flow-node vocabulary.

Why gated: a small local model fumbles multi-step physics — wrong hinge axes, jointing
rotated parts, re-sending the same call — and the failure is a launched assembly rather
than a misplaced box. Enable it for 14B+ or hosted models; leave it off for a 4B.

Two semantics worth knowing:

- **Undo does not stop a running simulation.** A prompt is still one undo step, but
  starting/stopping the sim is not part of it — stop or reset the sim first, then undo
  reverts the objects, nodes, physics params and joints together.
- New primitives already spawn **dynamic with mass 1**, so `set_physics` is mostly for
  tuning or pinning scenery (`static` ground and walls).

See also: [AI Assistant](assistant.md) · [AI Providers](providers.md) (CORS and key
storage notes apply to local endpoints too).
