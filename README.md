## Commands

```bash
# run dev
$ docker compose up --build app -d

# see logs
$ docker compose logs -f app

# run tests
$ docker compose exec app npm run test
$ docker compose exec app npm run test:e2e

# prisma
$ docker compose exec app npx prisma init
$ docker compose exec app npx prisma migrate dev
$ docker compose exec app npx prisma migrate deploy
$ docker compose exec app npx prisma generate
$ docker compose exec app npx prisma studio

# others
$ npm run format
$ npm run lint

```

## License

Nest is [MIT licensed](LICENSE).
