#!/bin/bash
sleep 5
cd /opt/ironbane-play-server/
/usr/bin/git pull
/usr/bin/git checkout master
/usr/bin/sudo restart ironbane-play-server
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "ironbane-play-server up2date and restarted" red