#!/bin/sh

# Configura as informações locais da página
export API_HOST=127.0.0.1:3000 && echo "API_HOST='${API_HOST}'" > config.js

# Executa o Servidor
if ! http-server -v foo &> /dev/null; then
    npm install -g http-server
fi

http-server