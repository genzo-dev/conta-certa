import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

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
      // TODO: colocar uma variável 'active' no banco para segurança do usuário e do sistema
    });

    if (user) {
      passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.passwordHash,
      );
    }

    if (!user || !passwordIsValid) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    return 'usuário logado';
  }

  // private async createTokens (user: User) {
  //   const accessTokenPromise = this.jwtService.signAsync<Partial<User>>(
  //     user.id,
  //     this.jwtConfiguration.jwtTtl,
  //     { email: user?.email },
  //   )
  // }
}
