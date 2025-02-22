#!/bin/bash

if [[ $# -eq 0 ]]; then
  echo 'Pass a test file or directory'
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

pm2 start "npm run start" --name e2e
echo "running e2es locally..."
if npx playwright test "$1"; then
  echo "ran e2es locally"
else
  echo "e2e tests failed, aborting"
  pm2 delete e2e
  exit
fi
pm2 delete e2e
