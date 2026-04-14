import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: Record<string, unknown> | null;
  token: string | null;
  login: (response: Record<string, unknown>) => void;
  logout: () => void;
}

const stored = typeof window !== "undefined" ? localStorage.getItem("fc_auth") : null;
const initial = stored ? JSON.parse(stored) : null;

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!initial,
  user: initial?.user ?? null,
  token: initial?.token ?? null,
  login: (response) => {
    const token = (response.token as string) || null;
    const user = (response.user as Record<string, unknown>) || response;
    const state = { token, user };
    if (typeof window !== "undefined") localStorage.setItem("fc_auth", JSON.stringify(state));
    set({ isAuthenticated: true, user, token });
  },
  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem("fc_auth");
    set({ isAuthenticated: false, user: null, token: null });
  },
}));
