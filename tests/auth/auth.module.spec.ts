import { Test, TestingModule } from '@nestjs/testing';

describe('AuthModule', () => {
  let authModule: TestingModule;

  beforeAll(async () => {
    authModule = await Test.createTestingModule({}).compile();
  });

  afterAll(async () => {
    await authModule.close();
  });

  it('should be defined', () => {
    expect(authModule).toBeDefined();
  });
});
