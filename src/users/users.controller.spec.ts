import { Test, TestingModule } from '@nestjs/testing';
import { JwtGuard } from 'auth/guard';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  describe('method getMe returns correct user data', () => {
    it('should return user', () => {
      const user = { id: 1, email: 'valid@user.com' };
      expect(userController.getMe(user)).toBe(user);
    });
  });

  describe('jwt guard is applied on whole controller', () => {
    it('should ensure the JwtAuthGuard is applied to the controller', async () => {
      const guards = Reflect.getMetadata('__guards__', UsersController);
      const guard = new guards[0]();

      expect(guard).toBeInstanceOf(JwtGuard);
    });
  });
});
