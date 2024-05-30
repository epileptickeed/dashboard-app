import { createSlice } from "@reduxjs/toolkit";

export type userData = {
  type: string[];
  desc: string;
  category: string[];
  sum: number;
  selectedType: string;
  selectedCategory: string;
  open: boolean;
};

const initialState: userData = {
  type: ["Расходы", "Доходы"],
  desc: "",
  category: [
    "Развлечение",
    "Магазин",
    "Медицина",
    "Отдых",
    "Бензин",
    "Стипендия",
    "Зарплата",
  ],
  sum: 0,
  selectedType: "",
  selectedCategory: "",
  open: false,
};

export const userInputSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSum: (state, action) => {
      state.sum = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const {
  setSelectedType,
  setDesc,
  setSelectedCategory,
  setSum,
  setOpen,
} = userInputSlice.actions;
export default userInputSlice.reducer;
