import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import { store } from './app/store'
import {
  ProfilePage,
  SingInPage,
  SingUpPage,
  ForumPage,
  LeaderBordPage,
  NotFoundPage,
  ErrorPage,
} from './pages'
import PrivateRoutes from './privateRoutes'

const theme = createTheme()

const Routes = {
  Main: '/',
  SingUp: 'sing-up',
  SingIn: 'sing-in',
  Forum: 'forum',
  LeaderBord: 'leader-bord',
  Profile: 'profile',
} as const

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
      path: Routes.SingIn,
      element: <SingInPage />,
    },
    {
      path: Routes.SingUp,
      element: <SingUpPage />,
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
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
