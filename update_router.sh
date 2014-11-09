#!/bin/bash
sleep 5
cd /opt/ironbane-router/
git pull
git checkout master
git reset --hard
sudo stop ironbane-router
sudo start ironbane-router
