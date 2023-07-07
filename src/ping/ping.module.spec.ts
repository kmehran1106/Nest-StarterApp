import { Test, TestingModule } from '@nestjs/testing';
import { PingModule } from './ping.module';

describe('PingModule', () => {
  let pingModule: TestingModule;

  beforeAll(async () => {
    pingModule = await Test.createTestingModule({
      imports: [PingModule],
    }).compile();
  });

  afterAll(async () => {
    await pingModule.close();
  });

  it('should be defined', () => {
    expect(pingModule).toBeDefined();
  });
});
