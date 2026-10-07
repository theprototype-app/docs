# UI kit for module authors

theprototype.app draws its windows, settings and inspector from one small set of parts and
one set of design tokens. Build your module's UI from the same parts and it looks native,
follows the user's theme (including a custom `.theme.json`) and follows the Compact density
setting, with no extra work.

**Live reference: [theprototype.app/kit](https://theprototype.app/kit)** shows every part in
every state. Switch the theme and density at the top of the page to see how your UI will
look for every user. Add `?theme=light` (or `dark`, `custom`, `green`, `bit8`, `contrast`)
and `?density=compact` to the address to link straight to a combination.

## Core modules: use the components

A core module (in `src/modules/<id>/`) can import the parts directly:

```svelte
<script>
	import WindowChrome from '../../components/ui/WindowChrome.svelte';
	import SettingRow from '../../components/ui/SettingRow.svelte';
	import Toggle from '../../components/ui/Toggle.svelte';

	let enabled = $state(true);
</script>

<WindowChrome size="tool" title="My module" onclose={close}>
	<SettingRow label="Enabled" description="Turn the module's effect on or off.">
		<Toggle label="Enabled" bind:checked={enabled} />
	</SettingRow>
</WindowChrome>
```

| Part | Use it for |
|---|---|
| `WindowChrome` | the header of every window: `size="modal"`, `"panel"` or `"tool"` |
| `Tabs` | switching views inside one window, with optional counts |
| `Segmented` | 2 to 4 exclusive options |
| `Chips` | 5 or more options, presets and filters |
| `Toggle` | anything on/off |
| `Checkbox` | picking items in a list (only) |
| `Button` | `primary` (one per view), `secondary`, `outline`, `ghost`, `warn-text`, `danger`, `icon` |
| `Badge` | scope ("This device", "Shared"), status, counts |
| `SettingRow` | a label and description on the left, a control on the right |
| `PropRow` | inspector-style number rows (drag to scrub, click to type) |
| `NavRow` | a row that opens a sub-page or picker |
| `Section` | a titled group of rows |
| `EmptyState` | what goes here, plus one action |
| `Sheet` | a bottom sheet on phones |
| `Menu`, `Toast`, `SearchField`, `Slider` | menus, notices, filters, sliders |

Icons go through `components/ui/Icon.svelte` at 16 or 20 px.

## User modules: use the tokens

A user module is self-contained and cannot import the components. Give your UI's root
element the class `tp-ui` and paint only with the tokens below. Every theme sets them, so
your UI changes with the app.

```html
<div class="tp-ui my-panel">
	<h3>My module</h3>
	<p>One short sentence about what this does.</p>
	<button class="my-primary">Start</button>
</div>
<style>
	.my-panel { background: var(--surface-2); color: var(--text); border: 1px solid var(--border);
		border-radius: var(--radius-card); padding: var(--space-4); font-size: var(--fs-body); }
	.my-panel p { color: var(--text-muted); font-size: var(--fs-desc); }
	.my-primary { background: var(--accent-fill); color: var(--on-accent); height: var(--control-h);
		border: 0; border-radius: var(--radius-button); padding: 0 var(--space-4); }
</style>
```

| Token | Use |
|---|---|
| `--bg-app` | behind panels |
| `--surface-1` | window and modal body |
| `--surface-2` | cards, panel body, row groups |
| `--surface-inset` | inputs, value boxes |
| `--border`, `--border-strong` | dividers; outline buttons and chips |
| `--text`, `--text-2` | primary text; labels and values |
| `--text-muted`, `--text-faint` | descriptions; section headers and hints |
| `--accent` | toggles on, selection, focus ring, sliders |
| `--accent-fill` + `--on-accent` | filled primary button and its text |
| `--accent-soft`, `--accent-text` | selected chip or row fill; links and ghost buttons |
| `--live` | **only** Play, recording and streaming |
| `--speaking` | someone talking in voice chat |
| `--warn-text`, `--danger` | reset and soft-destructive text; destructive buttons |
| `--badge-bg`, `--badge-text` | badges |
| `--space-1` … `--space-8` | spacing on a 4 px grid |
| `--fs-desc`, `--fs-body`, `--fs-panel-title` | 13, 14 and 15 px text (16 px body on phones) |
| `--control-h`, `--control-h-sm`, `--row-h` | button, small control and row heights (they follow Compact density and grow to 44 px on phones) |

The [live kit](https://theprototype.app/kit) lists every token with its value in the
current theme and checks the text contrast of each pair.

## Rules

- One primary (filled blue) button per view.
- Orange (`--live`) means something is live or recorded: Play, record, streaming. Never use
  it for selection.
- Toggles for on/off; checkboxes only to pick items from a list.
- No raw colours: a hex value in your UI will not follow the user's theme.
- One short sentence per description, in sentence case.

## ScrollStrip — rows that can run out of width

`ui/ScrollStrip.svelte` (since @@VER@@) is the row for a toolbar or a tab strip that may not fit: it scrolls sideways
with a finger drag or the mouse wheel, shows no scrollbar and fades the edge that still hides something. Keep pinned
controls (a **+**, a close button) outside it. It is on the **/kit** page with the other parts.
