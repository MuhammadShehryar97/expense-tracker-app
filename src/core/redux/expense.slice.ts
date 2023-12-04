import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExpenseItem {
  amount: string;
  name: string
  description: string;
}

interface ExpenseListState {
  expenseList: ExpenseItem[];
}

const initialState: ExpenseListState = {
  expenseList: [],
};

export const expenseSlice = createSlice({
  name: "expenseList",
  initialState,
  reducers: {
    setExpenseList: (state, action: PayloadAction<ExpenseItem[]>) => {
      state.expenseList = action.payload;
    },
  },
});

export const { setExpenseList } = expenseSlice.actions;