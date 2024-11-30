import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Routes } from '@Constants';
import { useGetUserInfoQuery } from '@Store';

export const PrivateRoutes = () => {
  const location = useLocation();
  const { data: userInfo, error, isLoading } = useGetUserInfoQuery();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Использование хука useEffect для установки состояния аутентификации
  useEffect(() => {
    if (isLoading) {
      setIsAuthenticated(null);
    } else if (error) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(Boolean(userInfo));
    }
  }, [userInfo, error, isLoading]);

  if (isAuthenticated === null) {
    // альтернатива: отображать спиннер или загрузочный индикатор
    return <div>Проверка авторизации...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/${Routes.SignIn}`} replace state={{ from: location }} />
  );
};
