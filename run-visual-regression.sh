#!/bin/bash

if [[ $# -eq 0 ]]; then
  echo "./run.sh --{dev,prod}"
  exit 1
fi

dev_flag=0
prod_flag=0
for arg in "$@"; do
  case "$arg" in
    --dev)
      dev_flag=1
      shift
      ;;
    --prod)
      dev_flag=1
      shift
      ;;
    *)
      err "Unknown option: $arg"
      return 1
      ;;
  esac
done

if [[ $dev_flag == 1 ]] && [[ $prod_flag == 1 ]]; then
  echo "--prod and --dev cannot both be passed!"
  exit 1
fi

port=""
if [[ $dev_flag == 1 ]]; then
  port=3001
else
  port=3000
fi

if lsof -ti:"$port" >/dev/null 2>&1; then
  echo "Port $port already in use. Okay to kill it? y/*"
  read -r ANSWER
  if [[ $ANSWER != "y" ]]; then
    echo "exiting"
    exit 1
  fi

  echo "killing port $port"
  kill -9 "$(lsof -ti:"$port")"
fi

pm2_name="visual-regression-test-suite"

if [[ $dev_flag == 1 ]]; then
  echo "starting dev:visual-regression ..."
  pm2 start "npm run dev:visual-regression" --name "$pm2_name"
else
  echo "starting prod:visual-regression ..."
  pm2 start "npm run prod:visual-regression" --name "$pm2_name"
fi

# pm2 delete "$pm2_name"
