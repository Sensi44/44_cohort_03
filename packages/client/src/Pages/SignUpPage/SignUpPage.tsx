import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Stack } from '@mui/material';

import { SignUpForm } from '@Components/SignUpForm/SignUpForm';
import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import { useAuthApi } from '@Services/AuthService';
import { Routes } from '@Constants/Routes';

import type { IUserCreate } from '@Types/User.types';

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
    <Stack
      spacing={2}
      sx={{
        padding: '60px 40px 20px',
        marginTop: 2,
        alignItems: 'center',
      }}>
      <Typography sx={{ textAlign: 'center' }} variant='h4' color='primary'>
        Регистрация
      </Typography>
      <div className='sign-up-page__form'>
        <SignUpForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      </div>

      <Typography sx={{ textAlign: 'center' }} variant='body2'>
        {'Уже зарегистрированы? '}
        <NavLink to={`/${Routes.SignIn}`}>Войти</NavLink>
      </Typography>
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Stack>
  );
};
