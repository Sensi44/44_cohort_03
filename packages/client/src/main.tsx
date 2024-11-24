import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

// import { store } from './app/store'
import App from '@Components/App/App'

import './index.scss'
import SignUp from '@Pages/SignUp/SignUp'
import { green, purple } from '@mui/material/colors'

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
])

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    {/*<Provider store={store}>*/}
    <CssBaseline />
    <RouterProvider router={router} />
    {/*</Provider>*/}
  </ThemeProvider>,
)
