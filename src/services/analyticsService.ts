import { API_ROUTES } from "@/lib/admin-constants";
import { apiGet } from "./api";

export const analyticsService = {
  overview: () => apiGet<unknown>(API_ROUTES.analytics.overview),
  byProduct: (slug: string) => apiGet<unknown>(API_ROUTES.analytics.byProduct(slug)),
};
