import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos';

describe('CatsController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('signin when body has valid dto', () => {
    it('should complete signin correctly', async () => {
      // Given
      const dto = plainToInstance(SigninDto, {
        email: 'valid@email.com',
        password: 'validPassword',
      });
      const expectedResult = { message: 'Signin!' };
      jest.spyOn(authService, 'signin').mockReturnValue(expectedResult);

      // When
      const result = authController.signin(dto);

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
      const expectedResult = { message: 'Signup!' };
      jest.spyOn(authService, 'signup').mockReturnValue(expectedResult);

      // When
      const result = authController.signup(dto);

      // Then
      expect(result).toBe(expectedResult);
    });
  });
});
