#!/bin/bash

source "$(dirname "$0")"/helpers.sh

if [[ $# -ne 2 ]]; then
  cecho --mode=info "./t.sh --{update,compare} path/to/directory/or/file"
  exit 1
fi

if lsof -ti:3001 >/dev/null 2>&1; then
  cecho --mode=query "Port 3001 already in use. Okay to close it? (y/N)"
  read -r ANSWER
  if [[ $ANSWER != "y" ]]; then
    cecho --mode=error "exiting"
    exit 1
  fi

  cecho --mode=info "killing port 3001"
  kill -9 "$(lsof -ti:3001)"
fi

PM2_NAME="visual-regression-test-suite"
pm2 start "npm run dev:visual-regression" --name "$PM2_NAME"
cecho --mode=info "running playwright tests locally..."

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
  cecho --mode=success "playwright tests passed"
else
  cecho --mode=error "playwright tests failed, aborting"
  pm2 delete "$PM2_NAME"
  exit
fi
pm2 delete "$PM2_NAME"
