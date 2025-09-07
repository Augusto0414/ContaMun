import { User } from "firebase/auth";
import { create } from "zustand";
import { UserRequest } from "../interface/user";
import { authService } from "../service/authService";

interface AuthState {
  user: User;
  authState: "idle" | "loading" | "sucess" | "error";
  authMessage: string | null;
  authIsError: boolean;
  createUser: ({ name, email, password }: UserRequest) => Promise<void>;
  login: ({ email, password }: UserRequest) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  authState: "idle",
  authMessage: null,
  authIsError: false,
  createUser: async ({ name, email, password }) => {
    try {
      set({ authState: "loading" });
      const { message } = await authService.registerUser({ name, email, password });
      set({ authMessage: message, authIsError: false, authState: "sucess", user: null });
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ authMessage: errorMessage, authIsError: true, authState: "error", user: null });
    }
  },
  login: async ({ email, password }) => {
    try {
      set({ authState: "loading" });
      const { message, user } = await authService.login({ email, password });
      set({ authState: "sucess", authIsError: false, authMessage: message, user });
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ authIsError: true, authMessage: errorMessage, authState: "error", user: null });
    }
  },
  resendVerificationEmail: async () => {
    set({ authState: "loading" });
    try {
      const { message } = await authService.resendVerificationEmail();
      set({ authState: "sucess", authIsError: false, authMessage: message, user: null });
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ authIsError: true, authMessage: errorMessage, authState: "error", user: null });
    }
  },
}));
