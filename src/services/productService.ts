import { API_ROUTES } from "@/lib/admin-constants";
import { apiGet } from "./api";

export const productService = {
  list: () => apiGet<unknown[]>(API_ROUTES.products.list),
  get: (slug: string) => apiGet<unknown>(API_ROUTES.products.get(slug)),
};
