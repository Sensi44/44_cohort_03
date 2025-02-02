import { configureStore } from '@reduxjs/toolkit';
import { Request as ExpressRequest } from 'express';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { rootReducer } from '@Store';
import { createFetchRequest } from './entry-service.utils';
import { routes } from './routes';
import { ForumApi } from './Store/Slices/Api/Forum.api';
import { LeaderBordApi } from './Store/Slices/Api/LeaderBord.api';
import { ProfileApi } from './Store/Slices/Api/Profile.api';
import { createEmotionCache } from './Utils/createEmotionCache';

export const render = async (req: ExpressRequest) => {
  const cache = createEmotionCache();

  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);
  // Render the component to a string.

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

  const html = ReactDOM.renderToString(
    <CacheProvider value={cache}>
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    </CacheProvider>,
  );

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // 7.
  return {
    html,
    css: emotionCss,
    initialState: store.getState(),
  };
};
