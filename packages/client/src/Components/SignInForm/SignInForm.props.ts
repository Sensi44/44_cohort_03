import { SignInTextFieldsKeys } from '@Constants';
import type { IUserLogin } from '@Types';

export type ISignInFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: IUserLogin) => void;
};

export type ISignInFormData = Record<SignInTextFieldsKeys, string>;
