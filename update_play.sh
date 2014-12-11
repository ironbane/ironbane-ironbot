#!/bin/bash
sleep 5
cd /opt/ironbane-play-server/
# Get new tags from remote
/usr/bin/sudo git fetch --tags
# Get latest tag name
/usr/bin/sudo latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)
# Checkout latest tag
/usr/bin/sudo git checkout $latestTag
/usr/bin/sudo restart ironbane-play-server
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "ironbane-play-server up2date and restarted" red
