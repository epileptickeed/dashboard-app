import { configureStore } from '@reduxjs/toolkit';
import componentSlice from './componentSlice/slice';
import userDataSlice from './userDataSlice/slice';

export const store = configureStore({
  reducer: {
    component: componentSlice,
    userData: userDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
