import { Controller, Get, UseGuards } from '@nestjs/common';
import { RequestUserDto } from 'auth/dto';
import { GetUser } from 'auth/decorator';
import { JwtGuard } from 'auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  getMe(@GetUser() user: RequestUserDto) {
    return user;
  }
}
