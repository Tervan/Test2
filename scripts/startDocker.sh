#!/bin/bash
echo "$(tput setaf 2)----------------- Start Docker -----------------"
echo $"\t port: $1"
echo $"\t image: docker/frontend"
echo $"\t id: $(docker run -d -p $1:80 docker/frontend)"
echo "$(tput setaf 2)----------------- End Docker -------------------"