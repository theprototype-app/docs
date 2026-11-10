# Paths

*New in 1.64.* **Add ▸ Path** puts a Path in the scene: a thin amber line through a few points. Things walk along it —
guards, animals, a camera, a moving platform. Every person in the session sees each walker in the same place at the
same moment.

A Path is not a [spline](https://docs.theprototype.app/splines.md): a spline is a shape (a road, a pipe, a rail), a Path is a **route with a
timetable** — where to wait, how fast to go, where to jump, what to announce on arrival.

## Editing the points

Select the Path and press **Edit points** in the Inspector.

- Drag a point to move it. Click the small marker halfway between two points to add a point there.
- **Add points** (toolbar): each click in the scene adds a point at the end. <kbd>Esc</kbd> stops adding (the
  [click banner](https://docs.theprototype.app/controls.md#one-banner-for-click-to-place-tools) at the top of the view says it is armed).
- <kbd>Ctrl</kbd>-click or <kbd>Shift</kbd>-click picks several points; <kbd>Ctrl</kbd>+<kbd>A</kbd> picks them all.
  With more than one point picked, the gizmo moves, turns or scales them together.
- <kbd>Delete</kbd> removes the picked points (a Path keeps at least two).
- **Reverse** walks the other way; every wait and event stays on its own point.
- **Split at point** cuts the Path in two there (a closed Path opens there instead). **Join with** adds another Path
  onto the end of this one.

## What each point can say

Pick one or more points and set, in the Inspector:

| Field | What it does |
|---|---|
| Wait | Seconds a walker stands at this point |
| Speed after | Metres per second on the stretch after this point (empty = the Path's speed) |
| Ease after | Linear, speed up, slow down, or both, on the stretch after this point. The stretch still takes the same time |
| Jump | The walker skips straight to the next point, with no walking in between |
| Facing | The direction to face while waiting |
| Event | A name sent when a walker arrives here. An [On Path Event](https://docs.theprototype.app/nodes/onpathevent.md) node hears it |

## The Path's settings

- **Walk**: *Loop* (round and round; an open Path jumps back to the start), *Ping-pong* (there and back), *Once* (walks
  when its Path patrol node is triggered, or when a game round starts), *Random* (a random next point each time; the
  **seed** picks which random order).
- **Speed**, **Smooth** (a curve through the points, or straight lines), **Closed** (join the last point to the first).
- **Show in Play**: Paths are hidden while playing unless this is on.
- **Preview walkers**: off holds the walkers still while you work on the scene. Walkers on the Path you are editing
  always hold still.
- **Scrub**: a ghost shows where a walker would be at any moment of the round.

## Making something walk

Add a [Path patrol](https://docs.theprototype.app/nodes/pathpatrol.md) node to the object's flow and pick the Path (or wire a Path into its **path**
input). **Offset** starts this walker that many seconds along, so several guards can share one Path. **Face along the
path** turns the walker the way it is going.

A Path patrol made before 1.64 still walks its clicked waypoints. Its card offers **Convert to a Path**: the waypoints
become a Path you can edit, and the walk stays exactly the same.

The [Guard recipe](https://docs.theprototype.app/recipe-guard.md) makes a square Path round the selected object and sets it walking in one step.

## For agents

`create_path` (on the [Claude connector](https://docs.theprototype.app/ai/claude-connector.md): `create_shape` with `action: "path"`) takes world
points, each a plain `[x, y, z]` or `{pos, wait, speed, ease, jump, event, facing}`, plus `walk`, `speed`, `closed`,
`smooth`, `show_in_play`, `seed`, `name`, and `walkers` (object ids that start walking it at once, spread by `offset`
seconds).
