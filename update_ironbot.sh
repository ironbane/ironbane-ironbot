#!/bin/bash
sleep 5
cd /opt/ironbane-ironbot/
/usr/bin/git pull
/usr/bin/git checkout master
/usr/bin/git reset --hard
/usr/bin/sudo stop ironbane-ironbot
/usr/bin/sudo start ironbane-ironbot
/usr/bin/nodejs /opt/ironbane-ironbot/notify.js "ironbane-ironbot up2date and restarted"