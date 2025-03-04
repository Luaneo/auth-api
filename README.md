# auth-api

## Running locally

Spin up a Postgres docker container

```
docker pull postgres
docker run --name <container-name> -e POSTGRES_PASSWORD=<db-password> -e POSTGRES_USER=<db-user> -e POSTGRES_DB=<db-name> -d -p 5432:5432 postgres
```

Run the server

```
cd auth-api
npm i
npm run build
npm run start
```
