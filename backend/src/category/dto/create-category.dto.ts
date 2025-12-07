import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';

export class CreateCategoryDto {
  @ApiProperty({
    example: '🪙',
    description: 'Emoji que representa a categoria.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  icon: string;

  @ApiProperty({
    example: 'Alimentação',
    description: 'Nome da categoria que está sendo criada.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  categoryName: string;

  @ApiProperty({
    example: CategoryType.INCOME,
    description: 'Tipo da categoria: receita (income) ou despesa (expense).',
  })
  @IsEnum(CategoryType)
  @IsNotEmpty()
  type: CategoryType;
}
