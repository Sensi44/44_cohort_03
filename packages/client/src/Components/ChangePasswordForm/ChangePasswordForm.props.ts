import { ChangePasswordTextFieldsKeys } from '@Constants';
import type { IUserChangePassword } from '@Types';

export type IChangePasswordFormProps = {
  isLoading: boolean;
  whenSubmitForm: (payload: IUserChangePassword) => void;
};

export type IChangePasswordFormData = Record<
  ChangePasswordTextFieldsKeys,
  string
>;
