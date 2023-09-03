import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PingModule } from 'ping/ping.module';
import { AuthModule } from 'auth/auth.module';
import { BookmarksModule } from 'bookmarks/bookmarks.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from 'users/users.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    PrismaModule,
    PingModule,
    AuthModule,
    BookmarksModule,
    UsersModule,
  ],
})
export class AppModule {}
