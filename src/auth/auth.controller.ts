import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SigninResponseDto, SignupDto, SignupResponseDto, ResponseMessageDto, RequestUserDto } from './dto';
import { GetUser } from './decorator';
import { JwtGuard } from './guard';

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

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signout(@GetUser() user: RequestUserDto): Promise<ResponseMessageDto | undefined> {
    return await this.authService.signout(user);
  }
}
