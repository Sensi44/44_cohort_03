import { UserCreate } from '@Types/UserCreate';

export type SignUpFormProps = {
  isLoading: boolean;
  whenSubmitForm: (userInfo: UserCreate) => void;
};

export enum TextFieldsKeys {
  email = 'email',
  login = 'login',
  firstName = 'firstName',
  secondName = 'secondName',
  phone = 'phone',
  password = 'password',
  repeatPassword = 'repeatPassword',
}

export type SignUpFormData = Record<TextFieldsKeys, string>;
