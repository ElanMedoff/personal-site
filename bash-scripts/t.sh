#!/bin/bash

source "$(dirname "$0")"/helpers.sh

TYPE=""
ACTION=""

while getopts "t:a:" opt; do
  case $opt in
    t)
      case $OPTARG in
        u) ;&
        vl) ;&
        vr)
          TYPE=$OPTARG
          ;;
        *)
          cecho --mode=error "-t {u,vr,vl}"
          exit 1
          ;;
      esac
      ;;
    a)
      case $OPTARG in
        update) ;&
        compare)
          ACTION=$OPTARG
          ;;
        *)
          cecho --mode=error "-a {update,compare}"
          exit 1
          ;;
      esac
      ;;
    ?)
      cecho --mode=error "-t {u,vr} -a {update,compare}"
      exit 1
      ;;
  esac
done

shift "$((OPTIND - 1))"

if [[ $TYPE == "" ]]; then
  cecho --mode=error 'the `t` flag is required'
  exit 1
fi

if [[ $TYPE == "u" ]] && [[ $ACTION != "" ]]; then
  cecho --mode=error '`u` cannot be combined with any other flags'
  exit 1
fi

if [[ $TYPE == "vl" ]] && [[ $ACTION != "" ]]; then
  cecho --mode=error '`vl` cannot be combined with any other flags'
  exit 1
fi

if [[ $TYPE == "vr" ]] && [[ $ACTION == "" ]]; then
  cecho --mode=error 'the `t` flag must be combined with an `a` flag'
  exit 1
fi

if nc -z localhost 3001 >/dev/null 2>&1; then
  cecho --mode=error "Port 3001 already in use"
  exit 1
fi

npx prisma migrate reset --force
PM2_PRISMA_NAME="prisma-studio"
pm2 start "npx prisma studio --browser none" --name "$PM2_PRISMA_NAME"

PM2_NEXT_NAME=""
CMD=""

if [[ $TYPE == "u" ]]; then
  PM2_NEXT_NAME="unit-test-suite"
  CMD="npm run unit $1"
  pm2 start "npm run dev" --name "$PM2_NEXT_NAME"
fi

if [[ $TYPE == "vl" ]]; then
  PM2_NEXT_NAME="validate-links-test-suite"
  CMD="npm run validate-links"
  pm2 start "npm run dev" --name "$PM2_NEXT_NAME"
fi

if [[ $TYPE == "vr" ]]; then
  PM2_NEXT_NAME="visual-regression-test-suite"
  pm2 start "npm run dev:visual-regression" --name "$PM2_NEXT_NAME"

  if [[ $ACTION == "update" ]]; then
    CMD="npm run vr:update-snapshots $1 $1"
  else
    CMD="npm run vr $1"
  fi
fi

eval "$CMD"
pm2 delete "$PM2_NEXT_NAME"
pm2 delete "$PM2_PRISMA_NAME"
