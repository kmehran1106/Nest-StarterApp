import { Test, TestingModule } from '@nestjs/testing';

describe('PingModule', () => {
  let pingModule: TestingModule;

  beforeAll(async () => {
    pingModule = await Test.createTestingModule({}).compile();
  });

  afterAll(async () => {
    await pingModule.close();
  });

  it('should be defined', () => {
    expect(pingModule).toBeDefined();
  });
});
