import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/config";

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginResponsePayload {
  response: {
    id: string;
    userName: string;
    email: string;
  };
  token: string;
}

interface ApiLoginResponse {
  error: boolean;
  code: number;
  message: string;
  body: LoginResponsePayload;
}

export class AuthService {
  static async login(email: string, password: string): Promise<{ body: User; token: string }> {
    try {
      const { data } = await api.post<ApiLoginResponse>("/auth/login", { email, password });
      if (data.error) {
        throw new Error(data.message || "Error en login");
      }

      const userData = data.body.response;
      const token = data.body.token;

      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.userName,
      };

      await AsyncStorage.multiSet([
        ["token", token],
        ["user", JSON.stringify(user)],
      ]);

      return {
        body: user,
        token,
      };
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error de autenticación";
      throw new Error(msg);
    }
  }

  static async checkAuth(): Promise<boolean> {
    const token = await AsyncStorage.getItem("token");
    return !!token;
  }

  static async getToken(): Promise<string | null> {
    return AsyncStorage.getItem("token");
  }

  static async getUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  static async logout(): Promise<void> {
    await AsyncStorage.multiRemove(["token", "user"]);
  }
}
