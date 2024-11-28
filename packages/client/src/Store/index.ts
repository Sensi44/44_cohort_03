import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './Slices';
import { ProfileApi } from './Slices/Api/Profile.api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ProfileApi.middleware]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
