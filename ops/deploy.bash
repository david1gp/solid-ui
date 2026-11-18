#!/bin/bash
# Build and deploy. Credentials: see ops/upload.bash (.env.cloudflare).
# Extra args go to `wrangler pages deploy`; with --branch=<name> this is a
# preview deployment and the `deployed` git branch is left untouched.
set -euo pipefail
cd "$(dirname "$0")/.."

bun run build
# Local original-quality images live in ./images (gitignored, optional).
if [ -d images ]; then
  rsync -avh --delete images/ out/client/images/
fi
bash ./ops/upload.bash "$@"
if [[ " $* " != *" --branch"* ]]; then
  git branch -f deployed
fi
