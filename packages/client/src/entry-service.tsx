import { configureStore } from '@reduxjs/toolkit';
import { Request as ExpressRequest } from 'express';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import { createFetchRequest } from './entry-service.utils';
import { routes } from './routes';
import { rootReducer } from './Store/Slices';
import { LeaderBordApi } from './Store/Slices/Api/LeaderBord.api';
import { ProfileApi } from './Store/Slices/Api/Profile.api';

export const render = async (req: ExpressRequest) => {
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
      ]),
  });

  // 6.
  const router = createStaticRouter(dataRoutes, context);

  // 7.
  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>,
    ),
    initialState: store.getState(),
  };
};
