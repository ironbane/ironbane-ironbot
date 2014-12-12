#!/bin/bash
sleep 5
cd /opt/ironbane-play-server/
# Get new tags from remote
/usr/bin/git fetch --tags
# Get latest tag name
/usr/bin/latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)
# Checkout latest tag
/usr/bin/git checkout $latestTag
/usr/bin/sudo npm install
# update and grab config values
cd /opt/ironbane-secret
/usr/bin/git pull
/usr/bin/sudo cp ./ironbane-play-settings/ibconfig.json /opt/ironbane-play-server/config/config.json

/usr/bin/sudo restart ironbane-play-server
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "ironbane-play-server up2date and restarted" red
