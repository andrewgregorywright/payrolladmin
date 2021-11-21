#!/bin/bash

set -e
set -o pipefail

usage () {
	cat <<-EOF
		USAGE:  scripts/build.sh:

		  build.sh [OPTIONS]

		  OPTIONS

		    -p                  Set the build environment to production.  Otherwise,
			                    everything will be built for development.

		    -h                  Help.
	EOF
}

env="dev"

while getopts ":ph" opt; do
	case "$opt" in
		p)
			env="prod"
			;;
		h)
			usage
			exit 0
			;;
		\?)
			echo "Invalid option $OPTARG." >&2
			exit 1
			;;
		*)
			echo "Invalid parameter $opt." >&2
			exit 1
			;;
	esac
done

OPTIND=1

bin=./node_modules/.bin

[[ $env == prod && -d dist ]] && rm -rf dist

mkdir -p dist/public/{css,scripts}

${bin}/sass							\
	src/public/scss/general.scss	\
	src/public/css/general.css

rsync -lmptgor																\
	src/{{config,data-access,logging,routes,views}/,app.js,index.js}		\
	dist/

rsync -lmptgor				\
	src/public/css/			\
	dist/public

echo "> Running babel..."
NODE_ENV=dev ${bin}/babel									\
	--presets @babel/preset-react							\
	src/public/scripts										\
	--out-dir dist/public/scripts

echo "> Finished!!"
