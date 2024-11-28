import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { green, purple } from '@mui/material/colors';

import { Routes } from '@Constants';
import { store } from '@Store';
import {
  ErrorPage,
  ForumPage,
  LeaderBordPage,
  ProfilePage,
  SignUpPage,
  SignInPage,
  NotFoundPage,
} from '@Pages';
import { App } from '@Components';

import { PrivateRoutes } from './privateRoutes';

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

const router = createBrowserRouter(
  [
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
      ],
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
