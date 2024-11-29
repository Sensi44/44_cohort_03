import { EditProfileTextFieldsKeys } from '@Constants';
import { IProfileDataState } from '@Store';
import type { IUserChange } from '@Types';

export type IEditProfileFormProps = {
  isLoading: boolean;
  isDisabled: boolean;
  profileData: IProfileDataState;
  whenSubmitForm: (payload: IUserChange) => void;
};

export type IEditProfileFormData = Record<EditProfileTextFieldsKeys, string>;
