# Music & Sound

Sound in ThePrototype comes in a few flavors: one shared background track for the whole scene, spatial sound effects attached to objects, and live voice chat. All of it is synced so everyone hears the same thing at the same moment.

## Scene music

Every scene can have **one shared background track**, synced to the same point in the loop for everyone.

To set it, open **Configure Scene ▸ Music**:

1. Import an audio file into your [Explorer](explorer.md) library (drag an `.mp3`, `.wav` or `.ogg` onto the Explorer).
2. In the Music section, pick it from the **Scene track (shared)** dropdown. Choosing a track pushes its bytes to your peers automatically.
3. Use **▶ Play / ■ Stop** to control playback, and **Shared volume** for everyone's baseline level.

Because it's synced to a shared clock, a peer who joins mid-song hears it from the right point — not restarted.

**Your own listening level** is separate from the shared volume, under *This device*:

- **Local volume** — trims the music for you only.
- **Mute music on this device** — silences it just for you.

!!! note
    The scene track is a single, latest-wins setting — the most recent change wins for everyone — and it's kept separate from the environment preset, so it never leaks into exported presets. If playback doesn't start, browsers block audio until you interact with the page: a *"click anywhere to enable audio"* hint appears; just click once.

## Sound effect nodes

For sound tied to a *place or object* — a fire crackle, a machine hum, a click — use the [Sound node](nodes/sound.md) in the flow graph. It plays a chosen audio item as **spatial 3D sound** positioned at the object it's wired to, with controls for:

- **Volume**,
- **Radius** — how close you must be before it's at full volume,
- **Rolloff** — how quickly it fades with distance,
- **Loop** — synced to the shared clock so it's in phase for everyone.

Walk (or fly) around and the sound pans and fades with the object's position.

## Trim, fade and normalise

*New in 1.82.* Open a sound from the [Explorer](explorer.md#the-preview-window) (double-click it) and press
<kbd>E</kbd>, or the scissors button, in its player window for **Trim and fade**:

- a waveform with **start** and **end** handles to drag, or type **Start** and **End**; <kbd>I</kbd> and <kbd>O</kbd>
  set them at the playhead,
- **Fade in** and **Fade out**,
- **Normalise**, which brings the loudest point up to just under full volume,
- **Hear the edit** plays the result, and **Reset** brings the original back.

The file itself never changes: the setting belongs to the sound **in this scene**. It is shared with everyone in the
room, saved with the scene, and used everywhere the scene plays that sound: [Sound](nodes/sound.md) nodes (a playing
loop restarts with the edit), [Timeline](timeline.md) audio clips, the scene music and video exports. Each change is one
undo step.

## Audio packs

Audio files can be bundled and shared as [Packs](packs.md), just like models. An audio pack is a `.zip` containing sound items; import one from the Explorer's **Packs** section (right-click ▸ **Install pack**, or **＋ Import pack** for a local zip). Its sounds land in your library as ordinary audio items, ready to assign as scene music or wire into Sound nodes. Prefer CC0 loops and one-shots small enough to share with peers.

## Game volumes

**Settings ▸ Interface ▸ Sound** has two sliders of your own: **Game sounds** — the built-in effects games play with
the [Game Sound](nodes/gamesound.md) node (coins, goals, whistles) — and **Music**, the looping tracks of
[Game Music](nodes/gamemusic.md). They are per device; nobody else's volume changes.

## Voice chat

Talk to your peers directly:

- Toggle your **mic** on to transmit continuously.
- While the mic is off, **hold <kbd>V</kbd>** for push-to-talk.
- Voice is **spatial** — a peer's voice comes from where their avatar is (toggle spatial voice in Settings).
- You can mute individual peers.

In VR the mic has three modes — **Push-to-talk / Open / Off** — set from the radial menu's **Settings ▸ Microphone** (press it to cycle); the right-hand **A** button is push-to-talk, and a small mic dot in the corner shows when you're transmitting.

## Pings

Pings play a short synthesized chime at the pinged location — see [Notifications & Notes ▸ Pinging](notifications.md#pinging) for how to ping and pick your chime.
