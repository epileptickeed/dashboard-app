import { createSlice } from '@reduxjs/toolkit';

export type userData = {
  userEmail: string;
  userPassword: string;
};

const initialState: userData = {
  userEmail: '',
  userPassword: '',
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
  },
});

export const { setUserEmail, setUserPassword } = userDataSlice.actions;
export default userDataSlice.reducer;
