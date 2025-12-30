import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const authServiceMock = {
    login: jest.fn(),
    refreshTokens: jest.fn(),
  };

  beforeEach(async () => {
    controller = new AuthController(
      authServiceMock as Partial<AuthService> as AuthService,
    );
  });

  it('login - should be return a new accessToken and refreshToken', async () => {
    const argument = {
      email: '<EMAIL>',
      password: 'password',
    };
    const expectedResult = {
      accessToken: '<ACCESS_TOKEN>',
      refreshToken: '<REFRESH_TOKEN>',
    };

    authServiceMock.login.mockResolvedValue(expectedResult);

    const result = await controller.login(argument);
    expect(result).toEqual(expectedResult);
  });

  it('refreshTokens - should be return a new accessToken and refreshToken', async () => {
    const argument = {
      refreshToken: '<REFRESH_TOKEN>',
    };

    const expectedResult = {
      accessToken: '<ACCESS_TOKEN>',
      refreshToken: '<REFRESH_TOKEN>',
    };

    authServiceMock.refreshTokens.mockResolvedValue(expectedResult);

    const result = await controller.refreshTokens(argument);
    expect(result).toEqual(expectedResult);
  });
});
