#!/bin/sh

if ! http-server -v foo &> /dev/null; then
    npm install -g http-server
fi

http-server