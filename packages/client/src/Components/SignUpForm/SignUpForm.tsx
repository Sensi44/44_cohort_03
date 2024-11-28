import { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Stack,
} from '@mui/material';

import {
  signUpDefaultFormData,
  signUpTextFieldsList,
} from '@Constants/InputForms';

import type { ISignUpFormProps } from './SignUpForm.props';
import type { FC, ChangeEvent } from 'react';
import type { SignUpTextFieldsKeys } from './SignUpForm.props';

export const SignUpForm: FC<ISignUpFormProps> = ({
  isLoading,
  whenSubmitForm,
}) => {
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
          <FormControl
            sx={{ width: 340 }}
            key={field.id}
            error={errors[field.id].length > 0}
            variant='standard'>
            <TextField
              disabled={isLoading}
              fullWidth
              id={field.id}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.id]}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeForm(event.target.value, field.id)
              }
            />
            <FormHelperText>{errors[field.id]}</FormHelperText>
          </FormControl>
        ))}
        <Button
          disabled={Object.values(errors).filter(Boolean).length > 0}
          onClick={handleSubmitForm}
          size='large'
          variant='contained'>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};
