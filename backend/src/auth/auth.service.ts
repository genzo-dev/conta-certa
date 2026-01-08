import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    let passwordIsValid = false;

    const user = await this.userRepository.findOneBy({
      email: loginDto.email,
      isActive: true,
    });

    if (user) {
      passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.passwordHash,
      );
    }

    if (!user || !passwordIsValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return this.createTokens(user);
  }

  private async createTokens(user: User) {
    const accessTokenPromise = this.signJwtAsync<Partial<User>>(
      user.id,
      this.jwtConfiguration.jwtTtl,
      { email: user?.email },
    );

    const refreshTokenPromise = this.signJwtAsync(
      user.id,
      this.jwtConfiguration.jwtRefreshTtl,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signJwtAsync<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const user = await this.userRepository.findOneBy({
        id: sub,
        isActive: true,
      });

      if (!user) {
        throw new Error('Usuário não autorizado!');
      }

      return this.createTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
