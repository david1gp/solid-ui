#!/bin/bash
set -e

bun run build
# Local original-quality images live in ./images (gitignored, optional).
if [ -d images ]; then
  rsync -avh --delete images/ out/client/images/
else
  echo "ℹ️  No ./images folder found — skipping image sync."
fi
bun run upload
git branch -f deployed
