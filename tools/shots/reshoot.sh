#!/usr/bin/env bash
# Roadmap 83 V7 — the dry run of the release re-shoot: which docs shots went stale, nothing changed in git.
#   APP_URL=https://preview-1-46.theprototype.pages.dev/ E2E_PC= e2e-slot -- bash tools/shots/reshoot.sh [out dir]
# Since V12 (83-start) it is release.cjs without --apply (verdicts + the before/after diff page <out>/index.html),
# then the strict build (the image rules, tools/shots/README.md). The release battery runs release.sh instead,
# which also regenerates the changed shots and runs the V8 Try it check. Exit 1 = flagged shots or a rule broken.
set -uo pipefail
cd "$(dirname "$0")"
OUT=$(realpath -m "${1:-$(mktemp -d "${TMPDIR:-/tmp}/reshoot-XXXXXX")}")
rc=0
node release.cjs --out "$OUT" || rc=$?
[ $rc = 2 ] && exit 2
MKDOCS=../../venv/bin/mkdocs
[ -x "$MKDOCS" ] || MKDOCS=/home/deck/.code/theprototype-app/docs/venv/bin/mkdocs
[ -x "$MKDOCS" ] || MKDOCS=mkdocs
(cd ../.. && "$MKDOCS" build --strict -q -d "$OUT/site") || rc=1
exit $rc
