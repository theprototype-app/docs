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
under *Devices*.

## Cables

Sound goes nowhere until it is **cabled**. Every device has plugs on its back; click an output
plug, then an input plug (desktop, in Play mode or the editor) or drag with the trigger (VR)
to run a cable. A speaker is the only thing that reaches the room: cable an instrument into a
speaker, or through a pedal chain and a mixer into a speaker. Unplug it and it is silent.
Cables are part of the scene - they replicate, undo, save with the scene, and a prefab of a rig
brings its cables with it.

## Knobs, the toolbox and the Inspector

Every device declares its parameters; they show as knobs in VR (grab and turn), in the
**Music** toolbox (a settings pane, presets and a mixer strip) and in the Inspector's
*Device* section (fanned over a multi-selection). A knob turn or a fader drag is one undo
step, however long the gesture.

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

The Mic device captures the raw microphone (a separate capture from voice chat, never gated
by push-to-talk) and can **record** a take into the Explorer; the looper records whatever is
patched into it, quantized to bar boundaries. A recording is an Explorer item by content
hash, shared to every peer; drop any audio item from the Explorer onto a sampler pad or a
deck to load it, and the Scene manifest carries what the room's devices reference, so an
exported scene bundles its samples. The **Music Lab Kit** pack in Packs is a CC0 starting
library of drum one-shots and loops.

## Building a room

Load the **Jam Room** template from Games for a cabled room ready to play, or add devices
from the module rows and cable them yourself. Save any rig as a **prefab** - it comes back
cabled - and drop it into the next scene.
