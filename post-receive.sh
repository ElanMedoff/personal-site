#!/bin/bash
LOG=/home/elan/elanmed.dev.log
ECO=/home/elan/ecosystem.config.js
NPM=/home/elan/.nvm/versions/node/v16.16.0/bin/npm
NPX=/home/elan/.nvm/versions/node/v16.16.0/bin/npx
PM2=/home/elan/.nvm/versions/node/v16.16.0/bin/pm2
DIR=/var/www/elanmed.dev

# overwrite
echo "" >"$LOG"

cd "$DIR" || exit
{
  echo "running npm install..."
  $NPM install 2>&1
  echo "ran npm install"

  echo "rebuilding..."
  $NPM run build 2>&1
  echo "rebuilt"

  echo "migrating prisma..."
  $NPX prisma migrate deploy 2>&1
  echo "migrated prisma"

  echo "restarting pm2 daemon..."
  $PM2 reload "$ECO" --only elanmed 2>&1
  echo "restarted pm2 daemon"
} >>"$LOG"
