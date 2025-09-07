import {
  createUserWithEmailAndPassword,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { UserRequest } from "../interface/user";
import { auth, db } from "../utils/firebase";

class AuthService {
  registerUser = async ({ name, email, password }: UserRequest): Promise<{ message: string }> => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);
      await setDoc(doc(db, "user", user.uid), {
        name,
        email,
        password,
        createAt: new Date(),
        verify: false,
      });
      return { message: "Te registraste. Revisa tu correo y haz clic en verificar." };
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      return { message: errorMessage };
    }
  };

  login = async ({ email, password }: Omit<UserRequest, "name">): Promise<{ message: string; user: User }> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await reload(user);

      if (!user.emailVerified) {
        return { message: "Aún no verificaste tu correo. Revisa tu bandeja o reenvía el correo", user: null };
      }
      return { message: "Verificación exitosa", user };
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      return { message: errorMessage, user: null };
    }
  };
  resendVerificationEmail = async (): Promise<{ message: string }> => {
    const user = auth.currentUser;
    if (!user) return { message: "Usuario no conectado" };
    if (user.emailVerified) return { message: "Usuario verificado" };
    await sendEmailVerification(user);
    return { message: "Correo de verificación enviado..." };
  };
}

export const authService = new AuthService();
