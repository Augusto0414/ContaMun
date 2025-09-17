import { create } from "zustand";

interface Goal {
  id: string;
  title: string;
  description: string;
  amount: number;
}

interface GoalState {
  goals: string[];
  errorMessage: string;
  state: "idle" | "error" | "loading" | "success";
  savingGoal: ({ title, description, amount }: Omit<Goal, "id">) => Promise<void>;
  getGoal: () => Promise<void>;
}

export const goalStore = create<GoalState>((set) => ({
  goals: [],
  errorMessage: "",
  state: "idle",
  savingGoal: async ({ title, description, amount }) => {
    set({ state: "loading" });
    try {
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ state: "error", errorMessage });
    }
  },
  getGoal: async () => {
    set({ state: "loading" });
    try {
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ state: "error", errorMessage });
    }
  },
}));
