import { configureStore } from '@reduxjs/toolkit';
import componentSlice from './componentSlice/slice';
import userDataSlice from './userDataSlice/slice';
import userInputSlice from './userInputSlice/slice';
import graphDataSlice from './graphDataSlice/slice';

export const store = configureStore({
  reducer: {
    component: componentSlice,
    userData: userDataSlice,
    userInput: userInputSlice,
    graphData: graphDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
