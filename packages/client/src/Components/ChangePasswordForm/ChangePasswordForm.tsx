import { Button, Stack, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import {
  changePasswordFormDefaultFormData,
  ChangePasswordTextFieldsKeys,
  changePasswordTextFieldsList,
} from '@Constants';
import type { IChangePasswordFormProps } from './ChangePasswordForm.props';

export const ChangePasswordForm = ({
  isLoading,
  whenSubmitForm,
}: IChangePasswordFormProps) => {
  const [formData, setFormData] = useState(changePasswordFormDefaultFormData);
  const [errors, setErrors] = useState(changePasswordFormDefaultFormData);

  const handleChangeForm = (
    value: string,
    fieldKey: ChangePasswordTextFieldsKeys,
  ) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  const handleSubmitForm = () => {
    //TODO добавить валидацию - использовать errors

    whenSubmitForm({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <form>
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
        }}>
        {changePasswordTextFieldsList.map((field) => (
          <TextField
            sx={{ width: 340 }}
            key={field.id}
            helperText={errors[field.id]}
            error={errors[field.id].length > 0}
            variant='outlined'
            disabled={isLoading}
            fullWidth
            id={field.id}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.id]}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm(event.target.value, field.id)
            }></TextField>
        ))}
        <Button
          disabled={
            Object.values(errors).filter(Boolean).length > 0 || isLoading
          }
          onClick={handleSubmitForm}
          size='large'
          variant='contained'>
          Изменить пароль
        </Button>
      </Stack>
    </form>
  );
};
