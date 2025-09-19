import { create } from "zustand";
import { Goal } from "../interface/goal";
import { expenseService } from "../service/expense";

interface ExpenseState {
  expenses: Goal[];
  expenseMessage: string;
  expenseState: "idle" | "loading" | "error" | "success";
  isExpenseError: boolean;
  saveExpense: ({ amount, description, title }: Omit<Goal, "id">) => Promise<void>;
  resetExpense(): void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  expenseMessage: "",
  expenseState: "idle",
  isExpenseError: false,
  saveExpense: async ({ amount, description, title }) => {
    try {
      set({ expenseState: "loading", expenseMessage: "", isExpenseError: false });
      const { isError, message } = await expenseService.saveExpense({ amount, description, title });
      if (isError) {
        set({ expenseMessage: message, isExpenseError: true, expenseState: "error" });
      }
      set({ expenseMessage: message, isExpenseError: false, expenseState: "success" });
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ expenseMessage: errorMessage, isExpenseError: true, expenseState: "error" });
    }
  },
  resetExpense: () => set({ expenseState: "idle", expenseMessage: "", isExpenseError: false }),
}));
