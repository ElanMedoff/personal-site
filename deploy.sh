#!/bin/bash

function cecho(){
    tput setaf $2;
    echo $1;
    tput sgr0;
}

cecho "building locally..." 4
if npx next build; then
  cecho "built locally" 2

  cecho "backing up..." 4
  rsync -av -e ssh --exclude="node_modules" --exclude=".next" --exclude="public" elan@147.182.190.69:/var/www/elanmed.dev ~/Desktop/personal-site-backups
  mv ~/Desktop/personal-site-backups/elanmed.dev ~/Desktop/personal-site-backups/"$(date +"%m:%d:%y_%H-%M-%S")"
  cecho "backed up" 2

  cecho "input commit message >" 4
  read COMMIT
  git add -A
  git commit -m "$COMMIT"
  npm run push
  npm run deploy
else
  cecho "build failed, aborting" 1
fi
