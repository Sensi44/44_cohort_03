import { combineReducers } from '@reduxjs/toolkit';

import { ProfileApi } from './Api/Profile.api';

export const rootReducer = combineReducers({
  [ProfileApi.reducerPath]: ProfileApi.reducer,
});
