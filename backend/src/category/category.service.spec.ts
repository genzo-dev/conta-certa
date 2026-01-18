import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryType } from './enums/category-type.enum';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CategoryService - Create Method', () => {
    it('should throw error if category exists', async () => {
      const categoryDto = {
        icon: '🪙',
        categoryName: 'Alimentação',
        type: CategoryType.EXPENSE,
      };

      const user = { id: '1' } as Partial<User> as User;

      jest
        .spyOn(categoryRepository, 'findOne')
        .mockResolvedValue({ id: '1' } as any);

      await expect(service.create(categoryDto, user)).rejects.toThrow(
        new BadRequestException('Categoria já existe'),
      );
    });
    it('should create a new category', async () => {
      const categoryDto = {
        icon: '🪙',
        categoryName: 'Alimentação',
        type: CategoryType.EXPENSE,
      };

      const user = { id: '1' } as User;

      const createdCategory = {
        id: '1',
        ...categoryDto,
        isDefault: false,
        user,
      } as Category;

      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(categoryRepository, 'create').mockReturnValue(createdCategory);
      jest.spyOn(categoryRepository, 'save').mockResolvedValue(createdCategory);

      const result = await service.create(categoryDto, user);

      expect(categoryRepository.create).toHaveBeenCalledWith({
        ...categoryDto,
        isDefault: false,
        user,
      });

      expect(categoryRepository.save).toHaveBeenCalledWith(createdCategory);
      expect(result).toEqual(createdCategory);
    });
  });
});
