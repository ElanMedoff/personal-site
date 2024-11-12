#!/bin/bash

if [[ "$TERM_PROGRAM" == "tmux" ]]
then
  echo "only run ps.sh outside a tmux session!" 
  exit
fi

uuid=$(uuidgen)
uuid=${uuid:0:3}
tmux new-session -d -s "n-${uuid}"
window=0
tmux rename-window -t "n-${uuid}":0 "code"
tmux send-keys "nvim " "$1" C-m
tmux split-window -h
tmux send-keys "builtin cd $1 && clear" "C-m"
tmux select-pane -L
tmux resize-pane -Z
window=1
tmux new-window -t "n-${uuid}":1
tmux select-window -t "n-${uuid}":1
tmux rename-window -t "n-${uuid}":1 "server"
tmux send-keys "builtin cd $1 && clear" C-m
tmux send-keys "open http://localhost:3001 && npm run dev" C-m
tmux split-window -h
tmux send-keys "builtin cd $1 && clear" C-m
tmux send-keys "npx prisma studio" C-m
tmux select-window -t "n-${uuid}":0
tmux attach-session -t "n-${uuid}"
