import { combineReducers } from '@reduxjs/toolkit';

import { ProfileApi } from './Api/Profile.api';
import { profileSlice } from './Profile/Profile.slice';

export const rootReducer = combineReducers({
  [ProfileApi.reducerPath]: ProfileApi.reducer,
  profile: profileSlice.reducer,
});