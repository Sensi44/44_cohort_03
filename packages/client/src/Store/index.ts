import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { rootReducer } from './Slices';
import { ProfileApi } from './Slices/Api/Profile.api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ProfileApi.middleware]),
  devTools: true,
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useEditUserMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
  useSignInMutation,
  useSignUpMutation,
} from './Slices/Api/Profile.api';
export { getPlayer } from './Slices/Game/Game.selector';
export { movePlayer, setGameState } from './Slices/Game/Game.slice';
export type { TPlayer } from './Slices/Game/Game.slice';
export type { IProfileDataState } from './Types/User.types';
