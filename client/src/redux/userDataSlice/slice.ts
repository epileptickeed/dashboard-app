import { createSlice } from '@reduxjs/toolkit';

export type userExpensesType = {
  id: string;
  type: string;
  category: string;
  sum: number;
  desc: string;
  localDate: string;
};

export type CurrentUserTypes = {
  email: string;
  expenses: userExpensesType[];
  password: string;
  __v: number;
  _id: string;
};

export type userData = {
  userEmail: string;
  userPassword: string;
  currentUser: null | CurrentUserTypes;
  expenses: userExpensesType[];
};

const initialState: userData = {
  userEmail: '',
  userPassword: '',
  currentUser: null,
  expenses: [],
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserPassword: (state, action) => {
      state.userPassword = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { setUserEmail, setUserPassword, setCurrentUser, setExpenses } = userDataSlice.actions;
export default userDataSlice.reducer;
