import { combineReducers } from '@reduxjs/toolkit';

import { LeaderBordApi } from './Api/LeaderBord.api';
import { ProfileApi } from './Api/Profile.api';
import { gameSlice } from './Game/Game.slice';

export const rootReducer = combineReducers({
  [ProfileApi.reducerPath]: ProfileApi.reducer,
  game: gameSlice.reducer,
  [LeaderBordApi.reducerPath]: LeaderBordApi.reducer,
});
