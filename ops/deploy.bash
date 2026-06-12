#!/bin/bash
set -e

bun run build
rsync -avh --delete public-images/ out/client/images/
bun run upload
git branch -f deployed
