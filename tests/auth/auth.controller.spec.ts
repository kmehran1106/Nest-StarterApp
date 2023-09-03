import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { JwtGuard } from 'auth/guard';
import { SigninDto, SigninResponseDto, SignupResponseDto } from 'auth/dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [PrismaService, AuthService, ConfigService, JwtService],
    }).compile();
    authController = moduleRef.get(AuthController);
    authService = moduleRef.get(AuthService);
  });

  describe('signin when body has valid dto', () => {
    it('should complete signin correctly', async () => {
      // Given
      const dto = plainToInstance(SigninDto, {
        email: 'valid@email.com',
        password: 'validPassword',
      });
      const expectedResult: SigninResponseDto = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };
      jest.spyOn(authService, 'signin').mockResolvedValue(expectedResult);

      // When
      const result = await authController.signin(dto);

      // Then
      expect(result).toBe(expectedResult);
    });
  });

  describe('signup when body has valid dto', () => {
    it('should complete signup correctly', async () => {
      // Given
      const dto = plainToInstance(SigninDto, {
        email: 'valid@email.com',
        password: 'validPassword',
      });
      const expectedResult: SignupResponseDto = {
        id: 1,
        email: dto.email,
      };
      jest.spyOn(authService, 'signup').mockResolvedValue(expectedResult);

      // When
      const result = await authController.signup(dto);

      // Then
      expect(result).toBe(expectedResult);
    });
  });

  describe('signout when user is authenticated', () => {
    it('should complete signout correctly', async () => {
      // Given
      const user = { id: 1, email: 'valid@user.com' };
      const expectedResult = { message: `Successfully signed out for ${user.email}.` };
      jest.spyOn(authService, 'signout').mockResolvedValue(expectedResult);

      // When
      const result = await authController.signout(user);

      // Then
      expect(result).toBe(expectedResult);
    });
  });

  describe('jwt guard is applied on correct methods', () => {
    it('should ensure the JwtAuthGuard is applied to the signout method', async () => {
      const guards = Reflect.getMetadata('__guards__', AuthController.prototype.signout);
      const guard = new guards[0]();

      expect(guard).toBeInstanceOf(JwtGuard);
    });
  });
});
