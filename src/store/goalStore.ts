import { create } from "zustand";
import { Goal } from "../interface/goal";
import { goalService } from "../service/goalsServices";

interface GoalState {
  goals: Goal[];
  goalMessage: string;
  isGoalError: boolean;
  goalState: "idle" | "error" | "loading" | "success";
  savingGoal: ({ title, description, amount, id }: Goal) => Promise<void>;
  getGoals: ({ userID }: { userID: string }) => Promise<void>;
  resetGoal(): void;
}

export const goalStore = create<GoalState>((set, get) => ({
  goals: [],
  goalMessage: "",
  goalState: "idle",
  isGoalError: false,
  savingGoal: async ({ title, description, amount, id }) => {
    set({ goalState: "loading" });
    try {
      const { message, error } = await goalService.saveGoal({ title, description, amount, id });
      if (error) {
        set({ goalMessage: message, isGoalError: true, goalState: "error" });
        return;
      }
      const currentGoals = get().goals;
      const newGoal: Goal = {
        id: id || Date.now().toString(),
        title,
        description,
        amount,
      };

      set({
        goals: [...currentGoals, newGoal],
        goalMessage: message,
        isGoalError: false,
        goalState: "success",
      });

      console.log(message);
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ goalState: "error", goalMessage: errorMessage, isGoalError: true });
    }
  },
  getGoals: async ({ userID }) => {
    set({ goalState: "loading" });
    try {
      const { goals, isError } = await goalService.getGoals({ userID });
      if (isError) {
        set({ goalState: "error", isGoalError: isError });
      }
      set({
        goalState: "success",
        isGoalError: isError,
        goals: [...(goals || [])],
      });
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ goalState: "error", goalMessage: errorMessage });
    }
  },
  resetGoal: () => set({ goalState: "idle", goalMessage: "", isGoalError: false }), // 👈 importante
}));
