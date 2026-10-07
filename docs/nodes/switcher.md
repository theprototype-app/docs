# Switcher

A radio-button list that outputs the **index** of the selected item — a hand-operated multi-way switch. Since 1.27
it is also a multi-way switch for **values**: each item has its own input, and the **value** output passes on whatever is
wired into the selected item.

**Outputs:**

| Output | Type | Meaning |
|---|---|---|
| (plain) | number | the selected item's index: 0, 1, 2… |
| value | the **Inputs carry** type | whatever is wired into the selected item's input |

## Inputs

| Input | Type | Meaning |
|---|---|---|
| index | number | chooses the item from the graph; a wired index overrides the radio buttons |
| one per item | the **Inputs carry** type | the value passed on while that item is selected |

## Parameters

| Parameter | Default | Where |
|---|---|---|
| items | `cube`, `pyramid` | ⓘ Params tab — edit, add (**＋ Add item**) or remove entries |
| Inputs carry | number | ⓘ Params tab — number, boolean, vector3, color or object |
| selection | first item | radio buttons on the card |

## Switching values

Pick an item with its radio button, or wire a number into **index** to choose from the graph. The **value** output then
passes on the selected item's input — a speed, a colour, a target object.

- The plain output is still the selected index, so graphs made before 1.27 keep working unchanged.
- Removing an item in the ⓘ tab keeps the other wires on their items.
- Changing **Inputs carry** removes the wires the new type cannot accept, and a toast says how many.
  <kbd>Ctrl</kbd>+<kbd>Z</kbd> brings them back.

## Practical example

Build a two-speed fan switch. Since 1.27 the shortest way is the **value** output: rename the items to `slow` and
`fast`, wire a **Number** of 0.5 into the `slow` input and one of 4 into `fast`, and wire **value** → a **Spin** node's
**speed** (Spin → an **Object Selector** targeting the fan, as below). The classic way, with the index and a [Select](select.md) node, still works:

1. Add a **Switcher** and rename its items to `slow`, `fast` (ⓘ tab).
2. Add a **Select** node; wire Switcher → Select's **index** input.
3. Add two **Number** nodes (0.5 and 4) wired into Select's **a** and **b**.
4. Wire Select → a **Spin** node's **speed** input, and Spin → an **Object Selector** targeting your fan object.
5. Click the radio buttons: the fan flips between slow and fast for everyone.

!!! tip
    The index output pairs naturally with [Select](select.md) (pick between two wired values) and [Compare](compare.md). Legacy note: in older scenes a Switcher with `cube`/`pyramid` items wired straight into an Object Selector swaps the target's geometry — kept working for saved graphs.
