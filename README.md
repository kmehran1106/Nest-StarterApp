## Tests
```bash
# run tests - type 1
$ docker compose up --build testenv -d
$ docker compose exec testenv npm run test:unit
$ docker compose exec testenv npm run test:e2e

# run tests - type 2
$ docker compose up --build testenv -d
$ docker compose exec testenv /bin/sh                 # this will hook you inside the container
$ npm run test:unit                                   # from inside container
$ npm run test:e2e                                    # from inside container
```
Type 1 is good to run tests just once. But this will be slow if you plan on running tests multiple times during development.

Type 2 will hook you inside the shell of the docker container and running the tests from here will be faster.

## Commands

```bash
# run dev
$ docker compose up --build app -d                    # this will run the dev process

# see logs
$ docker compose logs -f app                          # this will show the logs of the dev process

# prisma
$ docker compose exec app npx prisma init             # only needs to be done once
$ docker compose exec app npx prisma migrate dev      # resets db and migrates everything
$ docker compose exec app npx prisma migrate deploy   # migrates changes to schema to db
$ docker compose exec app npx prisma generate         # run after modifying schema and migrating
$ docker compose exec app npx prisma studio           # database visualizer (not needed)

# others
$ npm run format
$ npm run lint

```
