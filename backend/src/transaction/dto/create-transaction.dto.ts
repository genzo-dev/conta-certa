import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Salário do mês | Gastos com alimentação',
    description: 'Inform um nome para a transação ocorrida.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  transactionName: string;

  @ApiProperty({
    example: '5000,00 | 5000,42 | 5000',
    description: 'Informe o valor da transação.',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: 'uuid-da-categoria',
    description: 'ID da categoria da transação.',
  })
  @IsNotEmpty()
  categoryId: string;
}
