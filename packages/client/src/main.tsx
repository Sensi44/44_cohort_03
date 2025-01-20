import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CacheProvider } from '@emotion/react';
import { store } from '@Store';
import { routes } from './routes';
import { createEmotionCache } from './Utils/createEmotionCache';

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
          <CssBaseline />
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
);
