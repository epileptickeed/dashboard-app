import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  graphExpense: [
    {
      labels: [],
      datasets: [
        {
          label: 'Расходы',
          data: [],
          backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
        },
      ],
    },
  ],
  graphIncome: [
    {
      labels: [],
      datasets: [
        {
          label: 'Доходы',
          data: [],
          backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
        },
      ],
    },
  ],
};

const graphDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setGraphExpense: (state, action) => {
      //   state.graphExpense[0].labels.push([...action.payload]);
      //   state.graphExpense[0].datasets[1].data = action.payload.sum;
    },
    setGraphIncome: (state, action) => {},
  },
});

export const { setGraphExpense, setGraphIncome } = graphDataSlice.actions;
export default graphDataSlice.reducer;
