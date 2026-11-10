# On Click

Fires a short pulse when its object is clicked — the bridge from user input into the graph.

**Output:** event — outputs 1 for a short window after the click, 0 otherwise (the card's dot lights up while pulsing)

## Inputs

None.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| pulse | 0.3 s | how long the output stays at 1 after a click |

On Click watches the object picked by the **Object Selector it is connected to** — that connection is what tells it *which* object to listen on. A desktop click or a VR trigger press on that object fires the pulse. The click travels as one tiny replicated message with a shared timestamp, so every peer's downstream logic agrees.

The wire goes **from** On Click **into** the Object Selector. *Since 1.64* a wire the other way round (Object Selector
into On Click — the trigger would never fire) is drawn dashed red with a warning chip; **Reverse wire** on the chip
fixes it in one undo step. See [Backwards wires](https://docs.theprototype.app/node-system.md#backwards-wires).

## Practical example

A click counter button:

1. Add an **On Click**, an **Object Selector** picking your button cube, and a **Counter**.
2. Connect On Click to the Object Selector (identifies the watched object) and On Click → Counter's **pulse** input.
3. Click the cube in the viewport: the Counter ticks up — by exactly one, on every peer.

!!! tip "It does not fire?"
    The card's live line says why — *blocked: not the player*, *won't fire: physics is not running*… — and the Flow
    debugger says it in full. See [Why did this not fire?](https://docs.theprototype.app/debugger.md#why-did-this-not-fire).

!!! tip
    Event pulses convert to numbers/booleans, so On Click can also feed a [Visibility](https://docs.theprototype.app/nodes/visibility.md) **on** input directly — the target flashes visible for the pulse window on each click.
