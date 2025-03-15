#!/bin/bash
# shellcheck source=/dev/null

LOG=/home/elan/elanmed.log
DIR=/home/elan/elanmed
PM2_NAME="elanmed"

source "$HOME/.nvm/nvm.sh"

# overwrite
echo "" >"$LOG"

cd "$DIR" || exit
{
  echo "running npm install..."
  npm install 2>&1
  echo "ran npm install"

  echo "rebuilding..."
  npm run build 2>&1
  echo "rebuilt"

  echo "migrating prisma..."
  npx prisma migrate deploy 2>&1
  echo "migrated prisma"

  echo "restarting pm2 daemon..."
  if pm2 list | grep "$PM2_NAME" >/dev/null 2>&1; then
    pm2 reload "$PM2_NAME"
  else
    pm2 start "npm run prod" --name "$PM2_NAME" 2>&1
  fi
  echo "restarted pm2 daemon"
} >>"$LOG"
