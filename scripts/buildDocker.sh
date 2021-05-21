#!/bin/bash
echo "$(tput setaf 2)----------------- Start Building Docker -----------------"
docker build . -t docker/frontend
echo "$(tput setaf 2)----------------- End Building Docker -------------------"