image="172.22.50.223/fabric/bc-console:dev-branch"
docker build -t $image .
docker push $image
