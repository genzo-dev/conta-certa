import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'Informe o email para login.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Informe a senha para login.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
