"""Shared by the docs hooks (shots.py, readable.py): the figures of a rendered page, the image manifest,
and the natural size of an image file. Not a hook itself."""
import html
import json
import os
import posixpath
import re
import struct

FIGURE = re.compile(r"<figure\b[^>]*>(?P<body>.*?)</figure>(?P<after>\s*<div class=\"shot-key\">\s*<ol>(?P<key>.*?)</ol>)?", re.S)
MEDIA = re.compile(r"<(?P<tag>img|video)\b(?P<attrs>[^>]*)>", re.S)
ATTR = re.compile(r"""(?P<k>[\w:-]+)\s*=\s*(?:"(?P<v1>[^"]*)"|'(?P<v2>[^']*)'|(?P<v3>[^\s>]+))""")
SOURCE = re.compile(r"<source\b[^>]*\bsrc=\"(?P<src>[^\"]+)\"")
CAPTION = re.compile(r"<figcaption\b[^>]*>(?P<t>.*?)</figcaption>", re.S)
TAGS = re.compile(r"<[^>]+>")


def attrs(s):
    return {m.group("k"): html.unescape(m.group("v1") or m.group("v2") or m.group("v3") or "") for m in ATTR.finditer(s)}


def text(s):
    return re.sub(r"\s+", " ", html.unescape(TAGS.sub(" ", s or ""))).strip()


def docs_path(src, page_url):
    """an img/video src on the rendered page → its path under docs/ (img/…), or None for an external one"""
    if not src or re.match(r"^[a-z]+:|^//", src):
        return None
    return posixpath.normpath(posixpath.join(posixpath.dirname("/" + page_url.rstrip("/") + "/x"), src)).lstrip("/")


def media(page_html, page_url):
    """every img/video on the page: {tag, attrs, path, figure (None outside one), caption, key items}"""
    found, spans = [], []
    for f in FIGURE.finditer(page_html):
        spans.append((f.start(), f.end()))
        cap = CAPTION.search(f.group("body"))
        key = re.findall(r"<li\b[^>]*>(.*?)</li>", f.group("key") or "", re.S)
        for m in MEDIA.finditer(f.group("body")):
            a = attrs(m.group("attrs"))
            src = a.get("src")
            if m.group("tag") == "video":
                s = SOURCE.search(f.group("body"), m.end())
                src = s.group("src") if s else None
            found.append({"tag": m.group("tag"), "attrs": a, "path": docs_path(src, page_url), "figure": True,
                          "caption": text(cap.group("t")) if cap else "", "key": [text(k) for k in key],
                          "has_key": bool(f.group("after"))})
    for m in MEDIA.finditer(page_html):
        if any(s <= m.start() < e for s, e in spans):
            continue
        a = attrs(m.group("attrs"))
        found.append({"tag": m.group("tag"), "attrs": a, "path": docs_path(a.get("src"), page_url), "figure": False,
                      "caption": "", "key": [], "has_key": False})
    return found


def manifest(config):
    path = os.path.join(os.path.dirname(config.config_file_path), "tools", "shots", "manifest.json")
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"column": 688, "images": {}}


def natural_size(path):
    """(width, height) of a PNG or WebP file from its header, or None"""
    with open(path, "rb") as f:
        head = f.read(64)
    if head[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", head[16:24])
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        chunk = head[12:16]
        if chunk == b"VP8X":
            w = int.from_bytes(head[24:27], "little") + 1
            h = int.from_bytes(head[27:30], "little") + 1
            return w, h
        if chunk == b"VP8 ":
            w, h = struct.unpack("<HH", head[26:30])
            return w & 0x3FFF, h & 0x3FFF
        if chunk == b"VP8L":
            b = int.from_bytes(head[21:25], "little")
            return (b & 0x3FFF) + 1, ((b >> 14) & 0x3FFF) + 1
    return None
