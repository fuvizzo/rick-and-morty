#!/bin/bash

buildDevCmd='run build:dev'
buildCmd='run build'
txt1='...remember to start the compiler in watch mode for hot reloading!!! (command "npm run build:dev-w")'

set -e
set -u
set -o pipefail

 
dev=0
 
 

while getopts 'd' OPTION; do
  case "$OPTION" in
    d) 
      dev=1
      echo "DEV mode"
      ;;   
    ?)
      echo "script usage: $(basename $0) [-d]" >&0
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"

echo
echo --> installing common dependencies...
npm i

echo
echo --> installing react-app dependencies...
npm --prefix ./react-app i
echo
echo --> installing auth-service dependencies (executing command: "npm i")...
npm --prefix ./auth-service i
echo
echo --> installing character-service dependencies...
npm --prefix ./charater-service i
echo 
if  [ $dev = 1 ]; then

  echo Initializing the project in DEV mode...
  echo
  echo --> building auth-service (executing command: "npm $buildDevCmd")...
  echo $txt1
  npm --prefix ./auth-service $buildDevCmd
  echo
 
  echo --> building charater-service (executing command: "npm  $buildDevCmd")...
  echo $txt1
  npm --prefix ./charater-service $buildDevCmd
  echo
  echo --> starting docker in development mode (executing command: COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.debug.yml up)...

else
  echo Initializing the project...
  echo
  echo --> building auth-service (executing command: "npm $buildCmd")...
  echo $txt1
  npm --prefix ./auth-service $buildCmd
  echo
 
  echo --> building charater-service (executing command: "npm  $buildCmd")...
  echo $txt1
  npm --prefix ./charater-service $buildCmd
  echo
  echo --> starting docker (executing command: COMPOSE_DOCKER_CLI_BUILD=1 docker-compose up)...
fi


