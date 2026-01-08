import { ApiProperty } from '@nestjs/swagger';

// TODO: ajustar DTO com swagger
export class UserResponseDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Identificador único do usuário (UUID).',
  })
  id: string;

  @ApiProperty({ example: 'Gabriel Enzo', description: 'Nome do usuário.' })
  userName: string;

  @ApiProperty({
    example: 'exemplo_de@email.com',
    description: 'Email do usuário.',
  })
  email: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Data de criação do usuário.',
  })
  createdAt: Date;
}
