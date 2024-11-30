import { Button } from '@mui/material';
import React from 'react';
// import { useNavigate } from 'react-router-dom';

// import { Routes } from '@Constants';
// import { useLogoutMutation } from '@Store';

export const LogoutButton: React.FC = () => {
  // const navigate = useNavigate();
  // const [logout, { isLoading, isError }] = useLogoutMutation();

  const handleLogout = () => {
    console.log('logout');
    // try {
    //   logout()
    //     .unwrap()
    //     .then(() => {
    //       navigate(`/${Routes.SignIn}`);
    //     });
    // } catch (error) {
    //   return;
    // }
  };

  return (
    <Button color='inherit' onClick={handleLogout}>
      Выйти
    </Button>
  );
};
