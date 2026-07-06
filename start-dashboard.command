#!/bin/zsh
cd "$(dirname "$0")"
PORT=8787
OLD_PID=$(lsof -ti tcp:$PORT)
if [ -n "$OLD_PID" ]; then
  kill $OLD_PID 2>/dev/null
  sleep 1
fi
(sleep 1; open "http://127.0.0.1:$PORT/") &
node ./server.mjs
