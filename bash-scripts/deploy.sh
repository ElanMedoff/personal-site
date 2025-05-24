#!/bin/bash

source "$(dirname "$0")"/helpers.sh

if [[ -n "$(git status --porcelain)" ]]; then
  cecho --mode=query "you have unstaged changed! do you want to continue? (y/N)"
  read -r ANSWER
  if [[ $ANSWER != "y" ]]; then
    cecho --mode=error "exiting"
    exit 1
  fi
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

npx prisma migrate reset --force
PM2_PRISMA_NAME="prisma-studio"
pm2 start "npx prisma studio --browser none" --name "$PM2_PRISMA_NAME"

PM2_NEXT_NAME="playwright-test-suite"
pm2 start "npm run dev:visual-regression" --name "$PM2_NEXT_NAME"

if npm run visual-regression src/tests/visual-regression; then
  cecho --mode=success "visual regression tests passed"
else
  cecho --mode=error "visual regression tests failed, aborting"
  pm2 delete "$PM2_NEXT_NAME"
  pm2 delete "$PM2_PRISMA_NAME"
  exit
fi

if npm run unit src/tests/unit; then
  cecho --mode=success "playwright unit tests passed"
else
  cecho --mode=error "playwright unit tests failed, aborting"
  pm2 delete "$PM2_NEXT_NAME"
  pm2 delete "$PM2_PRISMA_NAME"
  exit
fi

if npm run validate-links; then
  cecho --mode=success "playwright link validation tests passed"
else
  cecho --mode=error "playwright link validation tests failed, aborting"
  pm2 delete "$PM2_NEXT_NAME"
  pm2 delete "$PM2_PRISMA_NAME"
  exit
fi

pm2 delete "$PM2_NEXT_NAME"
pm2 delete "$PM2_PRISMA_NAME"

cecho --mode=info "generating sitemap ..."
npm run generate-sitemap
cecho --mode=success "generated sitemap"

cecho --mode=info "generating rss feed ..."
npm run generate-rss
cecho --mode=success "generated rss feed"

cecho --mode=info "validating slugs ..."
npm run validate-slugs
cecho --mode=success "validated slugs"

# if [[ -f "./backup.sh" ]]; then
#   source ./backup.sh
# fi

if [[ -n "$(git status --porcelain)" ]]; then
  cecho --mode=query "changes to the sitemap or rss feed detected, pushing the changes to git? (y/N)"
  read -r ANSWER
  if [[ $ANSWER != "y" ]]; then
    cecho --mode=error "exiting"
    exit 1
  fi

  git add public/sitemap.xml
  git add public/rss.xml
  git commit --no-verify -m "commit triggered from the deploy script. adding changes to the sitemap or rss feed"
  git push origin HEAD
  cecho --mode=success "changes pushed"
fi

cecho --mode=query "deploy? (y/N)"
read -r ANSWER
if [[ $ANSWER != "y" ]]; then
  cecho --mode=error "exiting"
  exit 1
fi
cecho --mode=info "deploying..."
npm run deploy
cecho --mode=success "deployed"
