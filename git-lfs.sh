#!/bin/bash
set -e
NAME='git-lfs'
OS='linux'
ARCH='amd64'
VERSION='1.2.0'

echo "Installing ${NAME}-${OS}-${ARCH}-${VERSION}..."

wget -O ${NAME}.tar.gz https://github.com/github/git-lfs/releases/download/v1.2.0/${NAME}-${OS}-${ARCH}-${VERSION}.tar.gz
tar xvfz ${NAME}.tar.gz
cd ${NAME}-${VERSION}

echo "Executing install.sh..."
PREFIX=$HOME ./install.sh

echo "Checking out files from LFS..."
git lfs checkout

echo "Done!"
