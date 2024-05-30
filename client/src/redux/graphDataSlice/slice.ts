import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  graphExpense: undefined,
  graphIncome: undefined,
  toggleGraph: false,
};

const graphDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setGraphExpense: (state, action) => {
      state.graphExpense = action.payload;
    },
    setGraphIncome: (state, action) => {
      state.graphIncome = action.payload;
    },
    setToggleGraph: (state, action) => {
      state.toggleGraph = action.payload;
    },
  },
});

export const { setGraphExpense, setGraphIncome, setToggleGraph } = graphDataSlice.actions;
export default graphDataSlice.reducer;
