import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { createTheme, ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@Store';
import { Request as ExpressRequest } from 'express';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { createFetchRequest } from './entry-service.utils';
import { routes } from './routes';
import { ForumApi } from './Store/Slices/Api/Forum.api';
import { LeaderBordApi } from './Store/Slices/Api/LeaderBord.api';
import { ProfileApi } from './Store/Slices/Api/Profile.api';
import { createEmotionCache } from './Utils/createEmotionCache';

export const render = async (req: ExpressRequest) => {
  const themeName = req.cookies.theme || 'light'; // light/dark
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // Создаём тему на основе полученного значения
  const theme = createTheme({
    palette: {
      mode: themeName,
      primary: {
        main: '#5c6bc0',
      },
      secondary: {
        main: '#4caf50',
      },
    },
  });

  // 1.
  const { query, dataRoutes } = createStaticHandler(routes);
  // 2.
  const fetchRequest = createFetchRequest(req);
  // 3.
  const context = await query(fetchRequest);

  // 4.
  if (context instanceof Response) {
    throw context;
  }

  // 5.
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        ProfileApi.middleware,
        LeaderBordApi.middleware,
        ForumApi.middleware,
      ]),
  });

  // 6.
  const router = createStaticRouter(dataRoutes, context);

  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StaticRouterProvider router={router} context={context} />
        </ThemeProvider>
      </Provider>
    </CacheProvider>,
  );

  // Извлекаем CSS для Emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // 7.
  return {
    html,
    css: emotionCss,
    initialState: store.getState(), // Передаём начальное состояние Redux, включая тему
  };
};
