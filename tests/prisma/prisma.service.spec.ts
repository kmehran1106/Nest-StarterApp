import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ConfigService],
    }).compile();

    service = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
