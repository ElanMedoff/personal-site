#!/bin/bash

function cecho(){
    tput setaf $2;
    echo $1;
    tput sgr0;
}

cecho "building locally..." 4
if npx next build; then
  cecho "built locally" 2
else
  cecho "build failed, aborting" 1
  exit
fi

kill -9 $(lsof -ti:3000)
pm2 start "npm run start" --name e2e
cecho "running e2es locally..." 4
if npm run test; then
  cecho "ran e2es locally" 2
else
  cecho "e2e tests failed, aborting" 1
  pm2 delete e2e 
  exit
fi
pm2 delete e2e 

cecho "generating sitemap ..." 4
npm run generateSitemap
cecho "generated sitemap" 2

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
