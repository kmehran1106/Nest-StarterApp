import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksController } from 'bookmarks/bookmarks.controller';
import { BookmarksService } from 'bookmarks/bookmarks.service';

describe('BookmarksController', () => {
  let controller: BookmarksController;
  let service: BookmarksService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BookmarksController],
      providers: [BookmarksService],
    }).compile();

    controller = moduleRef.get<BookmarksController>(BookmarksController);
    service = moduleRef.get<BookmarksService>(BookmarksService);
  });

  describe('detail', () => {
    it('should return detail', async () => {
      // Given
      const expectedResult = 'Detail';
      jest.spyOn(service, 'detail').mockReturnValue(expectedResult);

      // When
      const result = controller.detail();

      // Then
      expect(result).toBe(expectedResult);
    });
  });

  describe('list', () => {
    it('should return list', async () => {
      // Given
      const expectedResult = 'List';
      jest.spyOn(service, 'list').mockReturnValue(expectedResult);

      // When
      const result = controller.list();

      // Then
      expect(result).toBe(expectedResult);
    });
  });

  describe('create', () => {
    it('should return create', async () => {
      // Given
      const expectedResult = 'Create';
      jest.spyOn(service, 'create').mockReturnValue(expectedResult);

      // When
      const result = controller.create();

      // Then
      expect(result).toBe(expectedResult);
    });
  });
});
