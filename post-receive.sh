#!/bin/bash
LOG=/home/elan/post-receive.log
NPM=/home/elan/.nvm/versions/node/v16.16.0/bin/npm
NPX=/home/elan/.nvm/versions/node/v16.16.0/bin/npx
PM2=/home/elan/.nvm/versions/node/v16.16.0/bin/pm2
DIR=/var/www/elanmed.dev

# overwrite
echo "" > $LOG

cd $DIR
echo "running npm install..." >> $LOG
$NPM install >> $LOG 2>&1
echo "ran npm install" >> $LOG

echo "rebuilding..." >> $LOG
$NPM run build >> $LOG 2>&1
echo "rebuilt" >> $LOG

echo "migrating prisma..." >> $LOG
$NPX prisma migrate deploy >> $LOG 2>&1
echo "migrated prisma" > $LOG

echo "restarting pm2 daemon..." >> $LOG
$PM2 reload ecosystem.config.js --only start >> $LOG 2>&1
echo "restarted pm2 daemon" >> $LOG
