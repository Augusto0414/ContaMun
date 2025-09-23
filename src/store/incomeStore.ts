import { create } from "zustand";
import { incomeService } from "../service/incomeService";

interface IncomeState {
  incomes: number[];
  incomeState: "idle" | "loading" | "success" | "error";
  incomeIsError: boolean;
  incomeMessage: string;
  saveIncome: ({ amount, userID }: { amount: number; userID: string }) => Promise<void>;
}

export const useIncomeStore = create<IncomeState>((set) => ({
  incomes: [],
  incomeState: "idle",
  incomeIsError: false,
  incomeMessage: "",
  saveIncome: async ({ amount, userID }) => {
    set({ incomeState: "loading" });
    try {
      const { isError, message } = await incomeService.saveIncome({ amount, userID });
      if (isError) {
        set({ incomeState: "error", incomeMessage: message, incomeIsError: true });
        return;
      }
      set({ incomeState: "success", incomeMessage: message, incomeIsError: false });
    } catch (error) {
      set({ incomeState: "error", incomeIsError: true, incomeMessage: error.message });
    }
  },
}));
