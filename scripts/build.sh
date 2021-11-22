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
rsync_options="-lmptgor"

if [[ $env == prod && -d dist ]]; then
	echo "> Cleaning the dist folder for a production build"
	rm -rf dist
fi

echo "> Creating an empty log file"
mkdir -p dist/{logs,public/{css,scripts}}
touch dist/logs/payrolladmin.log

echo "> Compiling scss files"
${bin}/sass							\
	src/public/scss/general.scss	\
	src/public/css/general.css

echo "> Syncing server-side files to the dist directory"
rsync ${rsync_options}													\
	src/{{config,data-access,logging,routes,views},app.js,index.js}		\
	dist/

echo "> Syncing the css folder to dist"
rsync ${rsync_options}		\
	src/public/css/			\
	dist/public/css/

echo "> Syncing config file"
rsync ${rsync_options}				\
	payrolladmin.${env}.conf		\
	dist/payrolladmin.conf

echo "> Running babel..."
NODE_ENV=dev ${bin}/babel									\
	src/													\
	--out-dir dist/											\
	--config-file $(realpath babel.server.config.js)		\
	--ignore "src/public","src/views"

echo "> Running webpack..."
if [[ $env == dev ]]; then
	${bin}/webpack --mode development
else
	${bin}/webpack --mode production
fi

echo "> Finished!!"
