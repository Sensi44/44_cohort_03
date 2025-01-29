import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import logger from './logger';

const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [__dirname + '/Models'],
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function syncSequelize() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    logger.info('The database is synchronized successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}
