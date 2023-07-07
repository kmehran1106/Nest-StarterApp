import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarksService {
  detail(): string {
    return 'Detail';
  }

  list(): string {
    return 'List';
  }

  create(): string {
    return 'Create';
  }
}
