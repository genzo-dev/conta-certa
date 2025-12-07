import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Gabriel Enzo',
    description: 'Usuário informa seu nome no momento da criação de sua conta.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  userName: string;

  @ApiProperty({
    example: 'email@email.com',
    description:
      'Usuário informa seu email no momento da criação de sua conta.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description:
      'Usuário informa a senha durante a criação da conta e ela é salva hasheada no banco.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
