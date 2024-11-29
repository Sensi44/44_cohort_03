import { SignUpTextFieldsKeys } from '@Constants';
import type { IUserCreate } from '@Types';

export type ISignUpFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: IUserCreate) => void;
};

export type ISignUpFormData = Record<SignUpTextFieldsKeys, string>;
