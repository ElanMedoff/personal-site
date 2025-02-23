#!/bin/bash

source "$(dirname "$0")"/helpers.sh

cecho --mode=query "This script won't add any commits. Confirm you want to push the latest remote master to the server (y/N)"
read -r ANSWER
if [[ $ANSWER != "y" ]]; then
  cecho --mode=error "exiting"
  exit 1
fi

cecho --mode=info "building locally..."
if npx next build; then
  cecho --mode=success "built locally"
else
  cecho --mode=error "build failed, aborting"
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

PM2_NAME="playwright-test-suite"
pm2 start "npm run dev:visual-regression" --name "$PM2_NAME"
cecho --mode=info "running playwright tests locally..."

if npm run test src/tests/; then
  cecho --mode=success "playwright tests passed"
else
  cecho --mode=error "playwright tests failed, aborting"
  pm2 delete "$PM2_NAME"
  exit
fi
pm2 delete "$PM2_NAME"

cecho --mode=info "generating sitemap ..."
npm run generate-sitemap
cecho --mode=success "generated sitemap"

cecho --mode=info "validating slugs ..."
npm run validate-slugs
cecho --mode=success "validated slugs"

# if [[ -f "./backup.sh" ]]; then
#   source ./backup.sh
# fi

# cecho --mode=info "deploying..."
# npm run deploy
# cecho --mode=success "deployed"
