import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

import SignUpForm from '@Components/SignUpForm/SignUpForm';
import ErrorNotification from '@Components/ErrorNotification/ErrorNotification';
import { UserCreate } from '@Types/UserCreate';
import { useAuthApi } from '@Services/AuthService';
import { Routes } from '../../main';
import { useState } from 'react';

import './SignUpPage.scss';

export const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmitForm = async (profileData: UserCreate) => {
    setIsLoading(true);
    const result = await useAuthApi().signUp(profileData);
    setIsLoading(false);

    if (result.isSuccess) {
      navigate(`/${Routes.SignIn}`);
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <Container className='page'>
      <Typography className='title' variant='h4' color='primary'>
        Регистрация
      </Typography>
      <SignUpForm
        className='form'
        isLoading={isLoading}
        whenSubmitForm={handleSubmitForm}
      />
      <Typography className='info-message' variant='body2'>
        {'Уже зарегистрированы? '}
        <NavLink to={`/${Routes.SignIn}`}>Войти</NavLink>
      </Typography>
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Container>
  );
};
