#!/bin/bash

if [[ $# -ne 2 ]]; then
  echo "./t.sh --{update,compare} path/to/directory/or/file"
  exit 1
fi

if lsof -ti:3001 >/dev/null 2>&1; then
  echo "Port 3001 already in use. Okay to close it? y/*"
  read -r ANSWER
  if [[ $ANSWER != "y" ]]; then
    echo "exiting"
    exit 1
  fi

  echo "killing port 3001"
  kill -9 "$(lsof -ti:3001)"
fi

PM2_NAME="visual-regression-test-suite"
pm2 start "npm run dev:visual-regression" --name "$PM2_NAME"
echo "running e2es locally..."

CMD=""
case $1 in
  --update)
    CMD="npm run test:update-snapshots $2 $2"
    ;;
  --compare)
    CMD="npm run test $2"
    ;;
esac

if eval "$CMD"; then
  echo "ran e2es locally"
else
  echo "e2e tests failed, aborting"
  pm2 delete "$PM2_NAME"
  exit
fi
pm2 delete "$PM2_NAME"
