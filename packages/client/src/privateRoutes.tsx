import { useEffect, useState } from 'react';
import {
  createSearchParams,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import { Routes } from '@Constants';
import { useGetUserInfoQuery } from '@Store';

export const PrivateRoutes = () => {
  const location = useLocation();
  const { data: userInfo, error, isLoading } = useGetUserInfoQuery();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
    return <div>Проверка авторизации...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: `/${Routes.SignIn}`,
        search: createSearchParams(location.search).toString(),
      }}
      replace
      state={{ from: location }}
    />
  );
};
