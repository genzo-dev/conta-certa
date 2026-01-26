import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryType } from './enums/category-type.enum';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findDefaultByName(name) {
    return this.categoriesRepository.findOne({
      where: {
        categoryName: name,
        isDefault: true,
      },
    });
  }

  async create(dto: CreateCategoryDto, user: User) {
    const exists = await this.categoriesRepository.findOne({
      where: [
        {
          categoryName: dto.categoryName,
          type: dto.type,
          user: { id: user.id },
          isDefault: false,
        },
        {
          categoryName: dto.categoryName,
          type: dto.type,
          isDefault: true,
        },
      ],
    });

    if (exists) {
      throw new BadRequestException('Categoria já existe');
    }

    const category = this.categoriesRepository.create({
      icon: dto.icon,
      categoryName: dto.categoryName,
      type: dto.type,
      isDefault: false,
      user: user,
    });

    const categoryCreated = await this.categoriesRepository
      .save(category)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          this.logger.error('Erro ao criar categoria', err.stack);
        }

        throw new BadRequestException('Erro ao criar categoria');
      });

    return categoryCreated;
  }

  async createInternal(data: {
    icon: string;
    categoryName: string;
    type: CategoryType;
    isDefault: boolean;
    user?: User | null;
  }) {
    return this.categoriesRepository.save(
      this.categoriesRepository.create(data),
    );
  }

  findAll() {
    const categoryAll = this.categoriesRepository.find({
      order: { createdAt: 'DESC' },
    });
    return categoryAll;

    // return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
