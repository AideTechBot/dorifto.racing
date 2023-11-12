#!/bin/bash
WORK_DIR=/root/dorifto

rsync -av --exclude "temp" --exclude "node_modules"  . root@$1:$WORK_DIR

ssh root@$1 <<ENDSSH
cd $WORK_DIR
docker compose down
docker compose up -d --build --force-recreate --no-deps
exit
ENDSSH
echo "Update done."