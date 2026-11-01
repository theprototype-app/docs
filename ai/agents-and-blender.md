# Recipe: Agents + Blender

Claude Code with two MCP servers, theprototype's and [blender-mcp](https://github.com/ahujasid/blender-mcp) (MIT, a separate
project), can do the Blender half of a round trip for you: *"fix the fox's armpit weights in Blender and put it back"*.

You need Blender on the same computer as Claude Code, with the blender-mcp add-on running, and a theprototype session open.

## Set it up

1. Follow blender-mcp's README: install its add-on in Blender, then connect its server in the Blender sidebar.
2. Add it to Claude Code:

    ```bash
    claude mcp add blender -- uvx blender-mcp
    ```

3. In theprototype: **Settings ▸ Tools & connections ▸ Agents ▸ Coding agents ▸ Set up**, or Connect ▸ Request AI. Create an
   invite with **Edit** and paste the MCP command it gives you:

    ```bash
    claude mcp add theprototype -- npx -y @theprototype/agent mcp '<your invite link>'
    ```

## What to ask

Agent tools cannot yet export an object from a session or replace one in place, so you do both ends and the agent does the work
in Blender:

1. **You** press **Edit in Blender…** on the fox. `Fox.glb` lands in your downloads.
2. **Ask Claude Code**, naming the file:

    > Import ~/Downloads/Fox.glb into Blender, fix the armpit weights, and export it to ~/Downloads/Fox-fixed.glb as a GLB with
    > Custom Properties on, +Y Up and Apply Modifiers.

3. **You** drop `Fox-fixed.glb` onto theprototype and answer **Update "Fox"?**

The object keeps its flows, physics and clips, and one Ctrl+Z puts the old model back. See [Edit in Blender](https://docs.theprototype.app/edit-in-blender.md).

!!! warning "blender-mcp runs code in Blender"
    Its server lets the agent run Python in your Blender. Save your work first, and read what it plans before you allow it.
