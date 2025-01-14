import { App } from '@Components';
import { Routes } from '@Constants';
import {
  ErrorPage,
  ForumPage,
  LeaderBordPage,
  NotFoundPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '@Pages';

import { PrivateRoutes } from './privateRoutes';

export const routes = [
  {
    path: Routes.SignIn,
    element: <SignInPage />,
  },
  {
    path: Routes.SignUp,
    element: <SignUpPage />,
  },
  {
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Routes.Main,
        element: <App />,
        errorElement: <ErrorPage />,
      },
      { path: Routes.Forum, element: <ForumPage /> },
      {
        path: Routes.LeaderBord,
        element: <LeaderBordPage />,
      },
      {
        path: Routes.Profile,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
