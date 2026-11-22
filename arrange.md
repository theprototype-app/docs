# Arrays, Layers & Tidy

Tools for scenes with many objects: repeat one object as a live **array**, sort objects onto **layers**, and tidy a
selection with **Select similar**, **Rename** and **Randomise**. All of them are new in 1.74.

To snap one object's corner onto another's, see [Corner to corner](https://docs.theprototype.app/snapping.md#corner-to-corner-hold-b) on the
Snapping page.

## Repeat an object: arrays

Select one object and open **Properties ▸ Array**, then press **Make an array**. You get five copies in a line, spaced
by the object's own width.

| Shape | Settings |
|---|---|
| **Line** | a step per copy on X, Y and Z |
| **Grid** | a count and a step per axis (X fills first, then Z, then Y) |
| **Circle** | a radius and an arc (360° = a full ring). **Face out** turns each copy to face away from the centre |
| **Path** | choose a Path object. The copies follow its shape starting at the object, **Spacing** metres apart (0 = spread evenly). **Turn with the path** (the **Follow** row) turns each copy along the path. An open path ends the row at its end |

**Turn X / Y / Z** (degrees per copy) and **Grow** (0.1 = each copy 10 % bigger than the one before; negative shrinks)
apply to every shape.

Every drag of a field is one undo step, and the people in the session see the copies change as you drag. An array has
at most 500 copies.

### What the copies are

The copies are a live array on the object. They are not separate objects yet: the object holds the recipe, and every
screen draws the copies from it. Change the object (its shape, colour or material) and every copy follows. While the
array is live, the copies:

- have no physics and no logic, and a click passes through them;
- are not in a glTF export of the object (a scene save keeps the array);
- are not drawn for a skinned (rigged) mesh.

Press **Make real objects** to turn the copies into ordinary objects you can move, script and export one by one. That
is one undo step, and the people in the session get every copy at once. **Remove array** takes the copies away and
leaves the object.

!!! tip "Arrays, scatter or copies?"
    An array places copies in a pattern you set. To spread many objects over a surface, use [Scatter](https://docs.theprototype.app/scatter.md).

## Layers

**Configure Scene ▸ Layers ▸ Add layer** makes a layer. Each layer has a name and a colour, plus four buttons:

| Button | Does |
|---|---|
| **Hide** (eye) | hides the layer **on your screen only**. Nobody else is affected, and saves and Play always show every object |
| **Lock** (padlock) | locks the layer **for everyone**. Clicks and box selection in the viewport pass through its objects. You can still pick them in the object list |
| **Select** | selects every object on the layer |
| **Remove** | deletes the layer. Its objects stay, on no layer (one undo step) |

To put objects on a layer, select them and open **Properties ▸ Tidy ▸ Layer** (or choose **New layer…** there). In the
object list, a coloured dot marks an object's layer.

## Tidy a selection

The **Tidy** section of **Properties** holds three tools.

### Select similar

**Properties ▸ Tidy ▸ Select similar** selects every object like the selected one, by:

| By | Matches |
|---|---|
| **Shape** | the same primitive, or the same mesh |
| **Material** | the same shared material, or the same type, colour and texture |
| **Prefab** | instances of the same prefab |
| **Tag** | any tag in common |
| **Layer** | the same layer |

### Rename

With two or more objects selected, **Tidy ▸ Rename** takes a pattern: `{n}` is a counter and `{name}` is the old name.
For example, `Post {n}` with **Digits** 2 gives Post 01, Post 02, and so on, in the order you picked the objects.
**Start at** sets the first number. A preview shows the first names. One undo step.

### Randomise

With two or more objects selected, **Tidy ▸ Randomise** turns, resizes and moves each object within the ranges you set:

- **Turn X / Y / Z ±** in degrees (default: up to 180° about Y);
- **Size from** / **Size to** as a factor (1 = unchanged);
- **Move X / Y / Z ±** in metres.

The same **Seed** always gives the same result, and **New seed** tries another. One undo step.

## With an agent

- `update_objects` takes `array: {mode, count, step, …}` (`null` removes it) and `makeReal: true`. `list_scene`
  reports an object's array.
- `update_objects` takes `layer: "<name>"`: it makes the layer when the name is new, and `null` takes the object off its
  layer. `list_scene` reports each object's layer by name.

See [Build with an AI agent](https://docs.theprototype.app/ai/build-with-an-agent.md).
