import { IProfileDataState } from '@Store/Types/User.types';
import type { RootState } from '../..';

export const getProfileData = (state: RootState): IProfileDataState =>
  state.profile;
