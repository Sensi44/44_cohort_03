import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { store } from '@Store';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { createEmotionCache } from './Utils/createEmotionCache';

const initialTheme = window.THEME || 'light';

const theme = createTheme({
  palette: {
    mode: initialTheme,
    primary: {
      main: '#5c6bc0',
    },
    secondary: {
      main: '#4caf50',
    },
  },
});

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_partialHydration: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const cache = createEmotionCache();

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
);
