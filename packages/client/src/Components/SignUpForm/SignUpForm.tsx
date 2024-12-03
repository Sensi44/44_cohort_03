import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import {
  signUpDefaultFormData,
  SignUpTextFieldsKeys,
  signUpTextFieldsList,
} from '@Constants';

import type { ISignUpFormProps } from './SignUpForm.props';

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
    <form>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
        }}>
        {signUpTextFieldsList.map((field) => (
          <TextField
            sx={{ width: 340 }}
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
          disabled={
            Object.values(errors).filter(Boolean).length > 0 || isLoading
          }
          onClick={handleSubmitForm}
          size='large'
          variant='contained'>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};
