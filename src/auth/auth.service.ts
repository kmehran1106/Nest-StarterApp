import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  SigninDto,
  SignupDto,
  SignupResponseDto,
  SigninResponseDto,
} from './dtos';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signin(dto: SigninDto): Promise<SigninResponseDto | undefined> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Email or password is wrong');

    const isVerified = await argon.verify(user.password, dto.password);
    if (!isVerified) throw new ForbiddenException('Email or password is wrong');

    const response: SigninResponseDto = { id: user.id, email: user.email };
    return response;
  }

  async signup(dto: SignupDto): Promise<SignupResponseDto | undefined> {
    const hash = await argon.hash(dto.password);
    try {
      const user: User = await this.prismaService.user.create({
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
