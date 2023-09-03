import { Test, TestingModule } from '@nestjs/testing';
import { PingService } from 'ping/ping.service';

describe('PingService', () => {
  let pingService: PingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingService],
    }).compile();

    pingService = module.get(PingService);
  });

  describe('getPing', () => {
    it('should return "Pong!"', async () => {
      // Given

      // When
      const result = await pingService.getPing();

      // Then
      expect(result).toBe('Pong!');
    });
  });
});
