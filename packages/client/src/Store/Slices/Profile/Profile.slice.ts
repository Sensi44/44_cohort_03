import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IProfileDataState } from '@Store';

const initialState: IProfileDataState = {
  id: -1,
  firstName: '',
  secondName: '',
  displayName: '',
  login: '',
  avatar: '',
  email: '',
  phone: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData(state, action: PayloadAction<IProfileDataState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetProfileData() {
      return {
        ...initialState,
      };
    },
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
