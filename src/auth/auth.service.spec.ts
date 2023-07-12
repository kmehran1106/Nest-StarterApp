import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos';
import { plainToInstance } from 'class-transformer';

describe('PingService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('signin', () => {
    it('should work correctly for valid email and password', async () => {
      // Given
      const dto = plainToInstance(SigninDto, {
        email: 'valid@email.com',
        password: 'validPassword',
      });
      const expectedResult = { message: 'Signin!' };

      // When
      const result = authService.signin(dto);

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
      const expectedResult = { message: 'Signup!' };

      // When
      const result = authService.signup(dto);

      // Then
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
