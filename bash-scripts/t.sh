#!/bin/bash

source "$(dirname "$0")"/helpers.sh

TYPE=""
ACTION=""

while getopts "t:a:" opt; do
  case $opt in
    t)
      case $OPTARG in
        unit) ;&
        validate-links) ;&
        visual-regression)
          TYPE=$OPTARG
          ;;
        *)
          cecho --mode=error "-t(ype) {unit,visual-regression,validate-links}"
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
          cecho --mode=error "-a(ction) {update,compare}"
          exit 1
          ;;
      esac
      ;;
    ?)
      cecho --mode=error "-t(ype) {unit,visual-regression,validate-links} -a(ction) {update,compare}"
      exit 1
      ;;
  esac
done

shift "$((OPTIND - 1))"

if [[ $TYPE == "" ]]; then
  cecho --mode=error 'the `t(ype)` flag is required'
  exit 1
fi

if [[ $TYPE == "unit" ]] && [[ $ACTION != "" ]]; then
  cecho --mode=error '`unit` cannot be combined with any other flags'
  exit 1
fi

if [[ $TYPE == "validate-links" ]] && [[ $ACTION != "" ]]; then
  cecho --mode=error '`validate-links` cannot be combined with any other flags'
  exit 1
fi

if [[ $TYPE == "visual-regression" ]] && [[ $ACTION == "" ]]; then
  cecho --mode=error 'the `t(ype)` flag must be combined with an `a(ction)` flag'
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

if [[ $TYPE == "unit" ]]; then
  PM2_NEXT_NAME="unit-test-suite"
  CMD="npm run unit $1"
  pm2 start "npm run dev" --name "$PM2_NEXT_NAME"
fi

if [[ $TYPE == "validate-links" ]]; then
  PM2_NEXT_NAME="validate-links-test-suite"
  CMD="npm run validate-links"
  pm2 start "npm run dev" --name "$PM2_NEXT_NAME"
fi

if [[ $TYPE == "visual-regression" ]]; then
  PM2_NEXT_NAME="visual-regression-test-suite"
  pm2 start "npm run dev:visual-regression" --name "$PM2_NEXT_NAME"

  if [[ $ACTION == "update" ]]; then
    CMD="npm run visual-regression:update-snapshots $1 $1"
  else
    CMD="npm run visual-regression $1"
  fi
fi

eval "$CMD"
pm2 delete "$PM2_NEXT_NAME"
pm2 delete "$PM2_PRISMA_NAME"
