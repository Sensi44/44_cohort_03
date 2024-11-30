import { combineReducers } from '@reduxjs/toolkit';

import { LeaderBordApi } from './Api/LeaderBord.api';
import { ProfileApi } from './Api/Profile.api';

export const rootReducer = combineReducers({
  [ProfileApi.reducerPath]: ProfileApi.reducer,
  [LeaderBordApi.reducerPath]: LeaderBordApi.reducer,
});
