#!/bin/sh
#
# File: scripts/start_dev.sh
# 2022-09-10 | CR
#
if [ -f ".env.local" ]; then
    set -o allexport; . ".env.local" ; set +o allexport ;
fi
export REACT_APP_SC_PROPOSAL_GOERLI=${SC_PROPOSAL_GOERLI}
npm run build
npm start
