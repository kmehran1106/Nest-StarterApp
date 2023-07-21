import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninDto, SigninResponseDto, SignupResponseDto } from './dtos';
import { PrismaModule } from '../prisma/prisma.module';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [PrismaModule],
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
        id: 1,
        email: dto.email,
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
});
