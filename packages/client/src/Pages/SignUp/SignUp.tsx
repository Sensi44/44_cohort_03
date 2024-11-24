import SignUpForm from '@Components/SignUpForm/SignUpForm'
import { NavLink, useNavigate } from 'react-router-dom'
import './SignUp.scss'
import { Typography, Container } from '@mui/material'
import { UserCreate } from '@Types/UserCreate'
import { useAuthApi } from '@Services/AuthService'
import { useState } from 'react'
import ErrorNotification from '@Components/ErrorNotification/ErrorNotification'
import { Routes } from '../../main'

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmitForm = async (profileData: UserCreate) => {
    const result = await useAuthApi().signUp(profileData)

    if (result.isSuccess) {
      navigate(Routes.SignIn)
    } else {
      setErrorMessage(result.error)
    }
  }

  return (
    <Container className="page">
      <Typography className="title" variant="h4" color="primary">
        Регистрация
      </Typography>
      <SignUpForm
        className="form"
        isLoading={false}
        whenSubmitForm={handleSubmitForm}
      />
      <Typography className="info-message" variant="body2">
        {'Уже зарегистрированы? '}
        <NavLink to={Routes.SignIn}>Войти</NavLink>
      </Typography>
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Container>
  )
}
