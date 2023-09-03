import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksService } from 'bookmarks/bookmarks.service';

describe('BookmarksService', () => {
  let service: BookmarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarksService],
    }).compile();

    service = module.get<BookmarksService>(BookmarksService);
  });

  describe('detail', () => {
    it('should return detail', async () => {
      // Given
      const expectedResult = 'Detail';

      // When
      const result = service.detail();

      // Then
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('list', () => {
    it('should return list', async () => {
      // Given
      const expectedResult = 'List';

      // When
      const result = service.list();

      // Then
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should return create', async () => {
      // Given
      const expectedResult = 'Create';

      // When
      const result = service.create();

      // Then
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
