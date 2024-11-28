import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Stack,
} from '@mui/material';

import {
  changePasswordFormDefaultFormData,
  changePasswordTextFieldsList,
} from '@Constants/InputForms';
import type {
  ChangePasswordTextFieldsKeys,
  IChangePasswordFormProps,
} from './ChangePasswordForm.props';

export const ChangePasswordForm: FC<IChangePasswordFormProps> = ({
  isLoading,
  whenSubmitForm,
}) => {
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
          Изменить пароль
        </Button>
      </Stack>
    </form>
  );
};
