# AI Providers

The assistant needs a model to talk to. You supply one — a hosted provider like Grok or
Gemini, or your own self-hosted endpoint. Configure it once in **Settings ▸ AI**.

Every supported provider speaks the same **OpenAI chat-completions** dialect, so the app
uses one client for all of them.

## Adding a provider

1. Open **Settings ▸ AI** and click **+ Add provider**.
2. Pick a preset — it fills in the base URL and a default model:

    | Preset | Base URL | Notes |
    |---|---|---|
    | **Grok (x.ai)** | `https://api.x.ai/v1` | Needs an x.ai API key. |
    | **Gemini (Google)** | `https://generativelanguage.googleapis.com/v1beta/openai` | Google AI Studio key; OpenAI-compatibility layer. |
    | **Custom** | *(you fill it in)* | Any OpenAI-compatible / self-hosted server (vLLM, Ollama, LM Studio, llama.cpp, …). |

3. Paste your **API key / bearer token**, adjust the **model id** if needed, and **Save**.
4. Use **Test connection** to confirm the endpoint and key work before you rely on them.
5. Select the provider (the radio button) to make it active.

You can keep several providers side by side — for example Grok plus two self-hosted boxes —
and switch the active one from the assistant window or Settings.

## Self-hosted / vLLM endpoints

Point the **Custom** preset at your server's OpenAI-compatible base (the URL that ends in
`/v1`), set the model id to whatever your server serves, and add a bearer token if it
requires one.

!!! warning "Allow browser origins (CORS)"
    The app runs entirely in your browser and calls the endpoint directly — there is no
    backend proxy. A self-hosted server must therefore send permissive CORS headers, or
    the browser blocks the request. For vLLM, start it with:

    ```
    vllm serve <model> --allowed-origins '["*"]'
    ```

    Other servers have an equivalent CORS/allowed-origins setting. If you see a
    "Network or CORS error", this is almost always the cause.

## Where keys are stored

!!! danger "Keys are stored unencrypted"
    API keys live in this browser's **local storage**, in plain text (the same place as
    every other setting). They never leave your device except in the requests you make to
    the provider you configured. Anyone with access to this browser profile can read them,
    and **Reset settings** erases them. Prefer scoped or throwaway keys, and don't enter a
    production key on a shared machine.

## Troubleshooting

| Message | Meaning |
|---|---|
| **Invalid API key or unauthorized** | Wrong or expired key (HTTP 401/403). |
| **Rate limited** | Too many requests / quota exhausted (HTTP 429). |
| **Endpoint not found** | The base URL is wrong (HTTP 404) — check the `/v1` path. |
| **Network or CORS error** | The endpoint didn't allow the browser origin — see the CORS note above. |
| **Provider server error** | The provider returned a 5xx — try again later. |
