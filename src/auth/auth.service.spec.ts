import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {
  SigninDto,
  SigninResponseDto,
  SignupDto,
  SignupResponseDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, ConfigService, JwtService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    authService = module.get(AuthService);
    prismaService = module.get(PrismaService);
  });

  describe('signin', () => {
    it('should work correctly for valid email and password', async () => {
      // Given
      const dto = plainToInstance(SigninDto, {
        email: 'valid@email.com',
        password: 'validPassword',
      });
      const existingUser: User = {
        id: 1,
        email: dto.email,
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: '',
        lastName: '',
      };
      const returnedToken = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };
      jest.spyOn(authService, 'signToken').mockResolvedValue(returnedToken);
      const expectedResult: SigninResponseDto = returnedToken;
      jest.spyOn(argon, 'verify').mockResolvedValueOnce(true);
      prismaService.user.findUnique.mockResolvedValueOnce(existingUser);

      // When
      const result = await authService.signin(dto);

      // Then
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('signup', () => {
    it('should work correctly for valid email and password', async () => {
      // Given
      const dto = plainToInstance(SignupDto, {
        email: 'valid@email.com',
        password: 'validPassword',
      });
      const createdUser: User = {
        id: 1,
        email: dto.email,
        password: await argon.hash(dto.password),
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: '',
        lastName: '',
      };
      const expectedResult: SignupResponseDto = { id: 1, email: dto.email };
      prismaService.user.create.mockResolvedValueOnce(createdUser);

      // When
      const result = await authService.signup(dto);

      // Then
      expect(result).toMatchObject(expectedResult);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
