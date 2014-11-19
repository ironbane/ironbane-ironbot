#!/bin/bash
sleep 5
cd /opt/ironbane-ironbot/
/usr/bin/git pull
/usr/bin/git checkout master
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "running npm install" blue
/usr/bin/sudo npm install
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "I am up2date and will restart myself" blue
/usr/bin/sudo restart ironbane-ironbot