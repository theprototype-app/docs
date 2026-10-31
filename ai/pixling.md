# Pixel art with Pixling and Claude Code

*Recipe — [Pixling](https://github.com/trinity-works/pixling) is a third-party tool (MIT). theprototype does not bundle or
run it; your agent does, on your own machine.*

[Pixling](https://github.com/trinity-works/pixling) (MIT) makes game sprites from a JSON spec, on
your machine, deterministically: the same spec renders the same bytes. With the bridge connected
([Build with an AI agent](https://docs.theprototype.app/ai/build-with-an-agent.md)), ask Claude Code for a character and it runs:

```sh
uv tool install pixling          # or: pip install pixling
pixling new hero knight          # copies an example spec to specs/knight.json — edit it
pixling build specs/knight.json --clips walk --dirs S,E,N,W
# -> out/knight/knight_walk.png: 16 frames x 4 directions of 64x48 px (rows S, E, N, W)
pixling review out/knight        # a zoomed review grid — look at it before importing
```

Then one tool call brings the sheet AND its spec into the session:

```json
{ "name": "import_file", "arguments": {
    "path": "out/knight/knight_walk.png", "spec_path": "specs/knight.json",
    "frame": { "w": 64, "h": 48, "col": 0, "row": 0 }, "facing": "camera-y",
    "source": "pixling 0.3.1 build specs/knight.json --clips walk --dirs S,E,N,W", "licence": "own work" } }
```

Everyone sees Explorer ▸ Generated ▸ `knight_walk.png` + `knight_walk.pixling.json` and a crisp
knight standing at the origin, turning to face each viewer. To change it, edit the spec, build
again and import again (a new file; undo removes the old card). `pixling guide` and
`pixling pipelines` explain the styles and the spec format to your agent.

How the file arrives (type checks, sizes, the card's options, undo, who may import): [Talk to your agent ▸ Models and
files from the agent's machine](https://docs.theprototype.app/ai/talk-to-your-agent.md#models-and-files-from-the-agents-machine).
