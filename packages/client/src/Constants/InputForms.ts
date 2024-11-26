import {
  SignInFormData,
  SignInTextFieldsKeys,
} from '@Components/SignInForm/SignInForm.props';
import {
  SignUpFormData,
  SignUpTextFieldsKeys,
} from '@Components/SignUpForm/SignUpForm.props';

export const signInTextFieldsList = [
  {
    id: SignInTextFieldsKeys.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: SignInTextFieldsKeys.password,
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
];

export const signInFormDefaultFormData: SignInFormData = {
  [SignInTextFieldsKeys.login]: '',
  [SignInTextFieldsKeys.password]: '',
};

export const signUpTextFieldsList = [
  {
    id: SignUpTextFieldsKeys.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.email,
    name: 'email',
    label: 'Почта',
    type: 'email',
  },
  {
    id: SignUpTextFieldsKeys.firstName,
    name: 'first_name',
    label: 'Имя',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.secondName,
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.phone,
    name: 'phone',
    label: 'Телефон',
    type: 'text',
  },
  {
    id: SignUpTextFieldsKeys.password,
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
  {
    id: SignUpTextFieldsKeys.repeatPassword,
    name: 'repeat_password',
    label: 'Пароль (еще раз)',
    type: 'password',
  },
];

export const signUpDefaultFormData: SignUpFormData = {
  [SignUpTextFieldsKeys.login]: '',
  [SignUpTextFieldsKeys.password]: '',
  [SignUpTextFieldsKeys.email]: '',
  [SignUpTextFieldsKeys.firstName]: '',
  [SignUpTextFieldsKeys.secondName]: '',
  [SignUpTextFieldsKeys.phone]: '',
  [SignUpTextFieldsKeys.repeatPassword]: '',
};
