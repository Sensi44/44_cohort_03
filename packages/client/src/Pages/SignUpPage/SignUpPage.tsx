import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Stack } from '@mui/material';

import { SignUpForm } from '@Components/SignUpForm/SignUpForm';
import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import { Routes } from '@Constants/Routes';

import type { IUserCreate } from '@Types/User.types';
import { useSignUpMutation } from '@Store/Slices/Api/Profile.api';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSubmitForm = async (profileData: IUserCreate) => {
    signUp(profileData)
      .unwrap()
      .then(() => navigate(`/${Routes.SignIn}`))
      .catch((error) => {
        setErrorMessage(`Не удалось зарегистрироваться ${error}`);
      });
  };

  return (
    <Stack
      spacing={2}
      sx={{
        padding: '60px 40px 20px',
        marginTop: 2,
        alignItems: 'center',
      }}>
      <Typography textAlign='center' variant='h4' color='primary'>
        Регистрация
      </Typography>
      <SignUpForm isLoading={isLoading} whenSubmitForm={handleSubmitForm} />
      <Typography textAlign='center' variant='body2'>
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
