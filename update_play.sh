#!/bin/bash
sleep 5
cd /opt/ironbane-play-server/
git pull
git checkout master
git reset --hard
sudo stop ironbane-play-server
sudo start ironbane-play-server
