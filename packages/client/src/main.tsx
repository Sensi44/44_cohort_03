import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import { store } from './app/store'

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
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
