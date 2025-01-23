import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { rootReducer } from './Slices';
import { LeaderBordApi } from './Slices/Api/LeaderBord.api';
import { ProfileApi } from './Slices/Api/Profile.api';

// Глобально декларируем в window наш ключ
// и задаем ему тип такой же, как у стейта в сторе
declare global {
  interface Window {
    APP_INITIAL_STATE: RootState;
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ProfileApi.middleware,
      LeaderBordApi.middleware,
    ]),
  devTools: true,
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export { rootReducer } from './Slices';
export {
  useGetLeaderBordQuery,
  useSendScoreMutation,
} from './Slices/Api/LeaderBord.api';
export {
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useEditUserMutation,
  useGetServiceIdQuery,
  useGetUserInfoQuery,
  useLogoutMutation,
  useOAuthSignInMutation,
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
  resetHitsCount,
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
