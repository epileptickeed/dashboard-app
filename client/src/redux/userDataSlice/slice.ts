import { createSlice } from "@reduxjs/toolkit";

export type userData = {
  userEmail: string;
  userPassword: string;
  currentUser: null | any;
  expenses: any[];
};

const initialState: userData = {
  userEmail: "",
  userPassword: "",
  currentUser: null,
  expenses: [],
};

export const userDataSlice = createSlice({
  name: "userData",
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

export const { setUserEmail, setUserPassword, setCurrentUser, setExpenses } =
  userDataSlice.actions;
export default userDataSlice.reducer;
