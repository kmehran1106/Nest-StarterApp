import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SigninDto,
  SigninResponseDto,
  SignupDto,
  SignupResponseDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: SigninDto): Promise<SigninResponseDto | undefined> {
    return await this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: SignupDto): Promise<SignupResponseDto | undefined> {
    return await this.authService.signup(dto);
  }
}
