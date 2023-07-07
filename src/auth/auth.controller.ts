import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseMessage, SigninDto, SignupDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signin(@Body() dto: SigninDto): ResponseMessage {
    return this.authService.signin(dto);
  }

  @Post('signup')
  signup(@Body() dto: SignupDto): ResponseMessage {
    return this.authService.signup(dto);
  }
}
