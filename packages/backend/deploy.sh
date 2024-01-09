#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.1/bin

cd /home/ubuntu/BloggerHub
git pull origin master
pm2 stop node dist/index.js
pm2 start npm --name "node dist/index.js" -- run "start:express"