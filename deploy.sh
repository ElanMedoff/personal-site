#!/bin/bash
npm run build
git add -A 
git commit -m "$1"
npm run push
npm run deploy