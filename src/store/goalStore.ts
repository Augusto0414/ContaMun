import { create } from "zustand";
import { Goal } from "../interface/goal";
import { goalService } from "../service/goalsServices";

interface GoalState {
  goals: Goal[];
  goalMessage: string;
  isGoalError: boolean;
  goalState: "idle" | "error" | "loading" | "success";
  savingGoal: ({ title, description, amount }: Omit<Goal, "id">) => Promise<void>;
  getGoal: () => Promise<void>;
  resetGoal(): void;
}

export const goalStore = create<GoalState>((set) => ({
  goals: [],
  goalMessage: "",
  goalState: "idle",
  isGoalError: false,
  savingGoal: async ({ title, description, amount }) => {
    set({ goalState: "loading" });
    try {
      const { message, error } = await goalService.saveGoal({ title, description, amount });
      set({ goalState: "success", goalMessage: message, isGoalError: error });
      console.log(message);
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ goalState: "error", goalMessage: errorMessage, isGoalError: true });
    }
  },
  getGoal: async () => {
    set({ goalState: "loading" });
    try {
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ goalState: "error", goalMessage: errorMessage });
    }
  },
  resetGoal: () => set({ goalState: "idle", goalMessage: "", isGoalError: false }), // 👈 importante
}));
