import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@Constants';
import { useLogoutMutation } from '@Store';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate(`/${Routes.SignIn}`);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <Button color='inherit' onClick={handleLogout}>
      Выйти
    </Button>
  );
};
