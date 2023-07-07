import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
  async getPing(): Promise<string> {
    return 'Pong!';
  }
}
