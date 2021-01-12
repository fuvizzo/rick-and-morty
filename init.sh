#!/bin/bash

buildDevCmd='run build:dev'
buildCmd='run build'
txt1='...remember to start the compiler in watch mode for hot reloading!!! (command "npm run build:dev-w")'

set -e
set -u
set -o pipefail
 
dev=0
cleanFirst=0
startOnly=0
serviceList=""

function initWrapper {
    echo "--> installing common dev dependencies..."
    npm i

    echo
    echo "--> installing react-app dependencies..."
    npm --prefix ./react-app i
    echo
    echo "--> installing auth-service dependencies..."
    npm --prefix ./auth-service i
    echo
    echo "--> installing character-service dependencies..."
    npm --prefix ./character-service i
    echo 
} 

function cleanUpFirst {
    echo "cleaning up first..."
     find . -type d -name ".docker" -prune \
    -o -type d \( -name "node_modules" -o -name "build" \) -prune -exec rm -rf '{}' + \
    -o -type f -name "package-lock.json" -exec rm -f {} \;
}

function buildBackEndDev {
    echo "--> building auth-service (executing command: 'npm $buildDevCmd')..."
    echo $txt1
    npm --prefix ./auth-service $buildDevCmd
    echo  
    echo "--> building character-service (executing command: 'npm $buildDevCmd')..."
    echo $txt1
    npm --prefix ./character-service $buildDevCmd
    echo
}

function buildBackEnd {
    echo "--> building auth-service (executing command: 'npm $buildCmd')..." 
    npm --prefix ./auth-service $buildCmd
    echo  
    echo "--> building character-service (executing command: 'npm $buildCmd')..."
    npm --prefix ./character-service $buildCmd
    echo
}

while getopts 'dcsl:' OPTION; do
  case "$OPTION" in
    d) 
      dev=1     
      ;; 
   
    s) 
      startOnly=1        
      ;; 
    l)      
      serviceList=$OPTARG     
      ;; 
    c) 
      cleanFirst=1      
      ;;   
    ?)
      echo "script usage: $(basename $0)" 
      echo "-d) development mode" 
      echo "-c) clean up all the node_modules and build folders and package-lock.json files" 
      echo "-s) execute only docker-compose command"
      echo "-l) specify the list of service to run in docker compose (ex: auth-service react-app)" 
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"

if  [ $cleanFirst = 1 ]; then
cleanUpFirst
fi

if  [ $dev = 1 ]; then  
  if  [ $startOnly = 0 ]; then
    echo "Initializing the project in DEV mode..."
    initWrapper
    buildBackEndDev
  fi 

  echo "--> starting docker in development mode (executing command: COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.debug.yml up)..."
  COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.debug.yml up $serviceList
  
else
  if  [ $startOnly = 0 ]; then
    echo "Initializing the project..."
    initWrapper
    buildBackEnd
  fi   

  echo "--> starting docker (executing command: COMPOSE_DOCKER_CLI_BUILD=1 docker-compose up)..."
  COMPOSE_DOCKER_CLI_BUILD=1 docker-compose up $serviceList
fi 
 

