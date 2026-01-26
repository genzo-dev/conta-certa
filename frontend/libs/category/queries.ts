import { CategoriesModel } from "@/models/categories";
import { apiAuthenticatedRequest } from "@/utils/api-authenticated-request";
import { cache } from "react";

export const findAllCategoriesCached = cache(
  async (): Promise<CategoriesModel[]> => {
    const res = await apiAuthenticatedRequest<CategoriesModel[]>("/category", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.success) return [];
    return res.data;
  },
);
