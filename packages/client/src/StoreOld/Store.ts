import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IProfileDataState {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
}

const profileDataSlice = createSlice({
  name: 'profileData',
  initialState: {
    first_name: 'Inga',
    second_name: 'Baranets',
    display_name: 'rubi',
    login: 'rubi2',
    avatar: '',
    email: 'i@test.ru',
    phone: '+79101111111',
  },
  reducers: {
    updateProfileData(state, action: PayloadAction<IProfileDataState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateProfileData } = profileDataSlice.actions;

export const store = configureStore({
  reducer: {
    profileData: profileDataSlice.reducer,
  },
});
