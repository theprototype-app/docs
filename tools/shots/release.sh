#!/usr/bin/env bash
# Roadmap 83 — the docs part of a release battery (integrators, rules ▸ Integrators ▸ "Docs shots in the battery"):
#   APP_URL=<the release's preview URL> E2E_PC= e2e-slot --wait 3600 -- bash <docs checkout>/tools/shots/release.sh <version> [out dir]
#   V12  release.cjs --apply: re-shoot every still against APP_URL, regenerate the ones whose page or interface changed,
#        accept pixel drift, flag a changed layout or a callout that no longer fits; diff page <out>/index.html
#   V7/V9/V10  mkdocs build --strict (stale images, 1:1 interface, alt + figcaption, key = badges, ≤ 3 words in images)
#   V8   tryit-check.cjs: every "Try it" link opens on APP_URL and the controls its page names are there
# Prints <out>/summary.md (paste it into the release STATUS and the docs PR). Commit what --apply changed
# (tools/shots/raw, tools/shots/manifest.json, docs/img, the pages' figures) in the release's docs PR.
# Exit 0 = all green; 1 = flagged shots, a broken docs rule or a broken Try it link; 2 = the run itself failed.
set -uo pipefail
cd "$(dirname "$0")"
V=${1:?usage: release.sh <version> [out dir]}
OUT=$(realpath -m "${2:-${TMPDIR:-/tmp}/docs-release-$V}")
mkdir -p "$OUT"
APP_URL=${APP_URL:-https://theprototype.pages.dev/}
export APP_URL

node release.cjs "$V" --apply --out "$OUT"; r12=$?

MKDOCS=../../venv/bin/mkdocs
[ -x "$MKDOCS" ] || MKDOCS=/home/deck/.code/theprototype-app/docs/venv/bin/mkdocs
[ -x "$MKDOCS" ] || MKDOCS=mkdocs
(cd ../.. && "$MKDOCS" build --strict -q -d "$OUT/site") > "$OUT/build.log" 2>&1; rb=$?

TRYIT_ORIGIN=$APP_URL node tryit-check.cjs > "$OUT/tryit.log" 2>&1; r8=$?

{
  echo
  echo "Strict build (V7/V9/V10 image rules): $([ $rb = 0 ] && echo green || echo "RED — $OUT/build.log")"
  echo "Try it check (V8): $([ $r8 = 0 ] && echo green || echo "RED — $(grep -c '^FAIL' "$OUT/tryit.log") link(s), $OUT/tryit.log")"
} >> "$OUT/summary.md"
cat "$OUT/summary.md"
[ $r12 = 2 ] && exit 2
[ $r12 = 0 ] && [ $rb = 0 ] && [ $r8 = 0 ] && exit 0
exit 1
