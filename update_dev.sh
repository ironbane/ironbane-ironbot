#!/bin/bash
sleep 5
cd /opt/ironbane-dev-server/
/usr/bin/git pull
/usr/bin/git checkout master
/usr/bin/sudo stop ironbane-dev-server
/usr/bin/sudo start ironbane-dev-server
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "ironbane-dev-server up2date and restarted"