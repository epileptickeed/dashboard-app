import { createSlice } from '@reduxjs/toolkit';

export type userData = {
  type: string[];
  desc: string;
  category: string[];
  sum: number;
  selectedType: string;
  selectedCategory: string;
  open: boolean;
  //   date: Date;
};

const initialState: userData = {
  type: ['Расходы', 'Доходы'],
  desc: '',
  category: ['Развлечение', 'Магазин', 'Медицина', 'Отдых', 'Бензин'],
  sum: 0,
  selectedType: '',
  selectedCategory: '',
  open: false,
  //   date: new Date(),
};

export const userInputSlice = createSlice({
  name: 'userData',
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
    // setDate: (state, action) => {
    //   state.date = action.payload;
    // },
  },
});

export const { setSelectedType, setDesc, setSelectedCategory, setSum, setOpen } =
  userInputSlice.actions;
export default userInputSlice.reducer;
