import { Test, TestingModule } from '@nestjs/testing';

describe('BookmarksModule', () => {
  let bookmarksModule: TestingModule;

  beforeAll(async () => {
    bookmarksModule = await Test.createTestingModule({}).compile();
  });

  afterAll(async () => {
    await bookmarksModule.close();
  });

  it('should be defined', () => {
    expect(bookmarksModule).toBeDefined();
  });
});
