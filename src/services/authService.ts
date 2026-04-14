import { API_ROUTES } from "@/lib/admin-constants";
import { apiPost } from "./api";

export interface RegisterPayload {
  username: string;
  phoneNumber: string;
  password: string;
}

export interface LoginPayload {
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: Record<string, unknown>;
  message?: string;
  [key: string]: unknown;
}

export const authService = {
  register: (data: RegisterPayload) =>
    apiPost<AuthResponse>(API_ROUTES.auth.register, data),

  login: (data: LoginPayload) =>
    apiPost<AuthResponse>(API_ROUTES.auth.login, data),
};
