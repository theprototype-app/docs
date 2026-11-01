"""Roadmap 83 V10: the docs are read by AI agents too (the connector, Claude Code, crawlers), and they
don't see pixels. On every build this hook writes:
  - <page>.md next to each page (controls.md beside controls/): the page's Markdown, cleaned for reading —
    absolute links, figures as text ("Figure: …", the key list, "Loop: …"), no attribute lists;
  - llms.txt (llmstxt.org): the site, then every page by nav section, linked to its Markdown with a one-line
    description; llms-full.txt: all of those pages in nav order in one file;
  - one small JSON-LD block per page: a TechArticle (name, description, dateModified, the app version its
    images were shot on) with an ImageObject/VideoObject per figure (caption + contentUrl).
The text in the page matters more than the markup; this only makes it easy to find.
"""
import json
import logging
import os
import posixpath
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
import figures  # noqa: E402

log = logging.getLogger("mkdocs.hooks.readable")
SUMMARY = ("User documentation for ThePrototype (https://theprototype.app), a collaborative 3D prototyping app that runs "
           "in the browser: peer-to-peer sessions with no account, a visual node graph for behaviour, games, VR and AI "
           "tools. Each link is the page's Markdown; images and short video loops are described in words.")

_pages = {}  # src_uri → {title, url, md, description, images, version, date}
_nav = []

IMG_MD = re.compile(r"!\[(?P<alt>[^\]]*)\]\((?P<src>[^)\s]+)\)(?:\{[^}]*\})?")
LINK_MD = re.compile(r"(?<!!)\[(?P<t>[^\]]*)\]\((?P<href>[^)\s]+)\)(?:\{[^}]*\})?")
CAPTION_BLOCK = re.compile(r"^/// caption\s*\n(?P<t>.*?)\n///\s*$", re.S | re.M)
VIDEO = re.compile(r"<figure[^>]*>\s*<video\b(?P<a>[^>]*)>.*?</video>\s*(?:<figcaption>(?P<cap>.*?)</figcaption>)?\s*</figure>", re.S)
HTML_LINE = re.compile(r"^\s*</?(div|figure|span)\b[^>]*>\s*$", re.M)


def _abs(base, src, page_src):
    if re.match(r"^[a-z]+:|^#|^//", src):
        return src
    path, _, frag = src.partition("#")
    full = posixpath.normpath(posixpath.join(posixpath.dirname(page_src), path)) if path else page_src
    return base + full + ("#" + frag if frag else "")


def clean(md, page_src, base):
    """the page's Markdown as an agent should read it"""
    md = re.sub(r"\A---\n.*?\n---\n", "", md, flags=re.S)

    def video(m):
        a = figures.attrs(m.group("a"))
        src = re.search(r'<source src="([^"]+)" type="video/mp4"', m.group(0))
        url = _abs(base, src.group(1).replace("../", "", 1), page_src) if src else ""
        cap = figures.text(m.group("cap"))
        return f"[Loop: {a.get('aria-label', '')}]({url})\n\n*Figure: {cap}*"

    md = VIDEO.sub(video, md)
    md = IMG_MD.sub(lambda m: f"![{m.group('alt')}]({_abs(base, m.group('src'), page_src)})", md)
    md = LINK_MD.sub(lambda m: f"[{m.group('t')}]({_abs(base, m.group('href'), page_src)})", md)
    md = CAPTION_BLOCK.sub(lambda m: f"*Figure: {m.group('t').strip()}*", md)
    md = HTML_LINE.sub("", md)
    return re.sub(r"\n{3,}", "\n\n", md).strip() + "\n"


def describe(md):
    """the first real paragraph, as plain text, ≤ 200 characters"""
    for para in re.split(r"\n\s*\n", re.sub(r"\A---\n.*?\n---\n", "", md, flags=re.S)):
        p = para.strip()
        if not p or p[0] in "#!<|>-*`:/[" or p.startswith("1."):
            continue
        t = re.sub(r"\[([^\]]*)\]\([^)]*\)(\{[^}]*\})?", r"\1", p)
        t = re.sub(r"[*_`]", "", re.sub(r"\s+", " ", t)).strip()
        return t if len(t) <= 200 else t[:197].rsplit(" ", 1)[0] + "…"
    return ""


