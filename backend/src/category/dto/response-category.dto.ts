import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Category } from '../entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class ResponseCategoryDto {
  readonly id: string;
  readonly icon: string;
  readonly categoryName: string;
  readonly type: string;
  readonly transactions: Transaction[];
  readonly isDefault: boolean;
  readonly user: User | null;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(category: Category) {
    this.id = category.id;
    this.icon = category.icon;
    this.categoryName = category.categoryName;
    this.type = category.type;
    this.transactions = category.transactions;
    this.isDefault = category.isDefault;
    this.user = category.user;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }
}
