import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { AuthService } from "../service/authService";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  errorMessage: string | null;
  status: "checking" | "authenticated" | "not-authenticated";
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const authStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  errorMessage: null,
  status: "checking",

  login: async (email: string, password: string) => {
    set({ status: "checking", errorMessage: null });
    try {
      const { body, token } = await AuthService.login(email, password);
      set({
        user: body,
        token,
        status: "authenticated",
        errorMessage: null,
      });
    } catch (err: any) {
      const message = err?.message || "Error al autenticar";
      set({
        errorMessage: message,
        status: "not-authenticated",
        user: null,
        token: null,
      });
    }
  },

  checkAuth: async () => {
    set({ status: "checking", errorMessage: null });
    try {
      const token = await AuthService.getToken();
      const user = await AuthService.getUser();
      if (token && user) {
        set({
          token,
          user,
          status: "authenticated",
          errorMessage: null,
        });
      } else {
        set({
          user: null,
          token: null,
          status: "not-authenticated",
          errorMessage: null,
        });
      }
    } catch (err: any) {
      set({
        user: null,
        token: null,
        status: "not-authenticated",
        errorMessage: "No se pudo verificar la autenticación",
      });
    }
  },

  logout: async () => {
    await AsyncStorage.multiRemove(["token", "user"]);
    set({
      user: null,
      token: null,
      status: "not-authenticated",
      errorMessage: null,
    });
  },
}));
