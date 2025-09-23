import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

class IncomeService {
  saveIncome = async ({
    amount,
    userID,
  }: {
    amount: number;
    userID: string;
  }): Promise<{ isError: boolean; message: string }> => {
    try {
      const { id } = await addDoc(collection(db, "incomes"), {
        amount,
        userID,
        createdAt: new Date(),
      });
      if (id === null) {
        return { isError: true, message: "No se pudo guardar el ingreso" };
      }
      return { isError: false, message: "Ingreso guardado exitosamente" };
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      return { isError: true, message: errorMessage };
    }
  };
}

export const incomeService = new IncomeService();
