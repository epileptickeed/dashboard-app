import { createSlice } from '@reduxjs/toolkit';

export type userData = {
  userEmail: string;
  userPassword: string;
  currentUser: null;
};

const initialState: userData = {
  userEmail: '',
  userPassword: '',
  currentUser: null,
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
  },
});

export const { setUserEmail, setUserPassword, setCurrentUser } = userDataSlice.actions;
export default userDataSlice.reducer;
