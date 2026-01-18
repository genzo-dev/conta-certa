import { Injectable } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryType } from './enums/category-type.enum';

@Injectable()
export class CategorySeedService {
  constructor(private readonly categoryService: CategoryService) {}

  async seedDefaultCategories() {
    const defaults = [
      // EXPENSE
      { icon: '🍔', categoryName: 'Alimentação', type: CategoryType.EXPENSE },
      { icon: '🚗', categoryName: 'Transporte', type: CategoryType.EXPENSE },
      { icon: '🦷', categoryName: 'Dentista', type: CategoryType.EXPENSE },
      { icon: '🏠', categoryName: 'Moradia', type: CategoryType.EXPENSE },
      { icon: '🛒', categoryName: 'Supermercado', type: CategoryType.EXPENSE },
      { icon: '⛽', categoryName: 'Combustível', type: CategoryType.EXPENSE },
      { icon: '🩺', categoryName: 'Saúde', type: CategoryType.EXPENSE },
      { icon: '💊', categoryName: 'Farmácia', type: CategoryType.EXPENSE },
      { icon: '🧠', categoryName: 'Terapia', type: CategoryType.EXPENSE },
      { icon: '🎓', categoryName: 'Educação', type: CategoryType.EXPENSE },
      { icon: '📚', categoryName: 'Cursos', type: CategoryType.EXPENSE },
      { icon: '🎬', categoryName: 'Lazer', type: CategoryType.EXPENSE },
      { icon: '👕', categoryName: 'Roupas', type: CategoryType.EXPENSE },

      // INCOME
      { icon: '💼', categoryName: 'Salário', type: CategoryType.INCOME },
      { icon: '📈', categoryName: 'Investimentos', type: CategoryType.INCOME },
      { icon: '💰', categoryName: 'Outros ganhos', type: CategoryType.INCOME },
    ];

    for (const category of defaults) {
      const exists = await this.categoryService.findDefaultByName(
        category.categoryName,
      );

      if (!exists) {
        await this.categoryService.createInternal({
          ...category,
          isDefault: true,
          user: null,
        });
      }
    }
  }
}
