import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

import { SignUpForm, ErrorNotification } from '@Components';
import { useAuthApi } from '@Services';
import { Routes } from '@Constants';

import type { IUserCreate } from '@Types';

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
      <Typography textAlign='center' variant='h4' color='primary'>
        Регистрация
      </Typography>
      <div className='sign-up-page__form'>
        <SignUpForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      </div>

      <Typography textAlign='center' variant='body2'>
        {'Уже зарегистрированы?'}
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
