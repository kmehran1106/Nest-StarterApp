import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';

import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [PingModule, AuthModule, BookmarksModule],
})
export class AppModule {}
