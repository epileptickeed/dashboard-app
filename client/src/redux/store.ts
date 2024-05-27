import { configureStore } from '@reduxjs/toolkit';
import componentSlice from './componentSlice/slice';

export const store = configureStore({
  reducer: {
    component: componentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
