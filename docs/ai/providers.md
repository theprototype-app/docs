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
4. Use **Test connection** to confirm the endpoint and key work before you rely on them. It answers within about 10 s
   and says what is wrong (see Troubleshooting below).
5. Select the provider (the radio button) to make it active.

**Signed in on theprototype.app?** The cloud plugin may add a **hosted** provider row for you — no key, URL or model to
type. It is experimental and appears only while the hosted hardware is reachable. A provider you configured yourself
always stays the selected one; the hosted row sits beside it for you to switch to.

You can keep several providers side by side — for example Grok plus two self-hosted boxes —
and switch the active one from the assistant window or Settings.

## Self-hosted / vLLM endpoints

Point the **Custom** preset at your server's OpenAI-compatible base (the URL that ends in
`/v1`), set the model id to whatever your server serves, and add a bearer token if it
requires one. An address typed without `https://`, or pasted with `/chat/completions` on the end, is fixed up for
you — **Will call …** under the field shows the exact address the app will use.

!!! warning "Allow browser origins (CORS)"
    The app runs entirely in your browser and calls the endpoint directly — there is no
    backend proxy. A self-hosted server must therefore send permissive CORS headers, or
    the browser blocks the request. For vLLM, start it with:

    ```
    vllm serve <model> --allowed-origins '["*"]'
    ```

    Ollama: set `OLLAMA_ORIGINS=https://theprototype.app`. LM Studio: turn on **Enable CORS** in its server
    settings. Other servers have an equivalent allowed-origins setting. **Test connection** tells a server that
    answers without allowing this site (CORS) apart from one it cannot reach at all.

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
| **The server answered, but does not allow this site (CORS)** | The server is up but blocks the browser — see the CORS note above (the message names the setting for vLLM / Ollama / LM Studio). |
| **Could not reach …** | Wrong address or port, the server is down, or (self-signed HTTPS) the browser does not trust its certificate yet — open `<base URL>/models` in a new tab, accept it, then test again. |
| **The browser blocks an http:// address on this https page** | Use `https://`, or `http://127.0.0.1` for a server on this computer. |
| **No answer … within 10 s** | The server is slow or unreachable. |
| **Key rejected** | The provider refused the key (also Google's `API_KEY_INVALID`). |
| **Unknown model** | Use an id from the model list — on vLLM it is the `--served-model-name` value. |
| **The server is not set up for tool calls** | Start vLLM with `--enable-auto-tool-choice --tool-call-parser <parser>` (Qwen3: `qwen3_xml`; many others: `hermes`). |
| **The conversation is longer than the model's context** | Start a new chat, or raise `--max-model-len` on the server. |
| **Provider server error** | The provider returned a 5xx — try again later. |
