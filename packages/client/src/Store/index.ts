import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { rootReducer } from './Slices';
import { LeaderBordApi } from './Slices/Api/LeaderBord.api';
import { ProfileApi } from './Slices/Api/Profile.api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ProfileApi.middleware,
      LeaderBordApi.middleware,
    ]),
  devTools: true,
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { useGetLeaderBordQuery } from './Slices/Api/LeaderBord.api';
export {
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useEditUserMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
  useSignInMutation,
  useSignUpMutation,
} from './Slices/Api/Profile.api';
export {
  getEnemiesList,
  getHitsCount,
  getMaximumEnemiesCount,
  getPlayer,
} from './Slices/Game/Game.selector';
export {
  addEnemy,
  deleteEnemy,
  increaseHitsCount,
  moveEnemy,
  movePlayer,
  setGameState,
} from './Slices/Game/Game.slice';
export { EnemyType } from './Types/Games.types';
export type {
  IGameInitState,
  TBaseEnemy,
  TBomb,
  TEnemy,
  TGameState,
  TPirate,
  TPlayer,
} from './Types/Games.types';
export type { IProfileDataState } from './Types/User.types';
