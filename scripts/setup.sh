#!/bin/bash
WORK_DIR=/root/dorifto

rm -r ./temp/*
rm -r node_modules

scp -r . root@$1:$WORK_DIR

ssh root@$1 <<ENDSSH
set -x
sudo yum install -y git
sudo yum install -y yum-utils
sudo yum-config-manager -y --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl start docker
cd $WORK_DIR
mv $WORK_DIR/nginx/nginx.$1.conf $WORK_DIR/nginx.conf
chmod +x ./scripts/init-letsencrypt.sh
sudo ./scripts/init-letsencrypt.sh $1
docker compose up -d --force-recreate
exit
ENDSSH
echo "Setup done."