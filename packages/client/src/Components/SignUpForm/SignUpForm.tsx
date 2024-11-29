import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { signUpDefaultFormData, signUpTextFieldsList } from '@Constants';

import type {
  ISignUpFormProps,
  SignUpTextFieldsKeys,
} from './SignUpForm.props';

import './SignUpForm.scss';

export const SignUpForm = ({ isLoading, whenSubmitForm }: ISignUpFormProps) => {
  const [formData, setFormData] = useState(signUpDefaultFormData);
  const [errors, setErrors] = useState(signUpDefaultFormData);

  const handleChangeForm = (value: string, fieldKey: SignUpTextFieldsKeys) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  const handleSubmitForm = () => {
    const { email, login, firstName, secondName, phone, password } = formData;
    //TODO добавить валидацию - использовать errors

    whenSubmitForm({
      first_name: firstName,
      second_name: secondName,
      login,
      email,
      password,
      phone,
    });
  };

  return (
    <form className='sign-up-form__form'>
      {signUpTextFieldsList.map((field) => (
        <TextField
          className='sign-up-form__field'
          key={field.id}
          error={errors[field.id].length > 0}
          disabled={isLoading}
          id={field.id}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.id]}
          variant='outlined'
          onChange={(event) => handleChangeForm(event.target.value, field.id)}
        />
      ))}
      <Button
        disabled={Object.values(errors).filter(Boolean).length > 0}
        onClick={handleSubmitForm}
        size='large'
        variant='contained'>
        Зарегистрироваться
      </Button>
    </form>
  );
};
