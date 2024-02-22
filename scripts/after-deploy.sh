#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

pm2 start src/index.ts --name 'backendAPI' --interpreter ts-node