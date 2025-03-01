#!/bin/bash

source "$(dirname "$0")"/helpers.sh

cecho --mode=query "This script won't add any commits. Confirm you want to push the latest remote master to the server (y/N)"
read -r ANSWER
if [[ $ANSWER != "y" ]]; then
  cecho --mode=error "exiting"
  exit 1
fi

cecho --mode=info "running eslint ..."
npm run lint
cecho --mode=success "ran eslint"

cecho --mode=info "running tsc ..."
npm run types
cecho --mode=success "ran tsc"

cecho --mode=info "building locally..."
if npx next build; then
  cecho --mode=success "built locally"
else
  cecho --mode=error "build failed, aborting"
  exit 1
fi

if nc -z localhost 3001 >/dev/null 2>&1; then
  cecho --mode=error "Port 3001 already in use"
  exit 1
fi

PM2_NAME="playwright-test-suite"
pm2 start "npm run dev:visual-regression" --name "$PM2_NAME"

if npm run vr src/tests/visual-regression; then
  cecho --mode=success "visual regression tests passed"
else
  cecho --mode=error "visual regression tests failed, aborting"
  pm2 delete "$PM2_NAME"
  exit
fi

if npm run unit src/tests/unit; then
  cecho --mode=success "playwright unit tests passed"
else
  cecho --mode=error "playwright unit tests failed, aborting"
  pm2 delete "$PM2_NAME"
  exit
fi

if npm run validate-links; then
  cecho --mode=success "playwright link validation tests passed"
else
  cecho --mode=error "playwright link validation tests failed, aborting"
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
