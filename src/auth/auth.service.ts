import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  ResponseMessage,
  SigninDto,
  SignupDto,
  SignupResponseDto,
} from './dtos';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  signin(dto: SigninDto): ResponseMessage {
    console.log(dto);
    return { message: 'Signin!' };
  }

  async signup(dto: SignupDto): Promise<SignupResponseDto | undefined> {
    console.log(dto);
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prismaService.user.create({
        data: { email: dto.email, password: hash },
      });
      const response: SignupResponseDto = { id: user.id, email: user.email };
      return response;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }
}
