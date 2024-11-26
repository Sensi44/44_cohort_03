import { UserCreate } from '@Types/UserCreate';

export type SignUpFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: UserCreate) => void;
};

export enum SignUpTextFieldsKeys {
  email = 'email',
  login = 'login',
  firstName = 'firstName',
  secondName = 'secondName',
  phone = 'phone',
  password = 'password',
  repeatPassword = 'repeatPassword',
}

export type SignUpFormData = Record<SignUpTextFieldsKeys, string>;
