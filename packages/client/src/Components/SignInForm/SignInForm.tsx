import { TextField, Button, FormControl, FormHelperText } from '@mui/material'
import { HTMLAttributes, useState } from 'react'
import './SignInForm.scss'
import { SignInFormProps } from './SignIn.props'

enum TextFieldsKeys {
  login = 'login',
  password = 'password',
}

const textFieldsList = [
  {
    id: TextFieldsKeys.login,
    name: 'login',
    label: 'Логин',
    type: 'text',
  },
  {
    id: TextFieldsKeys.password,
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
]
type FormData = Record<TextFieldsKeys, string>

const defaultFormData: FormData = {
  [TextFieldsKeys.login]: '',
  [TextFieldsKeys.password]: '',
}

export default function SignUpForm({
  isLoading,
  whenSubmitForm,
}: SignInFormProps & HTMLAttributes<HTMLDivElement>) {
  const [formData, setFormData] = useState(defaultFormData)
  const [errors, setErrors] = useState(defaultFormData)

  const handleChangeForm = (value: string, fieldKey: TextFieldsKeys) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    })
  }

  const handleSubmitForm = () => {
    //TODO добавить валидацию - использовать errors

    whenSubmitForm(formData)
  }

  return (
    <form className="form">
      {textFieldsList.map(field => (
        <FormControl
          className="field"
          key={field.id}
          error={errors[field.id].length > 0}
          variant="standard">
          <TextField
            disabled={isLoading}
            fullWidth
            id={field.id}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.id]}
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeForm(event.target.value, field.id)
            }
          />
          <FormHelperText>{errors[field.id]}</FormHelperText>
        </FormControl>
      ))}
      <Button
        disabled={Object.values(errors).filter(Boolean).length > 0}
        onClick={handleSubmitForm}
        size="large"
        variant="contained">
        Авторизоваться
      </Button>
    </form>
  )
}
