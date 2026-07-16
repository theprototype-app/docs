# Switcher

A radio-button list that outputs the **index** of the selected item — a hand-operated multi-way switch.

**Output:** number (the selected item's index: 0, 1, 2…)

## Inputs

None.

## Parameters

| Parameter | Default | Where |
|---|---|---|
| items | `cube`, `pyramid` | ⓘ Params tab — edit, add (**＋ Add item**) or remove entries |
| selection | first item | radio buttons on the card |

## Practical example

Build a two-speed fan switch:

1. Add a **Switcher** and rename its items to `slow`, `fast` (ⓘ tab).
2. Add a **Select** node; wire Switcher → Select's **index** input.
3. Add two **Number** nodes (0.5 and 4) wired into Select's **a** and **b**.
4. Wire Select → a **Spin** node's **speed** input, and Spin → an **Object Selector** targeting your fan object.
5. Click the radio buttons: the fan flips between slow and fast for everyone.

!!! tip
    The index output pairs naturally with [Select](select.md) (pick between two wired values) and [Compare](compare.md). Legacy note: in older scenes a Switcher with `cube`/`pyramid` items wired straight into an Object Selector swaps the target's geometry — kept working for saved graphs.
