#!/bin/bash
set -e

# build base image
base_image="172.22.96.119/front-end/oidc-portal:base-5.6-bff"

docker build -t ${base_image} -f Dockerfile.base .
# push base image
docker push ${base_image}
