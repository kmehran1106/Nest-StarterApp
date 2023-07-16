import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ResponseMessage,
  SigninDto,
  SignupDto,
  SignupResponseDto,
} from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() dto: SigninDto): ResponseMessage {
    return this.authService.signin(dto);
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<SignupResponseDto | undefined> {
    return await this.authService.signup(dto);
  }
}
