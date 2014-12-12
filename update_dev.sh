#!/bin/bash
sleep 5
cd /opt/ironbane-dev-server/
/usr/bin/git pull
/usr/bin/git checkout master
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "running npm install" blue
/usr/bin/sudo npm install

# update and grab config values
cd /opt/ironbane-secret
/usr/bin/git pull
/usr/bin/sudo cp ./ironbane-dev-settings/ibconfig.json /opt/ironbane-dev-server/config/config.json

/usr/bin/sudo restart ironbane-dev-server
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "ironbane-dev-server up2date and restarted" yellow
