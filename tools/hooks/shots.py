"""Roadmap 83 V9/V10: the owner's rules for docs images, checked on every build.

Every image tools/shots made (tools/shots/manifest.json) must, on the page that shows it:
  - carry width/height = its CSS size (natural / dpr), and that size must match the file — so the page
    never rescales a capture; one that shows interface must also fit the content column (1:1, sharp);
  - have alt text in words (6 words or more, not "screenshot") — a loop an aria-label;
  - sit in a <figure> with a <figcaption> (a loop's caption says what happens in it);
  - be followed by a numbered key with exactly one line per badge (none when it has no badges);
  - have every handwritten label also in its alt, caption or key.
A miss is a build warning, so `mkdocs build --strict` (CI) fails. Images older than tools/shots are only
counted (log level info): the batch-2 pages replace them.
"""
import logging
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
import figures  # noqa: E402

log = logging.getLogger("mkdocs.hooks.shots")
VAGUE = ("screenshot", "image", "picture", "screen shot")

_state = {"manifest": {}, "docs": "", "legacy": {}, "seen": set()}


def on_config(config):
    _state["manifest"] = figures.manifest(config)
    _state["docs"] = config.docs_dir
    _state["legacy"] = {}
    _state["seen"] = set()
    return config


def check(m, entry, column):
    """the problems of one manifest image as the page shows it"""
    out = []
    a = m["attrs"]
    loop = entry["kind"] == "loop"
    try:
        w, h = int(a.get("width", "")), int(a.get("height", ""))
    except ValueError:
        w = h = None
    if (w, h) != (entry["width"], entry["height"]):
        out.append(f'width/height {a.get("width")}×{a.get("height")}, its CSS size is {entry["width"]}×{entry["height"]} '
                   "(natural / dpr; the page must not rescale it)")
    if entry["kind"] == "ui" and entry["width"] > column:
        out.append(f'shows interface {entry["width"]} px wide in a {column} px column: crop it, never shrink it')
    nat = figures.natural_size(os.path.join(_state["docs"], m["path"])) if not loop else None
    if nat and nat != (entry["width"] * entry["dpr"], entry["height"] * entry["dpr"]):
        out.append(f"the file is {nat[0]}×{nat[1]}, the manifest says {entry['width']}×{entry['height']} at dpr {entry['dpr']} (re-run annotate.cjs)")
    alt = (a.get("aria-label") if loop else a.get("alt")) or ""
    if len(alt.split()) < 6 or alt.strip().lower().rstrip(".") in VAGUE:
        out.append(("aria-label" if loop else "alt") + " text must say what it shows, in words (6 words or more)")
    if not m["figure"] or not m["caption"]:
        out.append("not in a <figure> with a <figcaption>" + (" (a loop's caption says what happens in it)" if loop else ""))
    if len(m["key"]) != entry.get("badges", 0) or (m["has_key"] and not entry.get("badges")):
        out.append(f'{entry.get("badges", 0)} numbered badge(s) but {len(m["key"])} line(s) in the key list under the figure')
    words = " ".join([alt, m["caption"], *m["key"]]).lower()
    for label in entry.get("labels", []):
        if label.lower() not in words:
            out.append(f'the handwritten label "{label}" is not in the alt, caption or key')
    return out


def on_page_content(html, page, **_):
    images = _state["manifest"].get("images", {})
    column = _state["manifest"].get("column", 688)
    where = page.file.src_uri
    for m in figures.media(html, page.url):
        p = m["path"]
        if not p:
            continue
        entry = images.get(p) or images.get(p[:-4] + ".webm" if p.endswith(".mp4") else "")
        if not entry:
            if m["tag"] == "img":
                _state["legacy"][where] = _state["legacy"].get(where, 0) + 1
                if not (m["attrs"].get("alt") or "").strip():
                    log.warning("%s: %s has no alt text", where, p)
            continue
        _state["seen"].add(p)
        for problem in check(m, entry, column):
            log.warning("%s: %s %s", where, p, problem)
    return html


def on_post_build(config, **_):
    for p, e in _state["manifest"].get("images", {}).items():
        if p not in _state["seen"]:
            log.info("tools/shots/manifest.json: %s (%s) is shown on no page", p, e.get("kind"))
    legacy = _state["legacy"]
    if legacy:
        log.info("shots: %d older image(s) on %d page(s) are not tools/shots captures yet", sum(legacy.values()), len(legacy))
