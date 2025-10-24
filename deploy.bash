name_app="yobble-frontend"

docker build -t $name_app .
docker run --name $name_app -p 80:80 $name_app
