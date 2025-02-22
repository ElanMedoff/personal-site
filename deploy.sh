#!/bin/bash

echo "building locally..."
if npx next build; then
  echo "built locally"
else
  echo "build failed, aborting"
  exit
fi

if lsof -ti:3000 >/dev/null 2>&1; then
  echo "Port 3000 already in use. Okay to close it? y/*"
  read -r ANSWER
  if [[ $ANSWER != "y" ]]; then
    echo "exiting"
    exit 1
  fi

  echo "killing port 3000"
  kill -9 "$(lsof -ti:3000)"
fi

pm2 start "npm run start" --name e2e
echo "running e2es locally..."
if npm run test; then
  echo "ran e2es locally"
else
  echo "e2e tests failed, aborting"
  pm2 delete e2e
  exit
fi
pm2 delete e2e

echo "generating sitemap ..."
npm run generateSitemap
echo "generated sitemap"

echo "backing up..."
rsync -av -e ssh --exclude="node_modules" --exclude=".next" --exclude="public" elan@147.182.190.69:/var/www/elanmed.dev ~/Desktop/personal-site-backups
mv ~/Desktop/personal-site-backups/elanmed.dev ~/Desktop/personal-site-backups/"$(date +"%m:%d:%y_%H-%M-%S")"
echo "backed up"

echo "input commit message >"
read -r COMMIT
git add -A
git commit -m "$COMMIT"
npm run push
npm run deploy
