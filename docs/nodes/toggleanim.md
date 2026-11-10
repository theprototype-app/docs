# Toggle Animation

Moves its object between **poses** — closed and open by default, or more named poses such as *ajar*. A door, a lid, a
drawer, a drawbridge. The state is shared and saved: everyone in the session, and anyone who joins later, sees the same
door.

*Since 1.64.*

**Output:** effect (wire into an [Object Selector](objectselector.md), or leave it in an object's own flow), plus the
values and pulses below

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| toggle (trigger) | event | open it when closed, close it when open |
| open | event | go to the open pose |
| close | event | go to the closed pose |
| go to | event | go to the pose named in **pose** |
| pose | text / number | a pose name or number, for *go to* |
| enabled | boolean | unwired = on |

## Outputs

| Handle | Type | Meaning |
|---|---|---|
| isOpen | boolean | true while it is open |
| moving | boolean | true while it moves |
| pose | value | the pose it is at |
| opened / closed | event | a pulse when it arrives |

## Poses

The card lists the poses. Move or turn the object where you want it, then press **Set** beside a pose to keep where it
stands now. **Add pose** adds a named one before the last (name it *ajar*, *half*…); **×** removes one. *Go to* reaches
a pose by its name or number.

## Parameters

| Parameter | Default | Meaning |
|---|---|---|
| duration | 0.6 | seconds to move (0 – 5) |
| ease | smooth | smooth or linear |
| interrupt | reverse | a press while it moves: **reverse** turns back at once, **finish** completes the move first |
| autoClose | 0 | seconds before it closes by itself (0 = never) |
| pose | — | the pose *go to* uses |
| openSound / closeSound | none | a built-in [game sound](gamesound.md) (*door* for a door) |

## Practical example

A door you click: **On Click** into **toggle**, open sound and close sound *door*. The
[Door recipe](../recipe-door.md) builds exactly this; the [walk-up door](../recipe-walk-up-door.md) opens it from a
sensor zone with **open** and **close** instead.
