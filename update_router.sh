#!/bin/bash
sleep 5
cd /opt/ironbane-router/
/usr/bin/git pull
/usr/bin/git checkout master
/usr/bin/git reset --hard
/usr/bin/sudo stop ironbane-router
/usr/bin/sudo start ironbane-router
/usr/bin/nodejs notify.js "ironbane-router up2date and restarted"