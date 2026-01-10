import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Usuário cria suas próprias categorias.' })
  @UseGuards(AuthTokenGuard)
  @Post()
  async create(
    @Body() dto: CreateCategoryDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const category = await this.categoryService.create(dto, req.user);
    return new ResponseCategoryDto(category);
  }

  @ApiOperation({
    summary:
      'Retorna todas as categorias do usuário, incluindo as padrões do sistema.',
  })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Retorna uma única categoria.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({
    summary:
      'Atualiza categorias do usuário. Categorias padrões não podem ser atualizadas.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Deleta uma categoria.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
