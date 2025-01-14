import dotenv from 'dotenv';
import { pathsToModuleNameMapper } from 'ts-jest';
import config from './tsconfig.json' assert { type: 'json' };
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: ['jest-canvas-mock'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    ...pathsToModuleNameMapper(config.compilerOptions.paths, {
      prefix: '<rootDir>/src/',
    }),
  },
};
