import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryType } from '../enums/category-type.enum';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  icon: string;

  @Column()
  categoryName: string;

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @Column({ default: 0 })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.categories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User | null;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
