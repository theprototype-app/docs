# Body Wave

Bends the connected object with a wave travelling along its body — a swimming fish, a snake, a flag, a tail — stronger and faster the faster it moves, curving into turns. A shader effect: physics and picking keep the rest pose.

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow)

## Inputs

Every range parameter has a socket (a wired value overrides its slider).

## Parameters

| Parameter | Default | Range | Meaning |
|---|---|---|---|
| amplitude | 0.08 | 0 – 0.5 | sideways swing at the tail, as a share of the body length |
| wavelength | 1 | 0.2 – 4 | body lengths per wave (1 = one S along the body) |
| frequency | 1.5 | 0 – 10 Hz | beats per second at rest |
| stiffness | 0.3 | 0 – 0.95 | the front share that does not bend (a fish's head) |
| falloff | 2 | 0.25 – 6 | how sharply the swing grows toward the tail |
| speedGain | 1 | 0 – 10 | extra Hz per m/s of speed |
| ampGain | 0.5 | 0 – 5 | extra amplitude per m/s |
| turnBend | 0.5 | 0 – 2 | how far the body bows into a turn |
| forward | +z | axis | the nose axis (the wave runs from it to the tail) |
| side | horizontal | horizontal / vertical | the bend direction: horizontal = a fish or snake, vertical = a whale or dolphin |
| reverse | off | | the wave runs tail → head (a flag rippling toward its pole) |

The bend is computed in the vertex shader over every mesh in the object (and over a fallback LOD group's real model), measured along the forward axis from the nose. Each waving mesh gets its own copy of its material while the wave runs (so two fish sharing a material can swim differently); the original comes back, with any edit you made meanwhile, when the wave stops. Saves are untouched.

## Practical example

A flag on a pole: a plane flag whose pole edge points `-x` — set `forward` -x, `side` horizontal, `reverse` on, stiffness 0, amplitude 0.15, frequency 2.

!!! note
    The shadow keeps the rest shape, and normals are not bent — keep the amplitude modest for close-ups.
