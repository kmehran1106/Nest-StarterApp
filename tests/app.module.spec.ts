import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('PingModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await appModule.close();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
