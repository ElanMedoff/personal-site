#!/bin/bash

source "$(dirname "$0")"/helpers.sh

if [[ "$TERM_PROGRAM" == "tmux" ]]
then
  cecho --mode=error "only run ps.sh outside a tmux session!" 
  exit 1
fi

current_dir=$(pwd)

uuid=$(uuidgen)
uuid=${uuid:0:3}
tmux new-session -d -s "n-${uuid}"
window=0
tmux rename-window -t "n-${uuid}":0 "code"
tmux send-keys "nvim " "$current_dir" C-m
tmux split-window -h
tmux send-keys "builtin cd $current_dir && clear" "C-m"
tmux select-pane -L
tmux resize-pane -Z
window=1
tmux new-window -t "n-${uuid}":1
tmux select-window -t "n-${uuid}":1
tmux rename-window -t "n-${uuid}":1 "server"
tmux send-keys "builtin cd $current_dir && clear" C-m
tmux send-keys "open http://localhost:3001 && npm run dev" C-m
tmux split-window -h
tmux send-keys "builtin cd $current_dir && clear" C-m
tmux send-keys "npx prisma studio" C-m
tmux select-window -t "n-${uuid}":0
tmux attach-session -t "n-${uuid}"
