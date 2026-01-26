import PageTemplate from "@/app/components/PageTemplate";
import { findAllCategoriesCached } from "@/libs/category/queries";

const categories = await findAllCategoriesCached();

export default function CategoriesPage() {
  return (
    <PageTemplate pageTitle="Suas categorias">
      {JSON.stringify(categories, null, 2)}
    </PageTemplate>
  );
}
