# theprototype.app docs

User and SDK documentation for [theprototype.app](https://theprototype.app), built with
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and published to
**[docs.theprototype.app](https://docs.theprototype.app)**.

## Branches

| Branch | Role |
|---|---|
| `docs` | **default** — the source. Markdown under `docs/`, config in `mkdocs.yml`, theme overrides in `overrides/`. |
| `gh-pages` | build output, written by `mkdocs gh-deploy`. Never edit by hand. |

The custom domain comes from the `CNAME` file.

## Local development

```bash
python -m venv ./venv
# Windows
.\venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
mkdocs serve            # http://127.0.0.1:8000, live reload
```

<details>
<summary>Python on Windows</summary>

Grab an installer from [python.org/downloads/windows](https://www.python.org/downloads/windows/)
and make sure "Add python.exe to PATH" is ticked. If you used the embeddable build, pip
comes from [get-pip.py](https://bootstrap.pypa.io/get-pip.py).

</details>

## Publishing

```bash
mkdocs gh-deploy --force
```

Builds the site and force-pushes it to `gh-pages`; GitHub Pages serves it within a minute
or so. Commit your Markdown changes to `docs` as well — `gh-deploy` only touches the built
output.

## Writing

- One page per feature; the left-hand nav is defined explicitly in `mkdocs.yml`, so a new
  page needs an entry there to appear.
- Node reference pages live under `docs/nodes/`, one per node type.
- When the app's SDK surface changes, the matching page changes in the same sitting — the
  authoring guides here are the public contract for
  [`MODULES.md`](https://github.com/theprototype-app/core/blob/main/MODULES.md).

## Related

- [core](https://github.com/theprototype-app/core) — the app itself
- [modules](https://github.com/theprototype-app/modules) — optional and community modules
- [packs](https://github.com/theprototype-app/packs) — content packs
