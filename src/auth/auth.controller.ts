import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SigninDto,
  SigninResponseDto,
  SignupDto,
  SignupResponseDto,
} from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: SigninDto): Promise<SigninResponseDto | undefined> {
    return await this.authService.signin(dto);
  }

  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<SignupResponseDto | undefined> {
    return await this.authService.signup(dto);
  }
}
