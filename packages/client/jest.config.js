import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@Hooks/(.*)$': '<rootDir>/src/Hooks/$1',
    '^@Game/(.*)$': '<rootDir>/src/GameEngine/$1',
    '^@Components/(.*)$': '<rootDir>/src/Components/$1',
    '^@Constants/(.*)$': '<rootDir>/src/Constants/$1',
    '^@Services/(.*)$': '<rootDir>/src/Services/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
