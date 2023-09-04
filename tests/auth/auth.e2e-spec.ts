import * as pactum from 'pactum';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from 'src/auth/dto';

let app: INestApplication;
let prisma: PrismaService;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.init();
  await app.listen(3333);

  prisma = app.get(PrismaService);
  prisma.cleanDb();

  pactum.request.setBaseUrl('http://localhost:3333');
});

afterAll(() => {
  app.close();
});

describe('App End to End', () => {
  describe('Auth', () => {
    const dto: SignupDto = { email: 'valid@email.com', password: 'validPassword' };

    describe('POST /auth/signup', () => {
      it('should return 201 for valid dto', async () => {
        await pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });
      it('should throw forbidden error and return 403 for existing user', async () => {
        await pactum.spec().post('/auth/signup').withBody(dto).expectStatus(403);
      });
      it('should throw bad request and return 400 for invalid data', async () => {
        await pactum.spec().post('/auth/signup').withBody({ password: dto.password }).expectStatus(400);
      });
    });

    describe('POST /auth/signin', () => {
      it('should return 200 for existing user', async () => {
        await pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token');
      });
      it('should throw forbidden error and return 403 for non existing user', async () => {
        await pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email, password: 'invalidPassword' })
          .expectStatus(403);
      });
      it('should throw bad request and return 400 for invalid data', async () => {
        await pactum.spec().post('/auth/signin').withBody({ password: dto.password }).expectStatus(400);
      });
    });

    describe('POST /auth/signout', () => {
      it('should return 200 for valid access token', async () => {
        await pactum
          .spec()
          .post('/auth/signout')
          .withHeaders({ Authorization: `Bearer $S{userAccessToken}` })
          .expectStatus(200);
      });
      it('should raise 401 for absent access token', async () => {
        await pactum.spec().post('/auth/signout').expectStatus(401);
      });
      it('should raise 401 for invalid access token', async () => {
        await pactum
          .spec()
          .post('/auth/signout')
          .withHeaders({ Authorization: 'Bearer InvalidAccessToken' })
          .expectStatus(401);
      });
    });
  });
});
