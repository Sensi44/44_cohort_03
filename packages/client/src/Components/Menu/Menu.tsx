import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

export const Menu = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to={'/'}>
          Главная
        </Button>
        <Button color='inherit' component={Link} to={'sign-up'}>
          Регистрация
        </Button>
        <Button color='inherit' component={Link} to={'sign-in'}>
          Вход
        </Button>
        <Button color='inherit' component={Link} to={'forum'}>
          Форум
        </Button>
        <Button color='inherit' component={Link} to={'leader-bord'}>
          Лидерборд
        </Button>
        <Button color='inherit' component={Link} to={'profile'}>
          Профиль
        </Button>
      </Toolbar>
    </AppBar>
  );
};
