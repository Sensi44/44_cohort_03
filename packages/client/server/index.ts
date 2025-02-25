import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Request as ExpressRequest } from 'express';
import fs from 'fs/promises';
import path from 'path';
import serialize from 'serialize-javascript';
import { createServer as createViteServer, ViteDevServer } from 'vite';
dotenv.config();

const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev
  ? process.env.EXTERNAL_SERVER_URL
  : 'http://158.160.91.178:3001';

console.log('baseUrl', baseUrl);
console.log('isDev', isDev);

async function createServer() {
  const app = express();
  app.use(cookieParser());

  let vite: ViteDevServer | undefined;
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false }),
    );
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let themeName = 'light';

      // Проверяем наличие темы в куках
      if (req.cookies.theme) {
        themeName = req.cookies.theme;
      } else {
        try {
          const themeResponse = await fetch(`${baseUrl}/api/user_theme`);
          const themeData = await themeResponse.json();
          themeName = themeData.theme || 'light';
        } catch (error) {
          console.error('Ошибка при получении темы:', error);
        }
      }

      res.cookie('theme', themeName, { maxAge: 900000, httpOnly: true });

      let render: (
        req: ExpressRequest,
      ) => Promise<{ html: string; initialState: unknown; css: string }>;
      let template: string;

      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8',
        );
        template = await vite.transformIndexHtml(url, template);
        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-service.tsx'),
          )
        ).render;
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8',
        );
        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-service.js',
        );
        render = (await import(pathToServer)).render;
      }

      const { html: appHtml, initialState, css } = await render(req);

      const html = template
        .replace(`<!--ssr-css-outlet-->`, css)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, { isJSON: true })}</script>`,
        )
        .replace(
          `<!--ssr-theme-->`,
          `<script>window.THEME = ${JSON.stringify(themeName)}</script>`,
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer();
