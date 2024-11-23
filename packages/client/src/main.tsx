import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

// import { store } from './app/store'
import App from '@Components/App/App'

import './index.scss'

const theme = createTheme()

const Routes = {
  Main: '/',
} as const

const router = createBrowserRouter([
  {
    path: Routes.Main,
    element: <App />,
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
