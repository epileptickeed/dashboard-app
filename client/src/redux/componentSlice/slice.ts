import { createSlice } from '@reduxjs/toolkit';
type componentTypes = {
  currentVisibleComponent: number;
};

const initialState: componentTypes = {
  currentVisibleComponent: 0,
};

export const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {
    setComponentVisible: (state, action) => {
      state.currentVisibleComponent = action.payload;
    },
  },
});

export const { setComponentVisible } = componentSlice.actions;
export default componentSlice.reducer;
