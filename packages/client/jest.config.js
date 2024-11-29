import dotenv from 'dotenv';
import { pathsToModuleNameMapper } from 'ts-jest';
import config from './tsconfig.json' assert { type: 'json' };
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: ['jest-canvas-mock'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(config.compilerOptions.paths, {
      prefix: '<rootDir>/src/',
    }),
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
