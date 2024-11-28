import { IProfileDataState } from '@State/Store';
import type { IUserChange } from '@Types/User.types';

export type IEditProfileFormProps = {
  isLoading: boolean;
  isDisabled: boolean;
  profileData: IProfileDataState;
  whenSubmitForm: (payload: IUserChange) => void;
};

export enum EditProfileTextFieldsKeys {
  email = 'email',
  login = 'login',
  firstName = 'firstName',
  secondName = 'secondName',
  phone = 'phone',
  displayName = 'displayName',
}

export type IEditProfileFormData = Record<EditProfileTextFieldsKeys, string>;
