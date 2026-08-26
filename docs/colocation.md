# Colocation — sharing one physical room

Two people in the same real room, each in a headset, standing around the same virtual model. Point at a cube and your friend looks where you point, because for both of you it is sitting on the same corner of the same real table.

!!! note
    Colocation is for peers who are **physically together**. Remote peers need nothing: they already share the scene, and they keep working exactly as before while you and the person next to you line your rooms up.

## Why there is a ritual

WebXR gives every headset its own private idea of where the world starts, and the browser has no way to hand one headset's anchors to another. So the two devices have to be *told*, once, that they are looking at the same room — and that is the whole of what calibration does. Afterwards everything else is already shared: objects, edits, flow graphs, voice.

Expect agreement within **one to three centimetres**, not millimetres. That is the difference between "we are both pointing at the same cube" and "we can both touch the same screw head".

## Calibrating (point + aim)

Agree on two things with the person you are with: **a point** you can both touch — a table corner is ideal — and **a direction** to aim along, usually an edge running away from that corner.

Then each of you, in your own headset:

1. Open the radial menu ▸ **Scene ▸ Colocate ▸ Point + aim**.
2. Put your controller tip on the agreed point and pull the **trigger**. A ghost marker drops there.
3. Hold the controller along the agreed edge and pull the **trigger** again.

A toast confirms the room, and a small badge shows which room you are in. That is it — you are colocated.

**Colocate here** is the no-skill fallback: both of you stand on the same floor spot facing the same way and press it. Quicker, less precise, and useful when you have no controllers to hand.

!!! tip
    While you are colocated the thumbsticks stop moving you around, on purpose — in a real room you walk with your legs, and a stick flick would quietly break the alignment you just made.

## Fine-tuning

Calibration gets you close. If a box that should rest **on** the table hovers a centimetre above it, trim your own view:

- **In VR** — radial ▸ **Scene ▸ Colocate ▸ Fine-tune**. The left stick slides the world, the right stick lifts and turns it. Push right and it moves right as you see it, wherever you are facing. The rates are deliberately gentle, because a fast trim cannot be stopped on the right centimetre.
- **On the desktop** — **Settings ▸ VR ▸ Fine-tune** has X / Y / Z and Yaw fields plus **Reset**.

Your fine-tune is **yours alone**, and that is deliberate: each headset's calibration carries its own small error, so each person corrects their own. If you both trim toward the same real table corner you end up better aligned than the ritual alone managed.

To move the scene **for everyone** — to put the model on a different table — grab the world with **both grips** instead. While colocated that moves the shared room anchor, so your partner's view comes with you.

## Coming back tomorrow

A calibration made in a headset is **remembered per room**. The next session in that room re-aligns with no ritual at all, and your fine-tune comes back with it — calibrate once, fine-tune once.

- **Stop colocating** leaves the room but keeps the memory.
- **Forget** (Settings ▸ VR) drops it, so the next visit needs the ritual again.

If the room is not recognised — a different building, or the headset lost its map of the space — nothing breaks: you simply run the ritual again.

## What your room-mate looks like

Someone standing next to you does not need a virtual body standing in the same spot, so while you are colocated:

- their **avatar and name label are hidden** — you can see the actual person
- their **voice is muted** for you — you can hear them through the air, and the network copy would arrive a beat later as an echo
- their **hands stay** as faint ghosts, so you can still see what they are pointing at (toggle under **Settings ▸ VR ▸ Ghost hands**)

This is local to the two of you. A remote peer still sees and hears you both normally.

## AR passthrough

Colocation works in ordinary VR — useful for keeping out of each other's way. It comes into its own in **AR**, where the scene composites over your real room and objects genuinely sit on real furniture.

Turn on **Settings ▸ VR ▸ Mixed reality**. The play button then shows a headset with **A** and **R** in its lenses, and the next press enters an AR session: the sky, fog and grid stand down, while contact shadows stay — that darkening under an object is what makes it look like it is really resting on your table.

Mixed sessions are normal. You can be in AR, the person beside you in VR, and a third peer on a desktop across the world, all in one scene.

## Troubleshooting

| What you see | What it usually is |
|---|---|
| The scene is in the right place but rotated | The aim step. Re-run the ritual and sight carefully along the agreed edge — a small angle error grows with distance. |
| Objects sit a few cm off for one of you | Normal calibration error — use **Fine-tune** (it is per person for exactly this reason). |
| It drifted after a while | It corrects itself continuously; if it ever jumps, tracking was lost and re-acquired. Re-run the ritual if it looks wrong. |
| Nothing happens on **Fine-tune** | It needs a room to adjust — colocate first. |
| Your partner's avatar is still there | You are not in the same room *key*. Check the badge; both of you should show the same room. |

## Phones

Android phone AR is not part of this yet — a phone can join the session as usual, but its view is not pinned to your room. iPhone browsers do not offer handheld WebXR AR at all today.
