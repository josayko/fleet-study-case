# Fleet - Study Case

This is an example monorepo with a simple Express backend and React frontend.
To keep things simple the monorepo is handle with npm workspaces.

## React App

### Get Started

- This project has been developed and tested with `node 22.9.0`
- You need an API key from https://developer.themoviedb.org and set `API_READ_ACCESS_TOKEN` environment variable on your host

1. Install dependencies

```
npm install
```

2. You can create a `.env` file at the root of the repository to set `NODE_ENV` and
   `API_READ_ACCESS_TOKEN` environment variables

```bash
NODE_ENV=production // will run the app in development mode if not set to "production"
API_READ_ACCESS_TOKEN=put_your_api_read_access_token_here // https://developer.themoviedb.org/docs/getting-started
```

3. Local dev mode with hot-reloading

```
npm run dev
```

4. (For production only) Build and start for deployment

```
$ npm run build
$ npm run start
```

## SQL Database

### Get started

- There is a Docker compose file to launch PostgreSQL database container for testing

1. Launch PostgreSQL container

```shell
$ cd sql
$ docker compose up -d
```

2. Connect to dev-postgres container and create database

```shell
$ docker exec -it dev-postgres psql -U postgres

postgres=# CREATE DATABASE test;

```

3. Copy `structure.sql` and `query.sql` files in dev-postgres container

```
$ docker cp structure.sql dev-postgres:.
$ docker cp query.sql dev-postgres:.
```

4. Connect to dev-postgres and execute scripts

```
$ docker exec -it dev-postgres bash

# psql -U postgres -d test -f structure.sql
# psql -U postgres -d test -f query.sql

```

## Sales Prediction

### Get started

- The sales prediction use a simple linear progression model from the scikit-learn library written in Python
- The script has been developed and tested with `python 3.12.4`

1. Create a virtual python environment with `venv`

- Install `venv` with pip if necessary

```shell
pip install virtualenv

```

- Create environment and activate it

```shell
$ python -m venv .env

$ source .env/bin/activate

```

2. Install dependencies

```shell
pip install -r requirements.txt

```

3. Ensure `DATABASE_URL` in `sales_prediction.py` script is correct and run the script

- Depending on your data, it may take some time to get the results the first time the script is launched

```shell
python sales_prediction.py

```
