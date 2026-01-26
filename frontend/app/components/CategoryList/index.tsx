import { findAllCategoriesCached } from "@/libs/category/queries";
import Category from "../Category";

export default async function CategoriesList() {
  const categories = await findAllCategoriesCached();

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <Category
              icon={category.icon}
              categoryName={category.categoryName}
              type={category.type}
            />
          </div>
        );
      })}
    </div>
  );
}
