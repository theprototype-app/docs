# Here, this and you: pings and building around people

*"Put a lamp here"*, *"hang it on this wall"*, *"a table at my hip height in front of me"*. Since 1.60 an agent
([Build with an AI agent](https://docs.theprototype.app/ai/build-with-an-agent.md), [Claude on claude.ai and voice](https://docs.theprototype.app/ai/claude-connector.md)) knows where
**here** is: you point at it with a **ping**, and it builds at your pings and around the people in the session.

## Ping a spot

Everyone in the session sees a ping as a short marker and hears its chime (your colour and sound, from
**Settings ▸ Scene**):

- **Desktop:** Ctrl+Alt+click the spot, or right-click it and choose **Ping**.
- **Phone or tablet:** long-press the spot and choose **Ping** in the menu.
- **VR:** click the controller stick (or **Ping** in the radial menu) where the ray lands.

A ping on an object remembers **where on that object** it landed and which way the surface faces, so a ping on a table
stays on the table if somebody moves it. Pings last two minutes for agents (the marker fades after a few seconds), at
most four a second per person; a viewer may ping too.

## How an agent uses it

- `where_are_users` gives each person's **latest ping**, and with `pings: true` the recent ones: who, how long ago, the
  point, the surface direction and the object it is on.
- `create_objects` and `update_objects` take **`at: {ping: "latest"}`** (or a ping's id). On a floor or a table top
  the thing stands on it.
- **`align: "surface"`** backs it onto the pinged surface, facing out and upright on a wall: a painting, a sign, a
  shelf.
- **`snap: "floor"`** stands it on whatever is under it — terrain, a floor, a table — or the ground.
- **`face_user`** turns it (around the vertical only) to face you, or the person named.
- **`at: {user: "me", ahead: 1.5, right: 0}`** builds in front of a person as they stand now, facing them. Asking again
  as they walk builds around them where they are.

## Your size and your hands

`where_are_users` also gives each person's **body** — eye height and, from it, height, shoulder, hip, knee and arm reach
— and in VR the **room** (the play area your headset knows) and both **hands** with the distance between them. Sizes and
positions take these as units: `"hip"`, `"0.5 reach"`, `"2 eye"`, `"room"`. *"As wide as my hands"* uses the hands'
distance.

## In a headset

- Nothing an agent makes can appear inside a person in VR: 0.45 m around the head and through the body. The call is
  refused and says why, so the agent places it in front of you instead.
- What an agent makes fades in instead of popping.
- Each thing the agent did shows as a small line under your view for a few seconds.

## Cookbook

- **"Put a lamp here":** ping the table, say it. The agent calls `create_objects` with `at: {ping: "latest"}`.
- **"Hang this on the wall":** ping the wall; `align: "surface"`.
- **"A stool in front of me at knee height":** `at: {user: "me", ahead: 1}` with a seat height of `"knee"`.
