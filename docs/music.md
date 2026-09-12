# Music Playground

Instruments, effects and speakers are **devices**: ordinary scene objects that carry a device
document (`userData.device = {kind, params}`) and a WebAudio subgraph the engine builds for
them. Because a device is an object, it replicates, saves, undoes and duplicates like any other
object - move it and it sounds from where it stands.

## Devices come from modules

Core ships the engine, the clock, the cables and the interfaces; the instruments come from
modules. Install **Music Lab** (a Piano, a Speaker, a Transport, a Drum machine, Sampler pads),
**Music FX** (a mixer and five pedals), **Music DJ** (two decks and a crossfader) and
**Music Voice** (a mic, a looper, a synth, a theremin) from the Modules manager; every player
in a room needs the module a scene uses, and a scene asks for them by name when you load it.
The sidebar's module rows add demo rigs; the viewport's Add menu lists every device kind
under **Add ▸ Devices** (a module that groups its kinds gets its own row, *Devices: Music
Voice*).

A scene remembers which module each device came from. Open one on a machine that lacks the
module and a dialog, **This scene uses modules**, lists what is *Not installed* or
*Switched off* and offers **Install (n)**, **Enable (n)** or **Load anyway** — installing is
per machine, so every player does it once. Load anyway keeps the devices as silent
placeholders with their settings intact; they wake up the moment the module is installed.

## Cables

Sound goes nowhere until it is **cabled**. Every device has plugs on its back; click an output
plug, then an input plug (desktop, in Play mode or the editor) or drag with the trigger (VR)
to run a cable. A speaker is the only thing that reaches the room: cable an instrument into a
speaker, or through a pedal chain and a mixer into a speaker. Unplug it and it is silent.
Cables are part of the scene - they replicate, undo, save with the scene, and a prefab of a rig
brings its cables with it.

## Knobs, the toolbox and the Inspector

Every device declares its parameters; they show as knobs in VR (grab and turn), in the
**Music** toolbox and in the Inspector's **Device** section. A knob turn or a fader drag is
one undo step, however long the gesture, and peers hear it move while you turn it.

The **Music** toolbox appears in the sidebar under **Modules** as soon as any device kind
is registered (also on the viewport menu under **Module tools**). It has three parts:

- **Device** — pick any device in the scene and edit its parameters.
- **Presets** — **Save as…** the current settings under a name, **Apply** one later, **✕**
  deletes. Presets are kept per device kind in *your* browser; applying one is what
  replicates.
- **Mixer** — one row per device with a level meter, a fader, **M** (mute) and **S**
  (solo). A device with no level parameter and no outgoing cable shows a dash. Mute and
  solo are yours alone; the level they set is shared.

The Inspector's **Device** section shows the same parameters for the selection. With
several devices selected it says *Applies to N selected devices* and a change fans across
all of them as one undo step; a device that lacks that parameter is skipped. **Open in
Music toolbox** jumps across — presets and the mixer live there.

## The shared transport

One **transport** per scene - tempo, play/stop, swing, bars per loop - shared by every peer.
The Transport device is its face; the drum machine, the looper and anything scheduled on it
run from the same beat, so every peer's kick lands on the same beat and a late joiner starts
on the next one. Nothing is streamed during playback: each peer schedules the same pattern
from the same document through a look-ahead scheduler.

## Automation from the flow graph

The **Music** group of flow nodes drives devices from graphs: *Device Param* writes a
parameter every frame (an LFO on a filter), *Device Level* reads a live level, *Transport*
reads the beat, and *Note Trigger* plays a note per pulse - so an On Impact sensor can fire a
drum, or a Time node can sweep a cutoff. The rule behind all of it: anything a graph computes
or the transport schedules must be a **pure** function of its inputs, because every peer
computes it alone; an impure callback desyncs silently, with no error anywhere. See
[Flow Nodes](nodes.md) for the full list.

## Recording and samples

**Record.** The Mic device (Music Voice) captures the raw microphone — a separate capture
from voice chat, with no noise suppression and never gated by push-to-talk — so the browser
asks for the microphone once more the first time (*Microphone permission denied* if you
refuse). Click the red button on the Mic to record a take of its **Take length**; click again
to stop early. The take lands at the root of your Explorer as an audio item (`mic-…`), shared
to every peer by content hash, with a *Recorded …* toast. A take is at most 120 s, and one
that would exceed the sharing limit is refused before it starts.

**Sample.** Drag any audio item from the Explorer — a take, a file you imported, a one-shot
from the **Music Lab Kit** pack — onto a sampler pad or a DJ deck to load it there; the toast
names the pad it landed on. The **Music Lab Kit** pack in Packs is a CC0 starting library of
drum one-shots and loops.

**Bounce.** The Looper records whatever is cabled into it, quantized to bar boundaries: click
its red button and the take starts on the next bar and runs for **Bars**. The loop is an
audio item like a take (`loop-…`), and because the looper references it by hash the Scene
manifest carries it — an exported `.tpscene` bundles its samples along with everything else.

## Building a room

The **Jam Room** starter — a piano into a speaker, a beat lab and a pedal chain into a
mixer, all cabled — is authored for the **Templates ▸ Games** tab and offers to install
Music Lab and Music FX when you load it (it is not in the published template feed yet, so
the tab may not list it). Until then, add devices from the module rows and cable them
yourself. Save any rig as a **prefab** - it comes back cabled - and drop it into the next
scene.
