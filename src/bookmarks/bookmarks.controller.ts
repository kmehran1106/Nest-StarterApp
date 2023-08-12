import { Controller, Get, Post } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get('detail')
  detail(): string {
    return this.bookmarksService.detail();
  }

  @Get('list')
  list(): string {
    return this.bookmarksService.list();
  }

  @Post('create')
  create(): string {
    return this.bookmarksService.create();
  }
}
