// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: [
    '<rootDir>/auth-service/src',
    '<rootDir>/character-service/src',
    '<rootDir>/react-app/src',
  ],
  preset: 'ts-jest',
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '.*__mocks__.*',
  ],
  setupFiles: [
    '<rootDir>/test-setup.js',
  ],
  setupFilesAfterEnv: [
    /*  '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect', */
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  testPathIgnorePatterns: [
    '/.history/',
  ],
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 90,
      functions: 0,
      lines: 0,
    },
  },
};
export default config;
