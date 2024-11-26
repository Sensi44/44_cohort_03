import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Container } from '@mui/material';

import { ErrorNotification } from '@Components/ErrorNotification/ErrorNotification';
import { Routes } from '../../main';
import { SignInForm } from '@Components/SignInForm/SignInForm';
import { UserLogin } from '@Types/UserLogin';
import { updateProfileData } from '@State/Store';
import { useAuthApi } from '@Services/AuthService';

import './SignInPage.scss';

export const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const authApi = useAuthApi();
  const dispatch = useDispatch();

  const handleSubmitForm = async (profileData: UserLogin) => {
    setIsLoading(true);
    const result = await authApi.signIn(profileData);

    if (result.isSuccess) {
      const userInfo = await authApi.getUserInfo();

      if (userInfo) {
        dispatch(updateProfileData(userInfo));
        navigate(Routes.Main);
      } else {
        setErrorMessage(result.error);
      }
    } else {
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Container className='page'>
      <Typography className='title' variant='h4' color='primary'>
        Вход
      </Typography>
      <SignInForm
        className='form'
        isLoading={isLoading}
        whenSubmitForm={handleSubmitForm}
      />
      <Typography className='info-message' variant='body2'>
        <NavLink to={`/${Routes.SignUp}`}>Нет аккаунта?</NavLink>
      </Typography>
      <ErrorNotification
        isOpen={errorMessage.length > 0}
        errorText={errorMessage}
        whenClose={() => setErrorMessage('')}
      />
    </Container>
  );
};
