# Delay

Passes a pulse on after a set number of seconds — the timing of a fuse, a door that closes later, a cooldown.

**Output:** event (a pulse, `seconds` after the trigger)

## Inputs

| Handle | Type | Meaning |
|---|---|---|
| trigger | event | starts the wait |
| cancel | event | drops a pulse that is still waiting |
| seconds | number | overrides the card slider when wired |

## Parameters

| Parameter | Default | Options |
|---|---|---|
| seconds | 1 | 0 to 60 on the slider; how long to wait |
| pulse | 0.3 | how long the output pulse lasts, in seconds (in the **ⓘ Params** tab, not on the card) |

## How it behaves

- **Only the newest trigger counts.** A trigger that arrives while the Delay is still waiting starts the wait again from
  the new trigger; the earlier pulse never comes out. A stream of triggers faster than `seconds` therefore produces
  nothing until it stops — then one pulse, `seconds` after the last one.
- **Cancel** drops the waiting pulse if it arrives at the same moment as the trigger or after it. A cancel *before* the
  trigger is history and does not stop it — cancel, then trigger, still fires.
- **The fire time is worked out, not scheduled.** Each player computes "trigger time + seconds" on the shared clock from
  the one trigger every player received, so the pulse comes out at the same moment everywhere and nothing extra is
  sent. Changing `seconds` (or what is wired into it) while a pulse is waiting moves that pulse.
- **Late joiners:** a pulse that was still waiting when someone joined comes out for them too; pulses that already
  happened before they joined do not fire again.

Delays can be chained (Delay → Delay) to add their times up; a loop of Delays does not repeat. The output counts as a
pulse for every event input, including a [Counter](https://docs.theprototype.app/nodes/counter.md)'s **pulse** and a [Latch](https://docs.theprototype.app/nodes/latch.md)'s **set**.

## Practical example

A door that lets you through for three seconds:

1. Add a **Key Press** (capture <kbd>E</kbd>), a **Delay** (seconds 3) and a **Latch** with **initial** on.
2. Wire Key Press → Latch's **reset** and Key Press → Delay's **trigger**; wire Delay → Latch's **set**.
3. Add a **Visibility** node and an **Object Selector** picking the door; wire Latch → Visibility's **on**, and
   Visibility → Object Selector.
4. Press Play, tap <kbd>E</kbd>: the door vanishes, and three seconds later it is back.

![A Key Press resetting a Latch and triggering a three-second Delay that sets the Latch again, which drives the door's Visibility](https://docs.theprototype.app/img/nodes/delay.png)

!!! tip
    For a cooldown, wire the action's pulse into a Delay's trigger and the Delay into a Latch's **set**, with the same
    pulse into the Latch's **reset**: the Latch reads false while the action is cooling down. Pressing again during the
    cooldown restarts it.
