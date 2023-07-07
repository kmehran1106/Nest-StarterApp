import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksModule } from './bookmarks.module';

describe('BookmarksModule', () => {
  let bookmarksModule: TestingModule;

  beforeAll(async () => {
    bookmarksModule = await Test.createTestingModule({
      imports: [BookmarksModule],
    }).compile();
  });

  afterAll(async () => {
    await bookmarksModule.close();
  });

  it('should be defined', () => {
    expect(bookmarksModule).toBeDefined();
  });
});
