# Code workspace

The code workspace is one place for every piece of code in a scene: a [Script](nodes/script.md) node's code, a
[behaviour](behaviours.md), a `.js` script file from your Library, a module's own source (read-only), and the flow graph
itself as JSON. Each source is a **tab**, and your edits stay in the tab until you save.

![The code workspace docked beside the Explorer and the Node editor, with a Script node's code open](img/code-workspace/script-tab.png)

## Where it is

It opens by itself when you ask for code:

- **Edit code** on a Script node, **Code** on a Behaviour node, or a double-click on any node that has code (see
  [Open code](main-graph.md#open-code));
- a double-click on a `.js` file in the [Explorer](explorer.md), or right-click it ▸ **Open in code editor**;
- the dock's **＋** menu ▸ **Code**, or the optional `{}` toolbar button (add it with *Customize the toolbar*);
- **Graph JSON** in the workspace's header opens the graph the Node editor is showing.

It docks as a tab at the bottom, beside the Node editor and the Explorer, or floats as a window (**⧉** to float,
**⇩ Dock** to put it back).

## Editing and saving

Type, then press <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Cmd</kbd>+<kbd>S</kbd> on a Mac) or **Save**. A **●** on a tab
means it has unsaved edits; **Revert** throws them away.

Saving checks the code first. If it does not parse, **nothing is applied**: the tab shows a red **!**, the banner names
the line (click it to jump there), and every node the code feeds shows an amber *edit not applied* badge while it keeps
running the last good version.

![A save refused: the banner names the line, and the nodes keep the last good version](img/code-workspace/parse-error.png)

When the code is good, everything that runs it reloads — on every player's screen.

## Code and files

- **Save as file** turns a node's inline code into a script file in your Explorer and binds the node to it.
- **Use file…** binds a node to a script file you already have.
- Several nodes can run one file. Saving the file reloads every one of them, on every peer, as **one** undo step.
- **Unbind** keeps the code in the node and forgets the file.
- **Go to node** shows the node in the Node editor — or lets you pick one, when several run the same file.

If someone else changes the same code while you have unsaved edits, the tab says so: **Load theirs** takes their
version, **Keep mine** keeps yours (your next save wins).

## Module code

A module's source opens **read-only** (a lock on its tab): it runs the same for everyone. A Script or Behaviour node that
a module binds to its own file offers **Make editable copy**, which copies the code into a script the scene owns and
points the node at it — see [Make editable copy](main-graph.md#make-editable-copy).

## Graph JSON

**Graph JSON** opens the graph as JSON. Edit the nodes and edges and press **Apply** (<kbd>Ctrl</kbd>+<kbd>S</kbd>).
Invalid JSON, two nodes with the same id or a wire to a node that does not exist are refused with the line; a good apply
is one undo step and reaches every peer. ([Flow Code](node-system.md#flow-code-the-graph-as-text) shows the same graph as
compact text.)

## Live

The **Live** checkbox on a node or behaviour tab applies inline edits as you type instead of on
<kbd>Ctrl</kbd>+<kbd>S</kbd> — how the Script panel felt before 1.23. It is a setting of this browser, off by default.

## Limits

- A node bound to a file still carries its code, so a scene runs the same whether or not the file is in anyone's
  Library.
- Files are addressed by their content: two files with byte-identical content are the same file.
- The second-monitor window (**⧉ Window**) is an experiment, switched on with
  `localStorage['code:popout'] = 'true'` in the browser console.
