import { API_ROUTES } from "@/lib/admin-constants";
import { apiGet, apiPost } from "./api";

export const chatService = {
  list: () => apiGet<unknown[]>(API_ROUTES.chats.list),
  get: (id: string) => apiGet<unknown>(API_ROUTES.chats.get(id)),
  reply: (id: string, message: string) =>
    apiPost<unknown>(API_ROUTES.chats.reply(id), { message }),
};
