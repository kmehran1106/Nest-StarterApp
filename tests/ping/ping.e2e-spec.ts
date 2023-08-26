import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PingModule } from 'ping/ping.module';
import { PingService } from 'ping/ping.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  const pingService = {
    getPing: () => 'Pong!',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PingModule],
    })
      .overrideProvider(PingService)
      .useValue(pingService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET ping`, () => {
    return request(app.getHttpServer()).get('/ping').expect(200).expect(pingService.getPing());
  });

  afterAll(async () => {
    await app.close();
  });
});
