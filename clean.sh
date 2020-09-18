#!/bin/bash

function check_folders() {
  local dir="$1"

  echo "Checking $dir"

  if [ -d "$dir" ]; then
    echo rm -fvR "$dir/node_modules*"
    rm -fvR $dir/node_modules*
  else
    return
  fi

  for dir2 in `ls $dir`; do
    check_folders "$dir/$dir2"
  done
}

check_folders "."
