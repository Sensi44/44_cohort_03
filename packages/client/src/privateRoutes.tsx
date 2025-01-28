import {
  createSearchParams,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { Routes } from '@Constants';
import { CircularProgress } from '@mui/material';
import { useGetUserInfoQuery } from '@Store';

export const PrivateRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: userInfo, error, isLoading } = useGetUserInfoQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    navigate(
      {
        pathname: `/${Routes.SignIn}`,
        search: createSearchParams(location.search).toString(),
      },
      { replace: true, state: { from: location } },
    );
  }

  if (userInfo) {
    return <Outlet />;
  }

  return null;
};
