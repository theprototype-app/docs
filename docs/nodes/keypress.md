# Key Press

Fires a pulse while a keyboard key is pressed — the bridge from *your keyboard* into the graph.

**Output:** event — 1 while the key is held (a short pulse per press), 0 otherwise

## Inputs

None.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| key | KeyR | the key to watch — click the button on the card and press a key to capture it |
| pulse | 0.3 s | how long a single press keeps the output at 1 |

The key is stored as a physical key code (`KeyR`, `Digit1`, `Space`…), so it works the same across keyboard layouts and with <kbd>Shift</kbd> held. Presses are ignored while you are typing in a text field.

Each press travels as one tiny replicated message with a shared timestamp — every peer's graph computes the same pulse, and **anyone's** key press fires the node. Holding the key re-pulses it, so the output stays at 1 for as long as the key is down.

## Practical example

Press <kbd>R</kbd> to spin an object:

1. Add a **Key Press** (capture `KeyR`), a **Spin** and an **Object Selector** picking the target.
2. Wire Key Press → Spin's **speed** input, and Spin → Object Selector.
3. Hold <kbd>R</kbd>: the object spins while the key is down and stops when released.

!!! tip
    Inside an [object flow](../object-flows.md) you can skip the Object Selector — a Key Press wired into a Spin's speed drives the flow's owner directly.
