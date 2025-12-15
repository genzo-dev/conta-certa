import { ApiProperty } from '@nestjs/swagger';

// TODO: ajustar DTO com swagger
export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;
}
