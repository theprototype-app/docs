#!/usr/bin/env bash
# Roadmap 83 V7 — the release re-shoot hook (RELEASING checklist: "docs shots current?").
#   APP_URL=https://preview-1-46.theprototype.pages.dev/ e2e-slot -- bash tools/shots/reshoot.sh [out dir]
# Re-shoots every still's raw against APP_URL into <out dir>/raw (the shots in git are untouched),
# then lists the stale ones and writes <out dir>/stale-contact.webp (before/after). Exit 1 = stale shots:
# re-shoot those with `node tools/shots/shoot.cjs <page/id ...>` and commit them in the docs PR.
set -euo pipefail
cd "$(dirname "$0")"
OUT=${1:-$(mktemp -d "${TMPDIR:-/tmp}/reshoot-XXXXXX")}
mkdir -p "$OUT/raw"
SHOTS_RAW="$OUT/raw" node shoot.cjs --raw-only --stills
node stale.cjs "$OUT/raw"
