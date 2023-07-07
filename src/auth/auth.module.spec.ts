import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  let authModule: TestingModule;

  beforeAll(async () => {
    authModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  afterAll(async () => {
    await authModule.close();
  });

  it('should be defined', () => {
    expect(authModule).toBeDefined();
  });
});
