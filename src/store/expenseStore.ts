import { create } from "zustand";
import { Goal } from "../interface/goal";
import { expenseService } from "../service/expense";

interface ExpenseState {
  expenses: Goal[];
  expenseMessage: string;
  expenseState: "idle" | "loading" | "error" | "success";
  isExpenseError: boolean;
  saveExpense: ({ amount, description, title, id }: Goal) => Promise<void>;
  getExpenses: ({ userID }: { userID: string }) => Promise<void>;
  resetExpense(): void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  expenseMessage: "",
  expenseState: "idle",
  isExpenseError: false,
  saveExpense: async ({ amount, description, title, id }) => {
    try {
      set({ expenseState: "loading", expenseMessage: "", isExpenseError: false });
      const { isError, message } = await expenseService.saveExpense({ amount, description, title, id });
      if (isError) {
        set({ expenseMessage: message, isExpenseError: true, expenseState: "error" });
      }
      const currentExpenses = get().expenses;
      const newExpense: Goal = {
        id: id,
        title,
        description,
        amount,
      };

      set({
        expenses: [...currentExpenses, newExpense],
        expenseMessage: message,
        isExpenseError: false,
        expenseState: "success",
      });
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ expenseMessage: errorMessage, isExpenseError: true, expenseState: "error" });
    }
  },
  getExpenses: async ({ userID }) => {
    try {
      set({ expenseState: "loading", expenseMessage: "", isExpenseError: false });
      const { isError, expenses, message } = await expenseService.getExpenses({ userID });
      if (isError) {
        set({ isExpenseError: true, expenseState: "error", expenseMessage: message });
      }
      set({
        isExpenseError: false,
        expenseState: "success",
        expenses: [...(expenses || [])],
      });
    } catch (error: any) {
      const errorMessage =
        error?.message ?? error?.data?.message ?? error?.response?.data?.message ?? "Ha ocurrido un error inesperado";
      set({ expenseMessage: errorMessage, isExpenseError: true, expenseState: "error" });
    }
  },
  resetExpense: () => set({ expenseState: "idle", expenseMessage: "", isExpenseError: false }),
}));
