export type CategoriesModel = {
  id: string;
  icon: string;
  categoryName: string;
  type: "INCOME" | "EXPENSE";
  isDefault: boolean;
};
