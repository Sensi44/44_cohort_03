import { IProfileDataState, RootState } from '@Store';

export const getProfileData = (state: RootState): IProfileDataState =>
  state.profile;
