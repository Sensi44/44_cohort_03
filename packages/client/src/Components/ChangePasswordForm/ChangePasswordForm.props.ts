import type { IUserChangePassword } from '@Types/User.types';

export type IChangePasswordFormProps = {
  isLoading: boolean;
  whenSubmitForm: (payload: IUserChangePassword) => void;
};

export enum ChangePasswordTextFieldsKeys {
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
  repeatNewPassword = 'repeatNewPassword',
}

export type IChangePasswordFormData = Record<
  ChangePasswordTextFieldsKeys,
  string
>;
