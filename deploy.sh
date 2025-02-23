#!/bin/bash

echo "building locally..."
if npx next build; then
  echo "built locally"
else
  echo "build failed, aborting"
  exit 1
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

PM2_NAME="playwright-test-suite"
pm2 start "npm run prod:visual-regression" --name "$PM2_NAME"
echo "running playwright tests locally..."
if NODE_ENV="production" npm run test tests/; then
  echo "playwright tests passed"
else
  echo "playwright tests failed, aborting"
  pm2 delete "$PM2_NAME"
  exit
fi
pm2 delete "$PM2_NAME"

echo "generating sitemap ..."
npm run generate-sitemap
echo "generated sitemap"

echo "validating slugs ..."
npm run validate-slugs
echo "validated slugs"

if [[ -f "./backup.sh" ]]; then
  source ./backup.sh
fi

echo "deploying..."
npm run deploy
echo "deployed"
