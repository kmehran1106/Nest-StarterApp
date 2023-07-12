import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';

import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PingModule, AuthModule, BookmarksModule, PrismaModule],
})
export class AppModule {}
