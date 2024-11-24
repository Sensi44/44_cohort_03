import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { green, purple } from '@mui/material/colors'

import { store } from '@State/Store'
import App from '@Components/App/App'
import SignUp from '@Pages/SignUp/SignUp'
import SignIn from '@Pages/SignIn/SignIn'

import './index.scss'

const theme = createTheme({
  palette: {
    primary: {
      main: purple[400],
    },
    secondary: {
      main: green[500],
    },
  },
})

export const Routes = {
  Main: '/',
  SignUp: '/sign-up',
  SignIn: '/sign-in',
} as const

const router = createBrowserRouter([
  {
    path: Routes.Main,
    element: <App />,
  },
  {
    path: Routes.SignUp,
    element: <SignUp />,
  },
  {
    path: Routes.SignIn,
    element: <SignIn />,
  },
])

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>,
)
