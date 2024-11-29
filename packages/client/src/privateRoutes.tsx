import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Routes } from '@Constants';
import { useAuthApi } from '@Services';

export const PrivateRoutes = () => {
  const location = useLocation();
  const authApi = useAuthApi();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const userInfo = await authApi.getUserInfo();
    return Boolean(userInfo);
  };

  // Использование хука useEffect для выполнения асинхронной проверки
  useEffect(() => {
    (async () => {
      try {
        const auth = await checkAuth();
        setIsAuthenticated(auth);
      } catch (error) {
        setIsAuthenticated(false);
      }
    })();
  }, []);

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
