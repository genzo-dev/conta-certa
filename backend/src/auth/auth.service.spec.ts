import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import jwtConfig from './config/jwt.config';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOneBy: jest.fn() },
        },
        {
          provide: HashingService,
          useValue: { hash: jest.fn(), compare: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn(), verifyAsync: jest.fn() },
        },
        {
          provide: jwtConfig.KEY,
          useValue: {
            secret: 'test-secret',
            issuer: 'test-issuer',
            audience: 'test-audience',
            jwtTtl: 900,
            jwtRefreshTtl: 604800,
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    hashingService = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('login - should throw UnauthorizedException for invalid credentials', async () => {
    const loginDto = {
      email: '<EMAIL>',
      password: 'wrongpassword',
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
    jest.spyOn(hashingService, 'compare').mockResolvedValue(false);

    await expect(authService.login(loginDto)).rejects.toThrow(
      'E-mail ou senha inválidos.',
    );
  });

  it('login - should return accessToken and refreshToken for valid credentials', async () => {
    const loginDto = {
      email: '<EMAIL>',
      password: 'correctpassword',
    };

    const mockUser: Partial<User> = {
      id: 'user-id',
      email: '<EMAIL>',
      passwordHash: 'hashedpassword',
      isActive: true,
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as User);
    jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
    jest
      .spyOn(authService as any, 'signJwtAsync')
      .mockImplementation((sub, expiresIn) => {
        return Promise.resolve(
          expiresIn === 900 ? '<ACCESS_TOKEN>' : '<REFRESH_TOKEN>',
        );
      });

    const result = await authService.login(loginDto);

    expect(result).toEqual({
      accessToken: '<ACCESS_TOKEN>',
      refreshToken: '<REFRESH_TOKEN>',
    });
  });

  it('createTokens - should create accessToken and refreshToken', async () => {
    const mockUser: Partial<User> = {
      id: 'user-id',
      email: '<EMAIL>',
    };

    const signSpy = jest
      .spyOn(authService as any, 'signJwtAsync')
      .mockResolvedValueOnce('<ACCESS_TOKEN>')
      .mockResolvedValueOnce('<REFRESH_TOKEN>');

    const result = await (authService as any).createTokens(mockUser as User);

    expect(signSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      accessToken: '<ACCESS_TOKEN>',
      refreshToken: '<REFRESH_TOKEN>',
    });
  });

  it('signJwtAsync - should sign JWT with correct parameters', async () => {
    const jwtMock = {
      sub: 'user-id',
      expiresIn: 900,
      payload: { email: '<EMAIL>' },
    };

    const signAsyncSpy = jest
      .spyOn((authService as any).jwtService, 'signAsync')
      .mockResolvedValue('<SIGNED_JWT>');

    const result = await (authService as any).signJwtAsync(
      jwtMock.sub,
      jwtMock.expiresIn,
      jwtMock.payload,
    );

    expect(signAsyncSpy).toHaveBeenCalledWith(
      {
        sub: 'user-id',
        email: '<EMAIL>',
      },
      {
        audience: 'test-audience',
        issuer: 'test-issuer',
        secret: 'test-secret',
        expiresIn: 900,
      },
    );

    expect(result).toBe('<SIGNED_JWT>');
  });
  it('refreshTokens - should throw error for invalid refresh token', async () => {
    const refreshTokenMock = {
      refreshToken: '<INVALID_REFRESH_TOKEN>',
    };

    jest
      .spyOn((authService as any).jwtService, 'verifyAsync')
      .mockRejectedValue(new Error('Invalid token'));

    await expect(authService.refreshTokens(refreshTokenMock)).rejects.toThrow(
      'Invalid token',
    );
  });

  it('refreshTokens - should throw error if user not found', async () => {
    const refreshTokenMock = {
      refreshToken: '<VALID_REFRESH_TOKEN>',
    };

    jest
      .spyOn((authService as any).jwtService, 'verifyAsync')
      .mockResolvedValue({ sub: 'user-id' });
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(authService.refreshTokens(refreshTokenMock)).rejects.toThrow(
      'Usuário não autorizado!',
    );
  });

  it('refreshTokens - should return new tokens for valid refresh token', async () => {
    const refreshTokenMock = {
      refreshToken: '<VALID_REFRESH_TOKEN>',
    };

    const mockUser: Partial<User> = {
      id: 'user-id',
      email: '<EMAIL>',
    };

    jest
      .spyOn((authService as any).jwtService, 'verifyAsync')
      .mockResolvedValue({ sub: 'user-id' });
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser as User);
    jest.spyOn(authService as any, 'createTokens').mockResolvedValue({
      accessToken: '<NEW_ACCESS_TOKEN>',
      refreshToken: '<NEW_REFRESH_TOKEN>',
    });

    const result = await authService.refreshTokens(refreshTokenMock);

    expect(result).toEqual({
      accessToken: '<NEW_ACCESS_TOKEN>',
      refreshToken: '<NEW_REFRESH_TOKEN>',
    });
  });
});
