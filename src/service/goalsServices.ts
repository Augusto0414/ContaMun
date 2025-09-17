import { addDoc, collection } from "firebase/firestore";
import { Goal } from "../interface/goal";
import { db } from "../utils/firebase";

class GoalService {
  saveGoal = async ({ title, description, amount }: Omit<Goal, "id">): Promise<{ message: string; error: boolean }> => {
    try {
      const data = await addDoc(collection(db, "goals"), {
        title,
        description,
        amount,
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

  getGoals = async () => {};
}

export const goalService = new GoalService();
