#!/bin/bash
sleep 5
cd /opt/ironbane-ironbot/
git pull
git checkout master
git reset --hard
sudo stop ironbane-ironbot
sudo start ironbane-ironbot
