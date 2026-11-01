"""Roadmap 83 V8: "Try it" links are a docs health check.

Every link written as  [Try it](https://theprototype.app/){ .tryit data-tryit="<check id>" }
must name a check in tools/shots/tryit.yml whose url is the link's url. A link without one, or a
check no page uses, is a build warning — and `mkdocs build --strict` (CI) fails on it. The live half,
tools/shots/tryit-check.cjs, opens every check's url and asserts the controls it lists exist.
"""
import logging
import os
import re

import yaml

log = logging.getLogger("mkdocs.hooks.tryit")
LINK = re.compile(r"\[[^\]]*\]\((?P<url>[^)\s]+)\)\{(?P<attrs>[^}]*)\}")
ID = re.compile(r"""data-tryit=["']?(?P<id>[\w./-]+)""")
APP = ("https://theprototype.app/", "https://www.theprototype.app/")

_checks = {}
_used = set()


def on_config(config):
    path = os.path.join(os.path.dirname(config.config_file_path), "tools", "shots", "tryit.yml")
    _checks.clear()
    _used.clear()
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            _checks.update((yaml.safe_load(f) or {}).get("checks") or {})
    return config


def on_page_markdown(markdown, page, **_):
    for m in LINK.finditer(markdown):
        attrs = m.group("attrs")
        if ".tryit" not in attrs.split():
            continue
        url = m.group("url")
        where = page.file.src_uri
        idm = ID.search(attrs)
        if not idm:
            log.warning("%s: Try it link %s has no data-tryit check id", where, url)
            continue
        cid = idm.group("id")
        _used.add(cid)
        check = _checks.get(cid)
        if not check:
            log.warning("%s: Try it check '%s' is not in tools/shots/tryit.yml", where, cid)
        elif check.get("url") != url:
            log.warning("%s: Try it link %s does not match check '%s' (%s)", where, url, cid, check.get("url"))
        if not url.startswith(APP):
            log.warning("%s: Try it link %s does not open the app", where, url)
    return markdown


def on_post_build(config, **_):
    for cid in sorted(set(_checks) - _used):
        log.warning("tools/shots/tryit.yml: check '%s' is used by no page", cid)
