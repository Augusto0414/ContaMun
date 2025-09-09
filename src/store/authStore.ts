import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRequest } from "../interface/user";
import { authService } from "../service/authService";

type UserWithUid = Omit<UserRequest, "password"> & { uid: string; token: string };

interface AuthState {
  user: UserWithUid | null;
  authState: "loading" | "success" | "error" | "unauthenticated" | "authenticated";
  authMessage: string | null;
  authIsError: boolean;
  createUser: ({ name, email, password }: UserRequest) => Promise<void>;
  login: ({ email, password }: Omit<UserRequest, "name">) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      authState: "unauthenticated",
      authMessage: null,
      authIsError: false,

      createUser: async ({ name, email, password }) => {
        set({ authState: "loading" });
        try {
          const { message } = await authService.registerUser({ name, email, password });
          set({ authMessage: message, authIsError: false, authState: "success", user: null });
        } catch (error: any) {
          const errorMessage =
            error?.message ??
            error?.data?.message ??
            error?.response?.data?.message ??
            "Ha ocurrido un error inesperado";
          set({ authMessage: errorMessage, authIsError: true, authState: "error", user: null });
        }
      },

      login: async ({ email, password }) => {
        set({ authState: "loading" });
        try {
          const { message, user } = await authService.login({ email, password });
          const { displayName, email: userEmail, uid } = user;
          const token = await user.getIdToken();
          const userWithUid: UserWithUid = {
            name: displayName,
            email: userEmail,
            uid,
            token,
          };
          set({ authState: "authenticated", authIsError: false, authMessage: message, user: userWithUid });
        } catch (error: any) {
          const errorMessage =
            error?.message ??
            error?.data?.message ??
            error?.response?.data?.message ??
            "Ha ocurrido un error inesperado";
          set({ authIsError: true, authMessage: errorMessage, authState: "error", user: null });
        }
      },

      resendVerificationEmail: async () => {
        set({ authState: "loading" });
        try {
          const { message } = await authService.resendVerificationEmail();
          set({ authState: "success", authIsError: false, authMessage: message, user: null });
        } catch (error: any) {
          const errorMessage =
            error?.message ??
            error?.data?.message ??
            error?.response?.data?.message ??
            "Ha ocurrido un error inesperado";
          set({ authIsError: true, authMessage: errorMessage, authState: "error", user: null });
        }
      },

      logout: () => {
        set({ authIsError: false, authMessage: null, authState: "unauthenticated", user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
