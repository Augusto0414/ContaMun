import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Goal } from "../interface/goal";
import { db } from "../utils/firebase";

class ExpenseService {
  saveExpense = async ({
    amount,
    description,
    title,
    id: userID,
  }: Goal): Promise<{ isError: boolean; message: string }> => {
    try {
      const { id } = await addDoc(collection(db, "expenses"), {
        title,
        description,
        amount,
        userID,
      });

      if (id === "") return { isError: true, message: "No se pudo guardar el gasto" };
      return { isError: false, message: "Gasto guardado correctamente" };
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      return { isError: true, message: errorMessage };
    }
  };
  getExpenses = async ({
    userID,
  }: {
    userID: string;
  }): Promise<{
    message: string;
    isError: boolean;
    title?: string;
    description?: string;
    amount?: number;
    id?: string;
  }> => {
    try {
      const expenses = await getDocs(query(collection(db, "expenses"), where("userID", "==", userID)));
      const expenseList = expenses.docs.map((doc) => {
        const data = doc.data() as { title?: string; description?: string; amount?: number };
        return { id: doc.id, title: data.title, description: data.description, amount: data.amount };
      });
      return { message: "Gastos obtenidos correctamente", isError: false, ...expenseList[0] };
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      return { isError: true, message: errorMessage };
    }
  };
}

export const expenseService = new ExpenseService();
