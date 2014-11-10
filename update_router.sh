#!/bin/bash
sleep 5
cd /opt/ironbane-router/
/usr/bin/git pull
/usr/bin/git checkout master
/usr/bin/sudo restart ironbane-router
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "ironbane-router up2date and restarted" purple