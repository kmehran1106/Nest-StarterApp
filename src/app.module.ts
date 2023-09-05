import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PingModule } from 'ping/ping.module';
import { AuthModule } from 'auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';

const ENV = process.env.NODE_ENV;
const envFilePath = !ENV ? '.env' : `.env.${ENV}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    PrismaModule,
    PingModule,
    AuthModule,
  ],
})
export class AppModule {}
