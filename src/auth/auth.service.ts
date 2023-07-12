import { Injectable } from '@nestjs/common';
import { ResponseMessage, SigninDto, SignupDto } from './dtos';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  signin(dto: SigninDto): ResponseMessage {
    console.log(dto);
    return { message: 'Signin!' };
  }

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prismaService.user.create({
      data: { email: dto.email, password: hash },
    });
  }
}
