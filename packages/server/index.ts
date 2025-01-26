import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { errors } from 'celebrate';
import express from 'express';

import { createCommentRoutes } from './Api/CommentAPI';
import { createCommentReplyRoutes } from './Api/CommentReplyAPI';
import { createTopicRoutes } from './Api/TopicAPI';
import logger from './logger';
import { requireAuth } from './Middleware/RequireAuth';
import { sanitizeInput } from './Middleware/SanitizeInput';
import { createClientAndConnect } from './PGClient';
import { syncSequelize } from './Sequelize';

const app = express();
app.use(cors());
app.use(sanitizeInput);
app.use(errors());
app.use(express.json());
const port = Number(process.env.SERVER_PORT) || 3001;

const router = express.Router();

createClientAndConnect().then(() => {
  syncSequelize().then(() => {
    createTopicRoutes(router);
    createCommentRoutes(router);
    createCommentReplyRoutes(router);

    app.use('/api', requireAuth, router);

    app.listen(port, () => {
      logger.info(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
  });
});