def on_config(config):
    _pages.clear()
    return config


def on_nav(nav, **_):
    _nav[:] = [nav]
    return nav


def on_page_markdown(markdown, page, config, **_):
    base = config.site_url or "/"
    _pages[page.file.src_uri] = {
        "title": page.title, "url": base + page.url, "md": clean(markdown, page.file.src_uri, base),
        "description": (page.meta.get("description") or describe(markdown)),
        "date": str(page.meta.get("revision_date") or ""), "images": [], "version": "",
    }
    return markdown


def on_page_content(html, page, config, **_):
    info = _pages.get(page.file.src_uri)
    if not info:
        return html
    shots = figures.manifest(config).get("images", {})
    base = config.site_url or "/"
    versions = []
    for m in figures.media(html, page.url):
        if not m["figure"] or not m["path"]:
            continue
        loop = m["tag"] == "video"
        o = {"@type": "VideoObject" if loop else "ImageObject", "contentUrl": base + m["path"], "caption": m["caption"]}
        if loop:
            o["description"] = m["attrs"].get("aria-label", "")
        info["images"].append(o)
        if m["path"] in shots and shots[m["path"]].get("app"):
            versions.append(shots[m["path"]]["app"])
    if versions:
        info["version"] = max(versions, key=lambda v: [int(x) for x in re.findall(r"\d+", v)])
    return html


def on_post_page(output, page, config, **_):
    info = _pages.get(page.file.src_uri)
    if not info:
        return output
    ld = {"@context": "https://schema.org", "@type": "TechArticle", "name": info["title"], "url": info["url"]}
    if info["description"]:
        ld["description"] = info["description"]
    if info["date"]:
        ld["dateModified"] = info["date"]
    if info["version"]:
        ld["about"] = {"@type": "SoftwareApplication", "name": "ThePrototype", "softwareVersion": info["version"]}
    if info["images"]:
        ld["image"] = info["images"]
    tag = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("</", "<\\/") + "</script>"
    return output.replace("</head>", tag + "\n</head>", 1)


def _walk(items, trail=()):
    """the nav as (section, title prefix, page) in reading order"""
    for it in items:
        if it.is_page:
            yield (trail[0] if trail else "Docs"), " › ".join(trail[1:]), it
        elif it.is_section:
            yield from _walk(it.children, trail + (it.title,))


def on_post_build(config, **_):
    base = config.site_url or "/"
    site = config.site_dir
    for src, info in _pages.items():
        out = os.path.join(site, src)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as f:
            f.write(info["md"])
    if not _nav:
        return
    lines = [f"# {config.site_name}", "", f"> {SUMMARY}", "",
             f"Every page in one file: {base}llms-full.txt", ""]
    full = [f"# {config.site_name}", "", f"> {SUMMARY}", ""]
    section = None
    for sec, prefix, pg in _walk(_nav[0].items):
        info = _pages.get(pg.file.src_uri)
        if not info:
            continue
        if sec != section:
            section = sec
            lines += ["", f"## {sec}", ""]
        name = f"{prefix} › {info['title']}" if prefix else info["title"]
        desc = f": {info['description']}" if info["description"] else ""
        lines.append(f"- [{name}]({base}{pg.file.src_uri}){desc}")
        full += ["", "---", "", f"Source: {info['url']} (Markdown: {base}{pg.file.src_uri})", "", info["md"]]
    with open(os.path.join(site, "llms.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines).replace("\n\n\n", "\n\n").strip() + "\n")
    with open(os.path.join(site, "llms-full.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(full).strip() + "\n")
    log.info("readable: llms.txt + llms-full.txt + %d page .md files", len(_pages))
