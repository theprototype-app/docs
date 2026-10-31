# Timer

A delay line: outputs its input as it was a set number of seconds ago.

**Output:** number

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| a | number | the signal to delay |

Unwired, it simply outputs its own `a` value.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| delay | 1 | seconds of delay |

## Practical example

A gate that reacts two seconds after you approach:

1. Set up a **Proximity** node between your avatar-marker object and a doorway (two Object Selectors → Proximity).
2. Add a **Timer** (delay 2); wire Proximity → Timer's **a** (booleans pass through as 0/1).
3. Wire Timer → a **Visibility** node's **on** input, and Visibility → an **Object Selector** targeting a welcome sign.
4. The sign appears two seconds after the objects come close — and disappears two seconds after they part.

!!! tip
    Feed the same source into an effect directly *and* through a Timer into a second object's effect to build echo/wave choreography between objects.
