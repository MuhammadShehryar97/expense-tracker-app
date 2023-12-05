import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExpenseItem {
  amount: string;
  name: string
  description: string;
}
export interface Coords {
  latitude: number;
  longitude: number;
}

interface ExpenseListState {
  expenseList: ExpenseItem[];
  locationCoords: Coords;
}

const initialState: ExpenseListState = {
  expenseList: [],
  locationCoords: {
    latitude: 0,
    longitude: 0
  }
};

export const expenseSlice = createSlice({
  name: "expenseList",
  initialState,
  reducers: {
    setExpenseList: (state, action: PayloadAction<ExpenseItem[]>) => {
      state.expenseList = action.payload;
    },
    setLocationCoords: (state, action: PayloadAction<Coords>) => {
      state.locationCoords = action.payload;
    },
  },
});

export const { setExpenseList, setLocationCoords } = expenseSlice.actions;