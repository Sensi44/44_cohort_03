import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { green, purple } from '@mui/material/colors';

import { PrivateRoutes } from './privateRoutes';
import { ErrorPage } from '@Pages/ErrorPage/ErrorPage';
import { ForumPage } from '@Pages/ForumPage/ForumPage';
import { LeaderBordPage } from '@Pages/LeaderBordPage/LeaderBordPage';
import { ProfilePage } from '@Pages/ProfilePage/ProfilePage';
import { SignUpPage } from '@Pages/SignUpPage/SignUpPage';
import { SignInPage } from '@Pages/SignInPage/SignInPage';
import { NotFoundPage } from '@Pages/NotFoundPage/NotFoundPage';

import { store } from '@State/Store';
import App from '@Components/App/App';

import './index.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
    secondary: {
      main: green[500],
    },
  },
});

export const Routes = {
  Main: '/',
  SignUp: 'sign-up',
  SignIn: 'sign-in',
  Forum: 'forum',
  LeaderBord: 'leader-bord',
  Profile: 'profile',
} as const;

const router = createBrowserRouter(
  [
    {
      element: <PrivateRoutes />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: Routes.Main,
          element: <App />,
          errorElement: <ErrorPage />,
          children: [
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
      ],
    },
    {
      path: Routes.SignIn,
      element: <SignInPage />,
    },
    {
      path: Routes.SignUp,
      element: <SignUpPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
