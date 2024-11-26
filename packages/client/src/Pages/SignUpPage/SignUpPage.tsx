import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

import { SignUpForm } from '@Components/SignUpForm/SignUpForm';
import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import type { IUserCreate } from '@Types/User.types';
import { useAuthApi } from '@Services/AuthService';
import { Routes } from '../../main';

import './SignUpPage.scss';

export const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmitForm = async (profileData: IUserCreate) => {
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
    <Container className='sign-up-page__page'>
      <Typography className='sign-up-page__title' variant='h4' color='primary'>
        Регистрация
      </Typography>
      <div className='sign-up-page__form'>
        <SignUpForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      </div>

      <Typography className='sign-up-page__message' variant='body2'>
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
