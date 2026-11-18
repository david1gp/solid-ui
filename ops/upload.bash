#!/bin/bash
# Deploy ./out/client to the adaptive-solid-ui Cloudflare Pages project.
# Credentials come only from ./.env.cloudflare (gitignored, group `projects`):
# a Pages-only, wonder1-IP-restricted token on david's personal account, so
# any project user (tim, mit, ...) can deploy. Inherited CLOUDFLARE_* vars are
# dropped first so a caller's own token can never be picked up by accident.
# Extra args go to `wrangler pages deploy`, e.g. --branch=preview-x.
set -euo pipefail
cd "$(dirname "$0")/.."

env_file=.env.cloudflare
[ -r "$env_file" ] || { echo "❌ $env_file missing or unreadable (ask david)" >&2; exit 1; }

while IFS= read -r name; do unset "$name"; done < <(compgen -e | grep -E '^(CLOUDFLARE_|CF_)' || true)
set -a
# shellcheck source=/dev/null
. "./$env_file"
set +a
: "${CLOUDFLARE_API_TOKEN:?missing in $env_file}" "${CLOUDFLARE_ACCOUNT_ID:?missing in $env_file}"

exec bun run wrangler pages deploy ./out/client --project-name=adaptive-solid-ui --commit-dirty=true "$@"
