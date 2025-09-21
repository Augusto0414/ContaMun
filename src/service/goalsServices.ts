import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Goal } from "../interface/goal";
import { db } from "../utils/firebase";

class GoalService {
  saveGoal = async ({ title, description, amount, id: userID }: Goal): Promise<{ message: string; error: boolean }> => {
    try {
      const data = await addDoc(collection(db, "goals"), {
        title,
        description,
        amount,
        userID,
      });
      console.log(data);
      if (data.id === "") return { message: "No se pudo guardar la meta de ahorro", error: true };
      return { message: "Meta de ahorro guardada correctamente", error: false };
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      return { message: errorMessage, error: true };
    }
  };

  getGoals = async ({
    userID,
  }: {
    userID: string;
  }): Promise<{
    id?: string;
    title?: string;
    description?: string;
    amount?: number;
    message: string;
    isError: boolean;
  }> => {
    try {
      const goalsCollection = collection(db, "goals");
      const q = query(goalsCollection, where("userID", "==", userID));
      const querySnapshot = await getDocs(q);
      const goals = querySnapshot.docs.map((doc) => {
        const data = doc.data() as { title?: string; description?: string; amount?: number };
        return {
          id: doc.id,
          title: data.title ?? "",
          description: data.description ?? "",
          amount: data.amount ?? 0,
        };
      });
      return { ...goals[0], message: "Metas de ahorro obtenidas correctamente", isError: false };
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      return { message: errorMessage, isError: true };
    }
  };
}

export const goalService = new GoalService();
